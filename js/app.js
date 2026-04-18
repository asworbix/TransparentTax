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
        initReadingTimeline();
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
 * Reading timeline: clickable steps that switch tabs + track progress
 */
function initReadingTimeline() {
    var steps = document.querySelectorAll('.rt-step');
    var section = document.getElementById('it-deepdive-section');
    if (!steps.length || !section) return;

    var visited = new Set(['cases']); // first tab starts visited

    steps.forEach(function (step) {
        step.addEventListener('click', function () {
            var tabId = this.dataset.tab;
            if (!tabId) return;

            // Switch the tab
            var tabs = section.querySelectorAll('.spending-tab');
            var contents = section.querySelectorAll('.spending-tab-content');
            tabs.forEach(function (t) { t.classList.remove('active'); });
            contents.forEach(function (c) { c.classList.remove('active'); });

            var matchingTab = section.querySelector('.spending-tab[data-tab="' + tabId + '"]');
            if (matchingTab) matchingTab.classList.add('active');
            var matchingContent = section.querySelector('#tab-' + tabId);
            if (matchingContent) matchingContent.classList.add('active');

            // Update reading timeline state
            visited.add(tabId);
            updateTimelineState(steps, tabId, visited);

            // Sync floating nav
            var navItems = document.querySelectorAll('.fnav-item');
            navItems.forEach(function (n) {
                if (n.dataset.tab === tabId) {
                    n.classList.add('active');
                } else if (n.dataset.section === 'it-deepdive-section') {
                    n.classList.remove('active');
                }
            });

            // Scroll to section
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Also sync when inline tabs or floating nav are clicked
    var inlineTabs = section.querySelectorAll('.spending-tab');
    inlineTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var tabId = this.dataset.tab;
            visited.add(tabId);
            updateTimelineState(steps, tabId, visited);
        });
    });

    var navItems = document.querySelectorAll('.fnav-item');
    navItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var tabId = this.dataset.tab;
            if (tabId) {
                visited.add(tabId);
                updateTimelineState(steps, tabId, visited);
            }
        });
    });
}

function updateTimelineState(steps, activeTab, visited) {
    steps.forEach(function (step) {
        var tabId = step.dataset.tab;
        step.classList.remove('rt-active', 'rt-completed');
        if (tabId === activeTab) {
            step.classList.add('rt-active');
        } else if (visited.has(tabId)) {
            step.classList.add('rt-completed');
        }
    });
}

/**
 * Animate sections and elements as they scroll into view
 */
function initSectionAnimations() {
    // Animate main cards
    var cards = document.querySelectorAll('.card');
    var cardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    cards.forEach(function (card) { cardObserver.observe(card); });

    // Animate case cards on scroll
    initCaseCardAnimations();

    // Observe tab switches to trigger inner animations
    var tabObserver = new MutationObserver(function () {
        animateVisibleElements();
    });

    var tabContents = document.querySelectorAll('.spending-tab-content');
    tabContents.forEach(function (tc) {
        tabObserver.observe(tc, { attributes: true, attributeFilter: ['class'] });
    });

    // Initial trigger
    setTimeout(animateVisibleElements, 300);
}

function initCaseCardAnimations() {
    var caseCards = document.querySelectorAll('.case-card');
    var caseObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('case-visible');
                caseObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    caseCards.forEach(function (card) { caseObserver.observe(card); });
}

function animateVisibleElements() {
    var activeTab = document.querySelector('.spending-tab-content.active');
    if (!activeTab) return;

    // Stat cards
    var statCards = activeTab.querySelectorAll('.kh-stat-card');
    var statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('stat-visible');
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    statCards.forEach(function (s) { statObserver.observe(s); });

    // Content cards (scandal, consultant, solution, rc, norway, savings)
    var els = activeTab.querySelectorAll(
        '.scandal-consultant-card, .consultant-card, .solution-card, .rc-card, ' +
        '.norway-diff-card, .norway-success-card, .savings-card, .sb-row, .norway-hero, ' +
        '.orbix-pillar-card, .orbix-step, .case-card'
    );
    var elObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('el-visible');
                if (entry.target.classList.contains('case-card')) {
                    entry.target.classList.add('case-visible');
                }
                elObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    els.forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i * 0.04, 0.4) + 's';
        elObserver.observe(el);
    });
}
