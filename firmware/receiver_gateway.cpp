/**
 * ============================================================================
 * BEEVIL KNIEVEL — Commercial Smart Hive Gateway RECEIVER Firmware (Phase 2)
 * Target MCU: STM32WLE5JC (Seeed Wio-E5 Mini Receiver Board @ 868MHz)
 * Function: Receives 20-byte LoRa packets from Hive Transmitters,
 *           decodes telemetry, and Serial UI bridges it to ESP32 Wi-Fi Module.
 * ============================================================================
 */

#include <Arduino.h>
#include <RadioLib.h>

// ---------- Configuration ----------
#define LORA_FREQ           868.0 // Sub-GHz LoRa Frequency (MHz)
#define LORA_BW             125.0 // Bandwidth (kHz)
#define LORA_SF             7     // Spreading Factor
#define LORA_CR             5     // Coding Rate

// ---------- Radio Object ----------
STM32WLx radio = new STM32WLx();

// ---------- Telemetry Packet Structure (20 Bytes - Matches Transmitter) ----------
struct __attribute__((__packed__)) HiveTelemetryPacket {
    uint8_t  node_id;        // 1 Byte
    int16_t  temp_brood_1;   // 2 Bytes (Temperature x 100)
    int16_t  temp_brood_2;   // 2 Bytes (Temperature x 100)
    int16_t  temp_ambient;   // 2 Bytes (Temperature x 100)
    uint16_t fft_200_400hz;  // 2 Bytes (Acoustic Band Energy)
    uint16_t v_battery_mv;   // 2 Bytes (Battery Millivolts)
    uint16_t weight_g;       // 2 Bytes (Hive Weight in grams)
    uint8_t  humidity_rh;    // 1 Byte  (Relative Humidity %)
    uint16_t eco2_ppm;       // 2 Bytes (Equivalent CO2 ppm)
    uint16_t tvoc_ppb;       // 2 Bytes (Total VOCs ppb)
    uint8_t  alert_flags;    // 1 Byte  (Bit0:Swarm, Bit1:Anomaly, Bit2:Batt, Bit3:Heartbeat, Bit4:Fault)
    uint8_t  padding;        // 1 Byte  (Padding)
};

void setup() {
    Serial.begin(115200); // Connected directly to ESP32 RX pin
    delay(1000);
    Serial.println(F("[BK-RECEIVER] Gateway Booting... Awaiting LoRa 868MHz..."));

    int state = radio.begin(LORA_FREQ, LORA_BW, LORA_SF, LORA_CR, RADIOLIB_SX126X_SYNC_WORD_PRIVATE, 14);
    if (state == RADIOLIB_ERR_NONE) {
        Serial.println(F("[BK-RECEIVER] System Ready. Bridging JSON to ESP32 Cloud Node."));
    } else {
        Serial.print(F("[BK-RECEIVER] Radio Init Error: "));
        Serial.println(state);
    }
}

void loop() {
    HiveTelemetryPacket packet;
    int state = radio.receive((uint8_t*)&packet, sizeof(packet));

    if (state == RADIOLIB_ERR_NONE) {
        float b1 = packet.temp_brood_1 / 100.0f;
        float b2 = packet.temp_brood_2 / 100.0f;
        float amb = packet.temp_ambient / 100.0f;
        float batt_v = packet.v_battery_mv / 1000.0f;
        float weight = packet.weight_g / 1000.0f; 
        float rssi = radio.getRSSI();
        float snr = radio.getSNR();

        // Output Formatted JSON designed for the ESP32 bridge to grab and POST to AWS
        Serial.print(F("{\"node_id\":"));
        Serial.print(packet.node_id);
        Serial.print(F(",\"brood_temp_1\":"));
        Serial.print(b1, 2);
        Serial.print(F(",\"brood_temp_2\":"));
        Serial.print(b2, 2);
        Serial.print(F(",\"ambient_temp\":"));
        Serial.print(amb, 2);
        Serial.print(F(",\"humidity\":"));
        Serial.print(packet.humidity_rh);
        Serial.print(F(",\"weight_kg\":"));
        Serial.print(weight, 2);
        Serial.print(F(",\"eco2_ppm\":"));
        Serial.print(packet.eco2_ppm);
        Serial.print(F(",\"tvoc_ppb\":"));
        Serial.print(packet.tvoc_ppb);
        Serial.print(F(",\"fft_200_400hz\":"));
        Serial.print(packet.fft_200_400hz);
        Serial.print(F(",\"battery_v\":"));
        Serial.print(batt_v, 2);
        Serial.print(F(",\"alert_flags\":"));
        Serial.print(packet.alert_flags);
        Serial.print(F(",\"rssi\":"));
        Serial.print(rssi, 1);
        Serial.print(F(",\"snr\":"));
        Serial.print(snr, 1);
        Serial.println(F("}"));
    }
}
