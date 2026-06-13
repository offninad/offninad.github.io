/* Content sourced from offninad.github.io */

export const NAV = [
  { id: 'home', n: '01', label: 'Home' },
  { id: 'experience', n: '02', label: 'Experience' },
  { id: 'education', n: '03', label: 'Education' },
  { id: 'projects', n: '04', label: 'Projects' },
  { id: 'beyond', n: '05', label: 'Beyond' },
]

export const RESUME_PDF = 'NinadRade-Resume.pdf'

export const EXPERIENCE = [
  {
    role: 'Software Engineering Intern',
    org: 'DavaNinja Pvt. Ltd. — Healthcare AI Systems',
    period: 'Oct 2024 – Mar 2025',
    loc: 'Mumbai, India',
    bullets: [
      'Engineered modular Python NLP pipelines to clean and standardize 100K+ clinical pharmacy records, producing structured inputs for drug-classification and risk-assessment ML models.',
      'Implemented automated schema validation and statistical drift checks, cutting manual review effort by 40–50% and improving downstream model reliability.',
      'Integrated REST APIs across 3 internal services to automate data ingestion, eliminating a 2-week pipeline bottleneck.',
      'Authored and executed 40+ manual test cases for pre-release mobile builds, cutting QA review cycles by 30%.',
    ],
  },
  {
    role: 'Junior Executive → VP, Organizing Committee',
    org: 'AIESEC in India',
    period: 'May 2022 – Aug 2022',
    loc: 'Mumbai, India',
    bullets: [
      'Developed Python automation scripts to standardize reporting workflows and improve data accuracy for non-technical stakeholders.',
      'Coordinated youth development programs for 50+ participants, progressing from Junior Executive to VP within a single term.',
    ],
  },
]

export const EDUCATION = [
  {
    school: 'New York University',
    degree: 'M.S. Computer Engineering · Tandon School of Engineering',
    loc: 'New York, USA',
    date: 'Expected May 2027',
    gpa: 'GPA 3.84 / 4.0',
    tags: [
      'Real-Time Embedded Systems',
      'Computer Systems Architecture',
      'Intro to ML',
      'Big Data',
      'Systems Optimization',
      'Deep Learning (next)',
      'Applied Matrix Methods (next)',
    ],
  },
  {
    school: 'University of Mumbai — FCRIT',
    degree: 'B.E. Computer Engineering · Honors in AI & ML',
    loc: 'Mumbai, India',
    date: 'Graduated July 2025',
    gpa: 'CGPA 8.97 / 10',
    tags: ['AI & ML Honors', 'Computer Networks', 'Operating Systems', 'Software Engineering'],
  },
]

export const CERTS = [
  { name: 'Software Engineer Intern', issuer: 'HackerRank', status: 'Verified · 2026' },
  { name: 'Generative AI Fundamentals', issuer: 'Databricks', status: 'Verified · 2026' },
  { name: 'MLOps Certification', issuer: 'Duke University', status: 'In progress' },
  { name: 'AI Engineering Professional', issuer: 'IBM', status: 'In progress' },
]

export const PROJECTS = [
  {
    name: 'DeepFit',
    tagline: 'Real-time pose estimation & form correction',
    desc: 'Computer-vision pipeline that analyzes exercise form frame-by-frame and flags bad reps in real time.',
    stack: ['Python', 'OpenCV', 'MediaPipe', 'Scikit-learn'],
    href: 'https://github.com/offninad/deepfit-form-corrector',
  },
  {
    name: 'ScentGraph',
    tagline: 'Explainable ML longevity predictor',
    desc: 'Tabular ML system that predicts fragrance longevity and explains every prediction with SHAP.',
    stack: ['XGBoost', 'TF-IDF', 'SHAP', 'Streamlit'],
    href: 'https://github.com/offninad/scentgraph',
  },
  {
    name: 'NYC Taxi Demand',
    tagline: 'Distributed forecasting & anomaly detection',
    desc: 'Spark pipeline over 10M+ trip records for demand forecasting and outlier detection.',
    stack: ['PySpark', 'Spark SQL', 'MLlib', 'Parquet'],
    href: 'https://github.com/Prachiti22/Big-Data-Project',
  },
  {
    name: 'Spam Classifier',
    tagline: 'Classical ML with LLM fallback',
    desc: 'NLP classifier that escalates uncertain emails to an LLM for fallback reasoning.',
    stack: ['Scikit-learn', 'NLTK', 'OpenAI API', 'TF-IDF'],
    href: 'https://github.com/offninad/spam-email-classifier',
  },
  {
    name: 'Stock LSTM',
    tagline: 'Time-series forecasting',
    desc: 'Rolling-window feature engineering with an LSTM for short-horizon price forecasting.',
    stack: ['TensorFlow', 'LSTM', 'NumPy'],
    href: 'https://github.com/offninad/stock-market-prediction-web-app',
  },
  {
    name: 'MoneyBuddy',
    tagline: 'Full-stack finance tracker',
    desc: 'Multi-user financial tracking app with auth, REST APIs, and a React front end.',
    stack: ['React', 'Node.js', 'MongoDB', 'JWT'],
    href: 'https://github.com/Stephenmathew03/MoneyBuddy',
  },
]

export const LINKS = [
  { label: 'Email', value: 'radeninad@gmail.com', href: 'mailto:radeninad@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/ninadrade', href: 'https://linkedin.com/in/ninadrade' },
  { label: 'GitHub', value: 'github.com/offninad', href: 'https://github.com/offninad' },
  { label: 'Strava', value: 'strava.com/athletes/195549700', href: 'https://www.strava.com/athletes/195549700' },
  { label: 'Classic site', value: 'offninad.github.io', href: 'https://offninad.github.io' },
]
