import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  EDITORIAL_EASE,
  EditorialTextReveal,
  RevealBlock,
} from '../motion/MotionPrimitives';
import { HardwareToNeuralGraphic } from '../graphics/ArchitectureDiagrams';
import { SparkleIcon } from '../graphics/Doodles';

export const AboutSection: React.FC = () => {
  const { aboutStory: ABOUT_STORY_DATA, profile: PROFILE_DATA } = usePortfolio();
  const edu = PROFILE_DATA.education[0];
  const extraEducation = PROFILE_DATA.education.slice(1);

  const cardTheme = (visualType: 'hardware' | 'bridge' | 'aiml') => {
    if (visualType === 'hardware') {
      return 'bg-sky/10 border-sky/35 hover:border-sky';
    }
    if (visualType === 'bridge') {
      return 'bg-lime/10 border-lime/35 hover:border-lime';
    }
    return 'bg-maroon/30 border-lime/40 hover:border-lime';
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-charcoal bg-editorial-grid-dark text-white py-24 sm:py-32"
    >
      {/* Subtle moodboard aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 right-0 h-80 w-80 rounded-full bg-maroon/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header + Asymmetrical Story Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sticky Editorial Title */}
          <div className="lg:col-span-5">
            <RevealBlock>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-lime border border-white/10">
                <SparkleIcon className="w-3 h-3" />
                {ABOUT_STORY_DATA.eyebrow}
              </span>
            </RevealBlock>

            <EditorialTextReveal
              text={ABOUT_STORY_DATA.headline}
              className="mt-5 font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.03] text-white"
            />

            <RevealBlock delay={0.15} className="mt-6">
              <div className="inline-flex items-center gap-2.5 rounded-2xl bg-lime px-4 py-2.5 text-ink font-mono text-xs font-bold tracking-[0.14em]">
                <span>{ABOUT_STORY_DATA.transitionLabel}</span>
              </div>
            </RevealBlock>

            {/* Academic Snapshot Card */}
            <RevealBlock delay={0.22} className="mt-8">
              <div className="rounded-3xl border border-white/15 bg-white/5 p-5 sm:p-6 backdrop-blur-sm">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky">
                  EDUCATION · {edu.period}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-white">
                  {edu.institution}
                </h3>
                <p className="mt-1 text-sm text-white/75">
                  {edu.degree} ({edu.minor})
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-xs text-white/60">{edu.location}</span>
                  <span className="rounded-full bg-maroon px-3 py-1 font-mono text-xs font-bold text-lime border border-lime/30">
                    CGPA {edu.cgpa}
                  </span>
                </div>
              </div>

              {extraEducation.length > 0 && (
                <div className="mt-4 space-y-3">
                  {extraEducation.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime">
                          {item.period}
                        </span>
                        <span className="font-mono text-xs text-sky">{item.cgpa}</span>
                      </div>
                      <h4 className="mt-1 font-display text-base font-bold text-white">
                        {item.institution}
                      </h4>
                      <p className="text-xs text-white/75">
                        {item.degree}
                        {item.minor ? ` (${item.minor})` : ''}
                      </p>
                      {item.description && (
                        <p className="mt-1.5 text-xs text-white/70">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </RevealBlock>
          </div>

          {/* Right Editorial Narrative + Approved Story */}
          <div className="lg:col-span-7 space-y-6">
            <RevealBlock delay={0.1}>
              <div className="rounded-[28px] bg-white text-ink p-7 sm:p-10 shadow-editorial relative">
                <span className="font-hand text-2xl text-maroon block mb-3">
                  the story so far —
                </span>
                <p className="font-serif italic text-2xl sm:text-[1.75rem] leading-[1.35] text-ink">
                  “{ABOUT_STORY_DATA.storyParagraphs[0]}”
                </p>
                <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink/80">
                  {ABOUT_STORY_DATA.storyParagraphs[1]}
                </p>
                <div className="mt-6 pt-5 border-t border-ink/10 flex flex-wrap gap-3">
                  {ABOUT_STORY_DATA.highlights.map((h) => (
                    <div
                      key={h.label}
                      className="rounded-2xl bg-offwhite px-4 py-2.5 border border-ink/10"
                    >
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-maroon">
                        {h.label}
                      </span>
                      <span className="font-display text-sm font-bold text-ink">
                        {h.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* 3-Stage Storytelling Cards: HARDWARE -> INTELLIGENCE -> AI/ML */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ABOUT_STORY_DATA.stages.map((stage, idx) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    delay: idx * 0.1,
                    ease: EDITORIAL_EASE,
                  }}
                  whileHover={{ y: -5 }}
                  className={`rounded-3xl border p-5 transition-colors ${cardTheme(
                    stage.visualType
                  )} ${idx === 1 ? 'sm:translate-y-3' : ''}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-lime font-bold">
                      {stage.stepNumber}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                      {stage.label}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white leading-snug">
                    {stage.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/75">
                    {stage.caption}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Full-Width Animated Circuit-to-Neural Visual Transition */}
        <RevealBlock delay={0.18} className="mt-14">
          <HardwareToNeuralGraphic />
        </RevealBlock>
      </div>
    </section>
  );
};
