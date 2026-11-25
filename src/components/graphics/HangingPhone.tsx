import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HangingPhoneProps {
  onClick?: () => void;
  className?: string;
}

/**
 * Glossy deep-maroon retro telephone handset suspended on a coiled cord.
 * Gently sways like a pendulum from the top edge and smoothly scrolls to Contact on click.
 */
export const HangingPhone: React.FC<HangingPhoneProps> = ({
  onClick,
  className = '',
}) => {
  const [hovered, setHovered] = useState(false);
  const [ringCount, setRingCount] = useState(0);

  const handleClick = () => {
    setRingCount((c) => c + 1);
    if (onClick) {
      onClick();
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ y: -240, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 95,
        damping: 13,
        mass: 1.1,
        delay: 0.35,
      }}
      className={`pointer-events-auto select-none ${className}`}
    >
      {/* Continuous gentle pendulum sway anchored at the very top */}
      <motion.button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Hanging retro phone — click to jump to Contact section"
        style={{ transformOrigin: '54% 0%' }}
        animate={
          hovered
            ? {
                rotate: [0, -3.5, 3.5, -2.5, 2.5, 0],
                y: 8,
              }
            : {
                rotate: [-2.4, 2.4, -2.4],
                y: [0, 3, 0],
              }
        }
        transition={
          hovered
            ? { duration: 0.65, ease: 'easeInOut' }
            : {
                rotate: { duration: 5.4, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
              }
        }
        whileTap={{ y: 18, scale: 0.98 }}
        className="relative group block focus:outline-none cursor-pointer"
      >
        {/* Handwritten floating label on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.span
              key={`tag-${ringCount}`}
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:inline-flex items-center gap-1.5 absolute -left-28 bottom-16 rounded-full bg-lime px-3 py-1 font-hand text-xl text-maroon shadow-md border border-ink/15 whitespace-nowrap"
            >
              say hello ♡
            </motion.span>
          )}
        </AnimatePresence>

        <svg
          viewBox="0 0 150 380"
          className="w-20 sm:w-28 lg:w-32 h-auto drop-shadow-[0_18px_24px_rgba(104,21,43,0.28)]"
          role="img"
          aria-hidden="true"
        >
          <defs>
            {/* Glossy deep maroon handset body gradient */}
            <linearGradient id="maroonBody" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#7E1B36" />
              <stop offset="40%" stopColor="#5D1025" />
              <stop offset="78%" stopColor="#3E0817" />
              <stop offset="100%" stopColor="#2B0510" />
            </linearGradient>

            {/* Specular gloss highlight along curved handle */}
            <linearGradient id="maroonGloss" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.42" />
              <stop offset="50%" stopColor="#F5B8C8" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Cup bevel radial gradient */}
            <radialGradient id="cupFace" cx="42%" cy="38%" r="65%">
              <stop offset="0%" stopColor="#7C1A35" />
              <stop offset="65%" stopColor="#4A0B1C" />
              <stop offset="100%" stopColor="#28040E" />
            </radialGradient>

            {/* Coiled cord shading */}
            <linearGradient id="cordGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3A0816" />
              <stop offset="50%" stopColor="#7A1D36" />
              <stop offset="100%" stopColor="#470B1B" />
            </linearGradient>
          </defs>

          {/* Coiled Spiral Cord descending from top */}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Back loops */}
            <path
              d="M78 0
                 C92 6, 92 14, 75 18
                 C60 22, 62 30, 80 34
                 C94 38, 92 47, 74 51
                 C59 55, 62 63, 80 67
                 C94 71, 92 80, 74 84
                 C60 88, 63 96, 80 100
                 C93 104, 90 113, 75 118
                 C66 121, 70 132, 74 148"
              stroke="url(#cordGrad)"
              strokeWidth="4.6"
            />
            {/* Subtle specular cord highlight */}
            <path
              d="M79 2
                 C90 7, 90 13, 76 17
                 M79 34
                 C92 38, 90 46, 75 50
                 M79 67
                 C92 71, 90 79, 75 83
                 M79 100
                 C91 104, 88 112, 76 117"
              stroke="#B5526B"
              strokeOpacity="0.55"
              strokeWidth="1.2"
            />
            {/* Strain relief boot into handset */}
            <path
              d="M71 144 L78 144 L80 156 L70 156 Z"
              fill="#3A0816"
            />
          </g>

          {/* Handset Curved Spine & Handle */}
          <path
            d="M76 154
               C58 158, 44 176, 40 202
               C34 242, 42 292, 62 328
               C70 342, 82 350, 96 346
               L110 338
               C92 318, 76 286, 72 246
               C68 214, 76 186, 94 170
               Z"
            fill="url(#maroonBody)"
          />

          {/* Gloss Highlight Streak along Handset Spine */}
          <path
            d="M54 188
               C44 218, 46 268, 64 312
               C67 320, 71 325, 76 328
               C61 288, 54 236, 62 192
               Z"
            fill="url(#maroonGloss)"
          />

          {/* Top Earpiece Bell & Speaker Cup */}
          <g transform="translate(88, 178) rotate(-14)">
            {/* Outer bell shell */}
            <ellipse cx="-6" cy="2" rx="28" ry="30" fill="#430919" />
            {/* Front beveled face */}
            <ellipse
              cx="6"
              cy="0"
              rx="25"
              ry="28"
              fill="url(#cupFace)"
              stroke="#8E2A45"
              strokeOpacity="0.45"
              strokeWidth="1.2"
            />
            {/* Recessed inner ring */}
            <ellipse
              cx="7"
              cy="0"
              rx="18"
              ry="21"
              fill="#350613"
              stroke="#6E1830"
              strokeWidth="0.9"
            />
            {/* Perforated Speaker Holes (outer ring + center) */}
            <g fill="#190208">
              <circle cx="7" cy="0" r="1.7" />
              {Array.from({ length: 14 }).map((_, i) => {
                const angle = (i / 14) * Math.PI * 2;
                const rx = 12.5;
                const ry = 14.5;
                return (
                  <circle
                    key={`top-${i}`}
                    cx={7 + Math.cos(angle) * rx}
                    cy={Math.sin(angle) * ry}
                    r="1.45"
                  />
                );
              })}
            </g>
            {/* Rim gloss highlight */}
            <path
              d="M-6 -22 A24 27 0 0 1 18 -18"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.32"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Bottom Mouthpiece Bell & Speaker Cup */}
          <g transform="translate(104, 328) rotate(12)">
            {/* Outer bell shell */}
            <ellipse cx="-6" cy="0" rx="26" ry="27" fill="#3D0816" />
            {/* Front beveled face */}
            <ellipse
              cx="5"
              cy="0"
              rx="23"
              ry="25"
              fill="url(#cupFace)"
              stroke="#8E2A45"
              strokeOpacity="0.4"
              strokeWidth="1.2"
            />
            {/* Recessed center cup */}
            <ellipse cx="6" cy="0" rx="14" ry="16" fill="#2E0510" />
            {/* Mouthpiece perforations */}
            <g fill="#160106">
              <circle cx="6" cy="0" r="1.5" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                return (
                  <circle
                    key={`bot-${i}`}
                    cx={6 + Math.cos(angle) * 6.8}
                    cy={Math.sin(angle) * 7.5}
                    r="1.25"
                  />
                );
              })}
            </g>
            {/* Rim gloss */}
            <path
              d="M-6 -19 A21 23 0 0 1 16 -15"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.28"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </motion.button>
    </motion.div>
  );
};
