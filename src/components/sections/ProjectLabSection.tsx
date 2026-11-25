import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Info,
  Layers,
  X,
  ZoomIn,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import type { ProjectData, ProjectScreenshot } from '../../types/portfolio';
import {
  EditorialTextReveal,
  MagneticWrap,
  RevealBlock,
} from '../motion/MotionPrimitives';
import { ProjectArchitectureDiagram } from '../graphics/ArchitectureDiagrams';
import { SparkleIcon } from '../graphics/Doodles';

export const ProjectLabSection: React.FC = () => {
  const { projects: PROJECTS_DATA } = usePortfolio();
  const [lightboxShot, setLightboxShot] = useState<ProjectScreenshot | null>(null);

  const flagships = PROJECTS_DATA.filter((p) => p.kind === 'flagship').sort(
    (a, b) => a.order - b.order
  );
  const majors = PROJECTS_DATA.filter((p) => p.kind === 'major').sort(
    (a, b) => a.order - b.order
  );
  const compacts = PROJECTS_DATA.filter((p) => p.kind === 'compact').sort(
    (a, b) => a.order - b.order
  );

  return (
    <section
      id="project-lab"
      className="relative overflow-hidden bg-offwhite py-24 sm:py-32 border-b border-ink/10"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <RevealBlock>
              <span className="inline-flex items-center gap-2 rounded-full bg-maroon px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-lime">
                <SparkleIcon className="w-3 h-3" />
                04 — PROJECT LAB
              </span>
            </RevealBlock>
            <EditorialTextReveal
              text="Curated engineering builds, shipped end to end."
              className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.03] text-ink max-w-2xl"
            />
          </div>
          <RevealBlock delay={0.12}>
            <p className="font-hand text-2xl text-maroon max-w-sm">
              from monitored ML pipelines &amp; grounded RAG to local video intelligence and n8n workflows
            </p>
          </RevealBlock>
        </div>

        {/* 1. FLAGSHIP PROJECTS */}
        <div className="space-y-12">
          {flagships.map((flagship) => (
            <FlagshipProjectSpread
              key={flagship.id}
              project={flagship}
              onZoomShot={setLightboxShot}
            />
          ))}
        </div>

        {/* 2 & 3. MAJOR PROJECTS: DOCUMIND & DEEPDIVE */}
        <div className="mt-14 space-y-14">
          {majors.map((project, idx) => (
            <MajorProjectSpread
              key={project.id}
              project={project}
              reverse={idx % 2 === 1}
              onZoomShot={setLightboxShot}
            />
          ))}
        </div>

        {/* 4 & 5. COMPACT N8N AUTOMATION WORKFLOWS */}
        {compacts.length > 0 && (
          <RevealBlock delay={0.1} className="mt-16">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-maroon font-semibold">
                  AUTOMATION EXPERIMENTS · N8N WORKFLOWS
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-1">
                  Compact Agentic Workflows
                </h3>
              </div>
              <span className="font-hand text-xl text-ink/70">
                workflow-first automation
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {compacts.map((item, idx) => (
                <motion.article
                  key={item.id}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className={`rounded-[26px] border border-ink/10 p-6 sm:p-7 transition-colors ${
                    idx % 2 === 0
                      ? 'bg-lime-soft/75 hover:bg-lime/80'
                      : 'bg-sky-soft/80 hover:bg-sky/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-maroon font-semibold">
                      0{item.order} · N8N
                    </span>
                    <span className="rounded-full bg-white/90 px-3 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink border border-ink/10">
                      Workflow
                    </span>
                  </div>
                  <h4 className="font-display text-2xl font-bold text-ink">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/80">
                    {item.summary}
                  </p>
                </motion.article>
              ))}
            </div>
          </RevealBlock>
        )}
      </div>

      {/* Authentic Screenshot Lightbox */}
      <AnimatePresence>
        {lightboxShot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxShot(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 sm:p-8 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-3xl bg-white p-3 sm:p-4 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightboxShot(null)}
                className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-maroon text-white flex items-center justify-center shadow-lg hover:bg-ink"
                aria-label="Close screenshot preview"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={lightboxShot.src}
                alt={lightboxShot.alt}
                className="w-full max-h-[75vh] object-contain rounded-2xl bg-charcoal"
              />
              <div className="mt-3 px-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-ink/85 font-medium">{lightboxShot.caption}</p>
                <span className="rounded-full bg-lime px-3 py-1 font-mono text-[11px] font-semibold text-ink">
                  {lightboxShot.tag}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Flagship Showcase: ModelOps Sentinel                                       */
/* -------------------------------------------------------------------------- */
const FlagshipProjectSpread: React.FC<{
  project: ProjectData;
  onZoomShot: (shot: ProjectScreenshot) => void;
}> = ({ project, onZoomShot }) => {
  const [activeShotIdx, setActiveShotIdx] = useState<number>(0);
  const activeShot = project.screenshots[activeShotIdx] ?? project.screenshots[0];

  return (
    <RevealBlock>
      <article className="relative overflow-hidden rounded-[34px] bg-ink text-white p-6 sm:p-10 lg:p-12 shadow-editorial border border-white/10">
        {/* Subtle top accent bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
          <span className="inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
            0{project.order} · {project.categoryLabel}
          </span>

          <div className="flex flex-wrap items-center gap-2.5">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-sky hover:text-ink px-4 py-1.5 font-mono text-xs font-medium text-white transition-colors border border-white/15"
              >
                {link.label}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ))}
            <MagneticWrap strength={0.18}>
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-maroon hover:bg-lime hover:text-ink px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-white transition-colors border border-lime/30"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Case Study
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </MagneticWrap>
          </div>
        </div>

        {/* Main Asymmetrical Flagship Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Narrative + Verified Metrics + Monitoring Findings */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
                {project.title}
              </h3>
              <p className="mt-2 font-serif italic text-xl sm:text-2xl text-lime">
                {project.subtitle}
              </p>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/80">
                {project.summary}
              </p>
            </div>

            {/* Verified Model Evaluation Metrics */}
            {project.metrics && (
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky block mb-2.5">
                  VERIFIED HELD-OUT MODEL METRICS
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl bg-white/5 border border-white/10 p-3.5"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/60">
                        {m.label}
                      </span>
                      <div className="font-display text-2xl font-bold text-lime mt-0.5">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actual Monitoring Findings */}
            {project.findings && (
              <div className="rounded-2xl bg-white/5 border border-sky/25 p-4 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky block">
                  ACTUAL MONITORING FINDINGS (4,507 REF vs. 500 BATCH)
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-white/85">
                  {project.findings.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-lime shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white/90 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Interactive Authentic Screenshot Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {activeShot && (
              <div className="relative group rounded-3xl overflow-hidden bg-charcoal border border-white/15">
                <button
                  type="button"
                  onClick={() => onZoomShot(activeShot)}
                  className="block w-full text-left focus:outline-none"
                >
                  <div className="relative aspect-[16/9.5] overflow-hidden bg-[#0B101B]">
                    <motion.img
                      key={activeShot.id}
                      initial={{ opacity: 0.4, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      src={activeShot.src}
                      alt={activeShot.alt}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 backdrop-blur-md px-3 py-1.5 font-mono text-[11px] text-lime border border-white/15">
                      <ZoomIn className="w-3.5 h-3.5" />
                      Inspect
                    </span>
                  </div>
                </button>
                <div className="px-4 py-3 bg-[#121216] border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs sm:text-sm text-white/85">{activeShot.caption}</p>
                  <span className="rounded-full bg-sky/20 px-2.5 py-0.5 font-mono text-[10px] text-sky">
                    {activeShot.tag}
                  </span>
                </div>
              </div>
            )}

            {/* Screenshot Switcher Thumbnails */}
            {project.screenshots.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {project.screenshots.map((shot, idx) => (
                  <button
                    key={shot.id}
                    type="button"
                    onClick={() => setActiveShotIdx(idx)}
                    className={`group rounded-2xl overflow-hidden border text-left transition-all ${
                      idx === activeShotIdx
                        ? 'border-lime ring-2 ring-lime/60 scale-[1.02]'
                        : 'border-white/15 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-video bg-charcoal overflow-hidden">
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-2 py-1.5 bg-[#121216] font-mono text-[10px] text-white/85 truncate">
                      {shot.tag}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Explicit Distinction Note for Illustrative Drift Trend */}
            {project.distinctionNote && (
              <div className="flex items-start gap-2.5 rounded-2xl bg-white/5 px-4 py-3 border border-white/10 text-xs text-white/70">
                <Info className="w-4 h-4 text-lime shrink-0 mt-0.5" />
                <p>{project.distinctionNote}</p>
              </div>
            )}
          </div>
        </div>
      </article>
    </RevealBlock>
  );
};

/* -------------------------------------------------------------------------- */
/* Major Project Editorial Spread: DocuMind & DeepDive                        */
/* -------------------------------------------------------------------------- */
const MajorProjectSpread: React.FC<{
  project: ProjectData;
  reverse?: boolean;
  onZoomShot: (shot: ProjectScreenshot) => void;
}> = ({ project, reverse = false, onZoomShot }) => {
  const isMaroon = project.accentTheme === 'maroon';

  return (
    <RevealBlock>
      <article
        className={`rounded-[34px] border p-6 sm:p-10 transition-shadow hover:shadow-editorial ${
          isMaroon
            ? 'bg-maroon text-white border-maroon-dark'
            : 'bg-sky-soft text-ink border-ink/10'
        }`}
      >
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center ${
            reverse ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* Visual Side: Authentic Screenshots Collage OR Cover Image OR Custom SVG Architecture Diagram */}
          <div className="lg:col-span-6">
            {project.screenshots.length > 0 ? (
              <div className="relative grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {project.screenshots.map((shot, i) => (
                  <motion.button
                    key={shot.id}
                    type="button"
                    whileHover={{ y: -4, rotate: i === 0 ? -0.5 : 0.8 }}
                    onClick={() => onZoomShot(shot)}
                    className={`group text-left rounded-2xl bg-white p-2.5 shadow-polaroid border border-ink/10 overflow-hidden ${
                      i === 0
                        ? 'sm:col-span-12'
                        : 'sm:col-span-9 sm:col-start-4 sm:-mt-10 relative z-10'
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-offwhite">
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2.5 right-2.5 rounded-full bg-ink/80 text-white px-2.5 py-1 font-mono text-[10px] inline-flex items-center gap-1">
                        <ZoomIn className="w-3 h-3 text-lime" />
                        {shot.tag}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : project.coverImage ? (
              <motion.button
                type="button"
                whileHover={{ y: -4 }}
                onClick={() =>
                  onZoomShot({
                    id: `${project.id}-cover`,
                    src: project.coverImage!,
                    alt: `${project.title} cover`,
                    caption: project.subtitle,
                    tag: 'Cover',
                  })
                }
                className="group w-full text-left rounded-2xl bg-white p-2.5 shadow-polaroid border border-ink/10 overflow-hidden"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-offwhite">
                  <img
                    src={project.coverImage}
                    alt={`${project.title} cover`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2.5 right-2.5 rounded-full bg-ink/80 text-white px-2.5 py-1 font-mono text-[10px] inline-flex items-center gap-1">
                    <ZoomIn className="w-3 h-3 text-lime" />
                    Preview
                  </span>
                </div>
              </motion.button>
            ) : project.architectureDiagramType ? (
              <ProjectArchitectureDiagram type={project.architectureDiagramType} />
            ) : (
              <div className="rounded-3xl bg-white/95 text-ink p-7 border border-ink/10">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-maroon font-semibold">
                  ARCHITECTURE SUMMARY
                </span>
                <p className="mt-3 font-serif italic text-xl leading-relaxed">
                  {project.caseStudy?.architectureSummary || project.summary}
                </p>
              </div>
            )}
          </div>

          {/* Editorial Content Side */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`rounded-full px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] ${
                  isMaroon
                    ? 'bg-lime text-ink'
                    : 'bg-white text-maroon border border-ink/10'
                }`}
              >
                0{project.order} · {project.categoryLabel.split('·')[1]?.trim() || project.categoryLabel}
              </span>
            </div>

            <div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                {project.title}
              </h3>
              <p
                className={`mt-1 font-serif italic text-xl sm:text-2xl ${
                  isMaroon ? 'text-lime' : 'text-maroon'
                }`}
              >
                {project.subtitle}
              </p>
            </div>

            {project.tagline && (
              <p
                className={`rounded-2xl px-4 py-3 font-serif italic text-lg border ${
                  isMaroon
                    ? 'bg-white/10 border-white/15 text-white'
                    : 'bg-white border-ink/10 text-maroon'
                }`}
              >
                “{project.tagline}”
              </p>
            )}

            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isMaroon ? 'text-white/85' : 'text-ink/80'
              }`}
            >
              {project.summary}
            </p>

            {/* Confirmed Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feat) => (
                <div
                  key={feat}
                  className={`flex items-start gap-2 text-xs sm:text-sm ${
                    isMaroon ? 'text-white/85' : 'text-ink/85'
                  }`}
                >
                  <Layers
                    className={`w-3.5 h-3.5 shrink-0 mt-1 ${
                      isMaroon ? 'text-lime' : 'text-maroon'
                    }`}
                  />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-1">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className={`rounded-full px-3 py-1 font-mono text-xs ${
                    isMaroon
                      ? 'bg-white/10 text-white border border-white/15'
                      : 'bg-white text-ink border border-ink/10'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <MagneticWrap strength={0.18}>
                <Link
                  to={`/projects/${project.slug}`}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-bold transition-colors ${
                    isMaroon
                      ? 'bg-lime text-ink hover:bg-white'
                      : 'bg-ink text-white hover:bg-maroon'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Read Case Study
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </MagneticWrap>

              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 font-mono text-xs font-semibold border transition-colors ${
                    isMaroon
                      ? 'border-white/30 text-white hover:bg-white/10'
                      : 'border-ink/20 bg-white text-ink hover:border-maroon hover:text-maroon'
                  }`}
                >
                  {link.label}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>
    </RevealBlock>
  );
};
