import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, X, ZoomIn } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { AccentTheme, TechMemory } from '../../types/portfolio';
import {
  EDITORIAL_EASE,
  EditorialTextReveal,
  FloatingAccent,
  RevealBlock,
} from '../motion/MotionPrimitives';
import { TechLogo } from '../graphics/TechLogos';
import { HandDrawnLoop, SparkleIcon, TapeStrip } from '../graphics/Doodles';

type FilterMode = 'all' | 'shared' | string;

const MEMORY_TAG_STYLE: Record<AccentTheme, string> = {
  lime: 'bg-lime text-ink border-ink/15',
  sky: 'bg-sky text-ink border-ink/15',
  maroon: 'bg-maroon text-white border-maroon-dark',
  ink: 'bg-ink text-white border-ink',
  paper: 'bg-white text-ink border-ink/15',
};

export const TechWorldSection: React.FC = () => {
  const {
    techCategories: TECH_CATEGORIES,
    skills: TECH_ITEMS,
    projects: PROJECTS_DATA,
    memories: TECH_MEMORIES_DATA,
  } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<FilterMode>('all');
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);
  const [reelPaused, setReelPaused] = useState(false);
  const [activeMemory, setActiveMemory] = useState<TechMemory | null>(null);

  const projectFilters = useMemo(
    () =>
      PROJECTS_DATA.filter((p) =>
        TECH_ITEMS.some((t) => t.projectIds?.includes(p.id))
      ).map((p) => ({ id: p.id, title: p.title })),
    [PROJECTS_DATA, TECH_ITEMS]
  );

  const projectNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    PROJECTS_DATA.forEach((p) => {
      map[p.id] = p.title;
    });
    return map;
  }, [PROJECTS_DATA]);

  const selectedTech = useMemo(
    () => TECH_ITEMS.find((t) => t.id === selectedTechId) ?? null,
    [TECH_ITEMS, selectedTechId]
  );

  const isHighlighted = (itemId: string) => {
    const item = TECH_ITEMS.find((t) => t.id === itemId);
    if (!item) return false;
    if (activeFilter === 'all') return true;
    if (activeFilter === 'shared') return Boolean(item.isSharedToolkit);
    return Boolean(item.projectIds?.includes(activeFilter));
  };

  const categorySpanClass = (idx: number) => {
    const spans = [
      'lg:col-span-7 bg-offwhite/95',
      'lg:col-span-5 bg-sky-soft/95',
      'lg:col-span-4 bg-white/95',
      'lg:col-span-8 bg-lime-soft/85',
      'lg:col-span-4 bg-sky/45',
      'lg:col-span-4 bg-offwhite/95',
      'lg:col-span-4 bg-white/95',
    ];
    return spans[idx % spans.length];
  };

  // Duplicate memory array once for seamless infinite marquee loop
  const loopedMemories = useMemo(
    () => [...TECH_MEMORIES_DATA, ...TECH_MEMORIES_DATA],
    [TECH_MEMORIES_DATA]
  );

  const loopedTickerItems = useMemo(
    () => [...TECH_ITEMS, ...TECH_ITEMS],
    [TECH_ITEMS]
  );

  return (
    <section
      id="tech-world"
      className="relative overflow-hidden bg-white py-24 sm:py-32 border-b border-ink/10"
    >
      {/* Animated Constellation SVG Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-60"
      >
        <svg
          viewBox="0 0 1200 900"
          className="w-full h-full object-cover"
          fill="none"
        >
          <motion.path
            d="M80 180 C260 120, 440 280, 640 190 S980 120, 1140 240"
            stroke="#C9E5F5"
            strokeWidth="2"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [0, -56] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d="M40 540 C280 460, 520 620, 760 510 S1020 420, 1160 560"
            stroke="#E5EEA0"
            strokeWidth="2.5"
            strokeDasharray="8 10"
            animate={{ strokeDashoffset: [0, 72] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <motion.circle
            r="5"
            fill="#68152B"
            animate={{ cx: [80, 640, 1140], cy: [180, 190, 240] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            r="5"
            fill="#68152B"
            animate={{ cx: [1160, 760, 40], cy: [560, 510, 540] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Subtle sky & lime ambient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-32 h-96 w-96 rounded-full bg-sky/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-20 h-72 w-72 rounded-full bg-lime/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-7">
            <RevealBlock>
              <span className="inline-flex items-center gap-2 rounded-full bg-sky px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink border border-ink/10">
                <SparkleIcon className="w-3 h-3 text-maroon" />
                03 — MY TECH WORLD &amp; MEMORIES
              </span>
            </RevealBlock>

            <div className="relative inline-block">
              <EditorialTextReveal
                text="An interconnected stack—and the moments behind the builds."
                className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.03] text-ink"
              />
              <HandDrawnLoop className="hidden sm:block w-36 h-14 text-maroon/45 -mt-3 ml-2" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <RevealBlock delay={0.12}>
              <p className="text-base text-ink/75 leading-relaxed">
                Explore how technologies connect across my projects alongside real lab, event, and team moments from my engineering journey.
              </p>
            </RevealBlock>
          </div>
        </div>

        {/* Animated Tech Ticker Ribbon */}
        <RevealBlock delay={0.12} className="mb-10">
          <div className="relative overflow-hidden rounded-full bg-ink text-white py-2.5 border border-ink/15 marquee-pause-on-hover">
            <div className="animate-marquee items-center gap-6 px-3">
              {loopedTickerItems.map((tech, idx) => (
                <div
                  key={`${tech.id}-ticker-${idx}`}
                  className="inline-flex items-center gap-2 shrink-0"
                >
                  <TechLogo iconKey={tech.iconKey} className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/90">
                    {tech.name}
                  </span>
                  <span className="text-lime text-xs">✦</span>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>

        {/* Interactive Project & Toolkit Constellation Filter Bar */}
        <RevealBlock delay={0.15} className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-offwhite p-2.5 border border-ink/10">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  activeFilter === 'all'
                    ? 'bg-ink text-white shadow-sm'
                    : 'text-ink/70 hover:bg-white hover:text-ink'
                }`}
              >
                All Technologies
              </button>

              {projectFilters.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => setActiveFilter(proj.id)}
                  className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                    activeFilter === proj.id
                      ? 'bg-maroon text-white shadow-sm'
                      : 'text-ink/75 hover:bg-lime/70 hover:text-ink'
                  }`}
                >
                  {proj.title}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setActiveFilter('shared')}
                className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  activeFilter === 'shared'
                    ? 'bg-lime text-ink font-bold border border-ink/20'
                    : 'text-ink/75 hover:bg-sky/70 hover:text-ink'
                }`}
              >
                Shared General Toolkit
              </button>
            </div>

            {selectedTech && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden sm:flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 border border-ink/10 text-xs"
              >
                <TechLogo iconKey={selectedTech.iconKey} className="w-4 h-4" />
                <span className="font-semibold text-ink">{selectedTech.name}:</span>
                <span className="font-mono text-[11px] text-maroon">
                  {selectedTech.projectIds?.length
                    ? selectedTech.projectIds.map((pid) => projectNameMap[pid]).join(' · ')
                    : 'General Engineering Toolkit'}
                </span>
              </motion.div>
            )}
          </div>
        </RevealBlock>

        {/* Asymmetrical Editorial Tech Clusters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {TECH_CATEGORIES.map((cat, idx) => {
            const items = TECH_ITEMS.filter((item) => item.categoryId === cat.id);
            const hasMatch = items.some((i) => isHighlighted(i.id));

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -3 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.05,
                  ease: EDITORIAL_EASE,
                }}
                className={`relative rounded-[28px] border border-ink/10 p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 ${categorySpanClass(
                  idx
                )} ${
                  hasMatch
                    ? 'opacity-100 shadow-sm hover:shadow-editorial'
                    : 'opacity-40'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-maroon font-semibold">
                        {cat.number}
                      </span>
                      {hasMatch && activeFilter !== 'all' && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-maroon opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-maroon" />
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-ink mt-0.5">
                      {cat.title}
                    </h3>
                  </div>
                  <FloatingAccent amplitude={3} duration={4 + idx * 0.4} rotate={3}>
                    <span className="inline-block rounded-full bg-white/95 px-3 py-1 font-mono text-[11px] text-ink/75 border border-ink/10 shadow-sm">
                      {items.length} tools
                    </span>
                  </FloatingAccent>
                </div>

                <p className="text-sm text-ink/70 mb-5 leading-relaxed">
                  {cat.description}
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {items.map((tech, tIdx) => {
                    const active = isHighlighted(tech.id);
                    const isHovered = hoveredTechId === tech.id;
                    const isSelected = selectedTechId === tech.id;

                    return (
                      <motion.button
                        key={tech.id}
                        type="button"
                        layout
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: tIdx * 0.025,
                          type: 'spring',
                          stiffness: 340,
                          damping: 22,
                        }}
                        onClick={() =>
                          setSelectedTechId((prev) =>
                            prev === tech.id ? null : tech.id
                          )
                        }
                        onMouseEnter={() => setHoveredTechId(tech.id)}
                        onMouseLeave={() => setHoveredTechId(null)}
                        whileHover={{ y: -4, scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative group inline-flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-lime border-maroon ring-2 ring-maroon/25 text-ink shadow-sm'
                            : active
                            ? 'bg-white border-ink/15 shadow-sm text-ink hover:border-maroon/40'
                            : 'bg-white/40 border-ink/5 text-ink/40'
                        }`}
                      >
                        <TechLogo iconKey={tech.iconKey} className="w-5 h-5 shrink-0" />
                        <span className="font-display text-sm font-semibold whitespace-nowrap">
                          {tech.name}
                        </span>

                        {(isHovered || isSelected || activeFilter !== 'all') && active && (
                          <span className="ml-1 rounded-full bg-lime px-2 py-0.5 font-mono text-[10px] font-semibold text-ink border border-ink/10">
                            {tech.projectIds && tech.projectIds.length > 0
                              ? tech.projectIds
                                  .map((pid) => projectNameMap[pid])
                                  .filter(Boolean)
                                  .slice(0, 2)
                                  .join(' · ')
                              : 'Toolkit'}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MOVING MEMORIES — Kinetic Pinterest Polaroid Filmstrip */}
        <RevealBlock delay={0.14} className="mt-16">
          <div className="rounded-[34px] bg-charcoal text-white p-6 sm:p-8 lg:p-10 border border-white/10 shadow-editorial overflow-hidden">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-maroon px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-lime border border-lime/25">
                  <SparkleIcon className="w-3 h-3" />
                  MOVING MEMORIES · SNAPSHOTS IN MOTION
                </span>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-white">
                  Hands-on hardware, stages, workflows &amp; team moments
                </h3>
                <p className="mt-1 font-hand text-2xl text-lime">
                  hover to pause · click any polaroid to inspect
                </p>
              </div>

              <button
                type="button"
                onClick={() => setReelPaused((p) => !p)}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-lime hover:text-ink px-4 py-2 font-mono text-xs uppercase tracking-wider text-white border border-white/15 transition-colors"
              >
                {reelPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    Resume Reel
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    Pause Reel
                  </>
                )}
              </button>
            </div>

            {/* Infinite Seamless Kinetic Polaroid Track */}
            <div className="relative -mx-6 sm:-mx-8 lg:-mx-10 py-4 marquee-pause-on-hover">
              <div
                className={`animate-marquee-slow items-stretch gap-6 px-6 ${
                  reelPaused ? 'marquee-paused' : ''
                }`}
              >
                {loopedMemories.map((memory, idx) => {
                  const tiltClass =
                    idx % 2 === 0 ? '-rotate-2 hover:rotate-0' : 'rotate-2 hover:rotate-0';

                  return (
                    <motion.button
                      key={`${memory.id}-${idx}`}
                      type="button"
                      onClick={() => setActiveMemory(memory)}
                      whileHover={{ y: -10, scale: 1.04 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                      className={`group relative w-64 sm:w-72 shrink-0 text-left rounded-[22px] bg-white text-ink p-3 pb-4 shadow-polaroid transition-transform duration-300 ${tiltClass}`}
                    >
                      {/* Decorative tape strip at top */}
                      <TapeStrip className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-4 w-16 z-10 rotate-1" />

                      <div className="relative aspect-[4/3.3] overflow-hidden rounded-2xl bg-charcoal">
                        <img
                          src={memory.src}
                          alt={memory.alt}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-ink/80 text-lime p-1.5 backdrop-blur-sm">
                          <ZoomIn className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      <div className="mt-3 px-1 flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold text-ink leading-tight">
                          {memory.caption}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold border shrink-0 ${
                            MEMORY_TAG_STYLE[memory.accent]
                          }`}
                        >
                          {memory.tag}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>

      {/* Memory Lightbox Modal */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMemory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 sm:p-8 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, rotate: -1 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-[28px] bg-white p-4 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveMemory(null)}
                className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-maroon text-white flex items-center justify-center shadow-lg hover:bg-ink"
                aria-label="Close memory preview"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={activeMemory.src}
                alt={activeMemory.alt}
                className="w-full max-h-[72vh] object-contain rounded-2xl bg-charcoal"
              />
              <div className="mt-3 px-2 flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-base font-bold text-ink">
                  {activeMemory.caption}
                </p>
                <span
                  className={`rounded-full px-3 py-1 font-mono text-xs font-semibold border ${
                    MEMORY_TAG_STYLE[activeMemory.accent]
                  }`}
                >
                  {activeMemory.tag}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
