/* ==========================================================================
   Beevil Knievel — Shared Component Injection & Interactivity Engine
   ALL CONSTANTS MUST BE DEFINED BEFORE initApp() IS CALLED
   ========================================================================== */

// Helper: Check active page
function isPage(keyword) {
    const path = window.location.pathname.toLowerCase();
    if (keyword === 'index' && (path.endsWith('/') || path.endsWith('index.html') || path.endsWith('beevil-knievel') || path === '')) return 'active';
    return path.includes(keyword) ? 'active' : '';
}

// Global Navigation HTML — Evaluated once at parse time with correct isPage() context
const NAV_HTML = `
<div class="nav-inner">
    <a href="index.html" class="nav-logo">
        <img src="assets/bk_yellow_logo.png" alt="bK Logo" class="nav-logo-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
        <div class="nav-logo-fallback">bK</div>
        <div class="nav-logo-text">Beevil Knievel</div>
    </a>

    <ul class="nav-links">
        <li><a href="index.html" class="${isPage('index')}">Overview</a></li>
        <li><a href="product.html" class="${isPage('product')}">Hardware</a></li>
        <li><a href="store.html" class="${isPage('store')}">Store</a></li>
        <li><a href="app.html" class="${isPage('app')}">App Ecosystem</a></li>
        <li><a href="support.html" class="${isPage('support')}">Support</a></li>
        <li><a href="investors.html" class="${isPage('investors')}">Investors</a></li>
        <li><a href="about.html" class="${isPage('about')}">About</a></li>
    </ul>

    <div class="nav-cta">
        <button class="btn btn-amber btn-sm open-demo-btn">Try Web Demo</button>
        <a href="store.html" class="btn btn-secondary btn-sm">Buy Now</a>
        <button class="nav-menu-btn" aria-label="Toggle menu"><span></span></button>
    </div>
</div>
`;

const FOOTER_HTML = `
<div class="container footer-grid">
    <div>
        <a href="index.html" class="nav-logo" style="margin-bottom:24px;">
            <img src="assets/bk_yellow_logo.png" alt="bK Logo" class="nav-logo-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <div class="nav-logo-fallback">bK</div>
            <div class="nav-logo-text">Beevil Knievel</div>
        </a>
        <p class="footer-brand-desc">Industrial Edge AI hardware nodes for precision apiculture. Predict swarms 36h in advance and eliminate colony loss.</p>
        <p class="body-sm" style="margin-top:16px; color:var(--color-amber); font-family:monospace;">IP68 Sub-GHz Telemetry Architecture</p>
    </div>
    <div>
        <h4 class="footer-heading">Ecosystem</h4>
        <ul class="footer-links">
            <li><a href="product.html">Hardware Spec</a></li>
            <li><a href="store.html">Pre-Order Store</a></li>
            <li><a href="app.html">Farmer App</a></li>
            <li><a href="download.html">Download APK / PWA</a></li>
            <li><a href="accessories.html">Accessories</a></li>
        </ul>
    </div>
    <div>
        <h4 class="footer-heading">Support & Docs</h4>
        <ul class="footer-links">
            <li><a href="support.html">Help Center</a></li>
            <li><a href="docs.html">Field Installation</a></li>
            <li><a href="support.html#warranty">2-Year Warranty SLA</a></li>
            <li><a href="privacy.html">Privacy & Telemetry</a></li>
        </ul>
    </div>
    <div>
        <h4 class="footer-heading">Company</h4>
        <ul class="footer-links">
            <li><a href="about.html">About & Founding Team</a></li>
            <li><a href="investors.html">Investor Relations</a></li>
            <li><a href="research.html">Acoustic Research</a></li>
            <li><a href="about.html">Contact Us</a></li>
        </ul>
    </div>
</div>
<div class="container footer-bottom">
    <div>&copy; 2026 Beevil Knievel Commercial Startup Inc. All Rights Reserved.</div>
    <div style="display:flex; gap:24px;">
        <a href="privacy.html">Privacy</a>
        <a href="privacy.html">Terms of SLA</a>
        <a href="support.html">Contact</a>
    </div>
</div>
`;

const DEMO_MODAL_HTML = `
<div id="demo-modal" class="modal-backdrop">
    <div class="modal-content">
        <button id="close-demo-modal" class="modal-close" aria-label="Close">&times;</button>
        <div class="modal-header">
            <span class="badge badge-amber mb-8">Farmer Companion App Simulator</span>
            <h3 class="heading-small">Live Field Telemetry & AI Diagnostics</h3>
        </div>
        <div class="modal-body flex justify-center" style="padding: 24px 0;">
            <div class="phone-mockup">
                <div class="phone-notch"></div>
                <div class="phone-screen" id="demo-phone-screen">
                    <div id="demo-screen-content" style="padding-top:24px; transition:opacity 0.25s ease;"></div>
                    <div class="phone-nav-bar">
                        <div class="phone-nav-item active" id="pnav-home" onclick="selectDemoStep(0)"><div class="pnav-icon">📊</div><span>Dash</span></div>
                        <div class="phone-nav-item" id="pnav-hives" onclick="selectDemoStep(1)"><div class="pnav-icon">🐝</div><span>Hives</span></div>
                        <div class="phone-nav-item" id="pnav-alerts" onclick="selectDemoStep(2)"><div class="pnav-icon">🔔</div><span>Alerts</span></div>
                        <div class="phone-nav-item" id="pnav-ai" onclick="selectDemoStep(3)"><div class="pnav-icon">🧠</div><span>AI</span></div>
                        <div class="phone-nav-item" id="pnav-settings" onclick="selectDemoStep(4)"><div class="pnav-icon">⚙️</div><span>Status</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer flex justify-between items-center">
            <span id="demo-step-indicator" style="font-family:monospace; color:var(--color-amber); font-size:12px;">STEP 1 / 5 — Live Dashboard</span>
            <a href="download.html" class="btn btn-amber btn-sm">Download App (APK)</a>
        </div>
    </div>
</div>
`;

const DEMO_STEPS = [
    {
        title: "Live Hive Dashboard", tab: "pnav-home",
        html: `<div style="text-align:left;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                <div><div style="font-size:11px;color:var(--color-amber);font-weight:700;text-transform:uppercase;">North Yard • Hive #01</div>
                <h4 style="font-size:16px;font-weight:700;color:var(--color-ink);">Colony Alpha</h4></div>
                <span style="background:rgba(16,185,129,0.15);color:var(--color-success);padding:3px 8px;border-radius:12px;font-size:10px;font-weight:700;">ONLINE</span>
            </div>
            <div style="background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:12px;padding:14px;margin-bottom:10px;">
                <div style="font-size:11px;color:var(--color-ink-tertiary);">Brood Nest Core Temp</div>
                <div style="font-size:30px;font-weight:800;color:var(--color-ink);">35.2 °C</div>
                <div style="font-size:10px;color:var(--color-success);font-weight:600;">✓ Optimal Thermal Regulation</div>
            </div>
            <div style="background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:12px;padding:10px;display:flex;justify-content:space-between;">
                <div><span style="font-size:10px;color:var(--color-ink-tertiary);">Solar Battery</span><div style="font-weight:700;font-size:13px;">98% (+4.2V)</div></div>
                <div><span style="font-size:10px;color:var(--color-ink-tertiary);">Sub-GHz Signal</span><div style="font-weight:700;font-size:13px;color:var(--color-amber);">-84 dBm</div></div>
            </div></div>`
    },
    {
        title: "Apiary Yard Overview", tab: "pnav-hives",
        html: `<div style="text-align:left;">
            <h4 style="font-size:15px;font-weight:700;color:var(--color-ink);margin-bottom:10px;">Yard Hives (4 Nodes Active)</h4>
            <div style="display:flex;flex-direction:column;gap:8px;">
                <div style="background:var(--color-surface-2);border:1px solid var(--color-border);padding:10px 12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
                    <div><strong style="font-size:12px;color:var(--color-ink);">Hive #01 (Alpha)</strong><div style="font-size:10px;color:var(--color-ink-tertiary);">35.2°C • 98% Battery</div></div>
                    <span style="color:var(--color-success);font-weight:700;font-size:11px;">Healthy</span>
                </div>
                <div style="background:var(--color-surface-2);border:1px solid var(--color-border);padding:10px 12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
                    <div><strong style="font-size:12px;color:var(--color-ink);">Hive #02 (Beta)</strong><div style="font-size:10px;color:var(--color-ink-tertiary);">34.8°C • 95% Battery</div></div>
                    <span style="color:var(--color-success);font-weight:700;font-size:11px;">Healthy</span>
                </div>
                <div style="background:var(--color-surface-2);border:1px solid rgba(245,166,35,0.4);padding:10px 12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
                    <div><strong style="font-size:12px;color:var(--color-amber);">Hive #03 (Gamma)</strong><div style="font-size:10px;color:var(--color-ink-tertiary);">38.1°C • ⚠ Pre-Swarm</div></div>
                    <span style="color:var(--color-amber);font-weight:700;font-size:11px;">Warning</span>
                </div>
            </div></div>`
    },
    {
        title: "Acoustic Swarm Alert", tab: "pnav-alerts",
        html: `<div style="text-align:left;">
            <div style="background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:14px;margin-bottom:12px;">
                <div style="display:flex;gap:6px;align-items:center;color:var(--color-danger);font-weight:700;font-size:11px;margin-bottom:6px;">⚠️ CRITICAL PRE-SWARM ALERT</div>
                <h4 style="font-size:14px;font-weight:700;color:var(--color-ink);margin-bottom:4px;">Queen Piping Detected (Hive #03)</h4>
                <p style="font-size:11px;color:var(--color-ink-secondary);">FFT peak at 315 Hz. Pre-swarm probability: 94%. Action recommended within 24h.</p>
            </div>
            <div style="background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:10px;padding:10px;">
                <div style="font-size:10px;font-weight:700;color:var(--color-amber);margin-bottom:2px;">Suggested Action</div>
                <p style="font-size:10px;color:var(--color-ink-secondary);">Inspect brood frames to split queen cells or set swarm trap.</p>
            </div></div>`
    },
    {
        title: "AI Diagnostics Engine", tab: "pnav-ai",
        html: `<div style="text-align:left;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                <div style="width:26px;height:26px;border-radius:6px;background:var(--color-amber-glow);color:var(--color-amber);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;">AI</div>
                <h4 style="font-size:14px;font-weight:700;color:var(--color-ink);">Neural Hive Analytics</h4>
            </div>
            <div style="background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:10px;padding:10px;margin-bottom:8px;">
                <div style="font-size:10px;color:var(--color-ink-tertiary);">Varroa Mite Stress Index</div>
                <div style="font-weight:700;color:var(--color-success);font-size:13px;">LOW (0.4%) — No treatment required</div>
            </div>
            <div style="background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:10px;padding:10px;">
                <div style="font-size:10px;color:var(--color-ink-tertiary);">Honey Flow Forecast</div>
                <div style="font-weight:700;color:var(--color-amber);font-size:13px;">+1.4 kg / day expected peak</div>
            </div></div>`
    },
    {
        title: "Node Telemetry Status", tab: "pnav-settings",
        html: `<div style="text-align:left;">
            <h4 style="font-size:14px;font-weight:700;color:var(--color-ink);margin-bottom:10px;">Hardware Node Diagnostics</h4>
            <div style="display:flex;flex-direction:column;gap:6px;">
                <div style="background:var(--color-surface-2);padding:8px 10px;border-radius:6px;font-size:10px;display:flex;justify-content:space-between;"><span style="color:var(--color-ink-tertiary);">Firmware</span><span style="font-family:monospace;color:var(--color-amber);">v2.4.0-edge</span></div>
                <div style="background:var(--color-surface-2);padding:8px 10px;border-radius:6px;font-size:10px;display:flex;justify-content:space-between;"><span style="color:var(--color-ink-tertiary);">Solar Charger</span><span style="color:var(--color-success);font-weight:600;">+4.2V Active</span></div>
                <div style="background:var(--color-surface-2);padding:8px 10px;border-radius:6px;font-size:10px;display:flex;justify-content:space-between;"><span style="color:var(--color-ink-tertiary);">IP68 Ingress</span><span style="color:var(--color-success);font-weight:600;">100% Sealed</span></div>
                <div style="background:var(--color-surface-2);padding:8px 10px;border-radius:6px;font-size:10px;display:flex;justify-content:space-between;"><span style="color:var(--color-ink-tertiary);">LoRaWAN Gateway</span><span style="color:var(--color-info);font-weight:600;">Connected (11.4 km)</span></div>
            </div></div>`
    }
];

// ---- NOW safe to define initApp (all consts already declared above) ----
function initApp() {
    injectNavigation();
    injectFooter();
    injectDemoModal();
    initInteractivity();
}

// Execute after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function injectNavigation() {
    const el = document.getElementById('bk-nav');
    if (el) el.innerHTML = NAV_HTML;
}

function injectFooter() {
    const el = document.getElementById('bk-footer');
    if (el) el.innerHTML = FOOTER_HTML;
}

function injectDemoModal() {
    if (!document.getElementById('demo-modal')) {
        document.body.insertAdjacentHTML('beforeend', DEMO_MODAL_HTML);
    }
}

function initInteractivity() {
    // Mobile Nav Toggle (class-based, no inline style conflicts)
    const menuBtn = document.querySelector('.nav-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
        navLinks.querySelectorAll('a').forEach(link =>
            link.addEventListener('click', () => navLinks.classList.remove('mobile-open'))
        );
    }

    // Accordion
    document.querySelectorAll('.accordion-trigger').forEach(trigger =>
        trigger.addEventListener('click', () => trigger.parentElement.classList.toggle('open'))
    );

    // Scroll Reveal
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Demo simulator
    setupDemoSimulator();

    // PWA install
    setupPwaInstall();
}

// Demo Simulator
let demoInterval = null;
let currentDemoStep = 0;
let autoPauseTimeout = null;

function setupDemoSimulator() {
    const modal = document.getElementById('demo-modal');
    const closeBtn = document.getElementById('close-demo-modal');

    document.querySelectorAll('.open-demo-btn, a[href="#demo"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) { modal.classList.add('open'); startDemoLoop(); }
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => { modal.classList.remove('open'); stopDemoLoop(); });
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) { modal.classList.remove('open'); stopDemoLoop(); } });
}

function selectDemoStep(index) {
    stopDemoLoop();
    renderDemoStep(index);
    if (autoPauseTimeout) clearTimeout(autoPauseTimeout);
    autoPauseTimeout = setTimeout(startDemoLoop, 6000);
}

function startDemoLoop() {
    stopDemoLoop();
    renderDemoStep(currentDemoStep);
    demoInterval = setInterval(() => {
        currentDemoStep = (currentDemoStep + 1) % DEMO_STEPS.length;
        renderDemoStep(currentDemoStep);
    }, 3800);
}

function stopDemoLoop() {
    clearInterval(demoInterval); demoInterval = null;
    clearTimeout(autoPauseTimeout); autoPauseTimeout = null;
}

function renderDemoStep(index) {
    currentDemoStep = index;
    const step = DEMO_STEPS[index];
    const screen = document.getElementById('demo-screen-content');
    const badge = document.getElementById('demo-step-indicator');
    if (screen) {
        screen.style.opacity = '0';
        setTimeout(() => { screen.innerHTML = step.html; screen.style.opacity = '1'; }, 120);
    }
    if (badge) badge.innerText = `STEP ${index + 1} / ${DEMO_STEPS.length} — ${step.title}`;
    document.querySelectorAll('.phone-nav-item').forEach(el => el.classList.remove('active'));
    const tab = document.getElementById(step.tab);
    if (tab) tab.classList.add('active');
}

// PWA Install
let deferredPrompt;
function setupPwaInstall() {
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
    document.querySelectorAll('.pwa-install-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') deferredPrompt = null;
            } else {
                alert('To install: tap Share → Add to Home Screen (iOS) or use the browser Install option (Chrome/Android).');
            }
        });
    });
}
