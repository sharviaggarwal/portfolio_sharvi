import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Info,
  X,
  ZoomIn,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import type { ProjectScreenshot } from '../types/portfolio';
import { ProjectArchitectureDiagram } from '../components/graphics/ArchitectureDiagrams';
import { EDITORIAL_EASE, RevealBlock } from '../components/motion/MotionPrimitives';
import { SparkleIcon } from '../components/graphics/Doodles';

export const ProjectCaseStudyPage: React.FC = () => {
  const { projects: PROJECTS_DATA } = usePortfolio();
  const { slug } = useParams<{ slug: string }>();
  const [lightbox, setLightbox] = useState<ProjectScreenshot | null>(null);

  const majorProjects = PROJECTS_DATA.filter((p) => Boolean(p.caseStudy));
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!project || !project.caseStudy) {
    return (
      <main className="min-h-screen bg-offwhite pt-32 pb-24 px-5">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h1 className="font-display text-4xl font-bold text-ink">
            Case study not found
          </h1>
          <Link
            to="/#project-lab"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-maroon"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Project Lab
          </Link>
        </div>
      </main>
    );
  }

  const cs = project.caseStudy;
  const currentIndex = majorProjects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    majorProjects[(currentIndex + 1) % majorProjects.length] ?? null;

  return (
    <main className="min-h-screen bg-offwhite pt-28 pb-24">
      {/* Header Band */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8">
        <Link
          to="/#project-lab"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink border border-ink/10 hover:bg-lime transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Project Lab
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EDITORIAL_EASE }}
          className="mt-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-maroon px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-lime">
            <SparkleIcon className="w-3 h-3" />
            CASE STUDY 0{project.order} · {project.categoryLabel}
          </span>

          <h1 className="mt-4 font-display text-4xl sm:text-6xl font-bold tracking-tight text-ink">
            {project.title}
          </h1>
          <p className="mt-2 font-serif italic text-2xl sm:text-3xl text-maroon">
            {project.subtitle}
          </p>

          {project.tagline && (
            <p className="mt-4 inline-block rounded-2xl bg-sky px-4 py-2 font-serif italic text-lg text-ink border border-ink/10">
              “{project.tagline}”
            </p>
          )}

          {/* Verified Stack & External Links */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-ink/10">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white px-3.5 py-1.5 font-mono text-xs font-medium text-ink border border-ink/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-maroon transition-colors"
                  >
                    {link.label}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Big Idea & Problem Editorial Split */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevealBlock className="rounded-[28px] bg-lime-soft p-7 sm:p-8 border border-ink/10">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-maroon font-semibold">
              01 · BIG IDEA
            </span>
            <p className="mt-3 font-serif italic text-2xl leading-snug text-ink">
              {cs.bigIdea}
            </p>
          </RevealBlock>

          <RevealBlock delay={0.08} className="rounded-[28px] bg-white p-7 sm:p-8 border border-ink/10">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-maroon font-semibold">
              02 · THE PROBLEM
            </span>
            <p className="mt-3 text-base leading-relaxed text-ink/85">
              {cs.problem}
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* Architecture & Workflow */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 mt-12 space-y-6">
        <RevealBlock>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-maroon font-semibold">
            03 · ARCHITECTURE &amp; WORKFLOW
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink">
            How the system works end to end
          </h2>
          <p className="mt-2 text-sm sm:text-base text-ink/75 max-w-3xl">
            {cs.architectureSummary}
          </p>
        </RevealBlock>

        {project.architectureDiagramType && (
          <RevealBlock delay={0.08}>
            <ProjectArchitectureDiagram type={project.architectureDiagramType} />
          </RevealBlock>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cs.workflowSteps.map((ws, idx) => (
            <RevealBlock
              key={ws.step}
              delay={idx * 0.06}
              className="rounded-3xl bg-white p-5 border border-ink/10"
            >
              <span className="font-mono text-xs font-bold text-maroon">
                {ws.step}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold text-ink">
                {ws.title}
              </h3>
              <p className="mt-2 text-sm text-ink/75 leading-relaxed">
                {ws.detail}
              </p>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* Engineering Approach */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 mt-12">
        <RevealBlock className="rounded-[30px] bg-charcoal text-white p-7 sm:p-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">
            04 · ENGINEERING APPROACH
          </span>
          <ul className="mt-5 space-y-3.5">
            {cs.engineeringApproach.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-white/90">
                <CheckCircle2 className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </RevealBlock>
      </section>

      {/* Results, Metrics & Findings */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 mt-12 space-y-6">
        <RevealBlock>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-maroon font-semibold">
            05 · RESULTS &amp; LEARNINGS
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink">
            Measured outcomes &amp; takeaways
          </h2>
        </RevealBlock>

        {project.metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-3xl bg-white p-5 border border-ink/10"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60">
                  {m.label}
                </span>
                <div className="font-display text-3xl font-bold text-maroon mt-1">
                  {m.value}
                </div>
                {m.note && (
                  <p className="mt-1 text-xs text-ink/65">{m.note}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {project.findings && (
          <div className="rounded-3xl bg-sky-soft p-6 border border-ink/10 space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold block">
              MONITORING &amp; DRIFT FINDINGS
            </span>
            {project.findings.map((f) => (
              <p key={f} className="text-sm sm:text-base text-ink/85 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-maroon shrink-0 mt-1" />
                <span>{f}</span>
              </p>
            ))}
          </div>
        )}

        {project.distinctionNote && (
          <div className="flex items-start gap-2.5 rounded-2xl bg-white p-4 border border-ink/10 text-xs sm:text-sm text-ink/75">
            <Info className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
            <p>{project.distinctionNote}</p>
          </div>
        )}

        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-ink/10 space-y-3">
          {cs.resultsAndLearnings.map((rl) => (
            <p key={rl} className="text-sm sm:text-base text-ink/85 flex items-start gap-2.5">
              <SparkleIcon className="w-4 h-4 text-maroon shrink-0 mt-1" />
              <span>{rl}</span>
            </p>
          ))}
        </div>
      </section>

      {/* Authentic Screenshots Gallery (Only rendered when real screenshots exist) */}
      {project.screenshots.length > 0 && (
        <section className="mx-auto max-w-5xl px-5 sm:px-8 mt-14">
          <RevealBlock>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-maroon font-semibold">
              06 · AUTHENTIC SCREENSHOTS
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink mb-6">
              Live application &amp; API captures
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.screenshots.map((shot) => (
              <motion.button
                key={shot.id}
                type="button"
                whileHover={{ y: -4 }}
                onClick={() => setLightbox(shot)}
                className="group text-left rounded-3xl bg-white p-3 border border-ink/10 shadow-sm hover:shadow-editorial transition-all"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-charcoal">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[10px] text-lime">
                    <ZoomIn className="w-3 h-3" />
                    Zoom
                  </span>
                </div>
                <div className="mt-3 px-1 flex items-start justify-between gap-3">
                  <p className="text-xs sm:text-sm text-ink/80">{shot.caption}</p>
                  <span className="rounded-full bg-lime px-2.5 py-0.5 font-mono text-[10px] font-semibold text-ink shrink-0">
                    {shot.tag}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* Next Case Study Footer Navigation */}
      {nextProject && nextProject.slug !== project.slug && (
        <section className="mx-auto max-w-5xl px-5 sm:px-8 mt-16">
          <Link
            to={`/projects/${nextProject.slug}`}
            className="group flex flex-wrap items-center justify-between gap-4 rounded-[30px] bg-maroon text-white p-7 sm:p-9 hover:bg-ink transition-colors"
          >
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">
                NEXT CASE STUDY
              </span>
              <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold">
                {nextProject.title} — {nextProject.subtitle}
              </h3>
            </div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lime text-ink transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-5 h-5" />
            </span>
          </Link>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 sm:p-8 backdrop-blur-md"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-3xl bg-white p-4 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-maroon text-white flex items-center justify-center"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full max-h-[75vh] object-contain rounded-2xl bg-charcoal"
              />
              <p className="mt-3 text-sm text-ink/85">{lightbox.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
