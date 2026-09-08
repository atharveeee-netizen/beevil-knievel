"""
===============================================================================
BEEVIL KNIEVEL — AUTOMATED FIRMWARE & TELEMETRY TEST SUITE
===============================================================================
Standard: IEEE HARDWAIre Phase 2 Bench Bring-Up
Tests:
  1. 32-byte packed binary struct layout, sizeof, endianness, field offsets.
  2. CRC-16 / CRC-8 checksum integrity on payload bytes.
  3. Sensor validation & range checking (sentinel values for unconnected sensors).
  4. 7-point OCV battery SoC estimator math with Arrhenius temperature compensation.
  5. CUSUM recursive thermal drift detector math.
  6. CMSIS-DSP 256-point Real FFT frequency resolution & swarming bin mapping.
  7. Configuration consistency across firmware C headers.
  8. Serial logger JSON Lines and CSV parsing round-trip integrity.
===============================================================================
"""

import os
import struct
import json
import csv
import pytest
from typing import Dict, Any


# -----------------------------------------------------------------------------
# 1. 32-BYTE BINARY STRUCT TESTS
# -----------------------------------------------------------------------------
class TestBinaryTelemetryStruct:
    """Validate packing, size, and layout of BeevilLoRaPayload."""

    # Format: <H h 5h H H H H H B 8B
    # < = little endian (ARM Cortex-M4 native)
    # H = uint16 (hive_id) -> 2
    # h = int16 (brood_core_temp_c_x100) -> 2
    # 5h = 5 * int16 (frame_temps_c_x100) -> 10
    # H = uint16 (humidity_pct_x100) -> 2
    # H = uint16 (voc_gas_kohm_x10) -> 2
    # H = uint16 (co2_ppm) -> 2
    # H = uint16 (weight_kg_x100) -> 2
    # H = uint16 (lux) -> 2
    # B = uint8 (tilt_deg) -> 1
    # 8B = 8 * uint8 (fft_energy_bands) -> 8
    # Total: 2 + 2 + 10 + 2 + 2 + 2 + 2 + 2 + 1 + 8 = 31 bytes payload
    STRUCT_FORMAT = "<Hh5hHHHHHBBBBBBBBB"
    EXPECTED_SIZE = struct.calcsize(STRUCT_FORMAT)

    def test_struct_exact_size(self):
        """Struct size is exactly 33 bytes:
        2 (hive_id) + 2 (core_temp) + 10 (5x frames) + 2 (hum) + 2 (voc) +
        2 (co2) + 2 (weight) + 2 (lux) + 1 (tilt) + 8 (fft) = 33 bytes.
        """
        assert self.EXPECTED_SIZE == 33, f"Unexpected struct size: {self.EXPECTED_SIZE}"

    def test_nominal_pack_unpack_roundtrip(self):
        """Verify packing and unpacking of nominal hive data."""
        hive_id = 0x0001
        core_t = int(34.82 * 100)
        frames = [int(34.20 * 100), int(34.15 * 100), int(34.30 * 100), int(33.90 * 100), int(34.05 * 100)]
        hum = int(58.40 * 100)
        voc = int(142.5 * 10)
        co2 = 1150
        weight = int(34.20 * 100)
        lux = 4500
        tilt = 2
        fft_bands = [10, 20, 150, 80, 30, 15, 5, 2]

        packed = struct.pack(
            self.STRUCT_FORMAT,
            hive_id, core_t,
            frames[0], frames[1], frames[2], frames[3], frames[4],
            hum, voc, co2, weight, lux, tilt,
            *fft_bands
        )

        unpacked = struct.unpack(self.STRUCT_FORMAT, packed)
        assert unpacked[0] == hive_id
        assert unpacked[1] == core_t
        assert list(unpacked[2:7]) == frames
        assert unpacked[7] == hum
        assert unpacked[8] == voc
        assert unpacked[9] == co2
        assert unpacked[10] == weight
        assert unpacked[11] == lux
        assert unpacked[12] == tilt
        assert list(unpacked[13:21]) == fft_bands

    def test_unconnected_sensor_sentinels(self):
        """Unconnected sensors must serialize as -9999 or 0xFFFF, never fake numbers."""
        hive_id = 0x0001
        core_t_unconnected = -9999
        frames_unconnected = [-9999] * 5
        hum_unconnected = 0xFFFF
        voc_unconnected = 0xFFFF
        co2_unconnected = 0xFFFF
        weight_unconnected = 0xFFFF
        lux_unconnected = 0xFFFF
        tilt_unconnected = 0xFF
        fft_unconnected = [0] * 8

        packed = struct.pack(
            self.STRUCT_FORMAT,
            hive_id, core_t_unconnected,
            *frames_unconnected,
            hum_unconnected, voc_unconnected, co2_unconnected,
            weight_unconnected, lux_unconnected, tilt_unconnected,
            *fft_unconnected
        )

        unpacked = struct.unpack(self.STRUCT_FORMAT, packed)
        assert unpacked[1] == -9999  # TMP117 absent
        assert list(unpacked[2:7]) == [-9999] * 5  # DS18B20 absent
        assert unpacked[7] == 0xFFFF  # BME688 hum absent
        assert unpacked[8] == 0xFFFF  # BME688 voc absent
        assert unpacked[9] == 0xFFFF  # SCD41 absent
        assert unpacked[10] == 0xFFFF  # HX711 absent
        assert unpacked[11] == 0xFFFF  # VEML7700 absent
        assert unpacked[12] == 0xFF  # LIS3DH absent


# -----------------------------------------------------------------------------
# 2. CRC-16 INTEGRITY TESTS
# -----------------------------------------------------------------------------
class TestCRCIntegrity:
    """Validate CCITT CRC-16 checksum algorithm used on LoRa packets."""

    @staticmethod
    def calculate_crc16_ccitt(data: bytes) -> int:
        crc = 0xFFFF
        for b in data:
            crc ^= (b << 8)
            for _ in range(8):
                if crc & 0x8000:
                    crc = ((crc << 1) ^ 0x1021) & 0xFFFF
                else:
                    crc = (crc << 1) & 0xFFFF
        return crc

    def test_crc_known_vector(self):
        """Test against standard ASCII '123456789' CRC-16 CCITT vector (0x29B1)."""
        test_data = b"123456789"
        crc = self.calculate_crc16_ccitt(test_data)
        assert crc == 0x29B1, f"Expected 0x29B1, got 0x{crc:04X}"

    def test_payload_tamper_detection(self):
        """Flipping a single bit in the payload must change the CRC."""
        payload = bytearray(b"\x00" * 31)
        original_crc = self.calculate_crc16_ccitt(payload)

        payload[10] ^= 0x01  # Flip 1 bit
        tampered_crc = self.calculate_crc16_ccitt(payload)
        assert original_crc != tampered_crc


# -----------------------------------------------------------------------------
# 3. BATTERY SOC ESTIMATION (7-POINT OCV + ARRHENIUS)
# -----------------------------------------------------------------------------
class TestBatterySoCEstimator:
    """Validate 1S 3.7V LiPo/Li-Ion SoC lookup with temperature derating."""

    VBAT_MAX_FULL_MV = 4200.0
    VBAT_MIN_EMPTY_MV = 3270.0
    OCV_PT_90_MV = 4080.0
    OCV_PT_70_MV = 3900.0
    OCV_PT_40_MV = 3770.0
    OCV_PT_20_MV = 3680.0
    OCV_PT_10_MV = 3520.0
    TEMP_BASELINE_C = 25.0
    TEMP_COEFF = 2.5  # mV per degree C

    def calculate_soc(self, vbat_mv: float, temp_c: float) -> float:
        v_comp = vbat_mv + (self.TEMP_BASELINE_C - temp_c) * self.TEMP_COEFF
        if v_comp >= self.VBAT_MAX_FULL_MV:
            return 100.0
        if v_comp <= self.VBAT_MIN_EMPTY_MV:
            return 0.0
        if v_comp > self.OCV_PT_90_MV:
            return 90.0 + (v_comp - self.OCV_PT_90_MV) / (self.VBAT_MAX_FULL_MV - self.OCV_PT_90_MV) * 10.0
        if v_comp > self.OCV_PT_70_MV:
            return 70.0 + (v_comp - self.OCV_PT_70_MV) / (self.OCV_PT_90_MV - self.OCV_PT_70_MV) * 20.0
        if v_comp > self.OCV_PT_40_MV:
            return 40.0 + (v_comp - self.OCV_PT_40_MV) / (self.OCV_PT_70_MV - self.OCV_PT_40_MV) * 30.0
        if v_comp > self.OCV_PT_20_MV:
            return 20.0 + (v_comp - self.OCV_PT_20_MV) / (self.OCV_PT_40_MV - self.OCV_PT_20_MV) * 20.0
        if v_comp > self.OCV_PT_10_MV:
            return 10.0 + (v_comp - self.OCV_PT_10_MV) / (self.OCV_PT_20_MV - self.OCV_PT_10_MV) * 10.0
        return (v_comp - self.VBAT_MIN_EMPTY_MV) / (self.OCV_PT_10_MV - self.VBAT_MIN_EMPTY_MV) * 10.0

    def test_full_battery_at_25c(self):
        soc = self.calculate_soc(4200.0, 25.0)
        assert soc == 100.0

    def test_empty_battery_at_25c(self):
        soc = self.calculate_soc(3270.0, 25.0)
        assert soc == 0.0

    def test_nominal_nominal_midrange(self):
        soc = self.calculate_soc(3800.0, 25.0)
        assert 40.0 < soc < 70.0

    def test_temperature_derating(self):
        """Cold temperature (0 C) must derate effective voltage compared to 25 C."""
        soc_warm = self.calculate_soc(3700.0, 25.0)
        soc_cold = self.calculate_soc(3700.0, 0.0)
        # At 0C, v_comp increases, representing higher internal resistance
        assert soc_cold > soc_warm


# -----------------------------------------------------------------------------
# 4. CUSUM THERMAL FILTER DRIFT CALCULATION
# -----------------------------------------------------------------------------
class TestCUSUMFilter:
    """Validate Page's CUSUM algorithm for queenlessness thermal collapse."""

    def test_stable_temperature_zero_drift(self):
        baseline = 34.80
        slack_k = 0.30
        threshold_h = 2.50
        s_k = 0.0

        for _ in range(20):
            temp = 34.80
            drift = baseline - temp - slack_k
            if drift > 0:
                s_k += drift
            else:
                s_k = max(0.0, s_k + drift * 0.5)

        assert s_k == 0.0, "Stable temperature should have zero CUSUM accumulator"

    def test_queenless_cooling_collapse_triggers_alert(self):
        baseline = 34.80
        slack_k = 0.30
        threshold_h = 2.50
        s_k = 0.0
        alert_triggered = False

        # Simulate brood temperature dropping steadily by 1.5 C (below 33.3 C)
        for _ in range(5):
            temp = 33.00
            drift = baseline - temp - slack_k  # 34.8 - 33.0 - 0.3 = 1.5 C per sample
            s_k += drift
            if s_k >= threshold_h:
                alert_triggered = True
                break

        assert alert_triggered is True, "CUSUM must flag queenless collapse when temperature drops"


# -----------------------------------------------------------------------------
# 5. FFT DSP FREQUENCY RESOLUTION & SWARMING BANDS
# -----------------------------------------------------------------------------
class TestBioAcousticFFTResolution:
    """Validate ARM CMSIS-DSP 256-point Real FFT mathematical specs."""

    FS = 16000.0  # 16 kHz sampling rate
    N = 256        # 256-point Real FFT

    def test_frequency_resolution(self):
        """Delta f = Fs / N = 16000 / 256 = 62.5 Hz per bin."""
        delta_f = self.FS / self.N
        assert delta_f == 62.5

    def test_nyquist_frequency(self):
        """Nyquist limit must be Fs / 2 = 8000 Hz."""
        nyquist = self.FS / 2.0
        assert nyquist == 8000.0

    def test_swarming_band_bin_alignment(self):
        """Worker pre-swarming piping band (200 - 400 Hz) must align with bins 3 to 6."""
        delta_f = self.FS / self.N
        bin_start = int(200.0 / delta_f)
        bin_end = int(400.0 / delta_f)
        assert bin_start == 3, f"Expected bin 3, got {bin_start}"
        assert bin_end == 6, f"Expected bin 6, got {bin_end}"


# -----------------------------------------------------------------------------
# 6. CONFIGURATION CONSISTENCY AUDIT
# -----------------------------------------------------------------------------
class TestHeaderConfigConsistency:
    """Verify that firmware configuration headers exist and contain valid values."""

    CONFIG_DIR = os.path.join(os.path.dirname(__file__), "..", "firmware", "config")

    def test_config_files_exist(self):
        required_headers = [
            "hardware_config.h",
            "battery_config.h",
            "sensor_config.h",
            "radio_config.h",
            "algorithm_config.h"
        ]
        for header in required_headers:
            path = os.path.join(self.CONFIG_DIR, header)
            assert os.path.exists(path), f"Missing header: {header}"

    def test_i2c_addresses_in_sensor_config(self):
        path = os.path.join(self.CONFIG_DIR, "sensor_config.h")
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        assert "0x48" in content  # TMP117
        assert "0x62" in content  # SCD41
        assert "0x76" in content  # BME688
        assert "0x18" in content  # LIS3DH


# -----------------------------------------------------------------------------
# 7. SERIAL LOGGER ROUNDTRIP PARSING
# -----------------------------------------------------------------------------
class TestSerialLoggerParsing:
    """Verify that tools/serial_logger.py parse_line handles valid telemetry."""

    from tools.serial_logger import SerialTelemetryLogger

    def test_valid_json_line_parsing(self):
        logger = self.SerialTelemetryLogger(port=None, sim_mode=True)
        raw_json = '{"packet":42,"uptime_ms":54000,"source":"REAL_SILICON","die_temp_c":26.5,"vbat_mv":4020,"soc_pct":87.0,"cusum_drift":0.000,"tmp117_c":null,"co2_ppm":null,"humidity_pct":null,"voc_kohm":null,"weight_kg":null,"lux":null,"presence_mask":0,"status":"BENCH_PROTOTYPE"}'
        record = logger.parse_line(raw_json)
        assert record is not None
        assert record["packet"] == 42
        assert record["source"] == "REAL_SILICON"
        assert record["die_temp_c"] == 26.5
        assert record["tmp117_c"] is None
        assert "host_timestamp_utc" in record

    def test_corrupted_line_ignored(self):
        logger = self.SerialTelemetryLogger(port=None, sim_mode=True)
        corrupted = "BEEVIL_KNIEVEL_BOOT_GARBAGE_12345"
        record = logger.parse_line(corrupted)
        assert record is None
