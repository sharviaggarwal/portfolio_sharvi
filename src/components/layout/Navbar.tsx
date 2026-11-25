import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../../data/navigation';
import { usePortfolio } from '../../context/PortfolioContext';
import { EDITORIAL_EASE, MagneticWrap } from '../motion/MotionPrimitives';
import { SparkleIcon } from '../graphics/Doodles';

export const Navbar: React.FC = () => {
  const { profile: PROFILE_DATA } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
      if (location.pathname !== '/') return;

      const sections = NAVIGATION_ITEMS.map((item) => item.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveId(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const handleNavClick = (id: string, href: string) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      const targetId = href.slice(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveId(id);
    } else {
      navigate(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: EDITORIAL_EASE }}
        className={`pointer-events-auto mx-auto max-w-6xl rounded-full transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-2.5 ${
          scrolled
            ? 'bg-ink/95 text-white shadow-editorial backdrop-blur-md border border-white/10'
            : 'bg-white/90 text-ink shadow-sm backdrop-blur-md border border-ink/10'
        }`}
        aria-label="Primary Navigation"
      >
        {/* Brand Monogram */}
        <button
          type="button"
          onClick={() => handleNavClick('home', '/#home')}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-maroon text-white font-serif italic text-base transition-transform duration-300 group-hover:rotate-12">
            {PROFILE_DATA.shortMark}
          </span>
          <span className="font-display text-sm font-bold tracking-tight hidden sm:inline">
            {PROFILE_DATA.name}
          </span>
        </button>

        {/* Desktop Dynamic Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = location.pathname === '/' && activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.12em] rounded-full transition-colors ${
                    isActive
                      ? scrolled
                        ? 'text-ink'
                        : 'text-white'
                      : scrolled
                      ? 'text-white/75 hover:text-white'
                      : 'text-ink/70 hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                      className={`absolute inset-0 rounded-full -z-10 ${
                        scrolled ? 'bg-lime' : 'bg-ink'
                      }`}
                    />
                  )}
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right Quick Action */}
        <div className="flex items-center gap-2">
          <MagneticWrap strength={0.18}>
            <a
              href={PROFILE_DATA.resumePdfSrc}
              target="_blank"
              rel="noreferrer"
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                scrolled
                  ? 'bg-lime text-ink hover:bg-sky'
                  : 'bg-maroon text-white hover:bg-ink'
              }`}
            >
              <SparkleIcon className="w-3.5 h-3.5" />
              Resume
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </MagneticWrap>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-full hover:bg-black/5"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto md:hidden mt-2 mx-auto max-w-md rounded-3xl bg-ink text-white p-5 shadow-2xl border border-white/10"
          >
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item, idx) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id, item.href)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-left hover:bg-white/10 transition-colors"
                  >
                    <span className="font-display text-base font-medium">{item.label}</span>
                    <span className="font-mono text-xs text-lime">0{idx + 1}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10">
              <a
                href={PROFILE_DATA.resumePdfSrc}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-full bg-lime text-ink py-2.5 font-display text-sm font-bold"
              >
                Open Resume PDF <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
