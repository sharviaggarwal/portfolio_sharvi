import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, FileText } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { AccentTheme, ExperienceEntry } from '../../types/portfolio';
import {
  EDITORIAL_EASE,
  EditorialTextReveal,
  RevealBlock,
} from '../motion/MotionPrimitives';
import { SparkleIcon } from '../graphics/Doodles';

const ACCENT_BADGE: Record<AccentTheme, string> = {
  sky: 'bg-sky text-ink border-ink/10',
  lime: 'bg-lime text-ink border-ink/10',
  maroon: 'bg-maroon text-white border-maroon-dark',
  ink: 'bg-ink text-white border-ink',
  paper: 'bg-white text-ink border-ink/15',
};

export const ExperienceSection: React.FC = () => {
  const { experience: EXPERIENCE_DATA } = usePortfolio();
  const [expandedId, setExpandedId] = useState<string>(EXPERIENCE_DATA[0]?.id ?? '');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const hasCertifications = EXPERIENCE_DATA.some((e) => e.category === 'Certification');
  const categories = hasCertifications
    ? ['All', 'Internship', 'Leadership', 'Program', 'Achievement', 'Certification']
    : ['All', 'Internship', 'Leadership', 'Program', 'Achievement'];

  const filtered =
    selectedCategory === 'All'
      ? EXPERIENCE_DATA
      : EXPERIENCE_DATA.filter((item) => item.category === selectedCategory);

  const toggleItem = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-white py-24 sm:py-32 border-b border-ink/10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-lime/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header & Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <RevealBlock>
              <span className="inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink border border-ink/10">
                <SparkleIcon className="w-3 h-3 text-maroon" />
                05 — EXPERIENCE, LEADERSHIP &amp; ACHIEVEMENTS
              </span>
            </RevealBlock>
            <EditorialTextReveal
              text="Milestones across research, community & AI programs."
              className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.03] text-ink max-w-2xl"
            />
          </div>

          {/* Interactive Category Filter */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all border ${
                    selectedCategory === cat
                      ? 'bg-ink text-white border-ink'
                      : 'bg-offwhite text-ink/75 border-ink/10 hover:bg-sky/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </RevealBlock>
        </div>

        {/* Visual Editorial Career Timeline */}
        <div className="relative">
          {/* Vertical Spine */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-8 top-2 bottom-2 w-px bg-gradient-to-b from-maroon via-ink/25 to-lime"
          />

          <div className="space-y-5">
            {filtered.map((entry: ExperienceEntry, idx: number) => {
              const isOpen = expandedId === entry.id;

              return (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.06,
                    ease: EDITORIAL_EASE,
                  }}
                  className="relative md:pl-20"
                >
                  {/* Editorial Index Node on Spine */}
                  <div
                    aria-hidden="true"
                    className={`hidden md:flex absolute left-3.5 top-7 h-9 w-9 items-center justify-center rounded-full font-mono text-xs font-bold border transition-colors ${
                      isOpen
                        ? 'bg-maroon text-lime border-maroon'
                        : 'bg-white text-ink border-ink/20'
                    }`}
                  >
                    {entry.index}
                  </div>

                  {/* Interactive Expanding Card */}
                  <div
                    className={`rounded-[28px] border transition-all duration-300 ${
                      isOpen
                        ? 'bg-offwhite border-ink/25 shadow-editorial'
                        : 'bg-white border-ink/10 hover:border-ink/25'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(entry.id)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 focus:outline-none"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span
                            className={`rounded-full px-3 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] border ${
                              ACCENT_BADGE[entry.accent]
                            }`}
                          >
                            {entry.category}
                          </span>
                          <span className="font-mono text-xs text-ink/60">
                            {entry.period}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                            {entry.organization}
                          </h3>
                          <span className="font-serif italic text-xl text-maroon">
                            {entry.role}
                          </span>
                        </div>

                        <p className="text-sm sm:text-base text-ink/80 max-w-2xl">
                          {entry.summary}
                        </p>
                      </div>

                      <span
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-ink text-lime' : 'bg-offwhite text-ink'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EDITORIAL_EASE }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-ink/10 space-y-3">
                            {entry.details.map((detail) => (
                              <p
                                key={detail}
                                className="text-sm leading-relaxed text-ink/80"
                              >
                                {detail}
                              </p>
                            ))}

                            {entry.technologies && entry.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-1">
                                {entry.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="rounded-full bg-white px-3 py-1 font-mono text-[11px] text-ink border border-ink/10"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}

                            {((entry.supportingMedia && entry.supportingMedia.length > 0) ||
                              (entry.links && entry.links.length > 0)) && (
                              <div className="pt-2 flex flex-wrap items-center gap-3">
                                {entry.supportingMedia?.map((media) =>
                                  media.kind === 'image' ? (
                                    <a
                                      key={media.id}
                                      href={media.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-2 rounded-2xl bg-white p-1.5 pr-3 border border-ink/10 hover:border-maroon transition-colors"
                                    >
                                      <img
                                        src={media.url}
                                        alt={media.label}
                                        className="w-8 h-8 rounded-xl object-cover"
                                      />
                                      <span className="font-mono text-[11px] text-ink">
                                        {media.label}
                                      </span>
                                    </a>
                                  ) : (
                                    <a
                                      key={media.id}
                                      href={media.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 font-mono text-xs text-ink border border-ink/15 hover:border-maroon hover:text-maroon transition-colors"
                                    >
                                      <FileText className="w-3.5 h-3.5" />
                                      {media.label}
                                    </a>
                                  )
                                )}

                                {entry.links?.map((link) => (
                                  <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-full bg-ink text-white px-3.5 py-1.5 font-mono text-xs hover:bg-maroon transition-colors"
                                  >
                                    {link.label}
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
