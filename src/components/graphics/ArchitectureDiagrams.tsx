import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Hardware (FPGA / Verilog / Circuit) -> Intelligence -> AI/ML visual transition
 */
export const HardwareToNeuralGraphic: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/15 bg-[#121216] p-6 sm:p-8 text-white">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime">
          EVOLUTION GRAPHIC · HARDWARE → INTELLIGENCE → AI/ML
        </span>
        <span className="font-hand text-xl text-sky">silicon logic meets neural weights</span>
      </div>

      <svg
        viewBox="0 0 920 220"
        className="w-full h-auto"
        role="img"
        aria-label="Visual progression from Hardware FPGA circuit traces to Intelligence and AI/ML neural network nodes"
      >
        <defs>
          <linearGradient id="circuitToNeural" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9E5F5" />
            <stop offset="50%" stopColor="#E5EEA0" />
            <stop offset="100%" stopColor="#68152B" />
          </linearGradient>
        </defs>

        {/* Left: FPGA / Verilog Circuit Traces */}
        <g stroke="#C9E5F5" strokeWidth="1.8" fill="none" opacity="0.9">
          <rect x="28" y="54" width="112" height="112" rx="10" fill="#1A222B" stroke="#C9E5F5" />
          <rect x="52" y="78" width="64" height="64" rx="4" stroke="#E5EEA0" strokeDasharray="4 3" />
          <text
            x="84"
            y="108"
            textAnchor="middle"
            fill="#C9E5F5"
            stroke="none"
            fontSize="11"
            fontFamily="monospace"
          >
            FPGA / RTL
          </text>
          <text
            x="84"
            y="124"
            textAnchor="middle"
            fill="#E5EEA0"
            stroke="none"
            fontSize="9.5"
            fontFamily="monospace"
          >
            VERILOG
          </text>

          {/* Circuit orthogonal pins */}
          <path d="M140 76 H210 L236 100 H310" />
          <path d="M140 110 H310" />
          <path d="M140 144 H210 L236 120 H310" />
          <circle cx="210" cy="76" r="3.5" fill="#C9E5F5" />
          <circle cx="210" cy="144" r="3.5" fill="#C9E5F5" />
        </g>

        {/* Animated signal pulse moving hardware -> intelligence -> neural */}
        <motion.circle
          r="4.5"
          fill="#E5EEA0"
          initial={{ cx: 140, cy: 110, opacity: 0.9 }}
          animate={{ cx: [140, 460, 770], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Center: Bridge / Systems Intelligence */}
        <g>
          <rect
            x="312"
            y="62"
            width="210"
            height="96"
            rx="16"
            fill="#1D1D24"
            stroke="url(#circuitToNeural)"
            strokeWidth="2"
          />
          <text
            x="417"
            y="98"
            textAnchor="middle"
            fill="#E5EEA0"
            fontSize="11"
            fontFamily="monospace"
            letterSpacing="2"
          >
            SYSTEMS &amp; LOGIC
          </text>
          <text
            x="417"
            y="124"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="16"
            fontFamily="Georgia, serif"
            fontStyle="italic"
          >
            Deeper Curiosity
          </text>
          <text
            x="417"
            y="144"
            textAnchor="middle"
            fill="#A1A1AA"
            fontSize="10"
            fontFamily="monospace"
          >
            DSA · OOP · Pipelines · APIs
          </text>
        </g>

        {/* Transition curved neural synapses */}
        <g stroke="#E5EEA0" strokeWidth="1.5" fill="none" opacity="0.65">
          <path d="M522 92 C585 92, 600 58, 650 58" />
          <path d="M522 110 C585 110, 600 110, 650 110" />
          <path d="M522 128 C585 128, 600 162, 650 162" />

          {/* Hidden layer to output layer */}
          <path d="M650 58 L765 82" stroke="#C9E5F5" />
          <path d="M650 58 L765 138" stroke="#C9E5F5" />
          <path d="M650 110 L765 82" stroke="#E5EEA0" />
          <path d="M650 110 L765 138" stroke="#E5EEA0" />
          <path d="M650 162 L765 82" stroke="#C9E5F5" />
          <path d="M650 162 L765 138" stroke="#C9E5F5" />

          <path d="M765 82 L856 110" stroke="#E5EEA0" strokeWidth="2" />
          <path d="M765 138 L856 110" stroke="#E5EEA0" strokeWidth="2" />
        </g>

        {/* Right: Neural Network Nodes */}
        <g>
          {[58, 110, 162].map((cy, idx) => (
            <circle
              key={`h1-${idx}`}
              cx="650"
              cy={cy}
              r="11"
              fill="#68152B"
              stroke="#E5EEA0"
              strokeWidth="2"
            />
          ))}
          {[82, 138].map((cy, idx) => (
            <circle
              key={`h2-${idx}`}
              cx="765"
              cy={cy}
              r="12"
              fill="#1E293B"
              stroke="#C9E5F5"
              strokeWidth="2"
            />
          ))}
          <circle cx="856" cy="110" r="22" fill="#E5EEA0" />
          <text
            x="856"
            y="114"
            textAnchor="middle"
            fill="#0E0E10"
            fontSize="11"
            fontWeight="700"
            fontFamily="monospace"
          >
            AI/ML
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Custom original SVG architecture diagrams for project case studies & showcases
 */
export const ProjectArchitectureDiagram: React.FC<{
  type: 'modelops' | 'documind' | 'deepdive';
}> = ({ type }) => {
  if (type === 'deepdive') {
    return (
      <div className="rounded-3xl border border-ink/10 bg-sky-soft/70 p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
            ARCHITECTURE DIAGRAM · LOCAL VIDEO &amp; MEETING INTELLIGENCE
          </span>
          <span className="rounded-full bg-white px-3 py-1 font-mono text-[11px] text-ink border border-ink/10">
            100% Local RAG + Diarization
          </span>
        </div>
        <svg
          viewBox="0 0 880 230"
          className="w-full h-auto"
          role="img"
          aria-label="DeepDive architecture: YouTube Transcript API and uploaded media with pyannote.audio diarization feeding Sentence Transformers, ChromaDB, and local Ollama LLM"
        >
          {/* Step 1: Inputs */}
          <rect x="20" y="26" width="170" height="72" rx="14" fill="#FFFFFF" stroke="#0E0E10" strokeWidth="1.6" />
          <text x="105" y="54" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#68152B">INPUT 01</text>
          <text x="105" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0E0E10">YouTube Link</text>

          <rect x="20" y="128" width="170" height="72" rx="14" fill="#FFFFFF" stroke="#0E0E10" strokeWidth="1.6" />
          <text x="105" y="156" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#68152B">INPUT 02</text>
          <text x="105" y="177" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0E0E10">Audio / Video File</text>

          {/* Arrows 1 -> 2 */}
          <path d="M190 62 H242" stroke="#0E0E10" strokeWidth="1.8" markerEnd="url(#ddArrow)" />
          <path d="M190 164 H242" stroke="#0E0E10" strokeWidth="1.8" />

          {/* Step 2: Transcript & Diarization */}
          <rect x="244" y="42" width="188" height="142" rx="16" fill="#0E0E10" />
          <text x="338" y="74" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill="#E5EEA0">EXTRACTION &amp; SPEAKERS</text>
          <text x="338" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFFFFF">YouTube Transcript API</text>
          <line x1="274" y1="118" x2="402" y2="118" stroke="#FFFFFF" strokeOpacity="0.2" />
          <text x="338" y="142" textAnchor="middle" fontSize="13" fontWeight="700" fill="#C9E5F5">pyannote.audio</text>
          <text x="338" y="162" textAnchor="middle" fontSize="11" fill="#D4D4D8">Speaker Diarization</text>

          {/* Arrow 2 -> 3 */}
          <path d="M432 113 H478" stroke="#0E0E10" strokeWidth="1.8" />

          {/* Step 3: Embeddings & ChromaDB */}
          <rect x="480" y="42" width="182" height="142" rx="16" fill="#E5EEA0" stroke="#0E0E10" strokeWidth="1.6" />
          <text x="571" y="74" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill="#68152B">VECTOR INDEX</text>
          <text x="571" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0E0E10">Sentence Transformers</text>
          <text x="571" y="128" textAnchor="middle" fontSize="11" fill="#0E0E10">Timestamped Chunks</text>
          <rect x="514" y="144" width="114" height="26" rx="13" fill="#0E0E10" />
          <text x="571" y="161" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#FFFFFF">ChromaDB</text>

          {/* Arrow 3 -> 4 */}
          <path d="M662 113 H704" stroke="#0E0E10" strokeWidth="1.8" />

          {/* Step 4: Ollama Outputs */}
          <rect x="706" y="42" width="154" height="142" rx="16" fill="#68152B" />
          <text x="783" y="74" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill="#E5EEA0">LOCAL LLM</text>
          <text x="783" y="102" textAnchor="middle" fontSize="15" fontWeight="700" fill="#FFFFFF">Ollama</text>
          <text x="783" y="132" textAnchor="middle" fontSize="11.5" fill="#F4F4F5">• Summaries</text>
          <text x="783" y="152" textAnchor="middle" fontSize="11.5" fill="#F4F4F5">• Video Q&amp;A</text>
          <text x="783" y="172" textAnchor="middle" fontSize="11.5" fill="#C9E5F5">• Timestamp Links</text>
        </svg>
      </div>
    );
  }

  if (type === 'documind') {
    return (
      <div className="rounded-3xl border border-ink/10 bg-offwhite p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-maroon">
            ARCHITECTURE DIAGRAM · DOCUMIND RAG PIPELINE
          </span>
          <span className="rounded-full bg-maroon text-white px-3 py-1 font-mono text-[11px]">
            Separate Frontend &amp; Backend
          </span>
        </div>
        <svg viewBox="0 0 880 175" className="w-full h-auto" role="img" aria-label="DocuMind architecture flow">
          {[
            { x: 18, title: 'Auth & PDF Upload', sub: 'Separate Frontend', bg: '#FFFFFF', fg: '#0E0E10' },
            { x: 234, title: 'Parse & Chunk', sub: 'Python Backend', bg: '#C9E5F5', fg: '#0E0E10' },
            { x: 450, title: 'Embeddings & Search', sub: 'Supabase Vector DB', bg: '#E5EEA0', fg: '#0E0E10' },
            { x: 666, title: 'Grounded Q&A', sub: 'LLMs + Source Context', bg: '#68152B', fg: '#FFFFFF' },
          ].map((node, i) => (
            <g key={node.title}>
              <rect
                x={node.x}
                y="32"
                width="196"
                height="110"
                rx="16"
                fill={node.bg}
                stroke="#0E0E10"
                strokeWidth="1.6"
              />
              <text x={node.x + 98} y="66" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill={node.fg} opacity="0.7">
                0{i + 1}
              </text>
              <text x={node.x + 98} y="92" textAnchor="middle" fontSize="14" fontWeight="700" fill={node.fg}>
                {node.title}
              </text>
              <text x={node.x + 98} y="116" textAnchor="middle" fontSize="11.5" fill={node.fg} opacity="0.85">
                {node.sub}
              </text>
              {i < 3 && (
                <path
                  d={`M${node.x + 196} 87 H${node.x + 216}`}
                  stroke="#0E0E10"
                  strokeWidth="2"
                />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/15 bg-charcoal p-5 sm:p-7 text-white">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">
          ARCHITECTURE DIAGRAM · MODELOPS SENTINEL PIPELINE
        </span>
        <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] text-sky">
          FastAPI (Render) + PostgreSQL + LangGraph
        </span>
      </div>
      <svg viewBox="0 0 880 185" className="w-full h-auto" role="img" aria-label="ModelOps Sentinel architecture flow">
        {[
          { x: 18, title: 'Telco Churn (7,043)', sub: '4,507 Ref / 500 Batch', bg: '#1F242D', fg: '#FFFFFF', border: '#C9E5F5' },
          { x: 234, title: 'Evidently + Chi-Sq', sub: '14/19 Drift · +25.64 pp', bg: '#E5EEA0', fg: '#0E0E10', border: '#E5EEA0' },
          { x: 450, title: 'FastAPI + PostgreSQL', sub: 'Metrics & Incident Logs', bg: '#C9E5F5', fg: '#0E0E10', border: '#C9E5F5' },
          { x: 666, title: 'LangGraph HITL', sub: 'Investigate · Approve/Reject', bg: '#68152B', fg: '#FFFFFF', border: '#E5EEA0' },
        ].map((node, i) => (
          <g key={node.title}>
            <rect
              x={node.x}
              y="36"
              width="196"
              height="112"
              rx="16"
              fill={node.bg}
              stroke={node.border}
              strokeWidth="1.6"
            />
            <text x={node.x + 98} y="68" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill={node.fg} opacity="0.75">
              STAGE 0{i + 1}
            </text>
            <text x={node.x + 98} y="96" textAnchor="middle" fontSize="13.5" fontWeight="700" fill={node.fg}>
              {node.title}
            </text>
            <text x={node.x + 98} y="120" textAnchor="middle" fontSize="11.5" fill={node.fg} opacity="0.88">
              {node.sub}
            </text>
            {i < 3 && (
              <path
                d={`M${node.x + 196} 92 H${node.x + 216}`}
                stroke="#E5EEA0"
                strokeWidth="2"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};
