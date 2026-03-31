/**
 * Skattefilerne - Main Application
 * Auto-renders all sections on page load.
 */

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        renderITDeepDive();
        initFloatingNav();
        initScrollProgress();
        initSectionAnimations();
    });
})();

/**
 * Floating navigation - tab switching + section scrolling
 */
function initFloatingNav() {
    var nav = document.getElementById('floating-nav');
    var navItems = nav.querySelectorAll('.fnav-item');
    var deepDiveSection = document.getElementById('it-deepdive-section');

    // Click handler for each nav item
    navItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            var tabId = this.dataset.tab;
            var sectionId = this.dataset.section;

            // Update active state in floating nav
            navItems.forEach(function (n) { n.classList.remove('active'); });
            this.classList.add('active');

            // If it has a tab, switch the tab in the deep-dive section
            if (tabId && deepDiveSection) {
                var tabs = deepDiveSection.querySelectorAll('.spending-tab');
                var contents = deepDiveSection.querySelectorAll('.spending-tab-content');

                tabs.forEach(function (t) { t.classList.remove('active'); });
                contents.forEach(function (c) { c.classList.remove('active'); });

                // Activate matching tab button
                var matchingTab = deepDiveSection.querySelector('.spending-tab[data-tab="' + tabId + '"]');
                if (matchingTab) matchingTab.classList.add('active');

                // Activate matching content
                var matchingContent = deepDiveSection.querySelector('#tab-' + tabId);
                if (matchingContent) matchingContent.classList.add('active');
            }

            // Scroll to the section
            var targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Sync floating nav when user clicks the inline tabs directly
    if (deepDiveSection) {
        var inlineTabs = deepDiveSection.querySelectorAll('.spending-tab');
        inlineTabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var tabId = this.dataset.tab;
                navItems.forEach(function (n) {
                    if (n.dataset.tab === tabId) {
                        n.classList.add('active');
                    } else if (n.dataset.section === 'it-deepdive-section') {
                        n.classList.remove('active');
                    }
                });
            });
        });
    }

    // Show/hide nav based on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
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
