/**
 * ============================================================================
 * BEEVIL MESH PROTOCOL (BeevilMesh v1.0)
 * Multi-Hop Sub-GHz LoRa Mesh Networking for 100+ Distributed Beehives
 * ============================================================================
 * Features:
 * - Dynamic Multi-Hop Routing (Hives behind hills/trees relay packets to Gateway)
 * - Circular Deduplication Ring Buffer (Prevents packet broadcast storms)
 * - Configurable Time-To-Live (TTL) with Automatic Hop Decrement
 * - Ultra-low 2µA Sleep Duty-Cycled Listening (Preamble Detect CAD Mode)
 * ============================================================================
 */

#ifndef BEEVIL_MESH_PROTOCOL_H
#define BEEVIL_MESH_PROTOCOL_H

#include <stdint.h>
#include <stdbool.h>
#include <string.h>

#define MESH_MAX_HOPS           4       // Maximum relay hops across valley
#define MESH_DEDUP_CACHE_SIZE   32      // Seen packet cache size
#define MESH_GATEWAY_NODE_ID    0x0000  // Base Station Gateway Address
#define MESH_BROADCAST_ADDR     0xFFFF  // Mesh Broadcast

#pragma pack(push, 1)

// ----------------------------------------------------------------------------
// BEEVIL MESH PACKET HEADER (8 Bytes)
// ----------------------------------------------------------------------------
typedef struct {
    uint16_t source_hive_id;        // Originating Hive Node ID (e.g. Hive #042)
    uint16_t target_node_id;        // Destination (Gateway = 0x0000)
    uint16_t packet_seq_num;        // Monotonically increasing sequence number
    uint8_t  hop_count;             // Current hop count (0 = origin, 1 = 1st relay)
    uint8_t  ttl;                   // Time-To-Live (Decrements each hop; drops at 0)
} beevil_mesh_header_t;

// ----------------------------------------------------------------------------
// FULL MESH RADIO FRAME (40 Bytes Total)
// ----------------------------------------------------------------------------
typedef struct {
    beevil_mesh_header_t header;    // 8 bytes routing header
    uint8_t  payload[32];           // 32 bytes packed sensor telemetry
} beevil_mesh_frame_t;

#pragma pack(pop)

// ----------------------------------------------------------------------------
// MESH ROUTER STATE & DEDUPLICATION CACHE
// ----------------------------------------------------------------------------
typedef struct {
    uint16_t my_hive_id;
    uint16_t tx_seq_counter;
    uint32_t seen_packets[MESH_DEDUP_CACHE_SIZE]; // Hash of (source_id << 16 | seq_num)
    uint8_t  cache_index;
} beevil_mesh_router_t;

// ----------------------------------------------------------------------------
// MESH ROUTER API
// ----------------------------------------------------------------------------
static inline void beevil_mesh_init(beevil_mesh_router_t *router, uint16_t hive_id) {
    router->my_hive_id = hive_id;
    router->tx_seq_counter = 1;
    router->cache_index = 0;
    memset(router->seen_packets, 0, sizeof(router->seen_packets));
}

/**
 * Checks if a packet has already been routed/seen to prevent infinite broadcast loops.
 */
static inline bool beevil_mesh_is_duplicate(beevil_mesh_router_t *router, uint16_t src_id, uint16_t seq_num) {
    uint32_t packet_hash = ((uint32_t)src_id << 16) | (uint32_t)seq_num;
    for (int i = 0; i < MESH_DEDUP_CACHE_SIZE; i++) {
        if (router->seen_packets[i] == packet_hash) {
            return true; // Already forwarded or processed!
        }
    }
    // Record in circular ring cache
    router->seen_packets[router->cache_index] = packet_hash;
    router->cache_index = (router->cache_index + 1) % MESH_DEDUP_CACHE_SIZE;
    return false;
}

/**
 * Encapsulates raw 32-byte sensor telemetry into a new Mesh Frame.
 */
static inline void beevil_mesh_create_frame(beevil_mesh_router_t *router, const uint8_t *sensor_payload, beevil_mesh_frame_t *out_frame) {
    out_frame->header.source_hive_id = router->my_hive_id;
    out_frame->header.target_node_id = MESH_GATEWAY_NODE_ID;
    out_frame->header.packet_seq_num = router->tx_seq_counter++;
    out_frame->header.hop_count = 0;
    out_frame->header.ttl = MESH_MAX_HOPS;
    memcpy(out_frame->payload, sensor_payload, 32);

    // Register our own packet in seen cache
    beevil_mesh_is_duplicate(router, router->my_hive_id, out_frame->header.packet_seq_num);
}

/**
 * Evaluates an incoming radio packet:
 * - If target is Gateway and we are an intermediate hive: Decrements TTL, increments hop, and returns TRUE (Relay packet).
 * - If TTL expired or packet is duplicate: Returns FALSE (Drop packet).
 */
static inline bool beevil_mesh_handle_rx(beevil_mesh_router_t *router, beevil_mesh_frame_t *frame, bool is_gateway) {
    // 1. Drop if duplicate
    if (beevil_mesh_is_duplicate(router, frame->header.source_hive_id, frame->header.packet_seq_num)) {
        return false;
    }

    // 2. If this node is the Gateway: Consume payload!
    if (is_gateway || frame->header.target_node_id == router->my_hive_id) {
        return true; // Process locally!
    }

    // 3. If intermediate node: Check TTL before relaying
    if (frame->header.ttl <= 1) {
        return false; // TTL Expired — Drop to prevent infinite looping
    }

    // 4. Prepare for Re-Broadcast / Relay Hop
    frame->header.ttl--;
    frame->header.hop_count++;
    return true; // Relay this packet!
}

#endif // BEEVIL_MESH_PROTOCOL_H
