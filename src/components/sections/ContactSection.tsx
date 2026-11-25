import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../data/navigation';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  EditorialTextReveal,
  FloatingAccent,
  MagneticWrap,
  RevealBlock,
} from '../motion/MotionPrimitives';
import { SparkleIcon } from '../graphics/Doodles';

export const ContactSection: React.FC = () => {
  const { contact: CONTACT_DATA, profile: PROFILE_DATA } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_DATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${CONTACT_DATA.email}`;
    }
  };

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-ink text-white pt-24 pb-12"
    >
      {/* Rich Maroon & Lime Moodboard Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-10 h-96 w-96 rounded-full bg-maroon/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Main Editorial Closing Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pb-16 border-b border-white/15">
          <div className="lg:col-span-8">
            <RevealBlock>
              <span className="inline-flex items-center gap-2 rounded-full bg-maroon px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-lime border border-lime/25">
                <SparkleIcon className="w-3 h-3" />
                {CONTACT_DATA.eyebrow}
              </span>
            </RevealBlock>

            <div className="relative">
              <EditorialTextReveal
                text={CONTACT_DATA.headline}
                className="mt-5 font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[0.98] text-white"
              />
              <FloatingAccent
                className="hidden sm:block absolute -top-2 right-6 text-lime"
                amplitude={5}
              >
                <SparkleIcon className="w-8 h-8" />
              </FloatingAccent>
            </div>

            <RevealBlock delay={0.14}>
              <p className="mt-5 max-w-xl text-base sm:text-lg text-white/75 leading-relaxed">
                {CONTACT_DATA.subline}
              </p>
            </RevealBlock>
          </div>

          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
            <MagneticWrap>
              <a
                href={`mailto:${CONTACT_DATA.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-display text-sm font-bold text-ink hover:bg-sky transition-colors"
              >
                <Mail className="w-4 h-4" />
                Send an Email
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </MagneticWrap>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3.5 font-mono text-xs text-white border border-white/15 hover:bg-white/20 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-lime" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-lime" />
                  Copy Email
                </>
              )}
            </button>
          </div>
        </div>

        {/* Approved Contact Links Grid */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {CONTACT_DATA.links.map((link, idx) => (
            <motion.a
              key={link.id}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className={`group rounded-[26px] border p-6 transition-colors ${
                idx === 0
                  ? 'bg-maroon/40 border-lime/30 hover:border-lime'
                  : 'bg-white/5 border-white/10 hover:border-sky'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">
                  {link.label}
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime" />
              </div>
              <div className="mt-3 font-display text-lg font-bold text-white break-all">
                {link.value}
              </div>
              <p className="mt-1.5 text-xs text-white/65">{link.note}</p>
            </motion.a>
          ))}
        </div>

        {/* Dynamic Bottom Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2.5">
            <span className="font-serif italic text-lg text-lime">
              {PROFILE_DATA.name}
            </span>
            <span>·</span>
            <span className="font-mono uppercase tracking-wider">
              {PROFILE_DATA.role}
            </span>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap gap-4">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="font-mono text-[11px] uppercase tracking-wider hover:text-lime transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
