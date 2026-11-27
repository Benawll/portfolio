export const fr = {
  meta: {
    title: 'Benjamin PEQUIN — Ingénieur Data, IA & Full-Stack',
    description:
      'Portfolio personnel de Benjamin PEQUIN — Ingénieur Data, IA & Full-Stack (Polytech Nantes · Umeå University).',
  },
  nav: {
    projects: 'Projets',
    experience: 'Parcours',
    skills: 'Stack',
    contact: 'Contact',
    cvPdf: 'CV PDF',
    skipToContent: 'Aller au contenu principal',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
  },
  hero: {
    eyebrow:
      'INGÉNIEUR DATA · IA · FULL-STACK — DISPONIBLE IMMÉDIATEMENT (NANTES / PARIS / REMOTE)',
    titleLine1: 'Ingénierie logicielle,',
    titleLine2: 'données & IA',
    titleLine3: 'en production.',
    subtitle:
      "Diplômé de Polytech Nantes avec un semestre Erasmus en IA à l'Université d'Umeå (Suède). Je conçois des architectures hexagonales, des pipelines Data/Cloud et des systèmes IA évalués sur des métriques mesurées.",
    ctaProjects: 'Explorer les projets',
    ctaCv: 'Télécharger le CV',
    proofs: {
      reposLabel: 'Projets open-source',
      reposValue: '04',
      experienceLabel: 'Expériences en entreprise',
      experienceValue: '04',
      toeicLabel: 'Anglais professionnel',
      toeicValue: 'TOEIC 845',
      availabilityLabel: 'Disponibilité',
      availabilityValue: 'Immédiate',
    },
  },
  pillars: {
    index: '02',
    eyebrow: 'Positionnement hybride',
    title: 'Double culture Logiciel & Données',
    subtitle:
      "Trois axes d'ingénierie complémentaires, éprouvés en entreprise chez Sopra Steria, Engie Vianeo et Engie Digital, et prolongés par des projets open-source mesurés.",
    items: [
      {
        index: '01',
        title: 'Data Engineering & Cloud',
        description:
          'Pipelines ETL automatisés sur AWS (Lambda, S3, EventBridge, Athena, Databricks), ingestion streaming Redpanda/Kafka, traitement distribué PySpark Medallion, contrôle qualité Pandera et modélisation dbt Core.',
        proof: 'Engie Vianeo · PulseLake MLOps',
      },
      {
        index: '02',
        title: 'Full-Stack & Architecture Hexagonale',
        description:
          'Conception de systèmes durables en architecture hexagonale, DDD et TDD : API REST/SSE sécurisées (Java/Quarkus, FastAPI), interfaces réactives (React 19, Angular, TypeScript) et CI/CD industrielle.',
        proof: 'Sopra Steria · Engie Digital · AgentFlow Studio',
      },
      {
        index: '03',
        title: 'IA Appliquée, LLMOps & MLOps',
        description:
          "Agents LangGraph, RAG hybride (pgvector + FTS RRF), cache sémantique Redis, modèles ML/NLP (LightGBM, DistilBERT, Flan-T5, Transformers), tracking MLflow et détection de dérive Evidently AI.",
        proof: 'Umeå University · AgentFlow Studio · PulseLake MLOps',
      },
    ],
  },
  projects: {
    index: '03',
    eyebrow: 'Projets phares',
    title: 'Systèmes construits & mesurés',
    subtitle:
      'Quatre réalisations open-source avec benchmarks reproductibles, tests automatisés et architectures documentées.',
    viewCaseStudy: "Voir l'étude de cas",
    viewGithub: 'GitHub',
    scrollHint: 'Défiler pour explorer',
    nextProject: 'Projet suivant',
    backToProjects: 'Retour aux projets',
    sections: {
      metrics: 'Métriques mesurées',
      gallery: 'Captures réelles',
      problem: 'Problème & Enjeux',
      architecture: 'Architecture',
      decisions: "Décisions d'ingénierie",
      stack: 'Stack technique',
    },
  },
  experience: {
    index: '04',
    eyebrow: 'Parcours',
    title: 'Expériences & Formation',
    workHeading: 'Expériences professionnelles',
    educationHeading: 'Formation académique',
    academicProjectsHeading: 'Projets académiques — Umeå University',
  },
  skills: {
    index: '05',
    eyebrow: 'Ingénierie & Outillage',
    title: 'Matrice technique',
    subtitle:
      'Chaque compétence est reliée aux expériences professionnelles ou projets open-source où elle a été mise en œuvre.',
    allFilter: 'Tous',
    proofLabel: 'Prouvé sur',
  },
  contact: {
    index: '06',
    eyebrow: 'Contact & Disponibilité',
    title: 'Disponible immédiatement',
    subtitle:
      'Ouvert aux opportunités CDI, CDD ou Intérim en Data Engineering, Développement Full-Stack ou IA Appliquée — Nantes, Paris ou Remote France.',
    copyEmail: "Copier l'email",
    emailCopied: 'Email copié',
    sendEmail: 'Envoyer un email',
    downloadCv: 'Télécharger le CV (PDF)',
    location: 'La Chapelle-sur-Erdre (Nantes) · Mobilité Paris & Remote France',
    contracts: 'CDI · CDD · Intérim',
    footerRights: 'Benjamin PEQUIN — Construit avec données 100 % réelles.',
  },
  notFound: {
    code: '404',
    title: 'Page introuvable',
    description:
      "La ressource demandée n'existe pas ou a été déplacée.",
    backHome: "Retour à l'accueil",
  },
} as const;

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends readonly (infer U)[]
      ? readonly DeepStringify<U>[]
      : DeepStringify<T[K]>;
};

export type Translations = DeepStringify<typeof fr>;
