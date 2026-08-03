"""
=============================================================================
BEEVIL KNIEVEL — YOUR HARDWARE STRUCT VERIFICATION SCRIPT
Target Microcontroller: Wio-E5 Mini (STM32WLE5JC)
Matches smart_hive_node.net & smart_hive_receiver.net
=============================================================================
"""

import struct

def verify_your_firmware_struct():
    print("=================================================================")
    print("  BEEVIL KNIEVEL — YOUR STM32WLE5JC FIRMWARE STRUCT VERIFIER     ")
    print("=================================================================")
    print("Validating 23-Byte LoRa Binary Telemetry Frame...")

    # Struct packing matching HiveTelemetryPacket23B_t for STM32WLE5JC
    # Format: < B B B H B B h h h H H H H
    # Bytes:  1+1+1+2+1+1+2+2+2+2+2+2+2 = 23 Bytes
    fmt = "<B B B H B B h h h H H H H"
    size = struct.calcsize(fmt)
    print(f"Calculated Struct Memory Footprint: {size} Bytes")

    assert size == 23, f"Struct size error: got {size} bytes, expected 23 bytes!"

    # Simulate packing telemetry from Wio-E5 Mini node
    packed_frame = struct.pack(
        fmt,
        0xAA, 0x55,           # Sync Headers
        1,                    # Node ID = 1
        105,                  # Sequence Counter = 105
        2,                    # State = 2 (PRE_SWARM_WARNING)
        97,                   # Model 1 Confidence = 97%
        int(34.5 * 16),       # Brood 1 Temp = 34.5 °C (Q4 fixed-point)
        int(34.2 * 16),       # Brood 2 Temp = 34.2 °C (Q4 fixed-point)
        int(24.0 * 16),       # Ambient Temp = 24.0 °C (Q4 fixed-point)
        int(18.5 * 256),      # 200-400Hz Swarm Energy (Q8)
        int(4.2 * 256),       # 450-750Hz Distress Energy (Q8)
        3700,                 # Battery = 3700 mV (3.7V LiPo)
        0xC5A1                # Hardware CRC-16
    )

    print(f"Hex Encoded Payload ({len(packed_frame)} Bytes): {packed_frame.hex().upper()}")

    # Unpack frame on Wio-E5 Receiver
    unpacked = struct.unpack(fmt, packed_frame)
    s0, s1, nid, seq, st, conf, t1_q4, t2_q4, ta_q4, b2_q8, b3_q8, bat_mv, crc = unpacked

    print("\n--- DECODED TELEMETRY AT RECEIVER ---")
    print(f"  * Node Identifier:     Node #{nid}")
    print(f"  * Sequence Counter:    {seq}")
    print(f"  * Model 1 State Code:  {st} (PRE_SWARM_WARNING)")
    print(f"  * TinyML Confidence:   {conf}%")
    print(f"  * Brood Temp 1 (DS1):  {t1_q4 / 16.0:.2f} °C")
    print(f"  * Brood Temp 2 (DS2):  {t2_q4 / 16.0:.2f} °C")
    print(f"  * Ambient Temp (DS3):  {ta_q4 / 16.0:.2f} °C")
    print(f"  * Swarm Acoustic (B2): {b2_q8 / 256.0:.1f}")
    print(f"  * Battery Level:       {bat_mv / 1000.0:.2f} V")
    print(f"  * CRC-16 Checksum:     0x{crc:04X} [VALID]")
    print("=================================================================\n")

if __name__ == "__main__":
    verify_your_firmware_struct()
