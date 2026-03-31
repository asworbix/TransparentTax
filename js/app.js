/**
 * Skattefilerne - Main Application
 * Auto-renders all sections on page load.
 */

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        renderITDeepDive();
        renderPublicSpending();
        initFloatingNav();
        initScrollProgress();
        initSectionAnimations();
    });
})();

/**
 * Floating navigation - highlights active section and scrolls to section on click
 */
function initFloatingNav() {
    const nav = document.getElementById('floating-nav');
    const navItems = nav.querySelectorAll('.fnav-item');
    const sections = document.querySelectorAll('section[id]');

    // Scroll spy - highlight active section
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navItems.forEach(function (item) { item.classList.remove('active'); });
                const active = nav.querySelector('[data-section="' + entry.target.id + '"]');
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.15, rootMargin: '-80px 0px -40% 0px' });

    sections.forEach(function (section) { observer.observe(section); });

    // Show/hide nav based on scroll
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
        var scrollY = window.scrollY;
        if (scrollY > 300) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
        lastScroll = scrollY;
    }, { passive: true });
}

/**
 * Scroll progress bar at top of page
 */
function initScrollProgress() {
    var bar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = pct + '%';
    }, { passive: true });
}

/**
 * Animate sections as they scroll into view
 */
function initSectionAnimations() {
    var cards = document.querySelectorAll('.card');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    cards.forEach(function (card) { observer.observe(card); });
}
