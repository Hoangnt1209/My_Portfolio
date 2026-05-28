/* FUTURISTIC CYBER-DORAEMON PORTFOLIO - CONTROLLER SYSTEM */

// English-only Mode Tracking
const currentLang = 'en';

// 1. Projects detailed dataset (Flat English descriptions)
const projectsData = {
    1: {
        title: "Intelligent Multi-Source RAG Assistant",
        description: "Enterprise-grade QA chatbot powered by custom LLM retrieval, semantic document chunking, and FAISS indexing.",
        detail: "Engineered a production-ready NLP solution to automate query processing over unstructured PDFs and spreadsheets. Implemented custom semantic chunking strategies and semantic rerankers to improve document retrieval context window precision, reducing system output hallucination rates to below 1.5%.",
        stack: ["LangChain", "HuggingFace", "FAISS", "LLaMA API"],
        team: "Solo Developer",
        type: "Generative AI / RAG",
        highlights: "Supports hot LLM swapping; built-in guardrails for verified production safety.",
        category: "nlp",
        bgGradient: "from-doraemon-blue/20 to-slate-950",
        glowColor: "rgba(0, 145, 216, 0.4)",
        borderColor: "rgba(0, 145, 216, 0.3)"
    },
    2: {
        title: "Real-time Pastry Quality & Detection Vision Engine",
        description: "Edge computer vision model optimized using ONNX and deployed on Triton Inference Server with sub-10ms latency.",
        detail: "Designed and built an end-to-end edge vision application for automated bakery retail. Curated a custom raw food dataset, trained YOLOv8 object detection weights, exported the architecture to compiled ONNX runtimes, and successfully deployed to Triton Server for hardware-accelerated processing.",
        stack: ["YOLOv8", "ONNX Runtime", "Triton Server", "FastAPI"],
        team: "Research Lead (2 members)",
        type: "Computer Vision",
        highlights: "ONNX optimized execution layer supporting parallel multi-camera RTSP feeds.",
        category: "cv",
        bgGradient: "from-doraemon-red/20 to-slate-950",
        glowColor: "rgba(255, 75, 75, 0.4)",
        borderColor: "rgba(255, 75, 75, 0.3)"
    },
    3: {
        title: "Enterprise MLOps Video Anomaly Detection Pipeline",
        description: "Fully reproducible deep learning pipeline featuring MLflow tracking, lakeFS data versioning, and Docker deployment.",
        detail: "Constructed an integrated machine learning operational lifecycle (MLOps) to detect anomalies in smart city CCTV feeds. Leveraged lakeFS to handle dataset version control at scale and tracked parallel training runs with MLflow before exporting deployable Docker service containers.",
        stack: ["PyTorch", "MLflow", "lakeFS", "Docker"],
        team: "MLOps Engineer (3 members)",
        type: "Deep Learning / MLOps",
        highlights: "Reproducible dataset commits with integrated training pipeline telemetry tracking.",
        category: "mlops",
        bgGradient: "from-doraemon-gold/20 to-slate-950",
        glowColor: "rgba(255, 215, 0, 0.4)",
        borderColor: "rgba(255, 215, 0, 0.3)"
    },
    4: {
        title: "Smart CV Matcher & Semantic Profile Scorer",
        description: "Automated candidate ranking system combining sentence embedding vectors and Qdrant DB for semantic matching.",
        detail: "Built an HR search engine that maps resumes into semantic vector spaces. Leveraged Qdrant DB for index storage and performed cosine similarity scoring against candidate profiles to instantly rank candidate compatibility, cutting applicant screening overhead by 80%.",
        stack: ["LangChain", "Qdrant Vector DB", "FastAPI", "ReactJS"],
        team: "Core Developer (5 members)",
        type: "Full-Stack AI / Vector Search",
        highlights: "Semantic matchmaking query analyzer with high-throughput profile parsing streams.",
        category: "nlp",
        bgGradient: "from-doraemon-blue/20 to-slate-950",
        glowColor: "rgba(0, 145, 216, 0.4)",
        borderColor: "rgba(0, 145, 216, 0.3)"
    }
};

// 2. Futuristic Typewriter Phrases (English)
const typewriterText = document.getElementById('typewriter-text');
const typewriterPhrases = [
    "Passionate AI Engineer 🧠",
    "RAG & Multi-Agent Specialist 🔮",
    "Deep Learning & MLOps Practitioner 🚀",
    "Computer Science Master's Candidate 🎓"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function playTypewriter() {
    const currentPhrase = typewriterPhrases[phraseIndex] || "";
    
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
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
        typingSpeed = 400; // Pause before next
    }

    setTimeout(playTypewriter, typingSpeed);
}

// 3. Avatar Image Swap + Theme Toggle (click mini = swap images & toggle dark/light)
const avatarFrame = document.getElementById('avatar-interactive-frame');
const mainAvatarImg = document.getElementById('avatar-main');
const miniAvatarImg = document.getElementById('avatar-mini');
const avatarBadge = document.querySelector('.avatar-toggle-btn');
const themeStatusPill = document.getElementById('theme-status-text');

// Default: avatar_real = main (AI Engineer dark mode), avatar_doraemon = mini
let isRealMain = true;

function swapAvatarImages() {
    if (!mainAvatarImg || !miniAvatarImg) return;

    // Fade out main image
    mainAvatarImg.style.opacity = '0';
    mainAvatarImg.style.transform = 'scale(0.95)';

    setTimeout(() => {
        // Swap image sources
        const mainSrc = mainAvatarImg.src;
        const miniSrc = miniAvatarImg.src;
        mainAvatarImg.src = miniSrc;
        miniAvatarImg.src = mainSrc;

        isRealMain = !isRealMain;

        if (isRealMain) {
            // AI Engineer mode → dark theme
            document.documentElement.classList.add('dark');
            avatarFrame.classList.remove('doraemon-mode');
            if (avatarBadge) avatarBadge.innerHTML = '✨ AI ENGINEER';
            if (themeStatusPill) themeStatusPill.textContent = 'PRODUCTION SYSTEM // CYBER DARK';
        } else {
            // Doraemon mode → light blue theme
            document.documentElement.classList.remove('dark');
            avatarFrame.classList.add('doraemon-mode');
            if (avatarBadge) avatarBadge.innerHTML = '🐱 DORAEMON MODE';
            if (themeStatusPill) themeStatusPill.textContent = 'SANDBOX MODE // CYBER LIGHT';
        }

        // Fade back in
        mainAvatarImg.style.opacity = '1';
        mainAvatarImg.style.transform = 'scale(1)';
    }, 250);
}

if (miniAvatarImg) {
    miniAvatarImg.addEventListener('click', swapAvatarImages);
}

function initTheme() {
    // Default: AI Engineer = dark mode, real avatar is main
    document.documentElement.classList.add('dark');
    if (avatarFrame) avatarFrame.classList.remove('doraemon-mode');
    if (mainAvatarImg) mainAvatarImg.src = 'assets/avatar_real.png';
    if (miniAvatarImg) miniAvatarImg.src = 'assets/avatar_doraemon.png';
    if (avatarBadge) avatarBadge.innerHTML = '✨ AI ENGINEER';
    if (themeStatusPill) themeStatusPill.textContent = 'PRODUCTION SYSTEM // CYBER DARK';
    isRealMain = true;
}

// 4. Smooth Custom Crosshair Cursor
const cursorDot = document.getElementById('custom-cursor-dot');
const cursorCircle = document.getElementById('custom-cursor-circle');

if (cursorDot && cursorCircle) {
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = posX + 'px';
        cursorDot.style.top = posY + 'px';

        cursorCircle.style.left = posX + 'px';
        cursorCircle.style.top = posY + 'px';
    });

    function bindCursorTriggers() {
        const clickables = document.querySelectorAll('a, button, input, textarea, .project-card, .avatar-mini-container');
        clickables.forEach(item => {
            item.removeEventListener('mouseenter', addHoverClass);
            item.removeEventListener('mouseleave', removeHoverClass);
            
            item.addEventListener('mouseenter', addHoverClass);
            item.addEventListener('mouseleave', removeHoverClass);
        });
    }

    function addHoverClass(e) {
        const target = e.currentTarget;
        if (target.classList.contains('hover:border-doraemon-red/40') || target.classList.contains('hover:border-doraemon-red') || target.id === 'avatar-mini') {
            document.body.classList.add('cursor-danger');
        } else {
            document.body.classList.add('cursor-hover');
        }
    }

    function removeHoverClass() {
        document.body.classList.remove('cursor-hover', 'cursor-danger');
    }

    bindCursorTriggers();
}

// 5. Bento Project Filters
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = ['all', 'nlp', 'cv', 'mlops'];

    buttons.forEach(btn => {
        const element = document.getElementById(`filter-btn-${btn}`);
        if (!element) return;
        if (btn === category) {
            element.className = "px-4 py-2 rounded-xl bg-doraemon-blue text-white shadow-md cursor-pointer transition-all duration-300 font-semibold";
        } else {
            element.className = "px-4 py-2 rounded-xl bg-slate-900/40 text-slate-400 dark:text-slate-400 border border-white/5 dark:border-white/5 hover:border-doraemon-blue/40 cursor-pointer transition-all duration-300";
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

// 6. Project Modal Controls
const projectModal = document.getElementById('project-modal');
const modalContainer = document.getElementById('modal-container');

function openProjectModal(id) {
    const data = projectsData[id];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc-full').textContent = data.detail;
    document.getElementById('modal-team').textContent = data.team;
    document.getElementById('modal-type').textContent = data.type;
    document.getElementById('modal-highlights').textContent = data.highlights;

    const visualBox = document.getElementById('modal-visual');
    const patternBox = document.getElementById('modal-visual-pattern');
    const glowBox = document.getElementById('modal-visual-glow');
    const tagBox = document.getElementById('modal-visual-tag');

    visualBox.className = `h-56 w-full rounded-xl border border-white/5 bg-gradient-to-br ${data.bgGradient} flex items-center justify-center overflow-hidden relative select-none`;
    patternBox.className = `absolute inset-0 opacity-20 bg-[radial-gradient(${data.glowColor}_1px,transparent_1px)] [background-size:16px_16px]`;
    glowBox.style.backgroundColor = data.glowColor;
    
    let tagColorClass = "text-doraemon-blue border-doraemon-blue/30";
    if (data.category === "cv") tagColorClass = "text-doraemon-red border-doraemon-red/30";
    if (data.category === "mlops") tagColorClass = "text-doraemon-gold border-doraemon-gold/30";
    tagBox.className = `font-heading text-xs ${tagColorClass} border px-4 py-1.5 rounded-full bg-slate-950/80 relative z-10`;
    tagBox.textContent = data.type.toUpperCase();

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
    modalContainer.classList.remove('translate-y-0', 'opacity-100');
    modalContainer.classList.add('translate-y-24', 'opacity-0');

    setTimeout(() => {
        projectModal.classList.remove('flex');
        projectModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }, 400);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
});
if (projectModal) {
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeProjectModal();
    });
}

// 7. Dynamic Cyber-Toast Notification System
function showToast(message, type = 'info') {
    const container = document.getElementById('cyber-toast-container');
    if (!container) return;

    // Create Toast Item Node
    const toast = document.createElement('div');
    toast.className = `cyber-toast ${type}`;

    // Configure Icon depending on type
    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'warning') iconName = 'alert-triangle';
    if (type === 'error') iconName = 'x-circle';

    // English titles
    const titles = {
        success: "SYSTEM RESTORED // OK",
        info: "TRANSMISSION RECEIVED // INFO",
        warning: "PERMUTATION LIMIT // WARN",
        error: "ROUTING FAILURE // ERROR"
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
    
    // Load lucide icon for dynamic nodes
    if (window.lucide) {
        lucide.createIcons();
    }

    // Trigger Entrance Slide-up
    setTimeout(() => {
        toast.classList.add('show');
    }, 50);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
}

// Expose globally for inline events
window.showToast = showToast;

async function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Set loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>TRANSMITTING...</span>`;
    if (window.lucide) {
        lucide.createIcons();
    }
    
    try {
        const response = await fetch("https://formspree.io/f/xvzydazg", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            const name = document.getElementById('form-name').value;
            const successMsg = `Hello ${name}, your contact transmission has been routed successfully. Talk to you soon!`;
            
            showToast(successMsg, 'success');
            form.reset();
        } else {
            const result = await response.json();
            const errorMsg = result.errors ? result.errors.map(e => e.message).join(", ") : "Transmission routing failure.";
            showToast(errorMsg, 'error');
        }
    } catch (error) {
        const networkErrorMsg = "Connection link broken. Please verify network interfaces.";
        showToast(networkErrorMsg, 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

// 8. Intersection Observer for Scroll Reveals
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.id === 'about') {
                animateStatCounters();
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
});

// 9. Stat Counters
let statsAnimated = false;
function animateStatCounters() {
    if (statsAnimated) return;
    statsAnimated = true;

    // English Suffixes
    const counters = [
        { id: 'stat-years', target: 1, suffix: ' Year +' },
        { id: 'stat-projects', target: 4, suffix: ' Projects Shipped' },
        { id: 'stat-certs', target: 2, suffix: ' Certifications' }
    ];

    counters.forEach(counter => {
        const el = document.getElementById(counter.id);
        if (!el) return;
        
        let current = 0;
        const increment = Math.ceil(counter.target / 30);
        
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

// 10. Bootstrap
window.addEventListener('DOMContentLoaded', () => {
    // Set document base lang to English
    document.documentElement.lang = 'en';

    // Boot theme and typewriter
    initTheme();
    playTypewriter();
    
    if (window.lucide) {
        lucide.createIcons();
    }
    
    window.filterProjects = filterProjects;
    window.openProjectModal = openProjectModal;
    window.closeProjectModal = closeProjectModal;
    window.handleContactSubmit = handleContactSubmit;
});
