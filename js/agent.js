/* =========================================================================
   PORTFOLIO AI GUIDE (hoang.agent) — SILKY 60FPS, ZERO REFLOW LAG
   ========================================================================= */

let isAgentChatOpen = false;
let isBotResponding = false;

const SUGGESTED_PROMPTS = [
  {
    id: 'floren-ai',
    label: 'Floren AI (Remote)',
    prompt: 'Tell me about Floren AI — the remote client project.',
    target: 'project-floren',
  },
  {
    id: 'loiban-ai',
    label: 'Lời Bản (Offline Edge AI)',
    prompt: 'Tell me about Lời Bản — the offline Hmong-Vietnamese speech translator.',
    target: 'project-loiban',
  },
  {
    id: 'vietstock-ai',
    label: 'VietStock AI',
    prompt: 'Tell me about VietStock AI.',
    target: 'project-vietstock',
  },
  {
    id: 'bakery-cv',
    label: 'Bakery Self-Checkout',
    prompt: 'Tell me about the Automated Bakery Self-Checkout system.',
    target: 'projects',
  },
  {
    id: 'experience',
    label: 'Work Experience',
    prompt: 'Summarize Hoang’s work experience.',
    target: 'experience',
  },
  {
    id: 'cv-download',
    label: 'Download CV',
    prompt: 'How can I download Hoang’s CV or contact him?',
    target: 'contact',
  },
];

function getAgentEls() {
  return {
    panel: document.getElementById('agent-chat-modal'),
    launcher: document.getElementById('agent-launcher-wrapper'),
    messages: document.getElementById('agent-chat-messages'),
    input: document.getElementById('agent-chat-input'),
    pills: document.getElementById('agent-suggestion-pills'),
  };
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderWelcomeCard() {
  return `
    <div class="space-y-3">
      <p class="text-[13px] leading-relaxed text-[#29221e]">
        Hi! I'm Hoang's Portfolio Guide. Ask me about his AI projects, system architecture, or work experience — or pick a quick topic below.
      </p>
      <div class="flex flex-wrap gap-1.5">
        ${SUGGESTED_PROMPTS.map(
          (item) => `
          <button type="button" onclick="handleSuggestedPrompt('${item.id}')" class="agent-chip-pill">
            ${item.label}
          </button>`
        ).join('')}
      </div>
    </div>
  `;
}

function renderBottomPills() {
  const { pills } = getAgentEls();
  if (!pills) return;
  pills.innerHTML = SUGGESTED_PROMPTS.map(
    (item) => `
    <button type="button" onclick="handleSuggestedPrompt('${item.id}')" class="agent-chip-pill">
      ${item.label}
    </button>`
  ).join('');
}

function initAgentChat() {
  const { messages } = getAgentEls();
  if (!messages) return;
  if (messages.children.length === 0) {
    addBotMessage(renderWelcomeCard());
  }
  renderBottomPills();
}

function openAgentChat() {
  const { panel, launcher, input } = getAgentEls();
  if (!panel) return;
  initAgentChat();
  isAgentChatOpen = true;
  panel.classList.add('open');
  if (launcher) launcher.style.display = 'none';
  requestAnimationFrame(() => {
    if (input) input.focus({ preventScroll: true });
  });
}

function closeAgentChat() {
  const { panel, launcher } = getAgentEls();
  if (!panel) return;
  isAgentChatOpen = false;
  panel.classList.remove('open');
  if (launcher) launcher.style.display = 'block';
}

function clearAgentChat() {
  const { messages } = getAgentEls();
  if (!messages) return;
  messages.innerHTML = '';
  addBotMessage(renderWelcomeCard());
}

function scrollChatToBottom() {
  const { messages } = getAgentEls();
  if (!messages) return;
  requestAnimationFrame(() => {
    messages.scrollTop = messages.scrollHeight;
  });
}

function navigateToSection(targetId) {
  if (!targetId) return;
  const el = document.getElementById(targetId);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top: y, behavior: 'smooth' });
  el.classList.add('section-highlight');
  setTimeout(() => el.classList.remove('section-highlight'), 1800);
}

function addUserMessage(text) {
  const { messages } = getAgentEls();
  if (!messages) return;
  const row = document.createElement('div');
  row.className = 'flex justify-end';
  row.innerHTML = `<div class="chat-bubble-user max-w-[85%] px-3.5 py-2 text-[13px] leading-relaxed">${escapeHtml(text)}</div>`;
  messages.appendChild(row);
  scrollChatToBottom();
}

function addBotMessage(html) {
  const { messages } = getAgentEls();
  if (!messages) return;
  const row = document.createElement('div');
  row.className = 'flex justify-start';
  row.innerHTML = `<div class="chat-bubble-bot max-w-[92%] px-3.5 py-2.5 text-[13px] leading-relaxed">${html}</div>`;
  messages.appendChild(row);
  scrollChatToBottom();
}

function showTyping() {
  const { messages } = getAgentEls();
  if (!messages) return;
  const row = document.createElement('div');
  row.id = 'agent-typing-indicator';
  row.className = 'flex justify-start';
  row.innerHTML = `
    <div class="chat-bubble-bot px-3.5 py-2.5 flex items-center gap-1.5">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>`;
  messages.appendChild(row);
  scrollChatToBottom();
}

function hideTyping() {
  const el = document.getElementById('agent-typing-indicator');
  if (el) el.remove();
}

function generateAgentResponse(query, targetOverride = null) {
  const q = query.toLowerCase();

  if (q.includes('floren') || q.includes('flower') || q.includes('remote') || q.includes('payos')) {
    navigateToSection(targetOverride || 'project-floren');
    return `
      <p class="font-semibold text-[#29221e] mb-1">Floren AI — Remote Client Platform</p>
      <p class="text-[#5b4f47] mb-2">End-to-end AI flower commerce &amp; operations platform built with <strong>FastAPI, Next.js 15, LangGraph + Gemini</strong>, PayOS/VietQR deposit webhooks, Meta Graph API (FB/IG) scheduler, HttpOnly auth, and <strong>115 automated pytest tests</strong>.</p>
      <div class="flex flex-wrap gap-1.5">
        <button type="button" onclick="openProjectModal(3)" class="chat-action-btn">View Architecture &amp; Gallery</button>
        <a href="https://github.com/Hoangnt1209/floren-ai" target="_blank" rel="noopener noreferrer" class="chat-action-btn">GitHub ↗</a>
      </div>`;
  }

  if (q.includes('loiban') || q.includes('lời bản') || q.includes('hmong') || q.includes('mông') || q.includes('offline') || q.includes('speech') || q.includes('translation')) {
    navigateToSection(targetOverride || 'project-loiban');
    return `
      <p class="font-semibold text-[#29221e] mb-1">Lời Bản — Offline Edge AI Speech Translator</p>
      <p class="text-[#5b4f47] mb-2">100% offline Android Speech-to-Speech app (Vietnamese ⇄ Hmong MVN) combining <strong>Streaming Zipformer ASR</strong> (21.50% WER, INT8), QLoRA-tuned <strong>Qwen2.5-1.5B</strong> (GGUF Q4_K_M on llama.cpp), and <strong>VITS Piper TTS</strong> trained on VOV4 audio.</p>
      <div class="flex flex-wrap gap-1.5">
        <button type="button" onclick="openProjectModal(6)" class="chat-action-btn">Read Case Study</button>
        <a href="https://github.com/Hoangnt1209/Loi_Ban_AI_Translation" target="_blank" rel="noopener noreferrer" class="chat-action-btn">GitHub ↗</a>
      </div>`;
  }

  if (q.includes('vietstock') || q.includes('stock') || q.includes('fintech')) {
    navigateToSection(targetOverride || 'project-vietstock');
    return `
      <p class="font-semibold text-[#29221e] mb-1">VietStock AI — Stock Market Intelligence</p>
      <p class="text-[#5b4f47] mb-2">Combines a deterministic quantitative engine (RSI, MACD, Bollinger Bands in Pandas/NumPy) with Gemini tool calling and real-time SSE candlestick chart streaming for Vietnam equities.</p>
      <div class="flex flex-wrap gap-1.5">
        <a href="https://vietstockassistant.netlify.app/" target="_blank" rel="noopener noreferrer" class="chat-action-btn">Live Demo ↗</a>
        <button type="button" onclick="openProjectModal(5)" class="chat-action-btn">Inspect Specs</button>
      </div>`;
  }

  if (q.includes('bakery') || q.includes('pastry') || q.includes('yolo') || q.includes('vision')) {
    navigateToSection(targetOverride || 'projects');
    return `
      <p class="font-semibold text-[#29221e] mb-1">Automated Bakery Self-Checkout</p>
      <p class="text-[#5b4f47] mb-2">Trained YOLOv6 &amp; YOLOv8 on <strong>70,000+ images</strong> (AutoCrawler + LabelImg), achieving <strong>70%–80% accuracy</strong> and deploying via ONNX Runtime + Triton Inference Server with sub-10ms latency.</p>
      <button type="button" onclick="openProjectModal(2)" class="chat-action-btn">View Detection Gallery</button>`;
  }

  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('career')) {
    navigateToSection(targetOverride || 'experience');
    return `
      <p class="font-semibold text-[#29221e] mb-1">Work Experience</p>
      <ul class="list-disc pl-4 space-y-1 text-[#5b4f47] mb-2">
        <li><strong>AI Engineer</strong> at Future Space Technology JSC (LangGraph agents, YOLO26/DETR, FastAPI).</li>
        <li><strong>AI Engineer (Remote)</strong> at UMMO (OCR ingestion, FAISS/Pinecone/pgvector RAG).</li>
        <li><strong>AI &amp; Full-Stack Intern</strong> at FPT Software &amp; FPT Academy (COBOL→Java LLM migration, Qdrant CV Matcher).</li>
      </ul>
      <a href="assets/Nguyen_Thanh_Hoang_CV.pdf" download="Nguyen_Thanh_Hoang_CV.pdf" class="chat-action-btn">Download CV (PDF)</a>`;
  }

  if (q.includes('cv') || q.includes('resume') || q.includes('contact') || q.includes('email') || q.includes('hire')) {
    navigateToSection(targetOverride || 'contact');
    return `
      <p class="font-semibold text-[#29221e] mb-1">Contact &amp; CV</p>
      <p class="text-[#5b4f47] mb-2">Reach Hoang directly at <strong>nth120923@gmail.com</strong> or <strong>+84 989 068 343</strong>, or download his 1-page PDF CV below.</p>
      <div class="flex flex-wrap gap-1.5">
        <a href="assets/Nguyen_Thanh_Hoang_CV.pdf" download="Nguyen_Thanh_Hoang_CV.pdf" class="chat-action-btn">Download CV (PDF)</a>
        <a href="mailto:nth120923@gmail.com" class="chat-action-btn">Send Email ↗</a>
      </div>`;
  }

  return `
    <p class="text-[#5b4f47] mb-2">I can walk you through Hoang's flagship projects (<strong>Floren AI</strong>, <strong>VietStock AI</strong>, <strong>Bakery Self-Checkout</strong>), work experience, or provide his PDF CV.</p>
    <div class="flex flex-wrap gap-1.5">
      <button type="button" onclick="handleSuggestedPrompt('floren-ai')" class="chat-action-btn">Floren AI</button>
      <button type="button" onclick="handleSuggestedPrompt('vietstock-ai')" class="chat-action-btn">VietStock AI</button>
      <a href="assets/Nguyen_Thanh_Hoang_CV.pdf" download="Nguyen_Thanh_Hoang_CV.pdf" class="chat-action-btn">Download CV</a>
    </div>`;
}

function handleSuggestedPrompt(id) {
  const item = SUGGESTED_PROMPTS.find((p) => p.id === id);
  if (!item || isBotResponding) return;
  if (!isAgentChatOpen) openAgentChat();

  addUserMessage(item.label);
  isBotResponding = true;
  showTyping();

  setTimeout(() => {
    hideTyping();
    addBotMessage(generateAgentResponse(item.prompt, item.target));
    isBotResponding = false;
  }, 180);
}

function handleAgentChatSubmit(e) {
  if (e) e.preventDefault();
  if (isBotResponding) return;
  const { input } = getAgentEls();
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = '';
  isBotResponding = true;
  showTyping();

  setTimeout(() => {
    hideTyping();
    addBotMessage(generateAgentResponse(text));
    isBotResponding = false;
  }, 180);
}

window.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (isAgentChatOpen) closeAgentChat();
    else openAgentChat();
  }
  if (e.key === 'Escape' && isAgentChatOpen) {
    closeAgentChat();
  }
});

window.openAgentChat = openAgentChat;
window.closeAgentChat = closeAgentChat;
window.clearAgentChat = clearAgentChat;
window.handleSuggestedPrompt = handleSuggestedPrompt;
window.handleAgentChatSubmit = handleAgentChatSubmit;
window.navigateToSection = navigateToSection;
