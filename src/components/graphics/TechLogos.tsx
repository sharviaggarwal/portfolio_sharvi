import React from 'react';
import {
  Bot,
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Network,
  Search,
  Sparkles,
  Terminal,
  Workflow,
} from 'lucide-react';

/**
 * Renders official-style brand SVG marks for major engineering technologies
 * and crisp technical vector glyphs for concepts/frameworks.
 */
export const TechLogo: React.FC<{ iconKey: string; className?: string }> = ({
  iconKey,
  className = 'w-5 h-5',
}) => {
  switch (iconKey) {
    case 'python':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="#3776AB"
            d="M11.91 2C6.96 2 7.27 4.14 7.27 4.14l.01 2.22h4.72v.67H5.4S2 6.64 2 11.67c0 5.03 2.97 4.85 2.97 4.85h1.77v-2.33s-.1-2.97 2.92-2.97h5.03s2.82.05 2.82-2.73V4.64S17.94 2 11.91 2zm-2.8 1.53a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"
          />
          <path
            fill="#FFD43B"
            d="M12.09 22c4.95 0 4.64-2.14 4.64-2.14l-.01-2.22h-4.72v-.67h6.6S22 17.36 22 12.33c0-5.03-2.97-4.85-2.97-4.85h-1.77v2.33s.1 2.97-2.92 2.97H9.31s-2.82-.05-2.82 2.73v3.85S6.06 22 12.09 22zm2.8-1.53a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z"
          />
        </svg>
      );

    case 'fastapi':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#009688" />
          <path fill="#FFFFFF" d="M12.9 5.5L7.5 13h4l-.4 5.5L16.5 11h-4l.4-5.5z" />
        </svg>
      );

    case 'postgresql':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="#336791"
            d="M17.2 4.2c-1.7-.9-3.6-.8-5.2-.1-1.6-.7-3.5-.8-5.2.1C4.5 5.4 3.5 8 4 10.9c.4 2.5 1.9 4.5 3.8 5.4.5 1.8 1.2 3.3 2.5 3.7 1.1.3 2-.2 2.4-1.1.3.4.8.7 1.4.6.9-.1 1.4-1 1.5-2.3 2.1-.9 3.8-3 4.3-5.8.6-3.1-.4-6-2.7-7.2z"
          />
          <circle cx="9.6" cy="9.6" r="1.1" fill="#FFFFFF" />
          <circle cx="14.4" cy="9.6" r="1.1" fill="#FFFFFF" />
          <path
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.3"
            strokeLinecap="round"
            d="M12 11.2v4.6c0 1.1-.6 1.8-1.4 1.8"
          />
        </svg>
      );

    case 'supabase':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="#3ECF8E"
            d="M13.6 21.4c-.6.7-1.7.3-1.7-.6v-7.5h7.6c1.1 0 1.7 1.3 1 2.1l-6.9 6z"
          />
          <path
            fill="#24B47E"
            d="M10.4 2.6c.6-.7 1.7-.3 1.7.6v7.5H4.5c-1.1 0-1.7-1.3-1-2.1l6.9-6z"
          />
        </svg>
      );

    case 'scikitlearn':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <ellipse cx="10" cy="13" rx="6.5" ry="5" fill="#F89939" />
          <circle cx="16.5" cy="9" r="4.5" fill="#3499CD" opacity="0.92" />
        </svg>
      );

    case 'numpy':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#4DABCF" d="M12 2L3.5 6.8v10.4L12 22l8.5-4.8V6.8L12 2z" />
          <path fill="#4D77CF" d="M12 12l8.5-5.2v10.4L12 22V12z" />
          <path
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            d="M7.5 14.5V9.5l5 5V9.5"
          />
        </svg>
      );

    case 'pandas':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="6" y="3" width="2.4" height="7" rx="0.6" fill="#150458" />
          <rect x="6" y="13.5" width="2.4" height="7.5" rx="0.6" fill="#150458" />
          <rect x="6" y="10.8" width="2.4" height="2" rx="0.4" fill="#FFCA00" />
          <rect x="11" y="6" width="2.4" height="15" rx="0.6" fill="#150458" />
          <rect x="15.8" y="3" width="2.4" height="7.5" rx="0.6" fill="#E70488" />
          <rect x="15.8" y="14" width="2.4" height="7" rx="0.6" fill="#150458" />
        </svg>
      );

    case 'xgboost':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#189FDD" />
          <path
            stroke="#FFFFFF"
            strokeWidth="2.1"
            strokeLinecap="round"
            d="M7.5 7.5l9 9M16.5 7.5l-9 9"
          />
        </svg>
      );

    case 'matplotlib':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="#FFFFFF" stroke="#11557C" strokeWidth="1.8" />
          <path d="M12 12L12 4.5A7.5 7.5 0 0 1 18.8 9z" fill="#FF7F0E" />
          <path d="M12 12L18.8 9A7.5 7.5 0 0 1 15.5 18.5z" fill="#2CA02C" />
          <path d="M12 12L15.5 18.5A7.5 7.5 0 0 1 6 16z" fill="#1F77B4" />
        </svg>
      );

    case 'jupyter':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <ellipse
            cx="12"
            cy="12"
            rx="8.5"
            ry="4.2"
            transform="rotate(-22 12 12)"
            fill="none"
            stroke="#F37626"
            strokeWidth="2"
          />
          <circle cx="17.5" cy="5.5" r="2" fill="#767677" />
          <circle cx="6.2" cy="18.2" r="1.6" fill="#9E9E9E" />
        </svg>
      );

    case 'vscode':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="#007ACC"
            d="M17.5 2.6L9.4 10.1 5 6.8 3 7.9v8.2l2 1.1 4.4-3.3 8.1 7.5 3.5-1.6V4.2l-3.5-1.6zm0 4.6v9.6L12.1 12l5.4-4.8z"
          />
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="#F05032"
            d="M21.4 10.6L13.4 2.6a2 2 0 0 0-2.8 0L8.8 4.4l2.3 2.3a1.6 1.6 0 0 1 2 2l2.2 2.2a1.6 1.6 0 1 1-1 1l-2.1-2.1v5.6a1.6 1.6 0 1 1-1.3-.1V9.6a1.6 1.6 0 0 1-.9-2.1L7.7 5.2l-5.1 5.4a2 2 0 0 0 0 2.8l8 8a2 2 0 0 0 2.8 0l8-8a2 2 0 0 0 0-2.8z"
          />
        </svg>
      );

    case 'github':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.09.68-.22.68-.49v-1.72c-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.8c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.82-4.57 5.07.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"
          />
        </svg>
      );

    case 'ollama':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="13" r="7.5" fill="#FFFFFF" stroke="#0E0E10" strokeWidth="1.8" />
          <path d="M8.5 7.5C8.5 4.5 10 3.5 10.5 6.5" stroke="#0E0E10" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M15.5 7.5C15.5 4.5 14 3.5 13.5 6.5" stroke="#0E0E10" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="9.8" cy="12" r="1" fill="#0E0E10" />
          <circle cx="14.2" cy="12" r="1" fill="#0E0E10" />
          <path d="M10.5 15c.9.8 2.1.8 3 0" stroke="#0E0E10" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    case 'chromadb':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="9" cy="12" r="6" fill="#FFDE2D" opacity="0.9" />
          <circle cx="15" cy="12" r="6" fill="#2962FF" opacity="0.82" />
          <circle cx="12" cy="8.5" r="4.5" fill="#FF6D00" opacity="0.78" />
        </svg>
      );

    case 'langchain':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="#1C3C3C" />
          <path
            d="M8 14.5a3 3 0 0 1 0-5h2m4 0h2a3 3 0 0 1 0 5h-2m-4.5-2.5h5"
            stroke="#E5EEA0"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'langgraph':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="#0E0E10" />
          <circle cx="7.5" cy="8.5" r="2" fill="#E5EEA0" />
          <circle cx="16.5" cy="8.5" r="2" fill="#C9E5F5" />
          <circle cx="12" cy="16.2" r="2" fill="#E5EEA0" />
          <path
            d="M9.3 9.5l5.4 0M8.5 10.3l2.6 4.2M15.5 10.3l-2.6 4.2"
            stroke="#FFFFFF"
            strokeWidth="1.3"
          />
        </svg>
      );

    case 'evidently':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="#ED0400" />
          <path
            d="M7 14.5l3-3.5 2.5 2 4.5-5"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'c':
    case 'cpp':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#00599C" d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2z" />
          <text
            x="12"
            y="14.5"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize={iconKey === 'cpp' ? '7.5' : '9.5'}
            fontWeight="700"
            fontFamily="monospace"
          >
            {iconKey === 'cpp' ? 'C++' : 'C'}
          </text>
        </svg>
      );

    case 'sql':
      return <Database className={`${className} text-sky-700`} />;
    case 'transformers':
      return <Cpu className={`${className} text-maroon`} />;
    case 'ml':
    case 'nlp':
      return <BrainCircuit className={`${className} text-maroon`} />;
    case 'genai':
    case 'prompt':
      return <Sparkles className={`${className} text-maroon`} />;
    case 'llms':
      return <Terminal className={`${className} text-ink`} />;
    case 'rag':
      return <Layers className={`${className} text-maroon`} />;
    case 'embeddings':
      return <Network className={`${className} text-ink`} />;
    case 'search':
      return <Search className={`${className} text-ink`} />;
    case 'agent':
      return <Bot className={`${className} text-maroon`} />;
    case 'workflow':
      return <Workflow className={`${className} text-maroon`} />;
    case 'api':
      return <GitBranch className={`${className} text-ink`} />;
    default:
      return <Code2 className={className} />;
  }
};
