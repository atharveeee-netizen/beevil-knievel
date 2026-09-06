"""
BEEVIL KNIEVEL — Master ANSYS Multi-Physics Simulation Suite Runner
Module: run_ansys_simulation_suite.py
Executes all 4 multi-physics simulation modules and verifies compliance against
the IEEE HART ANSYS Simulation Dossier Executive Summary criteria.
"""

import sys
import io

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

from ansys_hfss_lora_antenna import compute_rf_benchmarks
from ansys_icepak_thermal_cfd import compute_thermal_cfd
from ansys_mechanical_drop_and_modal import compute_mechanical_dynamics
from ansys_maxwell_emc_shielding import compute_emc_shielding

def main():
    print("=" * 80)
    print("BEEVIL KNIEVEL -- ANSYS MULTI-PHYSICS SIMULATION VERIFICATION SUITE")
    print("=" * 80)
    
    all_passed = True
    
    # 1. HFSS Antenna & Hive Dielectric
    print("\n[1/4] Running ANSYS HFSS: RF Antenna & Stratified Dielectric Media...")
    rf_res = compute_rf_benchmarks()
    print(f"      S11 Return Loss : {rf_res['s11_db']} dB (Target: < -18.0 dB)")
    print(f"      VSWR            : {rf_res['vswr']} (Target: < 1.28)")
    print(f"      Hive Loss       : {rf_res['total_hive_loss_db']} dB")
    print(f"      LOS Calc Range  : {rf_res['calculated_range_km']} km (Target: > 4.2 km)")
    print(f"      Module Status   : {rf_res['status']}")
    if rf_res['status'] != 'PASS':
        all_passed = False
        
    # 2. Icepak Thermal CFD
    print("\n[2/4] Running ANSYS Icepak: IP67 Gateway Baseboard Conjugate Heat Transfer...")
    therm_res = compute_thermal_cfd()
    print(f"      Ambient Temp    : {therm_res['ambient_temp_c']} °C + Solar Flux: {therm_res['solar_flux_w_m2']} W/m²")
    print(f"      Enclosure Skin  : {therm_res['enclosure_skin_temp_c']} °C")
    print(f"      Silicon Junction: {therm_res['silicon_junction_temp_c']} °C (Limit: {therm_res['bcm2711_throttle_limit_c']} °C)")
    print(f"      Safety Margin   : +{therm_res['safety_margin_c']} °C")
    print(f"      Module Status   : {therm_res['status']}")
    if therm_res['status'] != 'PASS':
        all_passed = False
        
    # 3. Mechanical Dynamic Drop & Modal Vibration
    print("\n[3/4] Running ANSYS Mechanical: Dynamic Drop Shock & Modal Decoupling...")
    mech_res = compute_mechanical_dynamics()
    print(f"      1.5m Drop Stress: {mech_res['peak_von_mises_mpa']} MPa (SF: {mech_res['drop_safety_factor']} > 1.5)")
    print(f"      Drop Status     : {mech_res['drop_status']}")
    print(f"      1st Natural Freq: {mech_res['first_natural_freq_hz']} Hz (Target: > {mech_res['target_decoupled_above_hz']} Hz)")
    print(f"      Acoustic Atten  : {mech_res['acoustic_attenuation_db']} dB (Target: > 30.0 dB)")
    print(f"      Modal Status    : {mech_res['modal_status']}")
    if mech_res['drop_status'] != 'PASS' or mech_res['modal_status'] != 'PASS':
        all_passed = False
        
    # 4. Maxwell MPPT SMPS EMI/EMC
    print("\n[4/4] Running ANSYS Maxwell: MPPT SMPS EMI & RF Shielding Effectiveness...")
    emc_res = compute_emc_shielding()
    print(f"      Shield Material : {emc_res['shield_can_material']}")
    print(f"      Shielding SE    : {emc_res['shielding_effectiveness_865mhz_db']} dB (Target: > 35.0 dB)")
    print(f"      LNA Noise Floor : {emc_res['coupled_noise_at_lna_dbm']} dBm (Target: < {emc_res['target_lna_noise_floor_dbm']} dBm)")
    print(f"      Module Status   : {emc_res['status']}")
    if emc_res['status'] != 'PASS':
        all_passed = False
        
    print("\n" + "=" * 80)
    if all_passed:
        print("✅ ALL ANSYS MULTI-PHYSICS SIMULATION MODULES PASSED BENCHMARK CRITERIA!")
        print("   Compliance: IEEE HardwAIre Challenge (HART) Phase 2 Specifications Verified.")
    else:
        print("❌ ONE OR MORE SIMULATION BENCHMARKS FAILED.")
        sys.exit(1)
    print("=" * 80)

if __name__ == "__main__":
    main()
