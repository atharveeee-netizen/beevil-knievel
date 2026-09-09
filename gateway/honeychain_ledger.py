"""
HONEY CHAIN — Cryptographic Permissioned Traceability Ledger
Problem Statement ID: 26021 — Ministry of MSME, Coordination Section

Implements a deterministic, tamper-evident cryptographic event ledger.
Every state transition (Harvest -> Batch -> Quality -> Processing -> Packaging -> QR)
is cryptographically hashed with SHA-256 into an unbroken hash chain.
"""

import json
import hashlib
import uuid
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
try:
    from .honeychain_db import get_db
except ImportError:
    from honeychain_db import get_db

GENESIS_HASH = "0" * 64

def canonical_json(data: Any) -> str:
    """Produces deterministic serialized JSON for cryptographic hashing."""
    return json.dumps(data, sort_keys=True, separators=(',', ':'), ensure_ascii=False)

def sha256_hex(data: str) -> str:
    return hashlib.sha256(data.encode('utf-8')).hexdigest()

class HoneyChainLedger:
    @staticmethod
    def get_last_event_hash(batch_id: Optional[str] = None) -> str:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT event_hash FROM ledger_events ORDER BY id DESC LIMIT 1;")
        row = cursor.fetchone()
        conn.close()
        return row["event_hash"] if row else GENESIS_HASH

    @classmethod
    def record_event(
        cls,
        batch_id: str,
        event_type: str,
        actor_id: str,
        actor_role: str,
        payload: Dict[str, Any],
        timestamp: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Creates and appends an immutable cryptographic event to the ledger chain.
        """
        if not timestamp:
            timestamp = datetime.now(timezone.utc).isoformat()

        event_id = f"EVT-{uuid.uuid4().hex[:12].upper()}"
        previous_event_hash = cls.get_last_event_hash()

        payload_str = canonical_json(payload)
        payload_hash = sha256_hex(payload_str)

        # Event Hash binding previous link, type, time, payload, and signer
        raw_preimage = f"{previous_event_hash}:{event_type}:{timestamp}:{payload_hash}:{actor_id}"
        event_hash = sha256_hex(raw_preimage)

        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO ledger_events (
            event_id, batch_id, event_type, actor_id, actor_role,
            timestamp, payload_json, payload_hash, previous_event_hash,
            event_hash, tampered
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0);
        """, (
            event_id, batch_id, event_type, actor_id, actor_role,
            timestamp, payload_str, payload_hash, previous_event_hash,
            event_hash
        ))
        conn.commit()
        conn.close()

        return {
            "event_id": event_id,
            "batch_id": batch_id,
            "event_type": event_type,
            "actor_id": actor_id,
            "actor_role": actor_role,
            "timestamp": timestamp,
            "payload_hash": payload_hash,
            "previous_event_hash": previous_event_hash,
            "event_hash": event_hash,
            "tampered": False
        }

    @staticmethod
    def get_batch_events(batch_id: str) -> List[Dict[str, Any]]:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM ledger_events WHERE batch_id = ? ORDER BY id ASC;",
            (batch_id,)
        )
        rows = cursor.fetchall()
        conn.close()

        events = []
        for r in rows:
            events.append({
                "id": r["id"],
                "event_id": r["event_id"],
                "batch_id": r["batch_id"],
                "event_type": r["event_type"],
                "actor_id": r["actor_id"],
                "actor_role": r["actor_role"],
                "timestamp": r["timestamp"],
                "payload": json.loads(r["payload_json"]),
                "payload_hash": r["payload_hash"],
                "previous_event_hash": r["previous_event_hash"],
                "event_hash": r["event_hash"],
                "tampered": bool(r["tampered"])
            })
        return events

    @staticmethod
    def verify_chain(batch_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Cryptographically validates the hash chain from genesis forward.
        Detects any retroactive modification or broken hash link.
        """
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM ledger_events ORDER BY id ASC;")
        all_rows = cursor.fetchall()
        conn.close()

        if not all_rows:
            return {
                "verified": True,
                "chain_intact": True,
                "events": 0,
                "tampered": False,
                "tampered_events": []
            }

        expected_prev_hash = GENESIS_HASH
        tampered_events = []
        batch_events_count = 0

        for row in all_rows:
            actual_payload_hash = sha256_hex(canonical_json(json.loads(row["payload_json"])))
            is_payload_corrupt = (actual_payload_hash != row["payload_hash"])

            expected_raw = f"{row['previous_event_hash']}:{row['event_type']}:{row['timestamp']}:{row['payload_hash']}:{row['actor_id']}"
            computed_event_hash = sha256_hex(expected_raw)
            is_hash_corrupt = (computed_event_hash != row["event_hash"])

            is_link_broken = (row["previous_event_hash"] != expected_prev_hash)
            is_event_tampered = is_payload_corrupt or is_hash_corrupt or is_link_broken or bool(row["tampered"])

            is_in_batch = (batch_id is None) or (row["batch_id"] == batch_id)
            if is_in_batch:
                batch_events_count += 1
                if is_event_tampered:
                    tampered_events.append({
                        "event_id": row["event_id"],
                        "batch_id": row["batch_id"],
                        "event_type": row["event_type"],
                        "reason": "PAYLOAD_MISMATCH" if is_payload_corrupt else ("LINK_BROKEN" if is_link_broken else "HASH_MISMATCH")
                    })
            elif is_event_tampered:
                tampered_events.append({
                    "event_id": row["event_id"],
                    "batch_id": row["batch_id"],
                    "event_type": row["event_type"],
                    "reason": "CHAIN_INTEGRITY_VIOLATION"
                })

            expected_prev_hash = row["event_hash"]

        is_valid = (len(tampered_events) == 0)
        return {
            "verified": is_valid,
            "chain_intact": is_valid,
            "events": batch_events_count if batch_id else len(all_rows),
            "tampered": not is_valid,
            "tampered_events": tampered_events
        }

    # Canonical Aliases matching SIH Specification
    create_event = record_event

    @classmethod
    def verify_batch(cls, batch_id: str) -> Dict[str, Any]:
        """Verifies integrity of all events associated with a specific honey batch."""
        return cls.verify_chain(batch_id=batch_id)

    @classmethod
    def detect_tampering(cls, batch_id: Optional[str] = None) -> Dict[str, Any]:
        """Detects if any retroactive alterations or broken links exist in the ledger."""
        res = cls.verify_chain(batch_id=batch_id)
        return {
            "tampered": res["tampered"],
            "tampered_events": res["tampered_events"],
            "total_verified_events": res["events"],
            "chain_intact": res["chain_intact"]
        }

    @staticmethod
    def tamper_event_for_demo(event_id: str, forged_payload: Dict[str, Any]) -> bool:
        """
        Deliberately injects forged data into an event payload without updating the hash.
        Used strictly to demonstrate tamper detection to SIH evaluators.
        """
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
        UPDATE ledger_events
        SET payload_json = ?, tampered = 1
        WHERE event_id = ?;
        """, (canonical_json(forged_payload), event_id))
        affected = cursor.rowcount
        conn.commit()
        conn.close()
        return affected > 0
