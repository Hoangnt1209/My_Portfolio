/* =========================================================================
   UI CONTROLS & INTERACTIONS
   Theme, Cursor, Filters, Modals, Toasts & Animations
   ========================================================================= */

// 1. Typewriter Effect
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function playTypewriter() {
    const typewriterText = document.getElementById('typewriter-text');
    if (!typewriterText) return;

    const phrases = window.typewriterPhrases || ["AI Engineer 🧠"];
    const currentPhrase = phrases[phraseIndex] || "";
    
    if (isDeleting) {
        typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30;
    } else {
        typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
    }

    setTimeout(playTypewriter, typingSpeed);
}

// 2. Avatar Swap & Dark/Light Mode
let isRealMain = true;

function swapAvatarImages() {
    const avatarFrame = document.getElementById('avatar-interactive-frame');
    const mainAvatarImg = document.getElementById('avatar-main');
    const miniAvatarImg = document.getElementById('avatar-mini');
    const avatarBadge = document.querySelector('.avatar-toggle-btn');
    const themeStatusPill = document.getElementById('theme-status-text');

    if (!mainAvatarImg || !miniAvatarImg) return;

    mainAvatarImg.style.opacity = '0';
    mainAvatarImg.style.transform = 'scale(0.95)';

    setTimeout(() => {
        const mainSrc = mainAvatarImg.src;
        const miniSrc = miniAvatarImg.src;
        mainAvatarImg.src = miniSrc;
        miniAvatarImg.src = mainSrc;

        isRealMain = !isRealMain;

        if (isRealMain) {
            document.documentElement.classList.add('dark');
            if (avatarFrame) avatarFrame.classList.remove('doraemon-mode');
            if (avatarBadge) avatarBadge.innerHTML = '✨ AI ENGINEER';
            if (themeStatusPill) themeStatusPill.textContent = 'PRODUCTION SYSTEM • DARK MODE';
        } else {
            document.documentElement.classList.remove('dark');
            if (avatarFrame) avatarFrame.classList.add('doraemon-mode');
            if (avatarBadge) avatarBadge.innerHTML = '🐱 DORAEMON MODE';
            if (themeStatusPill) themeStatusPill.textContent = 'SANDBOX ENVIRONMENT • LIGHT MODE';
        }

        mainAvatarImg.style.opacity = '1';
        mainAvatarImg.style.transform = 'scale(1)';
    }, 250);
}

function initTheme() {
    const avatarFrame = document.getElementById('avatar-interactive-frame');
    const mainAvatarImg = document.getElementById('avatar-main');
    const miniAvatarImg = document.getElementById('avatar-mini');
    const avatarBadge = document.querySelector('.avatar-toggle-btn');
    const themeStatusPill = document.getElementById('theme-status-text');

    document.documentElement.classList.add('dark');
    if (avatarFrame) avatarFrame.classList.remove('doraemon-mode');
    if (mainAvatarImg) mainAvatarImg.src = 'assets/avatar_real.png';
    if (miniAvatarImg) miniAvatarImg.src = 'assets/avatar_doraemon.png';
    if (avatarBadge) avatarBadge.innerHTML = '✨ AI ENGINEER';
    if (themeStatusPill) themeStatusPill.textContent = 'PRODUCTION SYSTEM • DARK MODE';
    isRealMain = true;

    if (miniAvatarImg) {
        miniAvatarImg.addEventListener('click', swapAvatarImages);
    }
}

// 3. Custom Crosshair Cursor
function initCustomCursor() {
    const cursorDot = document.getElementById('custom-cursor-dot');
    const cursorCircle = document.getElementById('custom-cursor-circle');
    if (!cursorDot || !cursorCircle) return;

    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        cursorCircle.style.left = e.clientX + 'px';
        cursorCircle.style.top = e.clientY + 'px';
    });

    const clickables = document.querySelectorAll('a, button, input, textarea, .project-card, .avatar-mini-container, #agent-dock');
    clickables.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget;
            if (target.classList.contains('hover:border-doraemon-red') || target.id === 'avatar-mini') {
                document.body.classList.add('cursor-danger');
            } else {
                document.body.classList.add('cursor-hover');
            }
        });
        item.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover', 'cursor-danger');
        });
    });
}

// 4. Bento Project Category Filtering
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = ['all', 'nlp', 'cv', 'mlops'];

    buttons.forEach(btn => {
        const element = document.getElementById(`filter-btn-${btn}`);
        if (!element) return;
        if (btn === category) {
            element.className = "px-4 py-2 rounded-xl bg-gradient-to-r from-doraemon-blue to-sky-600 text-white font-bold text-xs tracking-wider shadow-[0_4px_15px_rgba(0,145,216,0.35)] border border-sky-400/40 cursor-pointer transition-all duration-300 flex items-center gap-1.5";
        } else {
            element.className = "px-4 py-2 rounded-xl bg-transparent hover:bg-white/5 text-slate-400 hover:text-white border border-transparent hover:border-white/10 cursor-pointer transition-all duration-300 text-xs font-semibold tracking-wider flex items-center gap-1.5";
        }
    });

    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// 5. Project Detail Modal
function openProjectModal(id) {
    const data = (window.projectsData && window.projectsData[id]);
    if (!data) return;

    const projectModal = document.getElementById('project-modal');
    const modalContainer = document.getElementById('modal-container');
    if (!projectModal || !modalContainer) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc-full').textContent = data.detail;
    document.getElementById('modal-team').textContent = data.team;
    document.getElementById('modal-type').textContent = data.type;
    document.getElementById('modal-highlights').textContent = data.highlights;

    const visualBox = document.getElementById('modal-visual');
    const patternBox = document.getElementById('modal-visual-pattern');
    const glowBox = document.getElementById('modal-visual-glow');
    const tagBox = document.getElementById('modal-domain-badge') || document.getElementById('modal-visual-tag');
    const imgEl = document.getElementById('modal-visual-img');
    const galleryContainer = document.getElementById('modal-gallery-container');
    const repoLinkEl = document.getElementById('modal-repo-link');
    const liveLinkEl = document.getElementById('modal-live-link');
    const routingEl = document.getElementById('modal-routing');

    if (routingEl) {
        routingEl.textContent = data.routing || (data.liveUrl ? data.liveUrl.replace(/^https?:\/\//, '') : "portfolio.hoang.ai");
        routingEl.href = data.liveUrl || "#";
    }

    if (liveLinkEl) {
        if (data.liveUrl) {
            liveLinkEl.href = data.liveUrl;
            liveLinkEl.style.display = 'inline-flex';
        } else {
            liveLinkEl.style.display = 'none';
        }
    }

    if (repoLinkEl) {
        repoLinkEl.href = data.githubUrl || "https://github.com/Hoangnt1209";
    }

    if (visualBox) {
        visualBox.className = "h-64 sm:h-72 w-full rounded-2xl border border-white/10 bg-slate-950 flex items-center justify-center overflow-hidden relative select-none p-2 shadow-2xl";
    }

    if (data.image && imgEl) {
        imgEl.src = data.image;
        imgEl.className = "w-full h-full max-h-64 object-contain rounded-xl transition-all duration-300";
        imgEl.classList.remove('hidden');
        if (patternBox) patternBox.classList.add('hidden');
        if (glowBox) glowBox.classList.add('hidden');
    } else {
        if (imgEl) imgEl.classList.add('hidden');
        if (patternBox) {
            patternBox.className = `absolute inset-0 opacity-20 bg-[radial-gradient(${data.glowColor}_1px,transparent_1px)] [background-size:16px_16px]`;
            patternBox.classList.remove('hidden');
        }
        if (glowBox) {
            glowBox.style.backgroundColor = data.glowColor;
            glowBox.classList.remove('hidden');
        }
    }

    if (galleryContainer) {
        galleryContainer.innerHTML = '';
        if (data.gallery && data.gallery.length > 0) {
            galleryContainer.classList.remove('hidden');
            data.gallery.forEach((item, idx) => {
                const thumb = document.createElement('button');
                thumb.className = `modal-gallery-thumb px-3 py-1.5 rounded-lg text-[10px] font-semibold bg-slate-900 border text-slate-300 flex items-center space-x-1.5 whitespace-nowrap cursor-pointer transition-all ${idx === 0 ? 'active border-doraemon-blue text-white' : ''}`;
                thumb.innerHTML = `<span>📷 ${item.label}</span>`;
                thumb.onclick = (e) => {
                    e.stopPropagation();
                    if (imgEl) {
                        imgEl.style.opacity = '0';
                        setTimeout(() => {
                            imgEl.src = item.src;
                            imgEl.style.opacity = '1';
                        }, 150);
                    }
                    galleryContainer.querySelectorAll('.modal-gallery-thumb').forEach(t => t.classList.remove('active', 'border-doraemon-blue', 'text-white'));
                    thumb.classList.add('active', 'border-doraemon-blue', 'text-white');
                };
                galleryContainer.appendChild(thumb);
            });
        } else {
            galleryContainer.classList.add('hidden');
        }
    }

    if (tagBox) {
        let tagColorClass = "text-sky-400 border-sky-400/30 bg-sky-950/40";
        if (data.category === "cv") tagColorClass = "text-rose-400 border-rose-400/30 bg-rose-950/40";
        if (data.category === "mlops") tagColorClass = "text-amber-400 border-amber-400/30 bg-amber-950/40";
        if (data.id === 5) tagColorClass = "text-emerald-400 border-emerald-400/30 bg-emerald-950/40";
        tagBox.className = `font-heading text-[11px] ${tagColorClass} border px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center`;
        tagBox.textContent = data.type.toUpperCase();
    }

    const stackContainer = document.getElementById('modal-stack-pills');
    stackContainer.innerHTML = '';
    data.stack.forEach(tech => {
        const span = document.createElement('span');
        span.className = "font-medium text-xs bg-slate-900/60 dark:bg-slate-900 border border-slate-700/60 dark:border-slate-800 px-3.5 py-1.5 rounded-xl text-slate-200";
        span.textContent = tech;
        stackContainer.appendChild(span);
    });

    projectModal.classList.remove('hidden');
    projectModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');

    setTimeout(() => {
        modalContainer.classList.remove('translate-y-24', 'opacity-0');
        modalContainer.classList.add('translate-y-0', 'opacity-100');
    }, 50);
}

function closeProjectModal() {
    const projectModal = document.getElementById('project-modal');
    const modalContainer = document.getElementById('modal-container');
    if (!projectModal || !modalContainer) return;

    modalContainer.classList.remove('translate-y-0', 'opacity-100');
    modalContainer.classList.add('translate-y-24', 'opacity-0');

    setTimeout(() => {
        projectModal.classList.remove('flex');
        projectModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }, 400);
}

// 6. Dynamic Notification Toast System
function showToast(message, type = 'info') {
    const container = document.getElementById('cyber-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `cyber-toast ${type}`;

    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'warning') iconName = 'alert-triangle';
    if (type === 'error') iconName = 'x-circle';

    const titles = {
        success: "SYSTEM NOTIFICATION • SUCCESS",
        info: "SYSTEM NOTIFICATION • INFO",
        warning: "SYSTEM NOTIFICATION • NOTICE",
        error: "SYSTEM NOTIFICATION • ERROR"
    };

    const titleText = titles[type] || titles['info'];

    toast.innerHTML = `
        <div class="cyber-toast-icon-wrapper">
            <i data-lucide="${iconName}" class="w-5 h-5"></i>
        </div>
        <div class="cyber-toast-content">
            <div class="cyber-toast-title">${titleText}</div>
            <div class="cyber-toast-desc">${message}</div>
        </div>
    `;

    container.appendChild(toast);
    
    if (window.lucide) {
        lucide.createIcons();
    }

    setTimeout(() => toast.classList.add('show'), 50);

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// 7. Contact Form Submission
async function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>TRANSMITTING...</span>`;
    if (window.lucide) lucide.createIcons();

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        showToast("Transmission received! Nguyễn Thanh Hoàng will review your message shortly.", "success");
        form.reset();
    } catch (err) {
        showToast("Connection handshake failed. Please email nth120923@gmail.com directly.", "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        if (window.lucide) lucide.createIcons();
    }
}

// 8. Dynamic Counters
function initStatsCounter() {
    const counters = [
        { id: 'stat-projects', target: 5, suffix: ' Projects Shipped' },
        { id: 'stat-certs', target: 2, suffix: ' Certifications' }
    ];

    counters.forEach(counter => {
        const el = document.getElementById(counter.id);
        if (!el) return;
        
        let current = 0;
        const increment = Math.ceil(counter.target / 25);
        
        const updateCount = () => {
            current += increment;
            if (current >= counter.target) {
                el.textContent = counter.target + counter.suffix;
            } else {
                el.textContent = current + counter.suffix;
                setTimeout(updateCount, 40);
            }
        };
        updateCount();
    });
}

// Bind modal backdrop clicks & Escape
const projectModal = document.getElementById('project-modal');
if (projectModal) {
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeProjectModal();
    });
}
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
});

// Export globally
window.playTypewriter = playTypewriter;
window.swapAvatarImages = swapAvatarImages;
window.initTheme = initTheme;
window.initCustomCursor = initCustomCursor;
window.filterProjects = filterProjects;
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.showToast = showToast;
window.handleContactSubmit = handleContactSubmit;
window.initStatsCounter = initStatsCounter;
