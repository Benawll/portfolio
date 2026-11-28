import type { LocalizedText } from '../i18n/LanguageContext';

export type SkillCategoryId =
  | 'data-cloud'
  | 'ai-mlops'
  | 'full-stack'
  | 'quality-devops';

export interface SkillCategory {
  id: SkillCategoryId;
  label: LocalizedText;
}

export interface SkillItem {
  name: string;
  category: SkillCategoryId;
  proofs: string[];
  note?: LocalizedText;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'data-cloud',
    label: { fr: 'Data & Cloud', en: 'Data & Cloud' },
  },
  {
    id: 'ai-mlops',
    label: { fr: 'IA & MLOps', en: 'AI & MLOps' },
  },
  {
    id: 'full-stack',
    label: { fr: 'Full-Stack', en: 'Full-Stack' },
  },
  {
    id: 'quality-devops',
    label: { fr: 'Qualité & DevOps', en: 'Quality & DevOps' },
  },
];

export const SKILLS: SkillItem[] = [
  // Data & Cloud
  {
    name: 'Python (ETL, Pandas, NumPy)',
    category: 'data-cloud',
    proofs: ['Engie Vianeo', 'PulseLake MLOps', 'AgentFlow Studio'],
  },
  {
    name: 'AWS (Lambda, S3, EventBridge, Athena)',
    category: 'data-cloud',
    proofs: ['Engie Vianeo'],
  },
  {
    name: 'Databricks & Parquet / Avro',
    category: 'data-cloud',
    proofs: ['Engie Vianeo', 'PulseLake MLOps'],
  },
  {
    name: 'PySpark & Pandera (Medallion)',
    category: 'data-cloud',
    proofs: ['PulseLake MLOps'],
  },
  {
    name: 'Redpanda / Kafka Streaming',
    category: 'data-cloud',
    proofs: ['PulseLake MLOps'],
  },
  {
    name: 'dbt Core, DuckDB & GCP BigQuery',
    category: 'data-cloud',
    proofs: ['PulseLake MLOps'],
  },
  {
    name: 'SQL / SOQL, PostgreSQL & Oracle',
    category: 'data-cloud',
    proofs: ['Sopra Steria', 'Engie Vianeo', 'AgentFlow Studio'],
  },
  {
    name: 'Power BI',
    category: 'data-cloud',
    proofs: ['Engie Vianeo'],
  },

  // AI & MLOps
  {
    name: 'LangGraph & Hybrid RAG (pgvector + RRF)',
    category: 'ai-mlops',
    proofs: ['AgentFlow Studio'],
  },
  {
    name: 'Redis Semantic Cache & LLMOps Eval',
    category: 'ai-mlops',
    proofs: ['AgentFlow Studio'],
  },
  {
    name: 'LightGBM, MLflow & Evidently AI',
    category: 'ai-mlops',
    proofs: ['PulseLake MLOps'],
  },
  {
    name: 'PyTorch, Hugging Face (DistilBERT, Flan-T5)',
    category: 'ai-mlops',
    proofs: ['Umeå University (NLP)'],
  },
  {
    name: 'TensorFlow / Keras, CNN, ResNet, Transformers',
    category: 'ai-mlops',
    proofs: ['Umeå University (AV & NLP)'],
  },
  {
    name: 'Reinforcement Learning (DQN, Gymnasium, SB3)',
    category: 'ai-mlops',
    proofs: ['Umeå University (AV)'],
  },

  // Full-Stack
  {
    name: 'Java (Quarkus), JPA / JPQL & MapStruct',
    category: 'full-stack',
    proofs: ['Sopra Steria', 'Engie Digital'],
  },
  {
    name: 'Angular & TypeScript',
    category: 'full-stack',
    proofs: ['Sopra Steria', 'Engie Digital'],
  },
  {
    name: 'React 19, Vite & Tailwind CSS',
    category: 'full-stack',
    proofs: ['AgentFlow Studio', 'Portfolio'],
  },
  {
    name: 'FastAPI (REST / SSE) & Swagger',
    category: 'full-stack',
    proofs: ['AgentFlow Studio', 'PulseLake MLOps'],
  },
  {
    name: 'Hexagonal Architecture, DDD & Clean Arch',
    category: 'full-stack',
    proofs: ['Sopra Steria', 'Engie Digital', 'AgentFlow Studio'],
  },
  {
    name: 'C#, .NET 6, WPF, WebView2 & Win32 API',
    category: 'full-stack',
    proofs: ['Awll Disk Utility'],
  },
  {
    name: 'PHP (MVC) & MySQL',
    category: 'full-stack',
    proofs: ['Albearson'],
  },

  // Quality & DevOps
  {
    name: 'Pytest, Vitest, Cypress (Gherkin), xUnit, JUnit',
    category: 'quality-devops',
    proofs: ['AgentFlow Studio', 'Sopra Steria', 'Awll Disk Utility'],
  },
  {
    name: 'Ruff, Mypy (strict) & SonarQube',
    category: 'quality-devops',
    proofs: ['AgentFlow Studio', 'PulseLake MLOps', 'Sopra Steria'],
  },
  {
    name: 'Docker & Docker Compose',
    category: 'quality-devops',
    proofs: ['AgentFlow Studio', 'PulseLake MLOps'],
  },
  {
    name: 'Terraform, Kubernetes & kubeconform',
    category: 'quality-devops',
    proofs: ['PulseLake MLOps'],
  },
  {
    name: 'Prometheus & Grafana',
    category: 'quality-devops',
    proofs: ['AgentFlow Studio', 'PulseLake MLOps'],
  },
  {
    name: 'GitHub Actions, Concourse & GitLab CI',
    category: 'quality-devops',
    proofs: ['Sopra Steria', 'AgentFlow Studio', 'PulseLake MLOps'],
  },
];

export const CANDIDATE_PROFILE = {
  fullName: 'Benjamin PEQUIN',
  monogram: 'B.P',
  email: 'pequinb@gmail.com',
  githubUrl: 'https://github.com/Benawll',
  linkedinUrl: 'https://www.linkedin.com/in/benjamin-p%C3%A9quin',
  cvPath: '/cv/Benjamin-Pequin-CV.pdf',
  toeicScore: 845,
} as const;
