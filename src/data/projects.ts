import type { LocalizedText } from '../i18n/LanguageContext';

export interface ProjectMetric {
  label: LocalizedText;
  value: string;
  detail?: LocalizedText;
}

export interface ProjectMedia {
  src: string;
  alt: LocalizedText;
  caption: LocalizedText;
  type: 'image' | 'video';
}

export interface EngineeringDecision {
  title: LocalizedText;
  description: LocalizedText;
}

export interface Project {
  id: string;
  slug: string;
  index: string;
  name: string;
  year: string;
  repoUrl: string;
  category: LocalizedText;
  tagline: LocalizedText;
  summary: LocalizedText;
  role: LocalizedText;
  highlightMetrics: ProjectMetric[];
  allMetrics: ProjectMetric[];
  media: ProjectMedia[];
  problem: LocalizedText;
  architectureSummary: LocalizedText;
  decisions: EngineeringDecision[];
  stack: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'agentflow-studio',
    slug: 'agentflow-studio',
    index: '01',
    name: 'AgentFlow Studio',
    year: '2026',
    repoUrl: 'https://github.com/Benawll/Agentflow-studio',
    category: {
      fr: 'Plateforme Full-Stack IA-Native & LLMOps',
      en: 'AI-Native Full-Stack & LLMOps Platform',
    },
    tagline: {
      fr: 'Agent LangGraph, RAG Hybride (pgvector + FTS RRF), cache sémantique Redis et observabilité Prometheus/Grafana en architecture hexagonale.',
      en: 'LangGraph agent, Hybrid RAG (pgvector + FTS RRF), Redis semantic cache, and Prometheus/Grafana observability in Hexagonal Architecture.',
    },
    summary: {
      fr: "Plateforme Full-Stack & LLMOps conçue en architecture hexagonale, DDD et TDD : graphe LangGraph à 3 nœuds, recherche hybride fusionnée par Reciprocal Rank Fusion (k=60), webhooks idempotents avec backoff exponentiel et DLQ, et interface React 19 avec streaming SSE et citations cliquables.",
      en: 'Full-Stack & LLMOps platform built with Hexagonal Architecture, DDD, and TDD: 3-node LangGraph agent, Reciprocal Rank Fusion (k=60) Hybrid RAG, idempotent webhooks with exponential backoff & DLQ, and a React 19 UI with SSE streaming and clickable citations.',
    },
    role: {
      fr: 'Conception, Architecture & Développement Full-Stack / LLMOps',
      en: 'Design, Architecture & Full-Stack / LLMOps Engineering',
    },
    highlightMetrics: [
      {
        label: { fr: 'Recall@5 (RRF)', en: 'Recall@5 (RRF)' },
        value: '95.0%',
      },
      {
        label: { fr: 'Latence P95', en: 'P95 Latency' },
        value: '4.68 ms',
      },
      {
        label: { fr: 'Couverture Pytest', en: 'Pytest Coverage' },
        value: '95%',
        detail: { fr: '47 tests backend', en: '47 backend tests' },
      },
    ],
    allMetrics: [
      {
        label: { fr: 'Recall@5 (Hybrid RRF)', en: 'Recall@5 (Hybrid RRF)' },
        value: '95.0%',
        detail: {
          fr: '24 requêtes CI déterministes (6 docs, 12 chunks)',
          en: '24 deterministic CI queries (6 docs, 12 chunks)',
        },
      },
      {
        label: { fr: 'Fidélité des citations', en: 'Citation Faithfulness' },
        value: '100.0%',
        detail: {
          fr: 'Citations obligatoires vérifiées',
          en: 'Mandatory verified citations',
        },
      },
      {
        label: { fr: 'Précision routage agent', en: 'Agent Routing Accuracy' },
        value: '100.0%',
        detail: {
          fr: '20 RAG + 4 Webhook',
          en: '20 RAG + 4 Webhook',
        },
      },
      {
        label: { fr: 'Réduction appels LLM', en: 'LLM Call Reduction' },
        value: '-20.0%',
        detail: {
          fr: 'Cache sémantique Redis (cosinus >= 0.92)',
          en: 'Redis semantic cache (cosine >= 0.92)',
        },
      },
      {
        label: { fr: 'Latence globale P50 / P95', en: 'Overall P50 / P95 Latency' },
        value: '3.52 / 4.68 ms',
        detail: {
          fr: 'Cold 3.52/5.33 ms · Warm 3.79/4.27 ms',
          en: 'Cold 3.52/5.33 ms · Warm 3.79/4.27 ms',
        },
      },
      {
        label: { fr: 'Tests Backend Pytest', en: 'Backend Pytest Suite' },
        value: '47 · 95%',
        detail: {
          fr: 'ruff & mypy strict à 0 erreur',
          en: 'ruff & strict mypy with 0 errors',
        },
      },
      {
        label: { fr: 'Tests Frontend Vitest', en: 'Frontend Vitest Suite' },
        value: '11 · 81.86%',
        detail: {
          fr: '4 fichiers de tests React 19',
          en: '4 React 19 test files',
        },
      },
    ],
    media: [
      {
        src: '/media/agentflow-ui.webp',
        alt: {
          fr: "Interface React 19 d'AgentFlow Studio avec chat SSE, citations cliquables et inspecteur de trace",
          en: 'AgentFlow Studio React 19 UI with SSE chat, clickable citations, and trace inspector',
        },
        caption: {
          fr: 'Interface React 19 — Streaming SSE, citations vérifiées et Trace Inspector',
          en: 'React 19 UI — SSE streaming, verified citations, and Trace Inspector',
        },
        type: 'image',
      },
      {
        src: '/media/agentflow-grafana.webp',
        alt: {
          fr: 'Dashboard Grafana agentflow-overview alimenté par Prometheus',
          en: 'Grafana agentflow-overview dashboard powered by Prometheus',
        },
        caption: {
          fr: 'Observabilité Prometheus & Grafana — latence, cache hit rate et tokens',
          en: 'Prometheus & Grafana observability — latency, cache hit rate, and tokens',
        },
        type: 'image',
      },
    ],
    problem: {
      fr: "Les prototypes RAG classiques souffrent d'un couplage fort aux SDK LLM, d'hallucinations sans traçabilité et d'une absence de métriques reproductibles. AgentFlow Studio résout ce problème en isolant le domaine métier derrière des ports stricts et en intégrant évaluation LLMOps, cache sémantique et observabilité dès le premier commit.",
      en: 'Typical RAG prototypes suffer from tight coupling to LLM SDKs, untraceable hallucinations, and a lack of reproducible metrics. AgentFlow Studio addresses this by isolating business logic behind strict ports and embedding LLMOps evaluation, semantic caching, and observability from day one.',
    },
    architectureSummary: {
      fr: 'Architecture hexagonale stricte (`domain/`, `application/`, `adapters/`) exposée via FastAPI REST/SSE, orchestrant un graphe LangGraph à 3 nœuds (`router -> hybrid_rag | webhook_tool`), PostgreSQL 16 + `pgvector`, Redis 7 (cache sémantique & DLQ) et Prometheus/Grafana.',
      en: 'Strict Hexagonal Architecture (`domain/`, `application/`, `adapters/`) exposed via FastAPI REST/SSE, orchestrating a 3-node LangGraph graph (`router -> hybrid_rag | webhook_tool`), PostgreSQL 16 + `pgvector`, Redis 7 (semantic cache & DLQ), and Prometheus/Grafana.',
    },
    decisions: [
      {
        title: {
          fr: 'ADR-001 — PostgreSQL + pgvector plutôt qu’une base vectorielle dédiée',
          en: 'ADR-001 — PostgreSQL + pgvector over a dedicated vector database',
        },
        description: {
          fr: 'Unification de la recherche dense (`pgvector` cosinus) et lexicale (`tsvector` FTS) fusionnées par Reciprocal Rank Fusion (k=60) dans une seule base transactionnelle à 0 €.',
          en: 'Unified dense (`pgvector` cosine) and lexical (`tsvector` FTS) retrieval fused via Reciprocal Rank Fusion (k=60) inside a single transactional database at €0 cost.',
        },
      },
      {
        title: {
          fr: 'ADR-002 — Graphe LangGraph à citations obligatoires',
          en: 'ADR-002 — LangGraph workflow with mandatory citations',
        },
        description: {
          fr: "Chaque réponse RAG est rattachée à des fragments vérifiables (`Citation` value object), permettant d'atteindre 100.0% de fidélité sur le jeu d'évaluation.",
          en: 'Every RAG response is grounded in verifiable source chunks (`Citation` value object), achieving 100.0% citation faithfulness on the evaluation suite.',
        },
      },
      {
        title: {
          fr: 'ADR-003 — Cache sémantique Redis & webhooks idempotents avec DLQ',
          en: 'ADR-003 — Redis semantic cache & idempotent webhooks with DLQ',
        },
        description: {
          fr: 'Seuil cosinus >= 0.92 réduisant de 20.0% les appels LLM sur requêtes similaires, couplé à un dispatcher webhook avec backoff exponentiel et file de lettres mortes.',
          en: 'Cosine threshold >= 0.92 cutting LLM calls by 20.0% on similar queries, paired with a webhook dispatcher featuring exponential backoff and a dead-letter queue.',
        },
      },
    ],
    stack: [
      'Python 3.12',
      'FastAPI',
      'LangGraph',
      'React 19',
      'TypeScript',
      'PostgreSQL 16',
      'pgvector',
      'Redis 7',
      'Prometheus',
      'Grafana',
      'Docker Compose',
      'GitHub Actions',
      'Pytest',
      'Vitest',
      'Mypy',
      'Ruff',
    ],
  },
  {
    id: 'pulselake-mlops',
    slug: 'pulselake-mlops',
    index: '02',
    name: 'PulseLake MLOps',
    year: '2026',
    repoUrl: 'https://github.com/Benawll/PulseLake-MLOps',
    category: {
      fr: 'Plateforme Data Engineering & MLOps End-to-End',
      en: 'End-to-End Data Engineering & MLOps Platform',
    },
    tagline: {
      fr: 'Lakehouse streaming Redpanda/Kafka, PySpark Medallion + Pandera, dbt Core (DuckDB / BigQuery), LightGBM + MLflow et drift Evidently AI.',
      en: 'Redpanda/Kafka streaming Lakehouse, PySpark Medallion + Pandera, dbt Core (DuckDB / BigQuery), LightGBM + MLflow, and Evidently AI drift detection.',
    },
    summary: {
      fr: "Pipeline Data Engineering & MLOps complet pour la télémétrie de bornes de recharge de véhicules électriques (budget 0 €) : ingestion streaming à ~16 892 events/s, traitement distribué Bronze/Silver/Quarantine/Gold, modèles analytiques dbt, scoring temps réel FastAPI et packaging Terraform + Kubernetes.",
      en: 'End-to-end Data Engineering & MLOps platform for EV charging station telemetry (€0 budget): streaming ingestion at ~16,892 events/s, distributed Bronze/Silver/Quarantine/Gold processing, dbt analytics marts, real-time FastAPI scoring, and Terraform + Kubernetes packaging.',
    },
    role: {
      fr: 'Data Engineering, MLOps & Infrastructure as Code',
      en: 'Data Engineering, MLOps & Infrastructure as Code',
    },
    highlightMetrics: [
      {
        label: { fr: 'Débit ingestion', en: 'Ingestion Throughput' },
        value: '16 892 evt/s',
      },
      {
        label: { fr: 'LightGBM F1', en: 'LightGBM F1' },
        value: '0.9995',
      },
      {
        label: { fr: 'Drift détecté', en: 'Detected Drift' },
        value: '0.8 share',
        detail: { fr: '4/5 colonnes (Evidently)', en: '4/5 columns (Evidently)' },
      },
    ],
    allMetrics: [
      {
        label: { fr: 'Ingestion Streaming (100k)', en: 'Streaming Ingestion (100k)' },
        value: '16 892 evt/s',
        detail: {
          fr: '100 000 événements en 5.92 s (Redpanda/JSONL)',
          en: '100,000 events in 5.92 s (Redpanda/JSONL)',
        },
      },
      {
        label: { fr: 'PySpark Medallion + Pandera', en: 'PySpark Medallion + Pandera' },
        value: '54.47 s',
        detail: {
          fr: 'Bronze 100 000 -> Silver 92 993 · Quarantine 4 952 (4.95%)',
          en: 'Bronze 100,000 -> Silver 92,993 · Quarantine 4,952 (4.95%)',
        },
      },
      {
        label: { fr: 'dbt Core (DuckDB)', en: 'dbt Core (DuckDB)' },
        value: '6.35 s',
        detail: {
          fr: '4 modèles analytiques + tests qualité',
          en: '4 analytics models + data quality tests',
        },
      },
      {
        label: { fr: 'LightGBM + MLflow', en: 'LightGBM + MLflow' },
        value: 'F1 0.9995',
        detail: {
          fr: 'Accuracy 0.9999 · ROC-AUC 1.0 (Train 74 394 / Test 18 599)',
          en: 'Accuracy 0.9999 · ROC-AUC 1.0 (Train 74,394 / Test 18,599)',
        },
      },
      {
        label: { fr: 'Détection Drift Evidently AI', en: 'Evidently AI Drift Check' },
        value: '0.8 (4/5)',
        detail: {
          fr: '14.51 s sur 92 993 réf vs 5 000 batch dérivé',
          en: '14.51 s on 92,993 ref vs 5,000 drifted batch',
        },
      },
      {
        label: { fr: 'Scoring FastAPI /predict', en: 'FastAPI /predict Scoring' },
        value: '6.10 / 7.14 ms',
        detail: {
          fr: 'P50 / P95 sur 100 requêtes + Prometheus /metrics',
          en: 'P50 / P95 over 100 requests + Prometheus /metrics',
        },
      },
    ],
    media: [
      {
        src: '/media/pulselake-evidently.webp',
        alt: {
          fr: 'Rapport HTML Evidently AI montrant un drift_share de 0.8 sur 4 colonnes sur 5',
          en: 'Evidently AI HTML report showing 0.8 drift_share across 4 out of 5 columns',
        },
        caption: {
          fr: 'Rapport Evidently AI — Détection automatique de dérive (drift_share: 0.8)',
          en: 'Evidently AI Report — Automated data drift detection (drift_share: 0.8)',
        },
        type: 'image',
      },
      {
        src: '/media/pulselake-mlflow.webp',
        alt: {
          fr: 'Interface MLflow présentant les runs LightGBM et les métriques enregistrées',
          en: 'MLflow UI displaying LightGBM runs and logged metrics',
        },
        caption: {
          fr: 'MLflow Model Registry — Suivi des runs LightGBM (Accuracy 0.9999, F1 0.9995)',
          en: 'MLflow Model Registry — LightGBM run tracking (Accuracy 0.9999, F1 0.9995)',
        },
        type: 'image',
      },
      {
        src: '/media/pulselake-console.webp',
        alt: {
          fr: 'Console Redpanda et API FastAPI /predict pour la télémétrie VE',
          en: 'Redpanda Console and FastAPI /predict scoring service for EV telemetry',
        },
        caption: {
          fr: 'Streaming Redpanda & API de scoring temps réel FastAPI',
          en: 'Redpanda streaming & FastAPI real-time scoring API',
        },
        type: 'image',
      },
    ],
    problem: {
      fr: "Exploiter en continu la télémétrie de bornes de recharge VE exige d'isoler les anomalies sans bloquer le flux, de fournir des KPI fiables pour le pilotage SLA et de détecter automatiquement la dérive des données en production pour anticiper les pannes.",
      en: 'Continuously processing EV charging station telemetry requires isolating anomalies without stalling the pipeline, delivering reliable SLA analytics, and automatically detecting production data drift to anticipate equipment faults.',
    },
    architectureSummary: {
      fr: 'Producteur Python (100k+ événements) → Redpanda/Kafka → PySpark Medallion (Bronze, Silver, Quarantine, Gold en Parquet) avec validation Pandera → dbt Core (DuckDB local CI + GCP BigQuery Sandbox) → LightGBM + MLflow → FastAPI `/predict` + Prometheus + CronJob Evidently AI, packagé en Terraform et Kubernetes.',
      en: 'Python producer (100k+ events) → Redpanda/Kafka → PySpark Medallion (Bronze, Silver, Quarantine, Gold Parquet) with Pandera validation → dbt Core (local DuckDB CI + GCP BigQuery Sandbox) → LightGBM + MLflow → FastAPI `/predict` + Prometheus + Evidently AI CronJob, packaged with Terraform and Kubernetes.',
    },
    decisions: [
      {
        title: {
          fr: 'Quarantaine explicite via PySpark + Pandera',
          en: 'Explicit Quarantine layer via PySpark + Pandera',
        },
        description: {
          fr: 'Plutôt que de rejeter silencieusement les lignes invalides, les 4 952 anomalies (4.95%) sont routées vers une table Quarantine auditable pendant que les 92 993 lignes valides alimentent Silver et Gold.',
          en: 'Rather than silently dropping invalid rows, all 4,952 anomalies (4.95%) are routed to an auditable Quarantine layer while the 92,993 valid rows flow into Silver and Gold.',
        },
      },
      {
        title: {
          fr: 'Double cible dbt Core : DuckDB local + GCP BigQuery Sandbox',
          en: 'Dual dbt Core targets: local DuckDB + GCP BigQuery Sandbox',
        },
        description: {
          fr: 'Permet de valider les 4 modèles analytiques et tests de données en 6.35 s en CI gratuite tout en gardant un déploiement cloud partitionné/clusterisé déclaratif via Terraform.',
          en: 'Validates all 4 analytics models and data tests in 6.35 s on free CI while keeping a declarative partitioned/clustered cloud target provisioned via Terraform.',
        },
      },
      {
        title: {
          fr: 'Observabilité ML & Infrastructure validée en CI',
          en: 'ML Observability & CI-validated Infrastructure',
        },
        description: {
          fr: 'CronJob Kubernetes dédié au contrôle de drift Evidently AI (`connector_status`, `power_kw`, `temperature_c`, `voltage_v`), manifestes vérifiés par `kubeconform -strict` et Terraform validé dans GitHub Actions.',
          en: 'Dedicated Kubernetes CronJob for Evidently AI drift checks (`connector_status`, `power_kw`, `temperature_c`, `voltage_v`), manifests validated via `kubeconform -strict` and Terraform checked in GitHub Actions.',
        },
      },
    ],
    stack: [
      'Python',
      'Redpanda / Kafka',
      'PySpark',
      'Pandera',
      'dbt Core',
      'DuckDB',
      'GCP BigQuery',
      'LightGBM',
      'MLflow',
      'Evidently AI',
      'FastAPI',
      'Prometheus',
      'Terraform',
      'Kubernetes',
      'Docker Compose',
      'GitHub Actions',
    ],
  },
  {
    id: 'awll-disk-utility',
    slug: 'awll-disk-utility',
    index: '03',
    name: 'Awll Disk Utility',
    year: '2026',
    repoUrl: 'https://github.com/Benawll/Awll-Disk-Utility',
    category: {
      fr: 'Logiciel Windows Desktop & Ingénierie Système',
      en: 'Windows Desktop Software & Systems Engineering',
    },
    tagline: {
      fr: 'Utilitaire Windows 10/11 en C# / .NET 6 / WPF / WebView2 : Space Lens 0 ms via FileSystemEnumerator, doublons SHA-256 parallèles et 23/23 tests xUnit.',
      en: 'Windows 10/11 desktop utility in C# / .NET 6 / WPF / WebView2: 0 ms Space Lens via FileSystemEnumerator, parallel SHA-256 duplicate detection, and 23/23 xUnit tests.',
    },
    summary: {
      fr: "Application desktop Windows complète (v1.1.0) combinant un moteur système bas niveau en C# et une interface Clair/Sombre WebView2 : audit multi-disques dynamique, explorateur Space Lens à navigation instantanée (0 ms), détecteur de doublons SHA-256 en 3 étapes, enquête forensique hors-ligne + mode IA Gemini optionnel et installeur autonome.",
      en: 'Complete Windows desktop application (v1.1.0) pairing a low-level C# systems engine with a Light/Dark WebView2 UI: dynamic multi-drive audit, instant-navigation (0 ms) Space Lens explorer, 3-stage parallel SHA-256 duplicate finder, offline forensic inspection + optional Gemini AI mode, and a standalone installer.',
    },
    role: {
      fr: 'Ingénierie Système Windows, Architecture MVVM & Release',
      en: 'Windows Systems Engineering, MVVM Architecture & Release',
    },
    highlightMetrics: [
      {
        label: { fr: 'Tests xUnit', en: 'xUnit Tests' },
        value: '23 / 23',
      },
      {
        label: { fr: 'Navigation Space Lens', en: 'Space Lens Nav' },
        value: '0 ms',
      },
      {
        label: { fr: 'Doublons', en: 'Duplicates' },
        value: 'SHA-256 //',
        detail: { fr: 'Pipeline 3 étapes', en: '3-stage pipeline' },
      },
    ],
    allMetrics: [
      {
        label: { fr: 'Suite de tests unitaires', en: 'Unit Test Suite' },
        value: '23 / 23 xUnit',
        detail: {
          fr: 'Exécutés automatiquement dans build-release.ps1',
          en: 'Executed automatically in build-release.ps1',
        },
      },
      {
        label: { fr: 'Navigation Space Lens', en: 'Space Lens Navigation' },
        value: '0 ms',
        detail: {
          fr: 'Indexation bottom-up via FileSystemEnumerator sans allocation FileInfo',
          en: 'Bottom-up indexing via FileSystemEnumerator with zero FileInfo allocations',
        },
      },
      {
        label: { fr: 'Pipeline Doublons SHA-256', en: 'SHA-256 Duplicate Pipeline' },
        value: '3 étapes',
        detail: {
          fr: 'Filtre taille -> pré-hash parallèle -> SHA-256 complet parallèle',
          en: 'Size filter -> parallel partial hash -> parallel full SHA-256',
        },
      },
      {
        label: { fr: 'Installeur Windows (.NET 4.8)', en: 'Windows Setup (.NET 4.8)' },
        value: '~62.8 Mo',
        detail: {
          fr: 'Autonome avec mise à jour en place et désinstalleur intégré',
          en: 'Standalone with in-place upgrade and built-in uninstaller',
        },
      },
      {
        label: { fr: 'Version Portable (.NET 6)', en: 'Portable Build (.NET 6)' },
        value: '~68.0 Mo',
        detail: {
          fr: 'Binaire single-file sans installation',
          en: 'Single-file binary requiring no installation',
        },
      },
      {
        label: { fr: 'Sécurité nettoyage', en: 'Cleanup Safety' },
        value: 'Dry-Run + Win32',
        detail: {
          fr: 'Modale Dry-Run obligatoire, Corbeille Win32 par défaut, Liste Protégée',
          en: 'Mandatory Dry-Run modal, Win32 Recycle Bin default, Protected List',
        },
      },
    ],
    media: [
      {
        src: '/media/awll-disk-utility.webp',
        alt: {
          fr: "Capture de l'application Windows Awll Disk Utility (Audit / Space Lens)",
          en: 'Screenshot of Awll Disk Utility Windows desktop app (Audit / Space Lens)',
        },
        caption: {
          fr: 'Awll Disk Utility v1.1.0 — Interface Clair/Sombre WPF + WebView2',
          en: 'Awll Disk Utility v1.1.0 — Light/Dark WPF + WebView2 interface',
        },
        type: 'image',
      },
    ],
    problem: {
      fr: "Les utilitaires de nettoyage Windows grand public sont souvent opaques, lents sur les disques volumineux ou risqués pour les fichiers système. Awll Disk Utility apporte transparence forensique, haute performance d'indexation et garde-fous stricts (Dry-Run + Corbeille Win32).",
      en: 'Consumer Windows disk cleaners are often opaque, slow on large drives, or risky for critical system files. Awll Disk Utility delivers forensic transparency, high-speed indexing, and strict safety guardrails (Dry-Run + Win32 Recycle Bin).',
    },
    architectureSummary: {
      fr: 'Application WPF (.NET 6) communicant via bridge bidirectionnel avec WebView2 (`MainWindow.xaml.cs`), backend découpé par responsabilités (`Scanners/`, `Services/`, `Models/`), suite de tests `Awll.Tests` (23 tests xUnit) et installeur natif `AwllInstaller` (.NET Framework 4.8).',
      en: 'WPF (.NET 6) application communicating over a bidirectional WebView2 bridge (`MainWindow.xaml.cs`), modular backend (`Scanners/`, `Services/`, `Models/`), `Awll.Tests` suite (23 xUnit tests), and native `AwllInstaller` (.NET Framework 4.8).',
    },
    decisions: [
      {
        title: {
          fr: 'Indexation bottom-up sans allocation via FileSystemEnumerator',
          en: 'Zero-allocation bottom-up indexing via FileSystemEnumerator',
        },
        description: {
          fr: 'Évite la création de millions d’objets `FileInfo` pour permettre une navigation instantanée (0 ms) dans Space Lens avec treemap proportionnelle interactive.',
          en: 'Avoids allocating millions of `FileInfo` objects to deliver instant (0 ms) Space Lens folder navigation with an interactive proportional treemap.',
        },
      },
      {
        title: {
          fr: 'Détection de doublons SHA-256 en 3 passes parallèles',
          en: '3-stage parallel SHA-256 duplicate detection',
        },
        description: {
          fr: 'Filtre par seuil de taille (50/100/500 Mo), puis pré-empreinte rapide (début + milieu + fin) avant de lancer le SHA-256 complet uniquement sur les collisions réelles.',
          en: 'Filters by size threshold (50/100/500 MB), computes a fast parallel partial hash (head + middle + tail), and runs full SHA-256 only on surviving candidates.',
        },
      },
      {
        title: {
          fr: 'Sécurité par conception : Dry-Run, Corbeille Win32 & sanctuarisation',
          en: 'Safety by design: Dry-Run, Win32 Recycle Bin & protected components',
        },
        description: {
          fr: 'Modale Dry-Run obligatoire avant toute action, interrogation `SHQueryRecycleBin` pour les résidus `$R*`, et protection permanente de `System32`, `Java` et `NVIDIA NGX`.',
          en: 'Mandatory Dry-Run preview before every action, `SHQueryRecycleBin` inspection for orphaned `$R*` items, and permanent protection for `System32`, `Java`, and `NVIDIA NGX`.',
        },
      },
    ],
    stack: [
      'C#',
      '.NET 6',
      'WPF',
      'WebView2',
      'Win32 API',
      'SHA-256',
      'xUnit',
      '.NET 4.8 Setup',
      'MVVM',
      'HTML / CSS / JS',
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx === -1) return PROJECTS[0];
  return PROJECTS[(idx + 1) % PROJECTS.length];
}
