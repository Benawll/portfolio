import type { Translations } from './fr';

export const en: Translations = {
  meta: {
    title: 'Benjamin PEQUIN — Data, AI & Full-Stack Engineer',
    description:
      'Personal editorial portfolio of Benjamin PEQUIN — Data, AI & Full-Stack Engineer (Polytech Nantes · Umeå University).',
  },
  nav: {
    projects: 'Projects',
    experience: 'Experience',
    skills: 'Stack',
    contact: 'Contact',
    cvPdf: 'Resume PDF',
    skipToContent: 'Skip to main content',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },
  hero: {
    eyebrow:
      'DATA · AI · FULL-STACK ENGINEER — AVAILABLE IMMEDIATELY (NANTES / PARIS / REMOTE)',
    titleLine1: 'Software engineering,',
    titleLine2: 'data & AI',
    titleLine3: 'built for production.',
    subtitle:
      'Computer Science Engineering graduate from Polytech Nantes with an AI Erasmus semester at Umeå University (Sweden). I build hexagonal architectures, cloud data pipelines, and AI systems backed by measured benchmarks.',
    ctaProjects: 'Explore projects',
    ctaCv: 'Download Resume',
    proofs: {
      reposLabel: 'Open-source projects',
      reposValue: '04',
      experienceLabel: 'Industry experiences',
      experienceValue: '04',
      toeicLabel: 'Professional English',
      toeicValue: 'TOEIC 845',
      availabilityLabel: 'Availability',
      availabilityValue: 'Immediate',
    },
  },
  pillars: {
    index: '02',
    eyebrow: 'Hybrid positioning',
    title: 'Dual Software & Data Culture',
    subtitle:
      'Three balanced engineering pillars proven in production at Sopra Steria, Engie Vianeo, and Engie Digital, extended through benchmarked open-source systems.',
    items: [
      {
        index: '01',
        title: 'Data Engineering & Cloud',
        description:
          'Automated ETL pipelines on AWS (Lambda, S3, EventBridge, Athena, Databricks), Redpanda/Kafka streaming ingestion, PySpark Medallion processing, Pandera data quality, and dbt Core modeling.',
        proof: 'Engie Vianeo · PulseLake MLOps',
      },
      {
        index: '02',
        title: 'Full-Stack & Hexagonal Architecture',
        description:
          'Maintainable systems built with Hexagonal Architecture, DDD, and TDD: secure REST/SSE APIs (Java/Quarkus, FastAPI), reactive UIs (React 19, Angular, TypeScript), and automated CI/CD.',
        proof: 'Sopra Steria · Engie Digital · AgentFlow Studio',
      },
      {
        index: '03',
        title: 'Applied AI, LLMOps & MLOps',
        description:
          'LangGraph agents, Hybrid RAG (pgvector + FTS RRF), Redis semantic caching, ML/NLP models (LightGBM, DistilBERT, Flan-T5, Transformers), MLflow tracking, and Evidently AI drift monitoring.',
        proof: 'Umeå University · AgentFlow Studio · PulseLake MLOps',
      },
    ],
  },
  projects: {
    index: '03',
    eyebrow: 'Featured work',
    title: 'Built & measured systems',
    subtitle:
      'Four open-source engineering projects with reproducible benchmarks, automated test suites, and documented architectures.',
    viewCaseStudy: 'Read case study',
    viewGithub: 'GitHub',
    scrollHint: 'Scroll to explore',
    nextProject: 'Next project',
    backToProjects: 'Back to projects',
    sections: {
      metrics: 'Measured benchmarks',
      gallery: 'Real captures',
      problem: 'Problem & Context',
      architecture: 'Architecture',
      decisions: 'Engineering decisions',
      stack: 'Technical stack',
    },
  },
  experience: {
    index: '04',
    eyebrow: 'Background',
    title: 'Experience & Education',
    workHeading: 'Professional Experience',
    educationHeading: 'Education',
    academicProjectsHeading: 'Academic Projects — Umeå University',
  },
  skills: {
    index: '05',
    eyebrow: 'Engineering & Tooling',
    title: 'Technical matrix',
    subtitle:
      'Every skill is linked to the industry roles or open-source projects where it was applied in practice.',
    allFilter: 'All',
    proofLabel: 'Proven on',
  },
  contact: {
    index: '06',
    eyebrow: 'Contact & Availability',
    title: 'Available immediately',
    subtitle:
      'Open to permanent (CDI), fixed-term (CDD), or contract roles in Data Engineering, Full-Stack Development, or Applied AI — Nantes, Paris, or Remote France.',
    copyEmail: 'Copy email',
    emailCopied: 'Email copied',
    sendEmail: 'Send an email',
    downloadCv: 'Download Resume (PDF)',
    location: 'La Chapelle-sur-Erdre (Nantes) · Open to Paris & Remote France',
    contracts: 'Permanent · Fixed-term · Contract',
    footerRights: 'Benjamin PEQUIN — Built with 100% real data.',
  },
  notFound: {
    code: '404',
    title: 'Page not found',
    description: 'The requested page does not exist or has been moved.',
    backHome: 'Back to home',
  },
};
