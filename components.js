/**
 * Beevil Knievel — Commercial Startup Web Architecture & Interactive Components
 * Features: Dynamic Navbar/Footer, PWA install prompt, Automated Web Demo Simulator,
 * Hotspot diagrams, Cart modal drawer, and FAQ accordions.
 */

// Global Navigation HTML Template
const NAV_HTML = `
<div class="nav-inner">
    <a href="index.html" class="nav-logo">
        <img src="assets/icon-192.png" alt="BK Logo" class="nav-logo-img">
        <div class="nav-logo-text">Beevil Knievel</div>
    </a>

    <ul class="nav-links">
        <li><a href="index.html" class="\${isPage('index')}">Overview</a></li>
        <li><a href="product.html" class="\${isPage('product')}">Hardware</a></li>
        <li><a href="store.html" class="\${isPage('store')}">Store</a></li>
        <li><a href="app.html" class="\${isPage('app')}">App Ecosystem</a></li>
        <li><a href="support.html" class="\${isPage('support')}">Support</a></li>
        <li><a href="investors.html" class="\${isPage('investors')}">Investors</a></li>
        <li><a href="about.html" class="\${isPage('about')}">About</a></li>
    </ul>

    <div class="nav-cta">
        <button class="btn btn-amber btn-sm open-demo-btn">Try Web Demo</button>
        <a href="store.html" class="btn btn-secondary btn-sm">Buy Now</a>
        <button class="nav-menu-btn" aria-label="Toggle menu">
            <span></span>
        </button>
    </div>
</div>
`;

// Global Footer HTML Template
const FOOTER_HTML = `
<div class="container footer-grid">
    <div>
        <a href="index.html" class="nav-logo" style="margin-bottom: 24px;">
            <img src="assets/icon-192.png" alt="BK Logo" class="nav-logo-img">
            <div class="nav-logo-text">Beevil Knievel</div>
        </a>
        <p class="footer-brand-desc">
            Industrial Edge AI hardware for precision beekeeping. Engineered to predict swarms, detect diseases early, and maximize colony yield.
        </p>
    </div>

    <div class="footer-col">
        <h4>Product</h4>
        <a href="product.html">Hardware Node</a>
        <a href="store.html">Pre-Order Store</a>
        <a href="accessories.html">Accessories & Spares</a>
        <a href="app.html">Farmer App</a>
    </div>

    <div class="footer-col">
        <h4>Resources</h4>
        <a href="download.html">Mobile App Download</a>
        <a href="docs.html">Field Documentation</a>
        <a href="support.html">Help Center</a>
        <a href="support.html#warranty">Warranty & SLA</a>
    </div>

    <div class="footer-col">
        <h4>Company</h4>
        <a href="about.html">About & Team</a>
        <a href="investors.html">Investors & Roadmap</a>
        <a href="research.html">Acoustic Research</a>
        <a href="privacy.html">Privacy Policy</a>
    </div>
</div>

<div class="container footer-bottom">
    <div>© 2026 Beevil Knievel Inc. All rights reserved. Industrial AgriTech Telemetry.</div>
    <div style="display: flex; gap: 24px;">
        <a href="privacy.html" style="color: inherit;">Privacy</a>
        <a href="privacy.html#terms" style="color: inherit;">Terms of Service</a>
        <a href="privacy.html#compliance" style="color: inherit;">Compliance</a>
    </div>
</div>
`;

// Try Web Demo Smartphone Modal Template
const DEMO_MODAL_HTML = `
<div id="demo-modal" class="modal-overlay">
    <div class="modal-content text-center">
        <button class="modal-close" id="close-demo-modal">&times;</button>
        <span class="eyebrow" style="color: var(--color-amber);">Interactive Product Simulator</span>
        <h2 class="heading-card mb-24">Farmer Companion App — Live Walkthrough</h2>
        <p class="body-sm mb-32 mx-auto" style="max-width: 500px;">
            Automated production preview showcasing real-time brood telemetry, acoustic swarm alerts, and Edge AI recommendations.
        </p>

        <!-- Smartphone Device Frame -->
        <div class="phone-mockup">
            <div class="phone-notch"></div>
            <span class="demo-step-badge" id="demo-step-indicator">STEP 1 / 5</span>
            
            <div class="phone-screen" id="demo-screen-content">
                <!-- Screen Content Injected via JS Loop -->
            </div>

            <div class="phone-nav-bar">
                <div class="phone-nav-item active" id="pnav-home"><span>🏠</span>Home</div>
                <div class="phone-nav-item" id="pnav-hives"><span>🐝</span>Hives</div>
                <div class="phone-nav-item" id="pnav-ai"><span>⚡</span>AI</div>
                <div class="phone-nav-item" id="pnav-alerts"><span>🔔</span>Alerts</div>
                <div class="phone-nav-item" id="pnav-settings"><span>⚙️</span>More</div>
            </div>
        </div>

        <div class="flex justify-center gap-16 mt-32">
            <a href="download.html" class="btn btn-amber btn-sm">Download Native App (APK)</a>
            <a href="store.html" class="btn btn-secondary btn-sm">Order Hardware Starter Kit</a>
        </div>
    </div>
</div>
`;

// Helper: Check active page
function isPage(keyword) {
    const path = window.location.pathname;
    if (keyword === 'index' && (path.endsWith('/') || path.endsWith('index.html') || path === '')) return 'active';
    return path.includes(keyword) ? 'active' : '';
}

// DOM Initializer
document.addEventListener('DOMContentLoaded', () => {
    // Inject Nav
    const navEl = document.getElementById('bk-nav');
    if (navEl) {
        navEl.innerHTML = NAV_HTML.replace(/\$\{isPage\('([^']+)'\)\}/g, (match, p1) => isPage(p1));
    }

    // Inject Footer
    const footerEl = document.getElementById('bk-footer');
    if (footerEl) {
        footerEl.innerHTML = FOOTER_HTML;
    }

    // Inject Demo Modal
    if (!document.getElementById('demo-modal')) {
        document.body.insertAdjacentHTML('beforeend', DEMO_MODAL_HTML);
    }

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.nav-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '72px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'var(--color-surface-1)';
                navLinks.style.padding = '24px';
                navLinks.style.borderBottom = '1px solid var(--color-border)';
            }
        });
    }

    // Accordion Logic
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.parentElement;
            item.classList.toggle('open');
        });
    });

    // Scroll Reveal Observer
    initScrollAnimations();

    // Setup Try Web Demo Modal & Simulation Loop
    setupDemoSimulator();

    // Setup PWA Install Listener
    setupPwaInstall();
});

// Scroll Reveal
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Automated Smartphone App Walkthrough Demo Loop
let demoInterval = null;
let currentDemoStep = 0;

const DEMO_STEPS = [
    {
        title: "Welcome & Auth",
        tab: "pnav-home",
        html: `
            <div style="text-align:center; padding-top: 40px;">
                <div style="font-size:48px; margin-bottom:16px;">🔐</div>
                <h4 style="font-size:18px; font-weight:700; color:var(--color-ink); margin-bottom:8px;">Biometric Verification</h4>
                <p style="font-size:12px; color:var(--color-ink-secondary); margin-bottom:24px;">Encrypted Apiary Security</p>
                <div style="background:var(--color-surface-2); border:1px solid var(--color-border); padding:12px; border-radius:10px; font-size:12px; color:var(--color-success); font-weight:600;">
                    ✓ Authenticated: Atharve Dahima (Commercial Apiary #04)
                </div>
            </div>
        `
    },
    {
        title: "Live Dashboard",
        tab: "pnav-home",
        html: `
            <div style="text-align:left;">
                <div style="display:flex; justify-between; align-items:center; margin-bottom:16px;">
                    <div>
                        <div style="font-size:11px; color:var(--color-amber); font-weight:700; text-transform:uppercase;">North Apiary Yard</div>
                        <h4 style="font-size:16px; font-weight:700; color:var(--color-ink);">Hive Alpha (#01)</h4>
                    </div>
                    <span style="background:rgba(16,185,129,0.15); color:var(--color-success); padding:4px 8px; border-radius:12px; font-size:10px; font-weight:700;">ONLINE</span>
                </div>
                <div style="background:var(--color-surface-2); border:1px solid var(--color-border); border-radius:12px; padding:16px; margin-bottom:12px;">
                    <div style="font-size:11px; color:var(--color-ink-tertiary);">Brood Nest Core Temp</div>
                    <div style="font-size:32px; font-weight:800; color:var(--color-ink);">35.2 °C</div>
                    <div style="font-size:11px; color:var(--color-success);">Optimal Thermal Regulation</div>
                </div>
                <div style="background:var(--color-surface-2); border:1px solid var(--color-border); border-radius:12px; padding:12px; display:flex; justify-between;">
                    <div><span style="font-size:11px; color:var(--color-ink-tertiary);">Battery</span><div style="font-weight:700; font-size:14px;">98% (Solar)</div></div>
                    <div><span style="font-size:11px; color:var(--color-ink-tertiary);">LoRa Signal</span><div style="font-weight:700; font-size:14px;">-84 dBm</div></div>
                </div>
            </div>
        `
    },
    {
        title: "Swarm Alert",
        tab: "pnav-alerts",
        html: `
            <div style="text-align:left;">
                <div style="background:rgba(239,68,68,0.12); border:1px solid rgba(239,68,68,0.3); border-radius:12px; padding:16px; margin-bottom:16px;">
                    <div style="display:flex; gap:8px; align-items:center; color:var(--color-danger); font-weight:700; font-size:12px; margin-bottom:6px;">
                        <span>⚠️</span> CRITICAL ACOUSTIC ALERT
                    </div>
                    <h4 style="font-size:14px; font-weight:700; color:var(--color-ink); margin-bottom:4px;">Pre-Swarm Piping Detected</h4>
                    <p style="font-size:11px; color:var(--color-ink-secondary);">Acoustic FFT frequency peak at 315 Hz registered. Queen piping probability: 94%.</p>
                </div>
                <div style="background:var(--color-surface-2); border:1px solid var(--color-border); border-radius:12px; padding:12px;">
                    <div style="font-size:11px; font-weight:700; color:var(--color-amber); margin-bottom:4px;">Action Protocol</div>
                    <p style="font-size:11px; color:var(--color-ink-secondary);">Inspect brood box within 24 hours to split colony or install swarm trap.</p>
                </div>
            </div>
        `
    },
    {
        title: "AI Diagnostic Engine",
        tab: "pnav-ai",
        html: `
            <div style="text-align:left;">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
                    <div style="width:28px; height:28px; border-radius:6px; background:var(--color-amber-glow); color:var(--color-amber); display:flex; align-items:center; justify-center; font-weight:700; font-size:12px;">AI</div>
                    <h4 style="font-size:14px; font-weight:700; color:var(--color-ink);">Colony Health Diagnostics</h4>
                </div>
                <div style="background:var(--color-surface-2); border:1px solid var(--color-border); border-radius:12px; padding:12px; margin-bottom:10px;">
                    <div style="font-size:11px; color:var(--color-ink-tertiary);">Varroa Mite Stress Index</div>
                    <div style="font-weight:700; color:var(--color-success); font-size:14px;">LOW (0.4%)</div>
                </div>
                <div style="background:var(--color-surface-2); border:1px solid var(--color-border); border-radius:12px; padding:12px;">
                    <div style="font-size:11px; color:var(--color-ink-tertiary);">Honey Flow Rate Prediction</div>
                    <div style="font-weight:700; color:var(--color-amber); font-size:14px;">+1.4 kg / day expected</div>
                </div>
            </div>
        `
    },
    {
        title: "Hardware Health",
        tab: "pnav-settings",
        html: `
            <div style="text-align:left;">
                <h4 style="font-size:14px; font-weight:700; color:var(--color-ink); margin-bottom:12px;">Node Telemetry Status</h4>
                <div style="display:flex; flex-direction:column; gap:8px;">
                    <div style="background:var(--color-surface-2); padding:10px; border-radius:8px; font-size:11px; display:flex; justify-between;">
                        <span>Node Firmware</span>
                        <span style="font-family:monospace; color:var(--color-amber);">v2.4.0-edge</span>
                    </div>
                    <div style="background:var(--color-surface-2); padding:10px; border-radius:8px; font-size:11px; display:flex; justify-between;">
                        <span>Solar Cell Charging</span>
                        <span style="color:var(--color-success);">+4.2V (Trickle Active)</span>
                    </div>
                    <div style="background:var(--color-surface-2); padding:10px; border-radius:8px; font-size:11px; display:flex; justify-between;">
                        <span>Enclosure Ingress</span>
                        <span style="color:var(--color-success);">IP68 Sealed</span>
                    </div>
                </div>
            </div>
        `
    }
];

function setupDemoSimulator() {
    const openBtns = document.querySelectorAll('.open-demo-btn, a[href="#demo"]');
    const modal = document.getElementById('demo-modal');
    const closeBtn = document.getElementById('close-demo-modal');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) {
                modal.classList.add('open');
                startDemoLoop();
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) modal.classList.remove('open');
            stopDemoLoop();
        });
    }
}

function startDemoLoop() {
    stopDemoLoop();
    renderDemoStep(0);
    demoInterval = setInterval(() => {
        currentDemoStep = (currentDemoStep + 1) % DEMO_STEPS.length;
        renderDemoStep(currentDemoStep);
    }, 3500);
}

function stopDemoLoop() {
    if (demoInterval) {
        clearInterval(demoInterval);
        demoInterval = null;
    }
}

function renderDemoStep(index) {
    const step = DEMO_STEPS[index];
    const screen = document.getElementById('demo-screen-content');
    const badge = document.getElementById('demo-step-indicator');

    if (screen) screen.innerHTML = step.html;
    if (badge) badge.innerText = `STEP ${index + 1} / ${DEMO_STEPS.length} — ${step.title}`;

    // Highlight nav item
    document.querySelectorAll('.phone-nav-item').forEach(el => el.classList.remove('active'));
    const activeTab = document.getElementById(step.tab);
    if (activeTab) activeTab.classList.add('active');
}

// PWA Logic
let deferredPrompt;
function setupPwaInstall() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    document.querySelectorAll('.pwa-install-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') deferredPrompt = null;
            } else {
                alert("Beevil Knievel Companion App: You can install directly or add to your Home Screen from your browser options.");
            }
        });
    });
}
