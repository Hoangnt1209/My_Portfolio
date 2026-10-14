/* =========================================================================
   PORTFOLIO AI AGENT GUIDE (hoang.agent)
   Interactive Floating AI Portfolio Guide with Smart Section Navigation
   and Step-by-Step Conversational Guided Tour (100% English)
   ========================================================================= */

// State
let isAgentChatOpen = false;
let isBotResponding = false;
let activeTourStep = 0; // 0: no active tour, 1-5: active step

// =========================================================================
// 1. CENTRAL SUGGESTED PROMPTS DATA STRUCTURE
// =========================================================================
const SUGGESTED_PROMPTS = [
    {
        id: "take-tour",
        label: "Take the tour",
        prompt: "Take the guided portfolio tour",
        icon: "🗺️",
        action: { type: "start_tour" }
    },
    {
        id: "ai-agent-projects",
        label: "Show me my AI Agent projects",
        prompt: "Show me the AI Agent projects in this portfolio.",
        icon: "🚀",
        action: { type: "navigate_to_section", target: "project-vietstock" }
    },
    {
        id: "pastry-checkout",
        label: "Bakery Self-Checkout AI",
        prompt: "Tell me about the Automated Bakery Self-Checkout & Pastry Detection system.",
        icon: "🥐",
        action: { type: "navigate_to_section", target: "projects" }
    },
    {
        id: "cv-matcher",
        label: "Smart CV Matcher AI",
        prompt: "Tell me about the Smart CV Matcher & Semantic Profile Scorer.",
        icon: "📄",
        action: { type: "navigate_to_section", target: "projects" }
    },
    {
        id: "what-has-he-built",
        label: "What has he built?",
        prompt: "What has Hoang built?",
        icon: "⭐",
        action: { type: "navigate_to_section", target: "projects" }
    },
    {
        id: "best-rag",
        label: "Best RAG project",
        prompt: "Tell me about his best RAG project.",
        icon: "🧠",
        action: { type: "navigate_to_section", target: "projects" }
    },
    {
        id: "research",
        label: "Show me research",
        prompt: "Show me research and publications.",
        icon: "📚",
        action: { type: "navigate_to_section", target: "credentials" }
    },
    {
        id: "experience",
        label: "View my experience",
        prompt: "View work experience and background.",
        icon: "💼",
        action: { type: "navigate_to_section", target: "experience" }
    },
    {
        id: "contact",
        label: "How do I contact him?",
        prompt: "How can I contact Hoang?",
        icon: "📬",
        action: { type: "navigate_to_section", target: "contact" }
    }
];

// =========================================================================
// 2. GUIDED PORTFOLIO TOUR DATA (5 Steps in English)
// =========================================================================
const TOUR_STEPS = [
    {
        id: "about",
        step: 1,
        total: 5,
        title: "About Nguyen Thanh Hoang",
        target: "about",
        summary: "Hoang is an Artificial Intelligence Engineer with <strong>1 year of practical experience</strong> building production-grade machine learning solutions, custom RAG architectures, and Multi-Agent frameworks. Currently pursuing a Master of Science in Computer Science specializing in AI at FPT School of Business & Technology (FSB)."
    },
    {
        id: "experience",
        step: 2,
        total: 5,
        title: "Work Experience & Background",
        target: "experience",
        summary: "Hoang brings <strong>1 year of hands-on AI engineering experience</strong>: orchestrating state-graph Multi-Agent systems with LangGraph, implementing production-ready vector retrieval with FAISS/Pinecone, and serving localized models via FastAPI."
    },
    {
        id: "projects",
        step: 3,
        total: 5,
        title: "Featured Production Projects",
        target: "projects",
        summary: "Key highlights include <strong>VietStock AI</strong> (an autonomous financial advisory agent with deterministic indicator engine and real-time SSE streaming), <strong>Automated Bakery Self-Checkout</strong> (scraped 70,000+ images with AutoCrawler, hand-labeled via LabelImg, and trained YOLOv6/v8 with 70%–80% accuracy), and <strong>Smart CV Matcher</strong> (dense CV/JD embeddings in QdrantDB + BM25 hybrid search for candidate & job matching)."
    },
    {
        id: "skills",
        step: 4,
        total: 5,
        title: "Technical Expertise & Core Stack",
        target: "skills",
        summary: "Specialized in <strong>Python (FastAPI, PyTorch), LangChain, LangGraph, Qdrant, Triton Inference Server, YOLOv6/v8/v11, MLflow, Docker</strong>, and modern frontend tools like Next.js and Tailwind CSS."
    },
    {
        id: "contact",
        step: 5,
        total: 5,
        title: "Get in Touch & PDF Resume",
        target: "contact",
        summary: "Ready to collaborate! You can reach Hoang directly via phone at <strong>+84 989 068 343</strong>, email at <strong>nth120923@gmail.com</strong>, LinkedIn, or print/download his PDF resume instantly."
    }
];

// =========================================================================
// 3. ELEMENT HELPERS
// =========================================================================
function getAgentElements() {
    return {
        modal: document.getElementById('agent-chat-modal'),
        launcher: document.getElementById('agent-launcher-wrapper'),
        messages: document.getElementById('agent-chat-messages'),
        input: document.getElementById('agent-chat-input'),
        pills: document.getElementById('agent-suggestion-pills')
    };
}

// =========================================================================
// 4. RENDERING INITIAL WELCOME & SUGGESTIONS
// =========================================================================
function renderWelcomeCard() {
    const topPrompts = SUGGESTED_PROMPTS.slice(0, 6);
    return `
        <div class="space-y-3">
            <!-- B. INTRODUCTION -->
            <div class="p-3 rounded-xl bg-slate-900/90 border border-doraemon-blue/20 shadow-inner">
                <p class="text-xs text-slate-300 leading-relaxed">
                    I'm Hoang's Portfolio Guide. Ask me about his work and I'll help you explore his projects, technical decisions, and experience — or take the guided tour.
                </p>
            </div>
            
            <!-- C. SUGGESTED ACTION CHIPS -->
            <div>
                <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>✨ Suggested Prompts:</span>
                </div>
                <div class="grid grid-cols-1 gap-1.5" id="welcome-prompt-list">
                    ${topPrompts.map(item => `
                        <button 
                            type="button" 
                            onclick="handleSuggestedPrompt('${item.id}')" 
                            class="text-left px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-doraemon-blue/15 border border-white/10 hover:border-doraemon-blue/40 text-slate-200 hover:text-white transition-all text-xs font-medium flex items-center justify-between group cursor-pointer shadow-sm"
                        >
                            <span class="flex items-center gap-2 truncate">
                                <span>${item.icon}</span>
                                <span class="truncate">${item.label}</span>
                            </span>
                            <span class="text-[10px] text-doraemon-blue opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderBottomPills() {
    const { pills } = getAgentElements();
    if (!pills) return;
    pills.innerHTML = SUGGESTED_PROMPTS.map(item => `
        <button 
            type="button" 
            onclick="handleSuggestedPrompt('${item.id}')" 
            class="agent-chip-pill flex-shrink-0"
        >
            <span>${item.icon}</span>
            <span>${item.label}</span>
        </button>
    `).join('');
}

// =========================================================================
// 5. OPEN / CLOSE & INIT
// =========================================================================
function initAgentChat() {
    const { messages } = getAgentElements();
    if (!messages) return;
    if (messages.children.length === 0) {
        addBotMessage(renderWelcomeCard());
    }
    renderBottomPills();
}

function openAgentChat() {
    const { modal, launcher, input } = getAgentElements();
    if (!modal) return;

    modal.classList.remove('hidden');
    void modal.offsetWidth; // Force reflow
    modal.classList.add('active');
    isAgentChatOpen = true;

    if (launcher) {
        launcher.style.display = 'none';
    }

    initAgentChat();

    setTimeout(() => {
        if (input) input.focus();
    }, 200);
}

function closeAgentChat() {
    const { modal, launcher } = getAgentElements();
    if (!modal) return;

    modal.classList.remove('active');
    isAgentChatOpen = false;

    setTimeout(() => {
        if (!isAgentChatOpen) {
            modal.classList.add('hidden');
        }
    }, 280);

    if (launcher) {
        launcher.style.display = 'block';
        launcher.style.opacity = '1';
        launcher.style.pointerEvents = 'auto';
        launcher.style.transform = 'scale(1)';
    }
}

function clearAgentChat() {
    const { messages } = getAgentElements();
    if (!messages) return;
    messages.innerHTML = '';
    activeTourStep = 0;
    addBotMessage(renderWelcomeCard());
}

function scrollChatToBottom() {
    const { messages } = getAgentElements();
    if (messages) {
        messages.scrollTop = messages.scrollHeight;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// =========================================================================
// 6. SMART NAVIGATION & HIGHLIGHT MECHANISM
// =========================================================================
function navigateToSection(targetId, shouldHighlight = true) {
    if (!targetId) return false;
    const el = document.getElementById(targetId);
    if (!el) {
        console.warn(`[Agent Guide] Target #${targetId} not found.`);
        return false;
    }

    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });

    if (shouldHighlight) {
        el.classList.add('highlight-section-glow');
        setTimeout(() => {
            el.classList.remove('highlight-section-glow');
        }, 3000);
    }

    return true;
}

// =========================================================================
// 7. MESSAGE FEED RENDERING
// =========================================================================
function addUserMessage(text) {
    const { messages } = getAgentElements();
    if (!messages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = 'flex justify-end';
    msgDiv.innerHTML = `
        <div class="chat-bubble-user max-w-[85%] px-3.5 py-2.5 text-xs font-medium">
            ${escapeHtml(text)}
        </div>
    `;
    messages.appendChild(msgDiv);
    scrollChatToBottom();
}

function addBotMessage(htmlContent) {
    const { messages } = getAgentElements();
    if (!messages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = 'flex items-start space-x-2.5';
    msgDiv.innerHTML = `
        <div class="w-7 h-7 rounded-xl bg-doraemon-blue/20 border border-doraemon-blue/30 flex items-center justify-center text-doraemon-blue flex-shrink-0 mt-0.5 shadow-sm">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 01-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L4.2 15.3"/>
            </svg>
        </div>
        <div class="chat-bubble-bot max-w-[88%] px-3.5 py-3 text-xs leading-relaxed">
            ${htmlContent}
        </div>
    `;
    messages.appendChild(msgDiv);
    scrollChatToBottom();
}

function showTypingIndicator() {
    const { messages } = getAgentElements();
    if (!messages) return null;
    const typingDiv = document.createElement('div');
    typingDiv.id = 'agent-typing-indicator';
    typingDiv.className = 'flex items-start space-x-2.5';
    typingDiv.innerHTML = `
        <div class="w-7 h-7 rounded-xl bg-doraemon-blue/20 border border-doraemon-blue/30 flex items-center justify-center text-doraemon-blue flex-shrink-0 mt-0.5">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 01-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L4.2 15.3"/>
            </svg>
        </div>
        <div class="chat-bubble-bot px-3.5 py-2.5 flex items-center space-x-1.5">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>
    `;
    messages.appendChild(typingDiv);
    scrollChatToBottom();
    return typingDiv;
}

function removeTypingIndicator() {
    const el = document.getElementById('agent-typing-indicator');
    if (el) el.remove();
}

// =========================================================================
// 8. GUIDED TOUR CONTROLLER
// =========================================================================
function startGuidedTour() {
    activeTourStep = 1;
    renderTourStep(activeTourStep);
}

function nextTourStep() {
    if (activeTourStep < TOUR_STEPS.length) {
        activeTourStep++;
        renderTourStep(activeTourStep);
    } else {
        finishTour();
    }
}

function prevTourStep() {
    if (activeTourStep > 1) {
        activeTourStep--;
        renderTourStep(activeTourStep);
    }
}

function skipTour() {
    activeTourStep = 0;
    addBotMessage(`
        <p>The tour has ended. Feel free to ask any question about Hoang's projects, experience, or research anytime!</p>
        <div class="mt-2">
            <button onclick="startGuidedTour()" class="chat-action-btn">
                <span>🔄 Restart Tour</span>
            </button>
        </div>
    `);
}

function finishTour() {
    activeTourStep = 0;
    addBotMessage(`
        <p>🎉 <strong>You have completed the guided portfolio tour!</strong></p>
        <p class="text-slate-300">Thank you for exploring. You can download Hoang's PDF resume or connect directly via Email and LinkedIn.</p>
        <div class="flex flex-wrap gap-2 mt-2">
            <button onclick="window.print()" class="chat-action-btn">
                <span>🖨️ Print / Save PDF Resume</span>
            </button>
            <button onclick="navigateToSection('contact', true)" class="chat-action-btn">
                <span>📬 Get in Touch</span>
            </button>
        </div>
    `);
}

function renderTourStep(stepNum) {
    const step = TOUR_STEPS.find(s => s.step === stepNum);
    if (!step) return;

    navigateToSection(step.target, true);

    const isFirst = stepNum === 1;
    const isLast = stepNum === step.total;

    const html = `
        <div class="space-y-2">
            <div class="flex items-center justify-between pb-1 border-b border-white/10">
                <span class="px-2 py-0.5 rounded-full bg-doraemon-blue/20 text-doraemon-blue font-mono font-bold text-[10px]">
                    STEP ${step.step}/${step.total}
                </span>
                <span class="font-heading font-bold text-white text-xs">${step.title}</span>
            </div>
            
            <p class="text-slate-200 text-xs">${step.summary}</p>

            <div class="flex items-center gap-2 pt-2">
                ${!isFirst ? `
                    <button onclick="prevTourStep()" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px] cursor-pointer transition-all">
                        ← Previous
                    </button>
                ` : ''}
                
                <button onclick="${isLast ? 'finishTour()' : 'nextTourStep()'}" class="flex-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-doraemon-blue to-sky-600 hover:from-doraemon-blue/90 hover:to-sky-500 text-white font-bold text-[10px] cursor-pointer shadow-md transition-all flex items-center justify-center gap-1">
                    <span>${isLast ? 'Finish Tour ✨' : 'Next Step →'}</span>
                </button>

                <button onclick="skipTour()" class="px-2 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-[10px] cursor-pointer transition-colors" title="Skip tour">
                    Skip
                </button>
            </div>
        </div>
    `;

    addBotMessage(html);
}

// =========================================================================
// 9. SUGGESTED PROMPT HANDLER
// =========================================================================
function handleSuggestedPrompt(promptId) {
    const item = SUGGESTED_PROMPTS.find(p => p.id === promptId);
    if (!item) return;

    if (!isAgentChatOpen) {
        openAgentChat();
    }

    addUserMessage(item.label);

    isBotResponding = true;
    showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();

        if (item.action.type === "start_tour") {
            startGuidedTour();
        } else if (item.action.type === "navigate_to_section") {
            const success = navigateToSection(item.action.target, true);
            const responseHtml = generateAgentResponse(item.prompt, item.action.target, success);
            addBotMessage(responseHtml);
        }

        isBotResponding = false;
    }, 350);
}

// =========================================================================
// 10. INTELLIGENT DETERMINISTIC KNOWLEDGE RESPONSES (100% English)
// =========================================================================
function generateAgentResponse(query, targetOverride = null, targetSuccess = true) {
    const q = query.toLowerCase().trim();
    let scrollTarget = targetOverride;
    let responseHtml = "";

    // 1. VietStock AI Query
    if (q.includes('vietstock') || q.includes('stock') || q.includes('fintech') || q.includes('hose') || q.includes('trading')) {
        scrollTarget = scrollTarget || 'project-vietstock';
        responseHtml = `
            <p>🚀 <strong>VietStock AI — Autonomous Financial AI Advisory Platform</strong></p>
            <p>Hoang's flagship financial analytics copilot built specifically for the Vietnamese stock market (HOSE, HNX, UPCOM).</p>
            <ul class="text-xs space-y-1 my-1.5">
                <li>• <strong>Deterministic Indicator Engine:</strong> Strict mathematical computation (RSI Wilder's, MACD, Bollinger Bands) using Pandas & NumPy for verifiable quantitative accuracy.</li>
                <li>• <strong>Autonomous Tool Calling:</strong> Automated function dispatching to retrieve real-time quotes, technical scans, and corporate disclosures.</li>
                <li>• <strong>Real-Time SSE Streaming:</strong> Server-Sent Events transmitting interactive Recharts visual payloads and recommendation badges directly before token generation.</li>
            </ul>
            <div class="flex flex-wrap gap-2 mt-2">
                <a href="https://vietstockassistant.netlify.app/" target="_blank" rel="noopener noreferrer" class="chat-action-btn bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30">
                    <span>🚀 Launch Live Demo App ↗</span>
                </a>
                <button onclick="navigateToSection('project-vietstock', true)" class="chat-action-btn">
                    <span>👇 View Project Card</span>
                </button>
            </div>
        `;
    }

    // 2. Automated Bakery Self-Checkout & Pastry Detection
    else if (q.includes('pastry') || q.includes('checkout') || q.includes('bakery') || q.includes('autocrawler') || q.includes('labelimg') || q.includes('yolov6') || q.includes('yolov8')) {
        scrollTarget = scrollTarget || 'projects';
        responseHtml = `
            <p>🥐 <strong>Automated Bakery Self-Checkout & Pastry Detection System:</strong></p>
            <p>An edge computer vision self-checkout platform that detects multiple pastry items on customer trays and calculates the bill in real time.</p>
            <ul class="text-xs space-y-1 my-1.5">
                <li>• <strong>Data Pipeline:</strong> Automated scraping of over <strong>70,000 images</strong> using <a href="https://github.com/yoongikim/autocrawler" target="_blank" class="text-doraemon-blue underline">AutoCrawler</a> across diverse bakery classes.</li>
                <li>• <strong>Manual Annotation:</strong> High-precision bounding box hand-labeling via <a href="https://github.com/HumanSignal/labelimg" target="_blank" class="text-doraemon-blue underline">LabelImg</a>.</li>
                <li>• <strong>Model Benchmarking:</strong> Trained and fine-tuned <strong>YOLOv6 & YOLOv8</strong> architectures, achieving <strong>70%–80% detection accuracy</strong> on multi-pastry trays.</li>
                <li>• <strong>Edge Deployment:</strong> Compiled ONNX Runtime deployed on <strong>Triton Inference Server</strong> with sub-10ms latency for instant checkout.</li>
            </ul>
            <div class="flex flex-wrap gap-2 mt-2">
                <button onclick="openProjectModal(2)" class="chat-action-btn bg-rose-500/20 text-rose-400 border-rose-500/40 hover:bg-rose-500/30">
                    <span>📷 Inspect Image Gallery & Specs</span>
                </button>
                <button onclick="navigateToSection('projects', true)" class="chat-action-btn">
                    <span>👇 Jump to Project Card</span>
                </button>
            </div>
        `;
    }

    // 3. RAG Projects
    else if (q.includes('rag') || q.includes('retrieval') || q.includes('faiss') || q.includes('qa')) {
        scrollTarget = scrollTarget || 'projects';
        responseHtml = `
            <p>🧠 <strong>Intelligent Multi-Source RAG Assistant:</strong></p>
            <p>Enterprise-grade Question Answering system operating over unstructured PDFs and spreadsheets. Implemented custom semantic chunking and neural rerankers for high-precision document retrieval context.</p>
            <p class="text-slate-400 text-[11px] mt-1">Stack: LangChain, HuggingFace, FAISS Vector DB, LLaMA API.</p>
            <div class="flex flex-wrap gap-2 mt-2">
                <button onclick="openProjectModal(1)" class="chat-action-btn">
                    <span>⚡ Analyze Specs</span>
                </button>
                <button onclick="navigateToSection('projects', true)" class="chat-action-btn">
                    <span>👇 View RAG Card</span>
                </button>
            </div>
        `;
    }

    // 4. Smart CV Matcher & Semantic Profile Scorer
    else if (q.includes('matcher') || q.includes('cv') || q.includes('resume') || q.includes('qdrant') || q.includes('bm25') || q.includes('jd') || (q.includes('hr') && !q.includes('christ')) || q.includes('candidate') || q.includes('screening')) {
        scrollTarget = scrollTarget || 'projects';
        responseHtml = `
            <p>📄 <strong>Smart CV Matcher & Semantic Profile Scorer:</strong></p>
            <p>A dual-sided AI recruitment matching engine empowering both HR hiring teams and job seekers:</p>
            <ul class="text-xs space-y-1 my-1.5">
                <li>• <strong>Dense Embeddings in QdrantDB:</strong> Generates and stores dense semantic vectors of candidate CVs alongside employer Job Descriptions (JDs) in Qdrant Vector Database.</li>
                <li>• <strong>Hybrid BM25 + Semantic Search:</strong> Combines lexical keyword precision (BM25) with dense vector semantic search to match critical skills while comprehending domain context.</li>
                <li>• <strong>For HR Recruiter Efficiency:</strong> Automates screening and candidate ranking across high applicant volumes, cutting manual review time by <strong>over 80%</strong>.</li>
                <li>• <strong>For Job Seekers:</strong> Allows applicants to evaluate resume compatibility against active JDs and uncover actionable skill recommendations.</li>
            </ul>
            <div class="flex flex-wrap gap-2 mt-2">
                <button onclick="openProjectModal(4)" class="chat-action-btn bg-sky-500/20 text-sky-400 border-sky-500/40 hover:bg-sky-500/30">
                    <span>⚡ Inspect CV Matcher Architecture</span>
                </button>
                <button onclick="navigateToSection('projects', true)" class="chat-action-btn">
                    <span>👇 Jump to Project Card</span>
                </button>
            </div>
        `;
    }

    // 4. Research & Publications
    else if (q.includes('research') || q.includes('publication') || q.includes('paper') || q.includes('journal') || q.includes('sign language') || q.includes('mediapipe')) {
        scrollTarget = scrollTarget || 'credentials';
        responseHtml = `
            <p>📚 <strong>Official Peer-Reviewed Publication:</strong></p>
            <p>Published in the <strong>Can Tho University Journal of Science (CTU Sci-Journal)</strong>:</p>
            <p class="italic text-slate-200 my-1">"Optimizing MediaPipe Landmark Models for Vietnamese Sign Language Recognition"</p>
            <p class="text-slate-400 text-[11px]">Proposed structural reduction algorithms for biomechanical hand landmark keypoints to secure high-speed frame processing and shrink deep model footprint weights.</p>
            <div class="flex flex-wrap gap-2 mt-2">
                <button onclick="navigateToSection('credentials', true)" class="chat-action-btn">
                    <span>👇 View Credentials & Publications</span>
                </button>
            </div>
        `;
    }

    // 5. Work Experience / 1 Year
    else if (q.includes('experience') || q.includes('career') || q.includes('work') || q.includes('job') || q.includes('timeline') || q.includes('year')) {
        scrollTarget = scrollTarget || 'experience';
        responseHtml = `
            <p>💼 <strong>1 Year of Practical AI Engineering Experience:</strong></p>
            <ul class="text-xs space-y-1.5 my-1.5">
                <li>• <strong>AI Engineer</strong> (Full-Time): Developing cooperative Multi-Agent frameworks using state-based graphs in LangGraph, implementing self-correcting prompt mechanisms, and deploying local LLM backends via FastAPI.</li>
                <li>• <strong>Independent AI Engineer & Intern</strong>: Implemented production RAG pipelines with FAISS and Pinecone, managed data versioning with lakeFS, and tracked parallel training runs with MLflow.</li>
            </ul>
            <div class="flex flex-wrap gap-2 mt-2">
                <button onclick="navigateToSection('experience', true)" class="chat-action-btn">
                    <span>👇 View Experience Timeline</span>
                </button>
            </div>
        `;
    }

    // 6. Education / Academic Background
    else if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('master') || q.includes('gpa') || q.includes('bachelor')) {
        scrollTarget = scrollTarget || 'education';
        responseHtml = `
            <p>🎓 <strong>Academic Credentials:</strong></p>
            <ul class="text-xs space-y-1.5 my-1.5">
                <li>• <strong>Master of Software Engineering (AI Specialization)</strong> — FPT School of Business & Technology (FSB), 2025 – Present. Focus: Multi-Agent control flow logic, vector search indexes, and enterprise model operations.</li>
                <li>• <strong>Bachelor of Artificial Intelligence</strong> — FPT University, 2021 – 2025. Graduate GPA: <strong>3.4 / 4.0</strong>.</li>
            </ul>
            <div class="flex flex-wrap gap-2 mt-2">
                <button onclick="navigateToSection('education', true)" class="chat-action-btn">
                    <span>👇 View Education Section</span>
                </button>
            </div>
        `;
    }

    // 7. Contact / Resume
    else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('cv') || q.includes('resume') || q.includes('linkedin') || q.includes('hire')) {
        scrollTarget = scrollTarget || 'contact';
        responseHtml = `
            <p>📬 <strong>Direct Contact Channels:</strong></p>
            <ul class="text-xs space-y-1 my-1.5">
                <li>• <strong>Phone:</strong> <a href="tel:+84989068343" class="text-doraemon-blue font-bold hover:underline">+84 989 068 343</a></li>
                <li>• <strong>Email:</strong> <a href="mailto:nth120923@gmail.com" class="text-doraemon-blue font-bold hover:underline">nth120923@gmail.com</a></li>
                <li>• <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/hoangnt1209" target="_blank" rel="noopener noreferrer" class="text-doraemon-blue font-bold hover:underline">linkedin.com/in/hoangnt1209</a></li>
                <li>• <strong>GitHub:</strong> <a href="https://github.com/Hoangnt1209" target="_blank" rel="noopener noreferrer" class="text-doraemon-blue font-bold hover:underline">github.com/Hoangnt1209</a></li>
            </ul>
            <div class="flex flex-wrap gap-2 mt-2">
                <button onclick="window.print()" class="chat-action-btn">
                    <span>🖨️ Print / Save PDF Resume</span>
                </button>
                <button onclick="navigateToSection('contact', true)" class="chat-action-btn">
                    <span>👇 Go to Transmission Form</span>
                </button>
            </div>
        `;
    }

    // Default Fallback
    else {
        scrollTarget = scrollTarget || 'projects';
        responseHtml = `
            <p>Thanks for asking: <em>"${escapeHtml(query)}"</em></p>
            <p>You can click any suggested topic below or choose <strong>"Take the tour"</strong> to let me guide you through the portfolio:</p>
            <div class="flex flex-wrap gap-1.5 mt-2">
                <button onclick="handleSuggestedPrompt('take-tour')" class="chat-action-btn">
                    <span>🗺️ Take the tour</span>
                </button>
                <button onclick="handleSuggestedPrompt('ai-agent-projects')" class="chat-action-btn">
                    <span>🚀 VietStock AI</span>
                </button>
                <button onclick="handleSuggestedPrompt('pastry-checkout')" class="chat-action-btn">
                    <span>🥐 Bakery Self-Checkout</span>
                </button>
                <button onclick="handleSuggestedPrompt('experience')" class="chat-action-btn">
                    <span>💼 1 Year Experience</span>
                </button>
            </div>
        `;
    }

    if (scrollTarget && targetSuccess) {
        navigateToSection(scrollTarget, true);
    }

    return responseHtml;
}

// =========================================================================
// 11. SUBMIT EVENT HANDLER
// =========================================================================
function handleAgentChatSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (isBotResponding) return;

    const { input } = getAgentElements();
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = '';

    isBotResponding = true;
    showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        const responseHtml = generateAgentResponse(text);
        addBotMessage(responseHtml);
        isBotResponding = false;
    }, 380);
}

// =========================================================================
// 12. GLOBAL SHORTCUTS & EXPORTS
// =========================================================================
window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (isAgentChatOpen) {
            closeAgentChat();
        } else {
            openAgentChat();
        }
    }
    if (e.key === 'Escape' && isAgentChatOpen) {
        closeAgentChat();
    }
});

// Backward-compatible global bindings
window.openAgentChat = openAgentChat;
window.closeAgentChat = closeAgentChat;
window.clearAgentChat = clearAgentChat;
window.handleAgentChatSubmit = handleAgentChatSubmit;
window.handleSuggestedPrompt = handleSuggestedPrompt;
window.startGuidedTour = startGuidedTour;
window.nextTourStep = nextTourStep;
window.prevTourStep = prevTourStep;
window.skipTour = skipTour;
window.finishTour = finishTour;
window.navigateToSection = navigateToSection;
