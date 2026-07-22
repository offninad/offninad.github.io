/* All site content. Source of truth: NinadResume.pdf (July 2026). */

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'beyond', label: 'Beyond' },
]

export const RESUME_PDF = '/assets/Ninad_Rade_Resume.pdf'
export const RESUME_FILENAME = 'Ninad_Rade_Resume.pdf'

export const EXPERIENCE = [
  {
    role: 'AI Integration & Solutions Engineer Intern',
    org: 'Boon AI Inc.',
    period: 'Jun 2026 – Aug 2026',
    loc: 'New York, NY',
    bullets: [
      'Build and test internal and customer-facing AI applications during a private beta, integrating AI agents into customer workflows via REST APIs, third-party MCP integrations, and connected tools.',
      'Built and demoed 3 product prototypes with supporting dashboards and technical walkthroughs to onboard private-beta early adopters, translating kickoff and Return on Experience sessions into structured product feedback.',
      'Investigate and reproduce customer-side AI-agent and integration failures, documenting bugs, reproduction steps, and escalation notes with Product and Engineering.',
      'Analyze activation, usage, credit consumption, and workflow friction from Hotjar analytics, preparing weekly KPI reports that inform product and roadmap decisions.',
    ],
  },
  {
    role: 'Software Engineering Intern, Healthcare AI',
    org: 'DavaNinja Pvt. Ltd.',
    period: 'Oct 2024 – Mar 2025',
    loc: 'Mumbai, India',
    bullets: [
      'Engineered Python and NLP preprocessing pipelines for 100K+ pharmacy records, producing clean, structured inputs for drug-classification and risk-assessment workflows.',
      'Implemented schema validation and statistical drift checks that cut manual review effort 40-50%, and integrated REST APIs across 3 internal services to eliminate a 2-week ingestion bottleneck.',
      'Authored 40+ manual test cases for pre-release builds, reducing QA review-cycle time 30%.',
    ],
  },
]

/* Capability index, grouped exactly as on the resume. */
export const SKILLS = [
  { group: 'Programming', items: 'Python, JavaScript, SQL, C/C++, Bash' },
  {
    group: 'AI & Agentic Systems',
    items:
      'LLM API integration, AI agent workflows, RAG, prompt engineering, Hugging Face Transformers, PyTorch, TensorFlow, Scikit-learn, XGBoost, SHAP',
  },
  {
    group: 'Applications & Integrations',
    items: 'REST APIs, MCP integrations, Streamlit, workflow automation',
  },
  {
    group: 'Data Engineering & Analytics',
    items: 'PySpark, Spark SQL, Spark MLlib, Pandas, NumPy, data preprocessing, schema validation',
  },
  {
    group: 'Tools & Platforms',
    items: 'Git, Linux, AWS S3, MySQL, MongoDB, Hotjar, OpenCV, MediaPipe',
  },
]

export const EDUCATION = [
  {
    school: 'New York University',
    degree: 'M.S. Computer Engineering, Tandon School of Engineering',
    loc: 'New York, NY',
    date: 'Aug 2025 – May 2027',
    gpa: 'GPA 3.84 / 4.0',
  },
  {
    school: 'University of Mumbai, FCRIT',
    degree: 'B.E. Computer Engineering, Honors in AI & ML',
    loc: 'Mumbai, India',
    date: 'Jul 2021 – Jul 2025',
    gpa: 'CGPA 8.97 / 10',
  },
]

export const COURSEWORK =
  'Machine Learning, Deep Learning, NLP, Computer Vision, Probability & Statistics, Linear Algebra'

export const CERTS = [
  { name: 'Generative AI Fundamentals', issuer: 'Databricks', status: '2026' },
  { name: 'Software Engineer', issuer: 'HackerRank', status: '2026' },
  { name: 'MLOps', issuer: 'Duke University', status: 'In progress' },
  { name: 'AI Engineering Professional Certificate', issuer: 'IBM', status: 'In progress' },
]

export const LEADERSHIP = {
  role: 'OC Vice President, Partnerships & Logistics',
  org: 'AIESEC in India',
  period: 'May 2022 – Aug 2022',
  desc: 'Directed operations and partnerships for youth-development programs with 50+ participants; automated reporting with Python to improve data accuracy for non-technical stakeholders.',
}

/* Primary projects match the resume. A11ySentry has no public repository
 * yet, so it ships without a link and carries an explicit status label. */
export const PROJECTS = [
  {
    name: 'A11ySentry',
    status: 'In development',
    tagline: 'Multimodal accessibility regression investigator',
    desc: 'GitHub-integrated system that compares base and pull-request builds across six accessibility signals: Playwright journeys, axe-core findings, DOM snapshots, accessibility trees, screenshots, and keyboard-focus traces.',
    outcome:
      'An agent workflow with WCAG/ACT guidance retrieval produces evidence-backed GitHub Check findings, structured remediation suggestions, and replay-based validation, with security-conscious handling of build artifacts.',
    stack: 'Playwright, axe-core, RAG, GitHub Checks',
    href: null,
  },
  {
    name: 'ScentGraph',
    tagline: 'Explainable ML longevity predictor',
    desc: 'Maps user-provided fragrance ingredients and concentrations to predicted longevity: TF-IDF across 200+ compounds and an XGBoost regressor tuned to under 0.8 MAE hours.',
    outcome:
      'Streamlit interface with SHAP explainability, instant inference, and user-readable feature-importance outputs.',
    stack: 'Python, XGBoost, TF-IDF, SHAP, Streamlit',
    href: 'https://github.com/offninad/scentgraph',
  },
  {
    name: 'NYC Taxi Demand Prediction & Anomaly Detection',
    tagline: 'Distributed forecasting on 10M records',
    desc: 'Distributed PySpark pipeline processing 8.8M cleaned trips from roughly 10M raw records in under 3 minutes via caching and broadcast joins, with schema and data-quality checks.',
    outcome:
      'Streamlit decision-support dashboard with a hybrid IQR and rule-based anomaly detector for temporal and geographic demand analysis.',
    stack: 'Python, PySpark, Spark SQL, Spark MLlib, Streamlit',
    href: 'https://github.com/Prachiti22/Big-Data-Project',
  },
]

/* Earlier work. Links verified; kept as a quiet index so the three
 * resume projects stay in front. */
export const PROJECT_ARCHIVE = [
  {
    name: 'DeepFit',
    tagline: 'Real-time pose estimation and form correction',
    href: 'https://github.com/offninad/deepfit-form-corrector',
  },
  {
    name: 'Spam Classifier',
    tagline: 'Classical ML with LLM fallback for uncertain emails',
    href: 'https://github.com/offninad/spam-email-classifier',
  },
  {
    name: 'Stock LSTM',
    tagline: 'Rolling-window time-series forecasting',
    href: 'https://github.com/offninad/stock-market-prediction-web-app',
  },
  {
    name: 'MoneyBuddy',
    tagline: 'Full-stack multi-user finance tracker',
    href: 'https://github.com/Stephenmathew03/MoneyBuddy',
  },
]

export const LINKS = [
  { label: 'Email', value: 'radeninad@gmail.com', href: 'mailto:radeninad@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/ninadrade', href: 'https://linkedin.com/in/ninadrade' },
  { label: 'GitHub', value: 'github.com/offninad', href: 'https://github.com/offninad' },
  { label: 'Strava', value: 'strava.com/athletes/195549700', href: 'https://www.strava.com/athletes/195549700' },
]
