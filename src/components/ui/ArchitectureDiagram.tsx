import { useLanguage } from '../../i18n/LanguageContext';

interface ArchitectureDiagramProps {
  projectId: string;
}

const C = {
  bg: '#F5F2EB',
  surface: '#ECE8DF',
  ink: '#141413',
  muted: '#5E5B54',
  border: '#D8D3C8',
  accent: '#C84B31',
  tech: '#2D6A4F',
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

function ArrowDefs({ idPrefix }: { idPrefix: string }) {
  return (
    <defs>
      <marker
        id={`${idPrefix}-arrow-ink`}
        viewBox="0 0 10 10"
        refX="8.5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill={C.ink} />
      </marker>
      <marker
        id={`${idPrefix}-arrow-accent`}
        viewBox="0 0 10 10"
        refX="8.5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill={C.accent} />
      </marker>
      <marker
        id={`${idPrefix}-arrow-tech`}
        viewBox="0 0 10 10"
        refX="8.5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill={C.tech} />
      </marker>
    </defs>
  );
}

function AgentFlowDiagram({ isFr }: { isFr: boolean }) {
  return (
    <svg
      viewBox="0 0 960 400"
      className="h-auto w-full select-none"
      role="img"
      aria-label={
        isFr
          ? "Schéma d'architecture hexagonale d'AgentFlow Studio"
          : 'AgentFlow Studio hexagonal architecture diagram'
      }
    >
      <title>
        {isFr
          ? "Architecture Hexagonale & LLMOps — AgentFlow Studio"
          : 'Hexagonal & LLMOps Architecture — AgentFlow Studio'}
      </title>
      <ArrowDefs idPrefix="af" />

      {/* Background */}
      <rect x="0" y="0" width="960" height="400" fill={C.bg} />

      {/* Subtle architectural header line */}
      <text
        x="28"
        y="30"
        fill={C.muted}
        fontSize="10"
        fontFamily={C.mono}
        letterSpacing="1.6"
      >
        FIG 01 — HEXAGONAL ARCHITECTURE · LANGGRAPH + HYBRID RAG + REDIS
      </text>
      <line x1="28" y1="42" x2="932" y2="42" stroke={C.border} strokeWidth="1" />

      {/* Left: React 19 UI */}
      <rect
        x="28"
        y="120"
        width="168"
        height="156"
        fill={C.surface}
        stroke={C.ink}
        strokeWidth="1.25"
      />
      <rect x="28" y="120" width="168" height="24" fill={C.ink} />
      <text
        x="40"
        y="136"
        fill={C.bg}
        fontSize="10"
        fontFamily={C.mono}
        letterSpacing="1"
      >
        CLIENT UI
      </text>
      <text
        x="40"
        y="168"
        fill={C.ink}
        fontSize="13"
        fontWeight="600"
        fontFamily={C.mono}
      >
        React 19 + TS
      </text>
      <text x="40" y="190" fill={C.muted} fontSize="10.5" fontFamily={C.mono}>
        • Streaming SSE
      </text>
      <text x="40" y="208" fill={C.muted} fontSize="10.5" fontFamily={C.mono}>
        • {isFr ? 'Citations cliquables' : 'Clickable citations'}
      </text>
      <text x="40" y="226" fill={C.muted} fontSize="10.5" fontFamily={C.mono}>
        • Trace Inspector
      </text>
      <text x="40" y="258" fill={C.tech} fontSize="10" fontFamily={C.mono}>
        Vitest 11 · 81.86%
      </text>

      {/* Arrow UI -> FastAPI */}
      <line
        x1="196"
        y1="198"
        x2="246"
        y2="198"
        stroke={C.accent}
        strokeWidth="1.5"
        markerEnd="url(#af-arrow-accent)"
      />
      <text
        x="221"
        y="188"
        textAnchor="middle"
        fill={C.accent}
        fontSize="9.5"
        fontFamily={C.mono}
      >
        SSE
      </text>

      {/* Center: Hexagonal Core Boundary */}
      <rect
        x="252"
        y="68"
        width="386"
        height="268"
        fill="none"
        stroke={C.accent}
        strokeWidth="1.25"
        strokeDasharray="5 4"
      />
      <rect x="264" y="58" width="234" height="20" fill={C.bg} />
      <text
        x="270"
        y="71"
        fill={C.accent}
        fontSize="10"
        fontWeight="600"
        fontFamily={C.mono}
        letterSpacing="1.2"
      >
        HEXAGONAL CORE · DOMAIN / APP
      </text>

      {/* FastAPI Inbound Adapter */}
      <rect
        x="270"
        y="120"
        width="126"
        height="156"
        fill={C.surface}
        stroke={C.ink}
        strokeWidth="1.25"
      />
      <text
        x="282"
        y="142"
        fill={C.muted}
        fontSize="9.5"
        fontFamily={C.mono}
        letterSpacing="0.8"
      >
        INBOUND ADAPTER
      </text>
      <text
        x="282"
        y="166"
        fill={C.ink}
        fontSize="13"
        fontWeight="600"
        fontFamily={C.mono}
      >
        FastAPI
      </text>
      <text x="282" y="188" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        POST /ingest
      </text>
      <text x="282" y="205" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        POST /chat/sse
      </text>
      <text x="282" y="222" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        GET /metrics
      </text>
      <text x="282" y="258" fill={C.tech} fontSize="10" fontFamily={C.mono}>
        Pytest 47 · 95%
      </text>

      {/* Arrow FastAPI -> LangGraph */}
      <line
        x1="396"
        y1="198"
        x2="424"
        y2="198"
        stroke={C.ink}
        strokeWidth="1.25"
        markerEnd="url(#af-arrow-ink)"
      />

      {/* LangGraph 3-node orchestrator */}
      <rect
        x="430"
        y="94"
        width="190"
        height="216"
        fill={C.bg}
        stroke={C.ink}
        strokeWidth="1.25"
      />
      <rect x="430" y="94" width="190" height="24" fill={C.accent} />
      <text
        x="442"
        y="110"
        fill={C.bg}
        fontSize="10"
        fontFamily={C.mono}
        letterSpacing="0.8"
      >
        LANGGRAPH · 3 NODES
      </text>

      {/* Node 1: router */}
      <rect
        x="448"
        y="132"
        width="154"
        height="34"
        fill={C.surface}
        stroke={C.ink}
        strokeWidth="1"
      />
      <text
        x="525"
        y="153"
        textAnchor="middle"
        fill={C.ink}
        fontSize="11"
        fontWeight="600"
        fontFamily={C.mono}
      >
        01 · router (100%)
      </text>

      {/* Branch arrows */}
      <line
        x1="488"
        y1="166"
        x2="488"
        y2="194"
        stroke={C.ink}
        strokeWidth="1"
        markerEnd="url(#af-arrow-ink)"
      />
      <line
        x1="562"
        y1="166"
        x2="562"
        y2="246"
        stroke={C.muted}
        strokeWidth="1"
        strokeDasharray="3 2"
        markerEnd="url(#af-arrow-ink)"
      />

      {/* Node 2: hybrid_rag */}
      <rect
        x="448"
        y="198"
        width="154"
        height="40"
        fill={C.surface}
        stroke={C.tech}
        strokeWidth="1.25"
      />
      <text
        x="525"
        y="216"
        textAnchor="middle"
        fill={C.ink}
        fontSize="11"
        fontWeight="600"
        fontFamily={C.mono}
      >
        02 · hybrid_rag
      </text>
      <text
        x="525"
        y="231"
        textAnchor="middle"
        fill={C.tech}
        fontSize="9.5"
        fontFamily={C.mono}
      >
        Citation VO · 100%
      </text>

      {/* Node 3: webhook_tool */}
      <rect
        x="448"
        y="252"
        width="154"
        height="42"
        fill={C.surface}
        stroke={C.ink}
        strokeWidth="1"
      />
      <text
        x="525"
        y="270"
        textAnchor="middle"
        fill={C.ink}
        fontSize="11"
        fontWeight="600"
        fontFamily={C.mono}
      >
        03 · webhook_tool
      </text>
      <text
        x="525"
        y="285"
        textAnchor="middle"
        fill={C.muted}
        fontSize="9.5"
        fontFamily={C.mono}
      >
        Idempotent + Backoff
      </text>

      {/* Right Column: Driven Adapters */}
      {/* 1. PostgreSQL + pgvector */}
      <line
        x1="620"
        y1="140"
        x2="684"
        y2="112"
        stroke={C.tech}
        strokeWidth="1.25"
        markerEnd="url(#af-arrow-tech)"
      />
      <rect
        x="690"
        y="68"
        width="242"
        height="84"
        fill={C.surface}
        stroke={C.tech}
        strokeWidth="1.25"
      />
      <text
        x="704"
        y="90"
        fill={C.ink}
        fontSize="12"
        fontWeight="600"
        fontFamily={C.mono}
      >
        PostgreSQL 16 + pgvector
      </text>
      <text x="704" y="109" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        Dense Cosine + tsvector FTS
      </text>
      <text x="704" y="126" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        Reciprocal Rank Fusion (k=60)
      </text>
      <text
        x="704"
        y="143"
        fill={C.tech}
        fontSize="10"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Recall@5: 95.0%
      </text>

      {/* 2. Redis 7 */}
      <line
        x1="620"
        y1="212"
        x2="684"
        y2="212"
        stroke={C.accent}
        strokeWidth="1.25"
        markerEnd="url(#af-arrow-accent)"
      />
      <rect
        x="690"
        y="170"
        width="242"
        height="84"
        fill={C.surface}
        stroke={C.ink}
        strokeWidth="1.25"
      />
      <text
        x="704"
        y="192"
        fill={C.ink}
        fontSize="12"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Redis 7 (Cache &amp; DLQ)
      </text>
      <text x="704" y="211" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        Semantic Cache (cos ≥ 0.92)
      </text>
      <text x="704" y="228" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        Webhook Dead-Letter Queue
      </text>
      <text
        x="704"
        y="245"
        fill={C.accent}
        fontSize="10"
        fontWeight="600"
        fontFamily={C.mono}
      >
        -20.0% LLM calls
      </text>

      {/* 3. Prometheus + Grafana */}
      <line
        x1="620"
        y1="280"
        x2="684"
        y2="306"
        stroke={C.tech}
        strokeWidth="1.25"
        markerEnd="url(#af-arrow-tech)"
      />
      <rect
        x="690"
        y="272"
        width="242"
        height="78"
        fill={C.surface}
        stroke={C.ink}
        strokeWidth="1.25"
      />
      <text
        x="704"
        y="294"
        fill={C.ink}
        fontSize="12"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Prometheus + Grafana
      </text>
      <text x="704" y="313" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        {isFr ? 'Latence · Cache hit · Tokens' : 'Latency · Cache hit · Tokens'}
      </text>
      <text
        x="704"
        y="334"
        fill={C.tech}
        fontSize="10"
        fontWeight="600"
        fontFamily={C.mono}
      >
        P50 3.52 ms · P95 4.68 ms
      </text>

      {/* Footer legend */}
      <line x1="28" y1="368" x2="932" y2="368" stroke={C.border} strokeWidth="1" />
      <text x="28" y="386" fill={C.muted} fontSize="9.5" fontFamily={C.mono}>
        {isFr
          ? 'PORTS STRICTS · ZERO COUPLAGE SDK · DOCKER COMPOSE + GITHUB ACTIONS (RUFF / MYPY STRICT)'
          : 'STRICT PORTS · ZERO SDK COUPLING · DOCKER COMPOSE + GITHUB ACTIONS (RUFF / STRICT MYPY)'}
      </text>
    </svg>
  );
}

function PulseLakeDiagram({ isFr }: { isFr: boolean }) {
  return (
    <svg
      viewBox="0 0 960 410"
      className="h-auto w-full select-none"
      role="img"
      aria-label={
        isFr
          ? "Schéma d'architecture Lakehouse et MLOps de PulseLake MLOps"
          : 'PulseLake MLOps Lakehouse and MLOps architecture diagram'
      }
    >
      <title>
        {isFr
          ? 'Lakehouse Streaming & MLOps — PulseLake MLOps'
          : 'Streaming Lakehouse & MLOps — PulseLake MLOps'}
      </title>
      <ArrowDefs idPrefix="pl" />

      <rect x="0" y="0" width="960" height="410" fill={C.bg} />

      <text
        x="28"
        y="30"
        fill={C.muted}
        fontSize="10"
        fontFamily={C.mono}
        letterSpacing="1.6"
      >
        FIG 02 — EV TELEMETRY LAKEHOUSE · MEDALLION + DBT + MLFLOW + DRIFT
      </text>
      <line x1="28" y1="42" x2="932" y2="42" stroke={C.border} strokeWidth="1" />

      {/* Top Row: Streaming Ingestion -> PySpark Medallion -> dbt Core */}
      {/* 1. Producer + Redpanda */}
      <rect
        x="28"
        y="68"
        width="176"
        height="126"
        fill={C.surface}
        stroke={C.ink}
        strokeWidth="1.25"
      />
      <rect x="28" y="68" width="176" height="22" fill={C.ink} />
      <text x="38" y="83" fill={C.bg} fontSize="9.5" fontFamily={C.mono}>
        INGESTION STREAMING
      </text>
      <text
        x="38"
        y="112"
        fill={C.ink}
        fontSize="12"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Python → Redpanda
      </text>
      <text x="38" y="131" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        Kafka API · EV Telemetry
      </text>
      <text x="38" y="149" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        100 000 events / 5.92 s
      </text>
      <text
        x="38"
        y="178"
        fill={C.accent}
        fontSize="10.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        16 892 evt/s
      </text>

      <line
        x1="204"
        y1="131"
        x2="236"
        y2="131"
        stroke={C.ink}
        strokeWidth="1.25"
        markerEnd="url(#pl-arrow-ink)"
      />

      {/* 2. PySpark Medallion + Pandera */}
      <rect
        x="242"
        y="60"
        width="430"
        height="148"
        fill="none"
        stroke={C.ink}
        strokeWidth="1.25"
        strokeDasharray="5 4"
      />
      <rect x="254" y="51" width="236" height="18" fill={C.bg} />
      <text
        x="260"
        y="63"
        fill={C.ink}
        fontSize="10"
        fontWeight="600"
        fontFamily={C.mono}
        letterSpacing="1"
      >
        PYSPARK MEDALLION + PANDERA (54.47 s)
      </text>

      {/* Bronze */}
      <rect
        x="258"
        y="80"
        width="114"
        height="54"
        fill={C.surface}
        stroke={C.ink}
        strokeWidth="1"
      />
      <text
        x="315"
        y="102"
        textAnchor="middle"
        fill={C.ink}
        fontSize="11.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Bronze
      </text>
      <text
        x="315"
        y="120"
        textAnchor="middle"
        fill={C.muted}
        fontSize="9.5"
        fontFamily={C.mono}
      >
        100 000 raw
      </text>

      <line
        x1="372"
        y1="107"
        x2="396"
        y2="107"
        stroke={C.ink}
        strokeWidth="1"
        markerEnd="url(#pl-arrow-ink)"
      />

      {/* Silver */}
      <rect
        x="402"
        y="80"
        width="116"
        height="54"
        fill={C.surface}
        stroke={C.tech}
        strokeWidth="1.25"
      />
      <text
        x="460"
        y="102"
        textAnchor="middle"
        fill={C.ink}
        fontSize="11.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Silver
      </text>
      <text
        x="460"
        y="120"
        textAnchor="middle"
        fill={C.tech}
        fontSize="9.5"
        fontFamily={C.mono}
      >
        92 993 valid
      </text>

      <line
        x1="518"
        y1="107"
        x2="540"
        y2="107"
        stroke={C.tech}
        strokeWidth="1"
        markerEnd="url(#pl-arrow-tech)"
      />

      {/* Gold */}
      <rect
        x="546"
        y="80"
        width="110"
        height="54"
        fill={C.surface}
        stroke={C.tech}
        strokeWidth="1.25"
      />
      <text
        x="601"
        y="102"
        textAnchor="middle"
        fill={C.ink}
        fontSize="11.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Gold
      </text>
      <text
        x="601"
        y="120"
        textAnchor="middle"
        fill={C.muted}
        fontSize="9.5"
        fontFamily={C.mono}
      >
        Parquet KPIs
      </text>

      {/* Quarantine branch */}
      <line
        x1="315"
        y1="134"
        x2="315"
        y2="174"
        stroke={C.accent}
        strokeWidth="1"
      />
      <line
        x1="315"
        y1="174"
        x2="396"
        y2="174"
        stroke={C.accent}
        strokeWidth="1"
        markerEnd="url(#pl-arrow-accent)"
      />
      <rect
        x="402"
        y="152"
        width="254"
        height="42"
        fill={C.bg}
        stroke={C.accent}
        strokeWidth="1.25"
      />
      <text
        x="529"
        y="170"
        textAnchor="middle"
        fill={C.accent}
        fontSize="10.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Quarantine · 4 952 rows (4.95%)
      </text>
      <text
        x="529"
        y="185"
        textAnchor="middle"
        fill={C.muted}
        fontSize="9.5"
        fontFamily={C.mono}
      >
        {isFr ? 'Anomalies isolées sans blocage' : 'Anomalies isolated without stalling'}
      </text>

      {/* Arrow Medallion -> dbt Core */}
      <line
        x1="672"
        y1="107"
        x2="704"
        y2="107"
        stroke={C.tech}
        strokeWidth="1.25"
        markerEnd="url(#pl-arrow-tech)"
      />

      {/* 3. dbt Core */}
      <rect
        x="710"
        y="68"
        width="222"
        height="126"
        fill={C.surface}
        stroke={C.tech}
        strokeWidth="1.25"
      />
      <rect x="710" y="68" width="222" height="22" fill={C.tech} />
      <text x="722" y="83" fill={C.bg} fontSize="9.5" fontFamily={C.mono}>
        ANALYTICS · DBT CORE
      </text>
      <text
        x="722"
        y="112"
        fill={C.ink}
        fontSize="12"
        fontWeight="600"
        fontFamily={C.mono}
      >
        DuckDB CI + BigQuery
      </text>
      <text x="722" y="131" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        • 4 {isFr ? 'modèles analytiques' : 'analytics models'}
      </text>
      <text x="722" y="149" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        • {isFr ? 'Tests qualité & SLA' : 'Data quality & SLA tests'}
      </text>
      <text
        x="722"
        y="178"
        fill={C.tech}
        fontSize="10.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        dbt build: 6.35 s
      </text>

      {/* Down arrow from Silver/Gold to MLOps row */}
      <line
        x1="460"
        y1="208"
        x2="460"
        y2="244"
        stroke={C.ink}
        strokeWidth="1.25"
        markerEnd="url(#pl-arrow-ink)"
      />

      {/* Bottom Row: MLOps Training -> Serving -> Drift */}
      {/* 4. LightGBM + MLflow */}
      <rect
        x="28"
        y="250"
        width="284"
        height="98"
        fill={C.surface}
        stroke={C.tech}
        strokeWidth="1.25"
      />
      <text
        x="42"
        y="273"
        fill={C.ink}
        fontSize="12"
        fontWeight="600"
        fontFamily={C.mono}
      >
        LightGBM + MLflow Registry
      </text>
      <text x="42" y="293" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        Train 74 394 / Test 18 599
      </text>
      <text x="42" y="311" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        Accuracy 0.9999 · ROC-AUC 1.0
      </text>
      <text
        x="42"
        y="334"
        fill={C.tech}
        fontSize="10.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        F1 Score: 0.9995
      </text>

      {/* Connector from Silver vertical line to LightGBM and Evidently */}
      <line
        x1="460"
        y1="228"
        x2="170"
        y2="228"
        stroke={C.ink}
        strokeWidth="1"
      />
      <line
        x1="170"
        y1="228"
        x2="170"
        y2="244"
        stroke={C.ink}
        strokeWidth="1"
        markerEnd="url(#pl-arrow-ink)"
      />
      <line
        x1="460"
        y1="228"
        x2="795"
        y2="228"
        stroke={C.accent}
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <line
        x1="795"
        y1="228"
        x2="795"
        y2="244"
        stroke={C.accent}
        strokeWidth="1"
        markerEnd="url(#pl-arrow-accent)"
      />

      {/* Arrow LightGBM -> FastAPI */}
      <line
        x1="312"
        y1="299"
        x2="344"
        y2="299"
        stroke={C.ink}
        strokeWidth="1.25"
        markerEnd="url(#pl-arrow-ink)"
      />

      {/* 5. FastAPI /predict + Prometheus */}
      <rect
        x="350"
        y="250"
        width="280"
        height="98"
        fill={C.surface}
        stroke={C.ink}
        strokeWidth="1.25"
      />
      <text
        x="364"
        y="273"
        fill={C.ink}
        fontSize="12"
        fontWeight="600"
        fontFamily={C.mono}
      >
        FastAPI /predict + Prometheus
      </text>
      <text x="364" y="293" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        {isFr ? 'Scoring temps réel + /metrics' : 'Real-time scoring + /metrics'}
      </text>
      <text x="364" y="311" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        100 req benchmark
      </text>
      <text
        x="364"
        y="334"
        fill={C.ink}
        fontSize="10.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        P50 6.10 ms · P95 7.14 ms
      </text>

      {/* 6. Evidently AI Drift CronJob */}
      <rect
        x="658"
        y="250"
        width="274"
        height="98"
        fill={C.surface}
        stroke={C.accent}
        strokeWidth="1.25"
      />
      <text
        x="672"
        y="273"
        fill={C.ink}
        fontSize="12"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Evidently AI · K8s CronJob
      </text>
      <text x="672" y="293" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        92 993 ref vs 5 000 drifted batch
      </text>
      <text x="672" y="311" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        {isFr ? 'Rapport HTML en 14.51 s' : 'HTML report in 14.51 s'}
      </text>
      <text
        x="672"
        y="334"
        fill={C.accent}
        fontSize="10.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        drift_share: 0.8 (4/5 cols)
      </text>

      {/* Footer IaC bar */}
      <line x1="28" y1="372" x2="932" y2="372" stroke={C.border} strokeWidth="1" />
      <text x="28" y="392" fill={C.muted} fontSize="9.5" fontFamily={C.mono}>
        IAC &amp; CI — TERRAFORM · KUBERNETES (KUBECONFORM -STRICT) · DOCKER COMPOSE · GITHUB ACTIONS · €0 BUDGET
      </text>
    </svg>
  );
}

function AwllDiskUtilityDiagram({ isFr }: { isFr: boolean }) {
  return (
    <svg
      viewBox="0 0 960 400"
      className="h-auto w-full select-none"
      role="img"
      aria-label={
        isFr
          ? "Schéma d'architecture logicielle d'Awll Disk Utility"
          : 'Awll Disk Utility software architecture diagram'
      }
    >
      <title>
        {isFr
          ? 'Architecture Desktop WPF + WebView2 — Awll Disk Utility'
          : 'WPF + WebView2 Desktop Architecture — Awll Disk Utility'}
      </title>
      <ArrowDefs idPrefix="aw" />

      <rect x="0" y="0" width="960" height="400" fill={C.bg} />

      <text
        x="28"
        y="30"
        fill={C.muted}
        fontSize="10"
        fontFamily={C.mono}
        letterSpacing="1.6"
      >
        FIG 04 — WINDOWS DESKTOP ARCHITECTURE · C# .NET 6 + WPF + WEBVIEW2 + WIN32
      </text>
      <line x1="28" y1="42" x2="932" y2="42" stroke={C.border} strokeWidth="1" />

      {/* Left: WebView2 UI */}
      <rect
        x="28"
        y="76"
        width="206"
        height="252"
        fill={C.surface}
        stroke={C.ink}
        strokeWidth="1.25"
      />
      <rect x="28" y="76" width="206" height="24" fill={C.ink} />
      <text x="40" y="92" fill={C.bg} fontSize="10" fontFamily={C.mono}>
        PRESENTATION · WEBVIEW2
      </text>
      <text
        x="40"
        y="122"
        fill={C.ink}
        fontSize="12.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Light / Dark UI
      </text>
      <text x="40" y="146" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        • Space Lens Treemap
      </text>
      <text x="40" y="166" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        • {isFr ? 'Audit multi-disques' : 'Multi-drive audit'}
      </text>
      <text x="40" y="186" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        • {isFr ? 'Doublons SHA-256' : 'SHA-256 duplicates'}
      </text>
      <text x="40" y="206" fill={C.muted} fontSize="10" fontFamily={C.mono}>
        • {isFr ? 'Enquête forensique' : 'Forensic inspector'}
      </text>
      <rect
        x="40"
        y="236"
        width="182"
        height="76"
        fill={C.bg}
        stroke={C.accent}
        strokeWidth="1"
      />
      <text
        x="50"
        y="256"
        fill={C.accent}
        fontSize="10"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Dry-Run Modal
      </text>
      <text x="50" y="274" fill={C.muted} fontSize="9.5" fontFamily={C.mono}>
        {isFr ? 'Prévisualisation obligatoire' : 'Mandatory preview'}
      </text>
      <text x="50" y="290" fill={C.muted} fontSize="9.5" fontFamily={C.mono}>
        {isFr ? 'avant toute suppression' : 'before every deletion'}
      </text>

      {/* Bidirectional bridge */}
      <line
        x1="234"
        y1="202"
        x2="298"
        y2="202"
        stroke={C.accent}
        strokeWidth="1.5"
        markerStart="url(#aw-arrow-accent)"
        markerEnd="url(#aw-arrow-accent)"
      />
      <text
        x="266"
        y="188"
        textAnchor="middle"
        fill={C.accent}
        fontSize="9.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        IPC
      </text>
      <text
        x="266"
        y="218"
        textAnchor="middle"
        fill={C.muted}
        fontSize="9"
        fontFamily={C.mono}
      >
        Bridge
      </text>

      {/* Center: C# / .NET 6 Systems Engine */}
      <rect
        x="304"
        y="66"
        width="348"
        height="274"
        fill="none"
        stroke={C.ink}
        strokeWidth="1.25"
        strokeDasharray="5 4"
      />
      <rect x="316" y="57" width="234" height="18" fill={C.bg} />
      <text
        x="322"
        y="69"
        fill={C.ink}
        fontSize="10"
        fontWeight="600"
        fontFamily={C.mono}
        letterSpacing="0.8"
      >
        WPF HOST · C# / .NET 6 ENGINE
      </text>

      {/* Module 1: Space Lens */}
      <rect
        x="322"
        y="86"
        width="312"
        height="72"
        fill={C.surface}
        stroke={C.tech}
        strokeWidth="1.25"
      />
      <text
        x="336"
        y="108"
        fill={C.ink}
        fontSize="11.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Scanners/ · FileSystemEnumerator
      </text>
      <text x="336" y="126" fill={C.muted} fontSize="9.5" fontFamily={C.mono}>
        {isFr
          ? 'Indexation bottom-up sans allocation FileInfo'
          : 'Zero-allocation bottom-up indexing (no FileInfo)'}
      </text>
      <text
        x="336"
        y="145"
        fill={C.tech}
        fontSize="10"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Space Lens navigation: 0 ms
      </text>

      {/* Module 2: SHA-256 3-stage pipeline */}
      <rect
        x="322"
        y="170"
        width="312"
        height="74"
        fill={C.surface}
        stroke={C.ink}
        strokeWidth="1"
      />
      <text
        x="336"
        y="192"
        fill={C.ink}
        fontSize="11.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Services/ · SHA-256 3-Stage Parallel
      </text>
      <text x="336" y="211" fill={C.muted} fontSize="9.5" fontFamily={C.mono}>
        1. Size Filter → 2. Partial Hash (H/M/T)
      </text>
      <text x="336" y="229" fill={C.accent} fontSize="9.5" fontFamily={C.mono}>
        3. Full Parallel SHA-256 on collisions only
      </text>

      {/* Module 3: Forensic + Optional AI */}
      <rect
        x="322"
        y="256"
        width="312"
        height="68"
        fill={C.surface}
        stroke={C.ink}
        strokeWidth="1"
      />
      <text
        x="336"
        y="278"
        fill={C.ink}
        fontSize="11.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Models/ · Forensic &amp; Opt-in Gemini AI
      </text>
      <text x="336" y="297" fill={C.muted} fontSize="9.5" fontFamily={C.mono}>
        {isFr
          ? 'Classification hors-ligne + mode IA optionnel'
          : 'Offline classification + optional AI mode'}
      </text>
      <text x="336" y="313" fill={C.muted} fontSize="9.5" fontFamily={C.mono}>
        MainWindow.xaml.cs · MVVM
      </text>

      {/* Right Column: Win32 Safety & Release */}
      <line
        x1="652"
        y1="148"
        x2="698"
        y2="148"
        stroke={C.tech}
        strokeWidth="1.25"
        markerEnd="url(#aw-arrow-tech)"
      />
      <rect
        x="704"
        y="76"
        width="228"
        height="136"
        fill={C.surface}
        stroke={C.tech}
        strokeWidth="1.25"
      />
      <rect x="704" y="76" width="228" height="22" fill={C.tech} />
      <text x="716" y="91" fill={C.bg} fontSize="9.5" fontFamily={C.mono}>
        WIN32 OS SAFETY
      </text>
      <text
        x="716"
        y="118"
        fill={C.ink}
        fontSize="11"
        fontWeight="600"
        fontFamily={C.mono}
      >
        SHQueryRecycleBin
      </text>
      <text x="716" y="137" fill={C.muted} fontSize="9.5" fontFamily={C.mono}>
        • {isFr ? 'Corbeille Win32 par défaut' : 'Win32 Recycle Bin default'}
      </text>
      <text x="716" y="155" fill={C.muted} fontSize="9.5" fontFamily={C.mono}>
        • {isFr ? 'Résidus $R* détectés' : 'Orphaned $R* detection'}
      </text>
      <text x="716" y="176" fill={C.tech} fontSize="9.5" fontFamily={C.mono}>
        Protected: System32,
      </text>
      <text x="716" y="192" fill={C.tech} fontSize="9.5" fontFamily={C.mono}>
        Java, NVIDIA NGX
      </text>

      {/* Release & Quality box */}
      <line
        x1="652"
        y1="274"
        x2="698"
        y2="274"
        stroke={C.ink}
        strokeWidth="1.25"
        markerEnd="url(#aw-arrow-ink)"
      />
      <rect
        x="704"
        y="228"
        width="228"
        height="100"
        fill={C.surface}
        stroke={C.ink}
        strokeWidth="1.25"
      />
      <text
        x="716"
        y="251"
        fill={C.ink}
        fontSize="11.5"
        fontWeight="600"
        fontFamily={C.mono}
      >
        Awll.Tests &amp; Release
      </text>
      <text
        x="716"
        y="272"
        fill={C.tech}
        fontSize="10"
        fontWeight="600"
        fontFamily={C.mono}
      >
        23 / 23 xUnit PASS
      </text>
      <text x="716" y="292" fill={C.muted} fontSize="9.5" fontFamily={C.mono}>
        Setup (.NET 4.8): ~62.8 MB
      </text>
      <text x="716" y="310" fill={C.muted} fontSize="9.5" fontFamily={C.mono}>
        Portable (.NET 6): ~68.0 MB
      </text>

      {/* Footer */}
      <line x1="28" y1="368" x2="932" y2="368" stroke={C.border} strokeWidth="1" />
      <text x="28" y="386" fill={C.muted} fontSize="9.5" fontFamily={C.mono}>
        BUILD-RELEASE.PS1 · AUTOMATED XUNIT GATE · SINGLE-FILE PORTABLE + IN-PLACE UPGRADE INSTALLER
      </text>
    </svg>
  );
}

export function ArchitectureDiagram({ projectId }: ArchitectureDiagramProps) {
  const { lang } = useLanguage();
  const isFr = lang === 'fr';

  return (
    <figure className="border border-border bg-bg">
      <div className="overflow-x-auto p-3 sm:p-5">
        <div className="min-w-[640px]">
          {projectId === 'agentflow-studio' && (
            <AgentFlowDiagram isFr={isFr} />
          )}
          {projectId === 'pulselake-mlops' && <PulseLakeDiagram isFr={isFr} />}
          {projectId === 'awll-disk-utility' && (
            <AwllDiskUtilityDiagram isFr={isFr} />
          )}
        </div>
      </div>
    </figure>
  );
}
