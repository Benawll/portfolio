import type { LocalizedText } from '../i18n/LanguageContext';

export interface WorkExperience {
  id: string;
  company: string;
  location: LocalizedText;
  role: LocalizedText;
  period: string;
  context?: LocalizedText;
  highlights: LocalizedText[];
  stack: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  location: LocalizedText;
  degree: LocalizedText;
  period: string;
  details?: LocalizedText;
}

export interface AcademicProject {
  id: string;
  title: string;
  institution: string;
  period: string;
  highlights: LocalizedText[];
  stack: string[];
}

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'sopra-steria',
    company: 'Sopra Steria',
    location: { fr: 'Saint-Herblain, France', en: 'Saint-Herblain, France' },
    role: {
      fr: 'Développeur Java / Angular',
      en: 'Java / Angular Developer',
    },
    period: '02/2025 – 07/2025',
    context: {
      fr: 'Client France Travail — Équipe Scrum (~15 personnes)',
      en: 'Client France Travail — Scrum Team (~15 people)',
    },
    highlights: [
      {
        fr: "Conception et développement de fonctionnalités full-stack pour moderniser la gestion des aides aux entreprises (France Travail) en architecture hexagonale.",
        en: 'Designed and developed full-stack features to modernize business grant management (France Travail) using Hexagonal Architecture.',
      },
      {
        fr: "Modélisation d'une base Oracle de 8 tables avec Oracle Data Modeler, API REST avec JPA et MapStruct, composants Angular (affichage conditionnel, gestion des IBAN) et tests automatisés (Cypress/Gherkin, TU).",
        en: 'Modeled an 8-table Oracle database with Oracle Data Modeler, built REST APIs with JPA and MapStruct, implemented Angular components (conditional views, IBAN handling), and automated tests (Cypress/Gherkin, unit tests).',
      },
      {
        fr: 'Intégration CI/CD via Concourse et SonarQube en Java (Quarkus) / Angular, documentation API avec Swagger et gestion projet/support sur Confluence.',
        en: 'Integrated CI/CD pipelines with Concourse and SonarQube using Java (Quarkus) and Angular, documented APIs with Swagger, and managed documentation in Confluence.',
      },
    ],
    stack: [
      'Java',
      'Quarkus',
      'Angular',
      'TypeScript',
      'Oracle Database',
      'JPA / MapStruct',
      'Hexagonal Architecture',
      'Cypress (Gherkin)',
      'Concourse',
      'SonarQube',
      'Swagger',
    ],
  },
  {
    id: 'engie-vianeo',
    company: 'Engie Vianeo',
    location: { fr: 'Nantes, France', en: 'Nantes, France' },
    role: {
      fr: 'Développeur Python Cloud & Data',
      en: 'Python Cloud & Data Developer',
    },
    period: '05/2024 – 08/2024',
    highlights: [
      {
        fr: 'Conception et développement de pipelines ETL automatisés sur AWS (Lambda, S3, EventBridge, Databricks) en Python pour le traitement des données.',
        en: 'Designed and built automated Python ETL pipelines on AWS (Lambda, S3, EventBridge, Databricks) for cloud data processing.',
      },
      {
        fr: 'Extraction depuis Salesforce via requêtes SOQL, transformation de formats (JSON vers Avro et Parquet) et consolidation multi-sources.',
        en: 'Extracted data from Salesforce via SOQL queries, converted formats (JSON to Avro and Parquet), and consolidated multi-source datasets.',
      },
      {
        fr: 'Contrôles de cohérence et de qualité des données pour détecter les anomalies, puis mise à disposition dans Power BI via Amazon Athena.',
        en: 'Implemented data consistency and quality checks to detect anomalies, enabling Power BI analytics via Amazon Athena.',
      },
    ],
    stack: [
      'Python',
      'AWS Lambda',
      'AWS S3',
      'EventBridge',
      'Databricks',
      'Amazon Athena',
      'Salesforce SOQL',
      'Parquet / Avro',
      'Power BI',
    ],
  },
  {
    id: 'albearson',
    company: 'Albearson',
    location: { fr: 'Sucé-sur-Erdre, France', en: 'Sucé-sur-Erdre, France' },
    role: {
      fr: 'Développeur PHP',
      en: 'PHP Developer',
    },
    period: '06/2023 – 07/2023',
    highlights: [
      {
        fr: "Prototypage d'un site vitrine administrable en PHP suivant une architecture MVC.",
        en: 'Prototyped a manageable showcase website in PHP following MVC architecture.',
      },
      {
        fr: "Développement d'un back-office comprenant 6 modules CRUD et un système de gestion des rôles utilisateurs.",
        en: 'Built a back-office featuring 6 CRUD modules and a role-based user management system.',
      },
      {
        fr: 'Supervision du déploiement en environnement de production.',
        en: 'Supervised deployment to the production environment.',
      },
    ],
    stack: ['PHP', 'MVC', 'MySQL', 'HTML / CSS', 'Production Deployment'],
  },
  {
    id: 'engie-digital',
    company: 'Engie Digital',
    location: { fr: 'Paris, France', en: 'Paris, France' },
    role: {
      fr: 'Développeur Java - Angular',
      en: 'Java - Angular Developer',
    },
    period: '05/2022 – 07/2022',
    context: {
      fr: "Plateforme Livin' (hyperviseur urbain) — Agile Scrum / SAFe",
      en: "Livin' platform (urban hypervisor) — Agile Scrum / SAFe",
    },
    highlights: [
      {
        fr: "Développement front-end Angular et back-end Java en appliquant une architecture propre et hexagonale pour la plateforme Livin'.",
        en: "Developed Angular front-end and Java back-end features applying Clean and Hexagonal Architecture for the Livin' urban hypervisor.",
      },
      {
        fr: "Implémentation d'un système de notifications complet et sécurisation des API avec SecuredQuery.",
        en: 'Implemented an end-to-end notification system and secured REST APIs using SecuredQuery.',
      },
      {
        fr: "Collaboration au sein d'une équipe Agile Scrum/SAFe en TypeScript et Java.",
        en: 'Collaborated within an Agile Scrum/SAFe engineering team in TypeScript and Java.',
      },
    ],
    stack: [
      'Java',
      'Angular',
      'TypeScript',
      'Hexagonal Architecture',
      'SecuredQuery',
      'Scrum / SAFe',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'polytech-nantes',
    institution: 'Polytech Nantes',
    location: { fr: 'Nantes, France', en: 'Nantes, France' },
    degree: {
      fr: "Ingénieur Informatique (Diplôme d'ingénieur BAC+5)",
      en: 'M.Eng. in Computer Science (French Engineering Degree)',
    },
    period: '09/2022 – 07/2025',
  },
  {
    id: 'umea-university',
    institution: 'Umeå University',
    location: { fr: 'Umeå, Suède', en: 'Umeå, Sweden' },
    degree: {
      fr: 'Semestre Erasmus en anglais — IA & Algorithmes',
      en: 'Erasmus Exchange Semester (English) — AI & Algorithms',
    },
    period: '08/2024 – 01/2025',
    details: {
      fr: 'Efficient Algorithms · Natural Language Processing · Human-AI Interaction · Algorithms and Systems for Autonomous Vehicles.',
      en: 'Efficient Algorithms · Natural Language Processing · Human-AI Interaction · Algorithms and Systems for Autonomous Vehicles.',
    },
  },
  {
    id: 'iut-nantes',
    institution: 'IUT de Nantes',
    location: { fr: 'Nantes, France', en: 'Nantes, France' },
    degree: {
      fr: 'DUT Informatique',
      en: 'Two-Year University Diploma in Computer Science (DUT)',
    },
    period: '09/2020 – 07/2022',
  },
  {
    id: 'lycee-monge',
    institution: 'Lycée Monge La Chauvinière',
    location: { fr: 'Nantes, France', en: 'Nantes, France' },
    degree: {
      fr: 'Baccalauréat Scientifique — SI & ISN (Mention Bien)',
      en: 'French Scientific Baccalaureate — Engineering & CS (Honors)',
    },
    period: '09/2017 – 07/2020',
  },
];

export const ACADEMIC_PROJECTS: AcademicProject[] = [
  {
    id: 'umea-nlp',
    title: 'Natural Language Processing',
    institution: 'Umeå University',
    period: '08/2024 – 01/2025',
    highlights: [
      {
        fr: 'Classification automatique de textes par thème et détection de fausses informations (TF-IDF, GloVe, DistilBERT).',
        en: 'Automated topic classification and fake-news detection comparing TF-IDF, GloVe, and DistilBERT representations.',
      },
      {
        fr: 'Analyse de sentiment avec Flan-T5 et comparaison systématique de stratégies de prompt engineering.',
        en: 'Sentiment analysis with Flan-T5 using systematic prompt engineering evaluation.',
      },
    ],
    stack: [
      'Python',
      'PyTorch',
      'Hugging Face Transformers',
      'TensorFlow / Keras',
      'Scikit-learn',
      'Gensim',
      'NLTK',
    ],
  },
  {
    id: 'umea-av',
    title: 'Algorithms and Systems for Autonomous Vehicles',
    institution: 'Umeå University',
    period: '08/2024 – 01/2025',
    highlights: [
      {
        fr: "Détection d'objets dans des images et nuages de points 3D via CNN et ResNet.",
        en: 'Object detection on 2D images and 3D point clouds using CNN and ResNet architectures.',
      },
      {
        fr: 'Modèle Transformer pour la prédiction de trajectoires de véhicules et agent Deep Q-Network (DQN) en simulation de conduite.',
        en: 'Transformer model for vehicle trajectory prediction and Deep Q-Network (DQN) RL agent in driving simulation.',
      },
    ],
    stack: [
      'Python',
      'TensorFlow',
      'Keras / KerasHub',
      'Gymnasium',
      'Stable-Baselines3',
      'NumPy',
      'Pandas',
    ],
  },
];
