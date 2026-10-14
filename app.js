/* =========================================================================
   PORTFOLIO MAIN ENTRYPOINT & BOOTSTRAP
   Loads and initializes all modular subsystems:
   - js/data.js  : Portfolio data, links & project records
   - js/agent.js : Portfolio Copilot & brief generator
   - js/ui.js    : Themes, modals, animations & notifications
   ========================================================================= */

window.addEventListener('DOMContentLoaded', () => {
    // 1. Force base language
    document.documentElement.lang = 'en';

    // 2. Initialize UI modules
    if (typeof initTheme === 'function') initTheme();
    if (typeof playTypewriter === 'function') playTypewriter();
    if (typeof initCustomCursor === 'function') initCustomCursor();
    if (typeof initStatsCounter === 'function') initStatsCounter();

    // 3. Render Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 4. Preload Lucide icons after dynamic updates
    setTimeout(() => {
        if (window.lucide) lucide.createIcons();
    }, 300);

    // 5. Scroll Reveal Observer — triggers .active class on .reveal-on-scroll sections
    const revealSections = document.querySelectorAll('.reveal-on-scroll');
    if (revealSections.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        revealSections.forEach(section => revealObserver.observe(section));
    }

    console.log("⚡ Nguyen Thanh Hoang — AI Engineer Portfolio initialized successfully.");
});
