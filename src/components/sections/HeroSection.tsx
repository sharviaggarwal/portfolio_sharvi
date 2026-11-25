import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Mail, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  EDITORIAL_EASE,
  FloatingAccent,
  MagneticWrap,
  ParallaxFrame,
} from '../motion/MotionPrimitives';
import {
  HandDrawnArrow,
  PaperClipAccent,
  SparkleIcon,
  TapeStrip,
} from '../graphics/Doodles';
import { HangingPhone } from '../graphics/HangingPhone';

export const HeroSection: React.FC = () => {
  const { profile: PROFILE_DATA } = usePortfolio();
  const edu = PROFILE_DATA.education[0];
  const [firstName, lastName] = PROFILE_DATA.name.split(' ');

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-offwhite bg-editorial-grid pt-28 pb-20 sm:pt-36 sm:pb-28 border-b border-ink/10"
    >
      {/* Subtle color field moodboard washes (balanced, never noisy) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-lime/35 blur-3xl"
      />

      {/* Retro Maroon Corded Phone Hanging from Top */}
      <HangingPhone className="absolute top-0 right-2 sm:right-6 xl:right-10 z-20" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Top Editorial Masthead Strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
          className="flex flex-wrap items-center justify-between gap-3 pb-8 pr-20 sm:pr-28 lg:pr-32 border-b border-ink/10"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink border border-ink/10">
              <SparkleIcon className="w-3 h-3 text-maroon" />
              {PROFILE_DATA.role}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60 hidden sm:inline">
              {PROFILE_DATA.location}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/70">
            <span>ISSUE 01</span>
            <span>·</span>
            <span className="text-maroon font-semibold">CGPA {edu.cgpa}</span>
          </div>
        </motion.div>

        {/* Asymmetrical Pinterest Editorial Composition */}
        <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Dominant Typography + Approved Intro */}
          <div className="lg:col-span-7 relative z-10">
            {/* Approved opening greeting */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EDITORIAL_EASE }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-maroon shadow-sm border border-maroon/15 mb-6"
            >
              <span>{PROFILE_DATA.openingGreeting}</span>
            </motion.p>

            {/* Oversized Dominant Name — Sans + Overlapping Editorial Italic Serif */}
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18, ease: EDITORIAL_EASE }}
                className="font-display font-bold tracking-[-0.04em] leading-[0.86] text-[clamp(3.6rem,9.5vw,7.4rem)] text-ink uppercase select-none"
              >
                {firstName}
                <span className="block font-serif italic font-normal normal-case tracking-[-0.02em] text-[clamp(4rem,10vw,8rem)] text-maroon -mt-3 sm:-mt-5 ml-4 sm:ml-10">
                  {lastName}
                </span>
              </motion.h1>

              <FloatingAccent
                className="hidden sm:block absolute -top-4 right-4 text-maroon/70"
                amplitude={5}
                rotate={6}
              >
                <SparkleIcon className="w-8 h-8" />
              </FloatingAccent>
            </div>

            {/* Approved Personality Intro */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EDITORIAL_EASE }}
              className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-ink/85 font-normal"
            >
              {PROFILE_DATA.personalityIntro}
            </motion.p>

            {/* Degree & Academic Metadata Pill Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.38, ease: EDITORIAL_EASE }}
              className="mt-6 flex flex-wrap items-center gap-2.5"
            >
              <span className="rounded-xl bg-sky px-3.5 py-2 text-xs sm:text-sm font-medium text-ink border border-ink/10">
                {edu.degree}, {edu.minor}
              </span>
              <span className="rounded-xl bg-white px-3.5 py-2 font-mono text-xs font-semibold text-ink border border-ink/10">
                CGPA {edu.cgpa} · {edu.institution.split('(')[0].trim()}
              </span>
            </motion.div>

            {/* Clear Links: Projects, About Me, Contact */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.46, ease: EDITORIAL_EASE }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <MagneticWrap>
                <a
                  href="#project-lab"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-editorial transition-all hover:bg-maroon"
                >
                  <Sparkles className="w-4 h-4 text-lime" />
                  Explore Project Lab
                  <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </a>
              </MagneticWrap>

              <MagneticWrap>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3.5 text-sm font-semibold text-ink border border-ink/15 transition-colors hover:bg-sky"
                >
                  About Me
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </MagneticWrap>

              <MagneticWrap>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-ink border border-ink/15 transition-colors hover:border-maroon hover:text-maroon"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </MagneticWrap>
            </motion.div>
          </div>

          {/* Right Column: Curated Pinterest Polaroid Collage featuring Actual Portrait */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <ParallaxFrame offset={20} className="relative w-full max-w-[390px]">
              {/* Backing Lime Card tilted slightly */}
              <motion.div
                initial={{ opacity: 0, rotate: -6, scale: 0.94 }}
                animate={{ opacity: 1, rotate: -4, scale: 1 }}
                transition={{ duration: 0.85, delay: 0.25, ease: EDITORIAL_EASE }}
                className="absolute inset-0 translate-x-3 translate-y-4 rounded-[28px] bg-lime border border-ink/15"
                aria-hidden="true"
              />

              {/* Backing Sky-Blue Corner Note */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hidden sm:flex absolute -left-10 top-12 z-20 flex-col gap-0.5 rounded-2xl bg-sky px-4 py-2.5 shadow-editorial border border-ink/10 -rotate-3"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">
                  FOCUS
                </span>
                <span className="font-display text-xs font-bold text-ink">
                  Applied AI &amp; ML Ops
                </span>
              </motion.div>

              {/* Paperclip + Tape decorative moodboard touches */}
              <TapeStrip className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 -rotate-2" />
              <FloatingAccent
                className="absolute -top-5 right-4 z-30 text-maroon"
                amplitude={4}
                rotate={3}
              >
                <PaperClipAccent className="w-7 h-12" />
              </FloatingAccent>

              {/* Main Authentic Photograph Frame */}
              <motion.figure
                initial={{ opacity: 0, y: 24, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 1.5 }}
                whileHover={{ rotate: 0, scale: 1.015 }}
                transition={{ duration: 0.8, delay: 0.22, ease: EDITORIAL_EASE }}
                className="relative z-10 rounded-[28px] bg-white p-3.5 shadow-polaroid border border-ink/10"
              >
                <div className="relative overflow-hidden rounded-[20px] aspect-[4/4.6] bg-charcoal">
                  <img
                    src={PROFILE_DATA.portraitSrc}
                    alt={PROFILE_DATA.portraitAlt}
                    className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    loading="eager"
                  />
                  {/* Subtle editorial caption badge inside corner */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-2xl bg-ink/80 backdrop-blur-md px-3.5 py-2 text-white">
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-lime">
                      SHARVI · 2026
                    </span>
                    <span className="font-serif italic text-sm text-white/95">
                      data → api → dashboard
                    </span>
                  </div>
                </div>

                {/* Handwritten annotation below portrait */}
                <figcaption className="mt-3 px-1 flex items-center justify-between">
                  <span className="font-hand text-2xl text-maroon leading-none">
                    curious builder &amp; ML explorer
                  </span>
                  <HandDrawnArrow className="w-12 h-6 text-ink/60 -scale-x-100" />
                </figcaption>
              </motion.figure>
            </ParallaxFrame>
          </div>
        </div>
      </div>
    </section>
  );
};
