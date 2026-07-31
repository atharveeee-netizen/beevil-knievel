/**
 * Beevil Knievel — Commercial Shared Components
 * Injects Navbar, Footer, and scroll animations across the site.
 */

// HTML template for the shared navigation
const NAV_HTML = `
<div class="nav-inner">
    <a href="index.html" class="nav-logo">
        <div class="nav-logo-mark">BK</div>
        <div class="nav-logo-text">Beevil Knievel</div>
    </a>

    <ul class="nav-links">
        <li><a href="product.html" class="\${isPage('product')}">Product</a></li>
        <li><a href="store.html" class="\${isPage('store')}">Store</a></li>
        <li><a href="app.html" class="\${isPage('app')}">App Ecosystem</a></li>
        <li><a href="support.html" class="\${isPage('support')}">Support</a></li>
        <li><a href="about.html" class="\${isPage('about')}">About</a></li>
    </ul>

    <div class="nav-cta">
        <a href="store.html" class="btn btn-amber btn-sm">Buy Now</a>
        <button class="nav-menu-btn" aria-label="Toggle menu">
            <span></span>
        </button>
    </div>
</div>
`;

// HTML template for the shared footer
const FOOTER_HTML = `
<div class="container footer-grid">
    <div>
        <a href="index.html" class="nav-logo" style="margin-bottom: 24px;">
            <div class="nav-logo-mark">BK</div>
            <div class="nav-logo-text">Beevil Knievel</div>
        </a>
        <p class="footer-brand-desc">
            Industrial intelligence for modern beekeeping. Engineered to monitor health, predict swarms, and maximize apiary yields.
        </p>
    </div>

    <div class="footer-col">
        <h4>Product</h4>
        <a href="product.html">Hardware Overview</a>
        <a href="store.html">Pre-Order Store</a>
        <a href="accessories.html">Accessories</a>
        <a href="app.html">Mobile App</a>
    </div>

    <div class="footer-col">
        <h4>Resources</h4>
        <a href="download.html">Downloads</a>
        <a href="docs.html">Documentation</a>
        <a href="support.html">Help Center</a>
        <a href="support.html#warranty">Warranty & Returns</a>
    </div>

    <div class="footer-col">
        <h4>Company</h4>
        <a href="about.html">About Us</a>
        <a href="investors.html">Investors</a>
        <a href="research.html">Research</a>
        <a href="privacy.html">Privacy & Terms</a>
    </div>
</div>

<div class="container footer-bottom">
    <div>© 2026 Beevil Knievel Inc. All rights reserved.</div>
    <div style="display: flex; gap: 24px;">
        <a href="privacy.html" style="color: inherit; text-decoration: none;">Privacy</a>
        <a href="privacy.html#terms" style="color: inherit; text-decoration: none;">Terms</a>
        <a href="#" style="color: inherit; text-decoration: none;">Cookies</a>
    </div>
</div>
`;

// Helper to highlight active nav link
function isPage(keyword) {
    return window.location.pathname.includes(keyword) ? 'active' : '';
}

// Inject components on DOM load
document.addEventListener('DOMContentLoaded', () => {
    
    // Inject Custom Nav if element exists
    const navEl = document.getElementById('bk-nav');
    if (navEl) {
        navEl.innerHTML = NAV_HTML.replace(/\$\{isPage\('([^']+)'\)\}/g, (match, p1) => isPage(p1));
    }

    // Inject Custom Footer if element exists
    const footerEl = document.getElementById('bk-footer');
    if (footerEl) {
        footerEl.innerHTML = FOOTER_HTML;
    }

    // Mobile Menu Toggle Logic
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

    // Scroll Animations Initializer
    initScrollAnimations();
});

// IntersectionObserver for fade-in scroll animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to run animation only once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
}
