/* =========================================================================
   PORTFOLIO DATA CONFIGURATION — PAIT ENGINEERING CASE STUDIES
   (Problem · Approach · Impact · Engineering Trade-offs)
   ========================================================================= */

const profileData = {
  name: "Nguyễn Thanh Hoàng",
  role: "AI Engineer",
  location: "Ho Chi Minh City, Vietnam",
  phone: "+84 989 068 343",
  email: "nth120923@gmail.com",
  linkedin: "https://linkedin.com/in/hoangnt1209",
  github: "https://github.com/Hoangnt1209",
  vietstockLive: "https://vietstockassistant.netlify.app/",
  vietstockGithub: "https://github.com/Hoangnt1209/VietStock-Ai-Assistant",
};

const projectsData = {
  3: {
    id: 3,
    title: "Floren AI — AI-Assisted E-Commerce & Operations Platform",
    subtitle: "Remote Client · Production Full-Stack AI",
    team: "Solo AI & Full-Stack Engineer (Remote Contract)",
    type: "AI Agent · Commerce SaaS",
    category: "nlp",
    routing: "floren.studio (Remote Client)",
    githubUrl: "https://github.com/Hoangnt1209/floren-ai",
    image: "assets/floren_architecture.jpg",
    gallery: [
      { src: "assets/floren_architecture.jpg", label: "System Architecture" },
      { src: "assets/floren_storefront.png", label: "Boutique Storefront" },
      { src: "assets/floren_pdp_modal.png", label: "Product & Add-ons" },
      { src: "assets/floren_admin_catalog.png", label: "Low-Tech Admin" },
      { src: "assets/floren_admin_social.png", label: "FB & IG Scheduler" },
    ],
    stack: [
      "FastAPI (Python 3.11)",
      "Next.js 15 (React 19)",
      "LangGraph + Gemini",
      "SQLAlchemy & Alembic",
      "PayOS + VietQR",
      "Meta Graph API",
      "Pillow (EXIF-Free)",
      "115 Pytest Tests",
    ],
    pait: {
      problem:
        "Small retail flower studios juggle orders across Web, Messenger, and Instagram DM while managing fragile inventory and deposit transfers. Letting an LLM quote prices directly causes billing hallucinations, and non-technical owners cannot operate complex developer dashboards.",
      approach:
        "Built a decoupled FastAPI + Next.js 15 platform powered by a stateful LangGraph + Gemini agent. Isolated all pricing, stock reservation, and order state transitions into deterministic backend tools. Integrated 10-minute PayOS/VietQR payment intents with HMAC-SHA256 webhooks, a 1-tap AI-to-human inbox takeover, subscribable .ics delivery feeds, and a 60s async Meta Graph API (FB/IG) publisher.",
      impact:
        "Delivered a turnkey remote-client system hardened with HttpOnly cookie auth, SSRF/CSRF guards, Pillow EXIF-stripping uploads, and 115 automated pytest tests passing strict mypy and ruff checks with zero errors.",
      tradeoffs: [
        "In-app 60s asyncio lifespan worker instead of Celery + Redis — dramatically reduces hosting complexity and cost for a single-studio owner, trading away multi-node horizontal worker scaling.",
        "Deterministic backend tools for pricing & order FSM instead of free-form LLM generation — eliminates 100% of math/deposit hallucinations at the cost of stricter Pydantic tool contracts.",
        "Explicit Next.js proxy allowlist blocking /webhooks/* — forces Meta & PayOS webhooks straight to FastAPI with HMAC verification, preventing frontend proxy spoofing.",
      ],
    },
  },
  5: {
    id: 5,
    title: "VietStock AI — Autonomous Stock Market Intelligence",
    subtitle: "Live Production App · Quantitative AI Copilot",
    team: "Solo AI & Full-Stack Engineer",
    type: "FinTech AI · Streaming Analytics",
    category: "nlp",
    routing: "vietstockassistant.netlify.app",
    liveUrl: "https://vietstockassistant.netlify.app/",
    githubUrl: "https://github.com/Hoangnt1209/VietStock-Ai-Assistant",
    image: "assets/project_vietstock.png",
    gallery: [
      { src: "assets/project_vietstock.png", label: "AI Advisory & Charts" },
      { src: "assets/vietstock_chart.png", label: "HPG Technical Chart" },
      { src: "assets/vietstock_board.png", label: "HOSE Live Board" },
      { src: "assets/vietstock_glossary.png", label: "Indicator Glossary" },
    ],
    stack: [
      "FastAPI (Python 3.11+)",
      "Next.js 16 (React 19)",
      "Gemini Tool Calling",
      "Pandas & NumPy",
      "vnstock SDK",
      "Recharts",
      "Server-Sent Events (SSE)",
      "TTL Caching",
    ],
    pait: {
      problem:
        "Retail investors on Vietnam equities (HOSE, HNX, UPCOM) switch between slow market boards and static screeners. Asking standard LLMs to compute technical indicators (RSI, MACD, Bollinger Bands) produces silent arithmetic errors and high cold-start latency.",
      approach:
        "Separated quantitative computation from language generation: Pandas & NumPy compute exact Wilder's RSI, MACD, and Bollinger Bands deterministically before Gemini synthesizes commentary via function calling. Streamed interactive Recharts candlestick payloads over Server-Sent Events (SSE) ahead of token output.",
      impact:
        "Shipped a live public web app achieving sub-second repeat query resolution via multi-tier in-memory TTL caching and async background warm-up.",
      tradeoffs: [
        "In-memory TTL caching instead of a dedicated Redis cluster — keeps deployment zero-cost and ultra-low-latency for single-instance hosting, accepting cache cold-start on server restarts.",
        "SSE unidirectional streaming instead of WebSockets — simplifies proxy compatibility and automatic reconnects for AI responses, trading away bidirectional push.",
      ],
    },
  },
  2: {
    id: 2,
    title: "Automated Bakery Self-Checkout & Pastry Detection",
    subtitle: "Edge Computer Vision · Sub-10ms Inference",
    team: "AI Engineer (5-member team)",
    type: "Computer Vision · Edge AI",
    category: "cv",
    routing: "Edge Triton Deployment",
    githubUrl: "https://github.com/Hoangnt1209",
    image: "assets/project_pastry_detection.png",
    gallery: [
      { src: "assets/project_pastry_detection.png", label: "Multi-Pastry Detection" },
      { src: "assets/project_autocrawler.png", label: "70K AutoCrawler Pipeline" },
    ],
    stack: [
      "PyTorch",
      "YOLOv6 / YOLOv8",
      "AutoCrawler (70K+)",
      "LabelImg",
      "ONNX Runtime",
      "Triton Inference Server",
      "OpenCV & FastAPI",
    ],
    pait: {
      problem:
        "Manual bakery checkout creates long queues during peak hours because dozens of visually similar pastries lack barcodes and require staff to memorize prices.",
      approach:
        "Built an automated scraping pipeline with AutoCrawler collecting 70,000+ pastry images, curated and hand-labeled bounding boxes with LabelImg, benchmarked YOLOv6 vs. YOLOv8 on overlapping tray layouts, and exported compiled ONNX models to NVIDIA Triton Inference Server.",
      impact:
        "Achieved 70%–80% multi-class detection accuracy on real customer trays with sub-10ms inference latency per frame for instant automated bill calculation.",
      tradeoffs: [
        "Local YOLOv6/v8 + ONNX/Triton instead of cloud Vision LLM APIs — guarantees <10ms edge latency and $0 marginal API cost per tray, trading away zero-shot recognition of brand-new menu items without retraining.",
        "Manual bounding-box curation with LabelImg over pure auto-labeling — slower dataset prep, but prevented noisy overlapping-pastry labels from degrading mAP.",
      ],
    },
  },
  4: {
    id: 4,
    title: "Smart CV Matcher & Semantic Profile Scorer",
    subtitle: "Hybrid Vector + BM25 Recruitment Engine",
    team: "Core AI Developer (5-member team)",
    type: "Hybrid Search · NLP",
    category: "nlp",
    routing: "FastAPI + Qdrant Service",
    githubUrl: "https://github.com/Hoangnt1209",
    image: "assets/project_cv_matcher.png",
    gallery: [
      { src: "assets/project_cv_matcher.png", label: "CV Matcher Architecture" },
    ],
    stack: [
      "Qdrant Vector DB",
      "BM25 Lexical Search",
      "Sentence Transformers",
      "LangChain",
      "FastAPI & Pydantic",
      "ReactJS",
    ],
    pait: {
      problem:
        "HR teams spend hours manually screening hundreds of CVs per opening, while dense-only semantic search often misses mandatory hard skills (exact certifications, frameworks, or years of experience).",
      approach:
        "Engineered a dual-sided FastAPI + Qdrant matching engine combining dense Sentence-Transformer embeddings with sparse BM25 lexical scoring, exposing ranked candidate profiles for HR and skill-gap feedback for applicants.",
      impact:
        "Cut manual HR candidate screening overhead by over 80% while surfacing high-fit candidates missed by pure keyword filters.",
      tradeoffs: [
        "Hybrid Dense + BM25 scoring instead of sending full CVs to an LLM judge — keeps screening latency low and predictable across hundreds of applicants, trading away deep narrative reasoning per candidate.",
      ],
    },
  },
  1: {
    id: 1,
    title: "Multi-Source RAG Q&A Engine",
    subtitle: "Document Ingestion & Grounded Retrieval",
    team: "Solo AI Engineer",
    type: "Enterprise RAG · NLP",
    category: "nlp",
    routing: "FAISS & pgvector Pipeline",
    githubUrl: "https://github.com/Hoangnt1209",
    image: "assets/project_rag.png",
    gallery: [
      { src: "assets/project_rag.png", label: "RAG Q&A Interface" },
    ],
    stack: [
      "LangChain",
      "Hugging Face",
      "FAISS",
      "PostgreSQL / pgvector",
      "LLaMA API",
    ],
    pait: {
      problem:
        "Unstructured PDFs and messy CSV files break naive fixed-size chunking, causing fragmented context windows and unsupported answers in enterprise Q&A.",
      approach:
        "Built a multi-format ingestion pipeline with document cleaning, custom semantic chunking, dense embeddings, and pluggable vector backends (FAISS and pgvector) feeding context-grounded LLaMA generation.",
      impact:
        "Improved retrieval precision across heterogeneous PDF/CSV corpora and enabled hot-swapping between FAISS and PostgreSQL/pgvector without rewriting retrieval logic.",
      tradeoffs: [
        "Smaller overlapping semantic chunks with reranking instead of stuffing full documents into long-context prompts — reduces token cost and distraction noise, requiring careful chunk-boundary tuning.",
      ],
    },
  },
};

window.profileData = profileData;
window.projectsData = projectsData;
