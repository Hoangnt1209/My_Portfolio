/* =========================================================================
   PORTFOLIO DATA CONFIGURATION
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
    vietstockGithub: "https://github.com/Hoangnt1209/VietStock-Ai-Assistant"
};

const typewriterPhrases = [
    "AI Engineer 🧠",
    "Machine Learning & RAG Developer 🔮",
    "MLOps & Deep Learning Developer 🚀",
    "Computer Science Master's Student 🎓"
];

const projectsData = {
    5: {
        id: 5,
        title: "VietStock AI — Autonomous Stock Market Intelligence & Advisory Platform",
        description: "AI-powered financial platform combining deterministic quantitative indicator engines and autonomous LLM function calling for real-time Vietnamese stock market analytics.",
        detail: "VietStock AI is an autonomous financial assistant and intelligence platform designed for real-time technical analysis, stock screening, and market advisory for Vietnam equities (HOSE, HNX, UPCOM). The platform unifies deterministic quantitative calculation engines with autonomous LLM Function Calling to deliver reliable, verifiable financial and investment insights.\n\nKey Architectural Highlights:\n1. Autonomous Tool Calling & Hybrid AI: Dynamically detects user intent and invokes specialized tools for real-time order books, technical indicator calculations, stock screeners, and market alert monitors.\n2. Deterministic Quantitative Engine: Strictly isolates all indicator logic (Wilder's Smoothing RSI, MACD, Bollinger Bands, SMA/EMA) into deterministic Pandas & NumPy computation blocks before LLM presentation.\n3. Real-Time Streaming & Visual Payloads: Streams rich payloads via Server-Sent Events (SSE), directly dispatching interactive Recharts candlestick charts and signal badges before token-by-token advisory responses.\n4. Performance & Multi-Tier Caching: In-memory TTL caches for real-time quotes, historical price series, and company profiles combined with asynchronous background warm-up to eliminate cold-start latencies.",
        stack: ["FastAPI (Python 3.11+)", "Next.js 16 (React 19)", "Google Gemini API", "vnstock / vnai", "Pandas & NumPy", "Recharts", "Server-Sent Events (SSE)", "TTL Caching"],
        team: "AI & Full-stack Developer (Solo)",
        type: "AI Agent / Financial Intelligence",
        highlights: "Deterministic Indicator Engine; SSE Streaming with embedded Recharts charts; Sub-second cached query resolution.",
        category: "nlp",
        routing: "vietstockassistant.netlify.app",
        liveUrl: "https://vietstockassistant.netlify.app/",
        githubUrl: "https://github.com/Hoangnt1209/VietStock-Ai-Assistant",
        image: "assets/project_vietstock.png",
        gallery: [
            { src: "assets/project_vietstock.png", label: "AI Advisory & Candlestick Charts" },
            { src: "assets/vietstock_chart.png", label: "HPG Technical Analysis Charts" },
            { src: "assets/vietstock_board.png", label: "HOSE Live Market Board" },
            { src: "assets/vietstock_glossary.png", label: "Financial Indicator Glossary" }
        ],
        bgGradient: "from-emerald-500/20 via-doraemon-blue/20 to-slate-950",
        glowColor: "rgba(16, 185, 129, 0.45)",
        borderColor: "rgba(16, 185, 129, 0.35)"
    },
    1: {
        id: 1,
        title: "Intelligent Multi-Source RAG Assistant",
        description: "Enterprise-grade QA chatbot powered by custom LLM retrieval, semantic document chunking, and FAISS indexing.",
        detail: "Engineered a production-ready NLP solution to automate query processing over unstructured PDFs and spreadsheets. Implemented custom semantic chunking strategies and semantic rerankers to improve document retrieval context window precision and context fidelity across domain-specific queries.",
        stack: ["LangChain", "HuggingFace", "FAISS", "LLaMA API"],
        team: "Solo Developer",
        type: "Generative AI / RAG",
        highlights: "Supports hot LLM swapping; built-in guardrails for verified production safety.",
        category: "nlp",
        routing: "rag.portfolio.hoang.ai",
        githubUrl: "https://github.com/Hoangnt1209",
        image: "assets/project_rag.png",
        gallery: [
            { src: "assets/project_rag.png", label: "LexWeave Multi-Source RAG Assistant UI" }
        ],
        bgGradient: "from-doraemon-blue/20 to-slate-950",
        glowColor: "rgba(0, 145, 216, 0.4)",
        borderColor: "rgba(0, 145, 216, 0.3)"
    },
    2: {
        id: 2,
        title: "Automated Bakery Self-Checkout & Pastry Detection System",
        description: "Edge computer vision self-checkout solution using YOLOv6 & YOLOv8 to detect multiple pastry items on trays and automate billing in real-time.",
        detail: "Architected and implemented an end-to-end edge AI self-checkout application for retail bakeries. Built an automated data pipeline using AutoCrawler (https://github.com/yoongikim/autocrawler) to scrape over 70,000 images, meticulously hand-labeled the dataset with LabelImg (https://github.com/HumanSignal/labelimg), and trained/evaluated YOLOv6 and YOLOv8 models to achieve 70%–80% detection accuracy across multi-pastry customer trays. Exported models to compiled ONNX runtimes and deployed to Triton Inference Server with sub-10ms latency for automated instant pricing and receipt generation.",
        stack: ["YOLOv6", "YOLOv8", "AutoCrawler", "LabelImg", "ONNX Runtime", "Triton Server", "FastAPI"],
        team: "Ai Engineer (5 members)",
        type: "Computer Vision & Edge AI",
        highlights: "70,000+ images scraped via AutoCrawler & hand-annotated with LabelImg; YOLOv6/v8 achieving 70–80% accuracy; Sub-10ms Triton deployment.",
        category: "cv",
        routing: "cv.portfolio.hoang.ai",
        githubUrl: "https://github.com/Hoangnt1209",
        image: "assets/project_pastry_detection.png",
        gallery: [
            { src: "assets/project_pastry_detection.png", label: "Multi-Class Pastry Detection with Bounding Boxes" },
            { src: "assets/project_autocrawler.png", label: "Large-Scale Dataset Scraping via AutoCrawler (70,000+ Images)" }
        ],
        bgGradient: "from-doraemon-red/20 to-slate-950",
        glowColor: "rgba(255, 75, 75, 0.4)",
        borderColor: "rgba(255, 75, 75, 0.3)"
    },
    3: {
        id: 3,
        title: "Enterprise MLOps Video Anomaly Detection Pipeline",
        description: "Fully reproducible deep learning pipeline featuring MLflow tracking, lakeFS data versioning, and Docker deployment.",
        detail: "Constructed an integrated machine learning operational lifecycle (MLOps) to detect anomalies in smart city CCTV feeds. Leveraged lakeFS to handle dataset version control at scale and tracked parallel training runs with MLflow before exporting deployable Docker service containers.",
        stack: ["PyTorch", "MLflow", "lakeFS", "Docker"],
        team: "MLOps Engineer (3 members)",
        type: "Deep Learning / MLOps",
        highlights: "Reproducible dataset commits with integrated training pipeline telemetry tracking.",
        category: "mlops",
        routing: "mlops.portfolio.hoang.ai",
        githubUrl: "https://github.com/Hoangnt1209",
        bgGradient: "from-doraemon-gold/20 to-slate-950",
        glowColor: "rgba(255, 215, 0, 0.4)",
        borderColor: "rgba(255, 215, 0, 0.3)"
    },
    4: {
        id: 4,
        title: "Smart CV Matcher & Semantic Profile Scorer",
        description: "Dual-sided recruitment matching platform combining dense CV & JD embeddings in QdrantDB with BM25 lexical search to empower both HR recruiters and job seekers.",
        detail: "Designed and developed an AI-driven recruitment matching and semantic profiling platform that serves both hiring teams and candidates. The system embeds candidate CVs and employer Job Descriptions (JDs) into high-dimensional vector spaces stored directly within Qdrant Vector Database, fusing dense semantic vector similarity with sparse BM25 keyword matching for high-precision hybrid retrieval.\n\nCore Highlights & Impact:\n1. HR Recruiter Acceleration: Rapidly scans, parses, and ranks hundreds of applicant CVs against open job specifications, cutting manual candidate screening overhead by over 80% while surfacing hidden profile strengths.\n2. Bi-Directional Candidate Discovery: Empowers job applicants to upload their CVs, evaluate semantic compatibility against active market JDs, and receive actionable skill gap recommendations.\n3. BM25 + Semantic Hybrid Search: Bridges exact keyword requirements (certifications, tech stack, domain terms) with dense vector representations to prevent semantic drift.\n4. High-Throughput Microservice: Asynchronous vector ingestion pipeline built with FastAPI, LangChain, and responsive ReactJS visual dashboards.",
        stack: ["Qdrant Vector DB", "BM25 Hybrid Search", "Sentence Transformers", "LangChain", "FastAPI", "ReactJS", "Pydantic"],
        team: "Core AI Developer (5 members)",
        type: "Full-Stack AI / Vector Search",
        highlights: "Dense QdrantDB embeddings + BM25 hybrid search; Bi-directional matching for HR candidate screening & applicant job discovery; 80% reduction in screening overhead.",
        category: "nlp",
        routing: "matcher.portfolio.hoang.ai",
        githubUrl: "https://github.com/Hoangnt1209",
        image: "assets/project_cv_matcher.png",
        gallery: [
            { src: "assets/project_cv_matcher.png", label: "Smart CV Matcher Official Logo & Pipeline" }
        ],
        bgGradient: "from-sky-500/20 via-doraemon-blue/20 to-slate-950",
        glowColor: "rgba(14, 165, 233, 0.45)",
        borderColor: "rgba(14, 165, 233, 0.35)"
    }
};

window.profileData = profileData;
window.typewriterPhrases = typewriterPhrases;
window.projectsData = projectsData;
