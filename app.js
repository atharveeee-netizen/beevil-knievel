/* ==========================================================================
   BEEVIL KNIEVEL — INTERACTIVE APP LOGIC & MOBILE SYNC (APP.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Telemetry Alert Simulator & Mobile Device Sync
  const tempSlider = document.getElementById('sim-temp');
  const co2Slider = document.getElementById('sim-co2');
  const freqSlider = document.getElementById('sim-freq');

  const tempVal = document.getElementById('val-temp');
  const co2Val = document.getElementById('val-co2');
  const freqVal = document.getElementById('val-freq');

  const alertBox = document.getElementById('telemetry-alert-box');
  const alertStatus = document.getElementById('telemetry-status-text');

  // Mobile App Frame Elements
  const mobileTempDisplay = document.getElementById('mobile-temp-display');
  const mobileFreqDisplay = document.getElementById('mobile-freq-display');
  const mobileRiskBadge = document.getElementById('mobile-risk-badge');
  const fftBars = document.querySelectorAll('.fft-bar');

  function updateTelemetrySimulator() {
    if (!tempSlider || !co2Slider || !freqSlider) return;

    const tempDelta = parseFloat(tempSlider.value);
    const co2Ppm = parseInt(co2Slider.value);
    const acousticFreq = parseInt(freqSlider.value);

    // Calculate brood temp
    const baseTemp = 34.8;
    const currentBroodTemp = (baseTemp + tempDelta).toFixed(1);

    if (tempVal) tempVal.textContent = `+${tempDelta}°C (${currentBroodTemp}°C)`;
    if (co2Val) co2Val.textContent = `${co2Ppm} ppm`;
    if (freqVal) freqVal.textContent = `${acousticFreq} Hz`;

    // Sync Mobile Device Frame
    if (mobileTempDisplay) mobileTempDisplay.textContent = `${currentBroodTemp}°C`;
    if (mobileFreqDisplay) mobileFreqDisplay.textContent = `${acousticFreq} Hz`;

    // Animate FFT Spectrum Bars in Mobile App Frame
    if (fftBars.length > 0) {
      fftBars.forEach((bar, idx) => {
        const randomMultiplier = 0.4 + Math.sin(acousticFreq * 0.01 + idx) * 0.5;
        const normalizedHeight = Math.min(100, Math.max(10, (acousticFreq / 500) * 100 * randomMultiplier));
        bar.style.height = `${normalizedHeight}%`;
      });
    }

    // Swarm Prediction Logic & Mobile Status Badge
    if (tempDelta >= 3.5 || acousticFreq >= 420) {
      if (alertBox) {
        alertBox.style.borderColor = '#FFC700';
        alertBox.style.background = 'rgba(255, 199, 0, 0.15)';
      }
      if (alertStatus) {
        alertStatus.innerHTML = '<span style="color: #FFC700; font-weight: 800;">🚨 WARNING: SWARM PREDICTED IN ~36 HOURS</span><br><small style="color: #A0A4B2;">Acoustic frequency spike & thermal anomaly detected by STM32 Edge AI model.</small>';
      }
      if (mobileRiskBadge) {
        mobileRiskBadge.textContent = 'HIGH RISK (SWARM)';
        mobileRiskBadge.style.color = '#FF3B30';
      }
    } else {
      if (alertBox) {
        alertBox.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        alertBox.style.background = 'var(--bg-surface)';
      }
      if (alertStatus) {
        alertStatus.innerHTML = '<span style="color: #10B981; font-weight: 700;">✓ COLONY HEALTH: OPTIMAL</span><br><small style="color: #A0A4B2;">Normal brood thermal equilibrium & acoustic telemetry.</small>';
      }
      if (mobileRiskBadge) {
        mobileRiskBadge.textContent = '3% (LOW RISK)';
        mobileRiskBadge.style.color = '#10B981';
      }
    }
  }

  if (tempSlider) tempSlider.addEventListener('input', updateTelemetrySimulator);
  if (co2Slider) co2Slider.addEventListener('input', updateTelemetrySimulator);
  if (freqSlider) freqSlider.addEventListener('input', updateTelemetrySimulator);

  updateTelemetrySimulator();

  // Mobile App Internal Tab Switcher
  const mobileTabs = document.querySelectorAll('.mobile-tab-item');
  const mobileViews = document.querySelectorAll('.mobile-view');

  mobileTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mobileTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetView = tab.dataset.view;
      mobileViews.forEach(v => {
        if (v.id === targetView) {
          v.style.display = 'block';
        } else {
          v.style.display = 'none';
        }
      });
    });
  });

  // 2. Checkout Modal & Order Triggers
  const modal = document.getElementById('checkout-modal');
  const openBtns = document.querySelectorAll('.open-checkout-btn');
  const closeBtn = document.getElementById('modal-close-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

});
