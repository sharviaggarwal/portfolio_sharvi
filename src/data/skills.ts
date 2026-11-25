import type { TechCategory, TechItem } from '../types/portfolio';

export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'ai-ml',
    number: '01',
    title: 'AI/ML',
    accent: 'lime',
    description: 'Core modeling, retrieval-augmented generation, semantic embeddings, and prompt design.',
  },
  {
    id: 'agentic-ai',
    number: '02',
    title: 'Agentic AI',
    accent: 'maroon',
    description: 'Stateful multi-step agent graphs, human-in-the-loop reviews, and API orchestration.',
  },
  {
    id: 'programming',
    number: '03',
    title: 'Programming',
    accent: 'ink',
    description: 'Foundational languages across AI engineering, relational data, and low-level systems.',
  },
  {
    id: 'data-ml-tools',
    number: '04',
    title: 'Data & ML Tools',
    accent: 'sky',
    description: 'Model evaluation, tabular ML, drift detection, and exploratory data analysis.',
  },
  {
    id: 'backend',
    number: '05',
    title: 'Backend',
    accent: 'ink',
    description: 'Production API endpoints, schema validation, and persistent monitoring storage.',
  },
  {
    id: 'llm-vector',
    number: '06',
    title: 'LLM & Vector Stack',
    accent: 'sky',
    description: 'Local inference, dense embeddings, vector indexing, and cloud persistence.',
  },
  {
    id: 'dev-tools',
    number: '07',
    title: 'Development Tools',
    accent: 'paper',
    description: 'Everyday engineering toolkit for notebooks, version control, and collaborative builds.',
  },
];

export const TECH_ITEMS: TechItem[] = [
  // AI/ML
  { id: 'ml', name: 'Machine Learning', iconKey: 'ml', categoryId: 'ai-ml', projectIds: ['modelops-sentinel'] },
  { id: 'nlp', name: 'NLP', iconKey: 'nlp', categoryId: 'ai-ml', projectIds: ['documind', 'deepdive'] },
  { id: 'genai', name: 'Generative AI', iconKey: 'genai', categoryId: 'ai-ml', projectIds: ['documind', 'deepdive', 'data-analyst-ai-agent'] },
  { id: 'llms', name: 'LLMs', iconKey: 'llms', categoryId: 'ai-ml', projectIds: ['documind', 'deepdive'] },
  { id: 'rag', name: 'RAG', iconKey: 'rag', categoryId: 'ai-ml', projectIds: ['documind', 'deepdive'] },
  { id: 'embeddings', name: 'Embeddings', iconKey: 'embeddings', categoryId: 'ai-ml', projectIds: ['documind', 'deepdive'] },
  { id: 'semantic-search', name: 'Semantic Search', iconKey: 'search', categoryId: 'ai-ml', projectIds: ['documind', 'deepdive'] },
  { id: 'prompt-eng', name: 'Prompt Engineering', iconKey: 'prompt', categoryId: 'ai-ml', isSharedToolkit: true },

  // Agentic AI
  { id: 'ai-agents', name: 'AI Agents', iconKey: 'agent', categoryId: 'agentic-ai', projectIds: ['modelops-sentinel', 'data-analyst-ai-agent', 'job-automation-agent'] },
  { id: 'agentic-workflows', name: 'Agentic Workflows', iconKey: 'workflow', categoryId: 'agentic-ai', projectIds: ['modelops-sentinel', 'data-analyst-ai-agent', 'job-automation-agent'] },
  { id: 'langchain', name: 'LangChain', iconKey: 'langchain', categoryId: 'agentic-ai', isSharedToolkit: true },
  { id: 'langgraph', name: 'LangGraph', iconKey: 'langgraph', categoryId: 'agentic-ai', projectIds: ['modelops-sentinel'] },
  { id: 'api-integration', name: 'API Integration', iconKey: 'api', categoryId: 'agentic-ai', projectIds: ['modelops-sentinel', 'documind', 'data-analyst-ai-agent'] },

  // Programming
  { id: 'python', name: 'Python', iconKey: 'python', categoryId: 'programming', projectIds: ['modelops-sentinel', 'documind', 'deepdive'] },
  { id: 'sql', name: 'SQL', iconKey: 'sql', categoryId: 'programming', isSharedToolkit: true },
  { id: 'c', name: 'C', iconKey: 'c', categoryId: 'programming', isSharedToolkit: true },
  { id: 'cpp', name: 'C++', iconKey: 'cpp', categoryId: 'programming', isSharedToolkit: true },

  // Data and ML Tools
  { id: 'pandas', name: 'Pandas', iconKey: 'pandas', categoryId: 'data-ml-tools', isSharedToolkit: true },
  { id: 'numpy', name: 'NumPy', iconKey: 'numpy', categoryId: 'data-ml-tools', isSharedToolkit: true },
  { id: 'scikit-learn', name: 'Scikit-learn', iconKey: 'scikitlearn', categoryId: 'data-ml-tools', projectIds: ['modelops-sentinel'] },
  { id: 'xgboost', name: 'XGBoost', iconKey: 'xgboost', categoryId: 'data-ml-tools', isSharedToolkit: true },
  { id: 'evidently', name: 'Evidently AI', iconKey: 'evidently', categoryId: 'data-ml-tools', projectIds: ['modelops-sentinel'] },
  { id: 'matplotlib', name: 'Matplotlib', iconKey: 'matplotlib', categoryId: 'data-ml-tools', isSharedToolkit: true },

  // Backend
  { id: 'fastapi', name: 'FastAPI', iconKey: 'fastapi', categoryId: 'backend', projectIds: ['modelops-sentinel'] },
  { id: 'postgresql', name: 'PostgreSQL', iconKey: 'postgresql', categoryId: 'backend', projectIds: ['modelops-sentinel'] },

  // LLM and Vector Stack
  { id: 'ollama', name: 'Ollama', iconKey: 'ollama', categoryId: 'llm-vector', projectIds: ['deepdive'] },
  { id: 'chromadb', name: 'ChromaDB', iconKey: 'chromadb', categoryId: 'llm-vector', projectIds: ['deepdive'] },
  { id: 'sentence-transformers', name: 'Sentence Transformers', iconKey: 'transformers', categoryId: 'llm-vector', projectIds: ['deepdive'] },
  { id: 'supabase', name: 'Supabase', iconKey: 'supabase', categoryId: 'llm-vector', projectIds: ['documind'] },

  // Development Tools (Shared General Toolkit)
  { id: 'jupyter', name: 'Jupyter', iconKey: 'jupyter', categoryId: 'dev-tools', isSharedToolkit: true },
  { id: 'vscode', name: 'VS Code', iconKey: 'vscode', categoryId: 'dev-tools', isSharedToolkit: true },
  { id: 'git', name: 'Git', iconKey: 'git', categoryId: 'dev-tools', isSharedToolkit: true },
  { id: 'github', name: 'GitHub', iconKey: 'github', categoryId: 'dev-tools', isSharedToolkit: true },
];
