import type { ProjectData } from '../types/portfolio';

/**
 * Projects are rendered in the exact array order / `order` property.
 * To add a new project or case study:
 * 1. Add screenshots under `public/assets/projects/<your-slug>/` (optional).
 * 2. Append a new ProjectData entry below.
 * 3. Cards, filters, and `/projects/<slug>` case-study pages generate automatically.
 */
export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'modelops-sentinel',
    slug: 'modelops-sentinel',
    order: 1,
    kind: 'flagship',
    categoryLabel: 'FLAGSHIP PROJECT · ML OBSERVABILITY & AGENTIC INCIDENT OPS',
    title: 'ModelOps Sentinel',
    subtitle: 'ML Model Monitoring & Drift Investigation Platform',
    summary:
      'End-to-end monitoring platform for a customer-churn classifier built on the 7,043-row Telco Churn dataset—combining held-out evaluation, statistical feature-drift analysis, PostgreSQL monitoring persistence, FastAPI endpoints, and a LangGraph human-in-the-loop incident investigation workflow.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Scikit-learn', 'Evidently AI', 'LangGraph'],
    features: [
      'Telco Churn dataset with 7,043 records',
      'ML model evaluation on held-out test set',
      'Feature drift analysis via Evidently AI',
      'Prediction distribution monitoring & chi-square significance check',
      'Persistent monitoring-run logs in PostgreSQL',
      'AI-assisted incident investigation workflow (LangGraph)',
      'Human-in-the-loop (HITL) approval and rejection',
      'Backend hosted on Render with frontend connected to deployed monitoring APIs',
    ],
    metrics: [
      { label: 'Accuracy', value: '74.10%', note: 'Held-out test set (Logistic Regression)' },
      { label: 'ROC-AUC', value: '84.21%', note: 'Held-out test set' },
      { label: 'Recall', value: '78.88%', note: 'Held-out test set' },
      { label: 'F1 Score', value: '61.78%', note: 'Held-out test set' },
    ],
    findings: [
      'Feature drift detected in 14 out of 19 features in the 500-record simulated production batch.',
      'Reference churn rate (4,507-record reference set): 41.36%.',
      'Production-simulation churn rate (500-record batch): 67.00%.',
      'Shift magnitude: +25.64 percentage points; a 2×2 chi-square test of independence found a statistically significant difference.',
    ],
    distinctionNote:
      'Note on dashboard visuals: The 74.10% accuracy, 14/19 drifted features, and 67.00% vs. 41.36% churn-rate shift are actual monitoring findings; the Drift Trend chart in the dashboard UI is explicitly labeled as an illustrative monitoring trend ("Sample observations — not historical API data").',
    screenshots: [
      {
        id: 'overview',
        src: '/assets/projects/modelops-sentinel/overview.jpg',
        alt: 'ModelOps Sentinel Model Overview dashboard showing 74.10% accuracy, 14/19 features drifted, and 67.0% production churn rate',
        caption: 'Model Overview — live KPI cards (74.10% Accuracy, 14/19 Drifted, 67.0% Production Churn Rate, Logistic Regression v1.0).',
        tag: 'Dashboard Overview',
      },
      {
        id: 'drift-investigator',
        src: '/assets/projects/modelops-sentinel/drift-investigator.jpg',
        alt: 'ModelOps Sentinel Drift Trend chart and AI Investigator report view',
        caption: 'Illustrative Drift Trend ("Sample observations") alongside the LangGraph AI Investigator report.',
        tag: 'AI Investigator',
      },
      {
        id: 'incidents-langgraph',
        src: '/assets/projects/modelops-sentinel/incidents-langgraph.jpg',
        alt: 'ModelOps Sentinel Recent Incidents table and Approve/Reject HITL controls',
        caption: 'Human-in-the-loop Approve / Reject controls powered by LangGraph and live PostgreSQL incidents table.',
        tag: 'HITL & Incidents',
      },
      {
        id: 'swagger-monitoring',
        src: '/assets/projects/modelops-sentinel/swagger-monitoring.jpg',
        alt: 'ModelOps Sentinel FastAPI Swagger OpenAPI endpoints for health, predict, and monitor routes',
        caption: 'FastAPI Swagger / OpenAPI 3.1 documentation: /health, /predict, /monitor/drift, /monitor/predictions, /monitor/performance.',
        tag: 'Swagger API',
      },
      {
        id: 'swagger-agent',
        src: '/assets/projects/modelops-sentinel/swagger-agent.jpg',
        alt: 'ModelOps Sentinel Swagger OpenAPI endpoints for incidents and LangGraph agent investigation approval',
        caption: 'Incident & Agent endpoints: /incidents, /agent/investigate/{incident_id}, and /agent/approve/{thread_id}.',
        tag: 'Agent API',
      },
    ],
    links: [
      {
        label: 'Live FastAPI Backend',
        url: 'https://modelops-sentinel-api.onrender.com',
        kind: 'live',
      },
    ],
    accentTheme: 'lime',
    architectureDiagramType: 'modelops',
    caseStudy: {
      bigIdea:
        'Shipping a machine learning model is only half the problem—knowing when production inputs or predictions drift, persisting every monitoring run, and orchestrating structured human-reviewed incident investigations turns a static classifier into a reliable system.',
      problem:
        'ML models silently degrade when real-world data shifts away from training distributions. Without automated drift checks, statistical prediction monitoring, and accountable review workflows, operators either miss critical shifts or lack a structured root-cause trail.',
      engineeringApproach: [
        'Trained and evaluated a Logistic Regression churn classifier on the 7,043-row Telco Churn dataset (74.10% accuracy, 84.21% ROC-AUC, 78.88% recall, 61.78% F1-score on the held-out test set).',
        'Established a 4,507-record reference baseline and evaluated a 500-record production-simulation batch using Evidently AI for feature-level drift and a 2×2 chi-square test of independence for prediction-distribution shift.',
        'Built FastAPI REST endpoints (/predict, /monitor/drift, /monitor/predictions, /monitor/performance, /incidents, /agent/investigate/{incident_id}, /agent/approve/{thread_id}) backed by PostgreSQL persistence.',
        'Integrated a LangGraph investigation workflow that drafts an incident report and pauses for explicit human-in-the-loop (HITL) approval or rejection before resolution.',
        'Deployed the FastAPI backend on Render and connected the frontend dashboard to the live monitoring APIs.',
      ],
      architectureSummary:
        'Telco Churn Data (7,043 rows) → Logistic Regression Evaluation & Reference/Batch Split → Evidently AI Feature Drift + 2×2 Chi-Square Prediction Check → FastAPI + PostgreSQL Run & Incident Store → LangGraph Investigation + Human Approval/Rejection → Live Dashboard.',
      workflowSteps: [
        {
          step: '01',
          title: 'Reference vs. Production Batch',
          detail: 'Compares 4,507 reference records against a 500-record simulated production batch across 19 input features and predicted churn rates.',
        },
        {
          step: '02',
          title: 'Drift & Statistical Testing',
          detail: 'Evidently AI flags drift in 14 of 19 features while a 2×2 chi-square test confirms a statistically significant +25.64 pp churn-rate jump (41.36% → 67.00%).',
        },
        {
          step: '03',
          title: 'Persistent Incident Logging',
          detail: 'FastAPI routes record monitoring runs and open severity-tagged incidents (#INC-001, #INC-002, #INC-003) inside PostgreSQL.',
        },
        {
          step: '04',
          title: 'LangGraph HITL Investigation',
          detail: 'The /agent/investigate/{incident_id} graph generates a structured root-cause report and awaits human Approve / Reject via /agent/approve/{thread_id}.',
        },
      ],
      resultsAndLearnings: [
        'Verified held-out metrics: 74.10% Accuracy, 84.21% ROC-AUC, 78.88% Recall, 61.78% F1 Score.',
        'Detected drift across 14/19 features and a +25.64 percentage point churn-rate shift (41.36% reference vs. 67.00% production simulation).',
        'Learned how critical it is to separate deterministic statistical checks and database-persisted telemetry from illustrative UI visualizations, and to enforce human sign-off on automated AI investigations.',
      ],
    },
  },
  {
    id: 'documind',
    slug: 'documind',
    order: 2,
    kind: 'major',
    categoryLabel: 'PROJECT 02 · DOCUMENT INTELLIGENCE & RAG',
    title: 'DocuMind',
    subtitle: 'AI Document Intelligence & RAG Platform',
    summary:
      'A Retrieval-Augmented Generation (RAG) application that lets authenticated users upload documents, parse and chunk text into embeddings stored in Supabase, and ask natural-language questions answered with grounded source content.',
    stack: ['Python', 'LLMs', 'Embeddings', 'Vector Search', 'Supabase'],
    features: [
      'Document ingestion and processing',
      'Text chunking and embeddings',
      'Semantic retrieval',
      'Question answering over uploaded documents',
      'Source-grounded answers',
      'User authentication',
      'Separate frontend and backend architecture',
    ],
    screenshots: [
      {
        id: 'reading-room',
        src: '/assets/projects/documind/reading-room.jpg',
        alt: 'DocuMind Reading Room main workspace interface with document sidebar and upload prompt',
        caption: 'DocuMind Reading Room — main workspace with conversation sidebar, chat history, and PDF upload prompt.',
        tag: 'Reading Room',
      },
      {
        id: 'upload-modal',
        src: '/assets/projects/documind/upload-modal.jpg',
        alt: 'DocuMind Bring your documents PDF drag-and-drop upload modal',
        caption: 'Document ingestion flow — drag-and-drop PDF upload modal to build vector and keyword indices.',
        tag: 'Ingestion Modal',
      },
    ],
    links: [
      {
        label: 'Live App (Vercel)',
        url: 'https://documind2.vercel.app',
        kind: 'live',
      },
    ],
    accentTheme: 'maroon',
    architectureDiagramType: 'documind',
    caseStudy: {
      bigIdea:
        'Turn static PDFs into an interactive reading room where every answer is anchored back to retrieved source passages rather than unverified model memory.',
      problem:
        'Long technical and academic documents are slow to search with keyword Ctrl+F alone, while ungrounded LLM chats risk inventing facts outside the uploaded text.',
      engineeringApproach: [
        'Designed a separated frontend and backend architecture for document ingestion, indexing, and conversational Q&A.',
        'Built a document parsing and text chunking pipeline that converts uploaded PDFs into dense embeddings.',
        'Integrated Supabase for vector storage, semantic retrieval, and user authentication.',
        'Constrained answer generation to retrieved context so responses stay grounded in the user’s uploaded documents.',
      ],
      architectureSummary:
        'PDF Upload & Auth → Document Parsing & Chunking → Embedding Generation → Supabase Vector Storage & Semantic Retrieval → LLM Source-Grounded Answer.',
      workflowSteps: [
        {
          step: '01',
          title: 'Authenticated Upload',
          detail: 'Users sign in and upload PDF documents inside the DocuMind Reading Room interface.',
        },
        {
          step: '02',
          title: 'Chunking & Embeddings',
          detail: 'Documents are parsed into clean text segments and transformed into semantic vector embeddings.',
        },
        {
          step: '03',
          title: 'Supabase Retrieval',
          detail: 'User queries are matched against stored document vectors in Supabase to pull relevant chunks.',
        },
        {
          step: '04',
          title: 'Grounded Q&A',
          detail: 'The LLM synthesizes an answer strictly anchored in the retrieved source passages.',
        },
      ],
      resultsAndLearnings: [
        'Delivered a deployed full-stack RAG workspace with authentication, separated frontend/backend, and persistent chat history.',
        'Learned how chunk boundaries and retrieval quality directly govern answer accuracy and source grounding.',
      ],
    },
  },
  {
    id: 'deepdive',
    slug: 'deepdive',
    order: 3,
    kind: 'major',
    categoryLabel: 'PROJECT 03 · VIDEO INTELLIGENCE & MEETING ANALYSIS',
    title: 'DeepDive',
    subtitle: 'Video Intelligence & Meeting Analysis Platform',
    tagline: 'Every conversation has something worth finding.',
    summary:
      'Retrieval-augmented video and meeting intelligence platform running local LLM inference with Ollama, Sentence Transformers embeddings, ChromaDB vector indexing, YouTube transcript extraction, and pyannote.audio speaker diarization.',
    stack: [
      'Python',
      'Sentence Transformers',
      'ChromaDB',
      'Ollama',
      'YouTube Transcript API',
      'pyannote.audio',
    ],
    features: [
      'Ask questions about videos',
      'Generate video summaries',
      'Timestamp-linked answers',
      'Process YouTube links',
      'Process uploaded video and audio',
      'Speaker diarization',
      'Meeting transcription and analysis',
    ],
    screenshots: [],
    links: [],
    accentTheme: 'sky',
    architectureDiagramType: 'deepdive',
    caseStudy: {
      bigIdea:
        'Every conversation has something worth finding—DeepDive transforms long lectures, YouTube videos, and recorded meetings into searchable, timestamp-linked knowledge powered by local AI.',
      problem:
        'Scrubbing through hour-long videos or multi-speaker recordings to locate a single decision, explanation, or speaker segment wastes time and hides useful context.',
      engineeringApproach: [
        'Built dual ingestion paths supporting both YouTube URLs (via YouTube Transcript API) and uploaded video/audio files.',
        'Integrated pyannote.audio speaker diarization and meeting transcription pipelines to distinguish who spoke when.',
        'Embedded transcript segments with Sentence Transformers and indexed them in ChromaDB alongside timestamps.',
        'Ran LLM inference locally with Ollama to generate video summaries and timestamp-linked answers grounded in retrieved segments.',
      ],
      architectureSummary:
        'YouTube Link / Uploaded Audio-Video → Transcript & Speaker Diarization (YouTube Transcript API + pyannote.audio) → Sentence Transformers Embeddings → ChromaDB Vector Index → Local Ollama Inference → Summaries & Timestamp-Linked Answers.',
      workflowSteps: [
        {
          step: '01',
          title: 'Video & Audio Ingestion',
          detail: 'Accepts YouTube links via YouTube Transcript API or uploaded audio/video recordings for local processing.',
        },
        {
          step: '02',
          title: 'Diarization & Transcription',
          detail: 'Uses pyannote.audio to separate speakers and preserve structured meeting/video transcripts with timestamps.',
        },
        {
          step: '03',
          title: 'Local Vector Indexing',
          detail: 'Encodes transcript segments with Sentence Transformers and stores them inside ChromaDB.',
        },
        {
          step: '04',
          title: 'Ollama RAG & Timestamps',
          detail: 'Queries retrieve relevant timestamped passages and pass them to local Ollama models for summaries and Q&A.',
        },
      ],
      resultsAndLearnings: [
        'Enabled privacy-friendly local video Q&A and summarization without external LLM API dependency via Ollama.',
        'Connected semantic transcript retrieval directly to exact video timestamps and multi-speaker meeting context.',
      ],
    },
  },
  {
    id: 'data-analyst-ai-agent',
    slug: 'data-analyst-ai-agent',
    order: 4,
    kind: 'compact',
    categoryLabel: 'AUTOMATION WORKFLOW · N8N',
    title: 'Data Analyst AI Agent',
    subtitle: 'n8n Automation Workflow',
    summary:
      'An AI-powered data analysis automation workflow built using n8n and AI integrations. Designed to streamline repetitive data analysis tasks through automated workflows.',
    stack: ['n8n', 'AI Agents', 'Agentic Workflows', 'API Integration'],
    features: [],
    screenshots: [],
    links: [],
    accentTheme: 'lime',
  },
  {
    id: 'job-automation-agent',
    slug: 'job-automation-agent',
    order: 5,
    kind: 'compact',
    categoryLabel: 'AUTOMATION WORKFLOW · N8N',
    title: 'Job Automation Agent',
    subtitle: 'n8n Automation Workflow',
    summary:
      'An AI-driven job automation workflow designed to simplify parts of the job-search process and reduce repetitive manual effort.',
    stack: ['n8n', 'AI Agents', 'Agentic Workflows'],
    features: [],
    screenshots: [],
    links: [],
    accentTheme: 'sky',
  },
];
