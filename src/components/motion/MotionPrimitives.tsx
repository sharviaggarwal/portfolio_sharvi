import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion';

export const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

interface RevealBlockProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
}

export const RevealBlock: React.FC<RevealBlockProps> = ({
  children,
  delay = 0,
  yOffset = 28,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EDITORIAL_EASE }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface EditorialTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const EditorialTextReveal: React.FC<EditorialTextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  as = 'h2',
}) => {
  const words = text.split(' ');
  const Tag = as;

  return (
    <Tag className={className}>
      {words.map((word, idx) => (
        <span key={`${word}-${idx}`} className="inline-block overflow-hidden align-bottom mr-[0.26em]">
          <motion.span
            className="inline-block"
            initial={{ y: '105%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: delay + idx * 0.035,
              ease: EDITORIAL_EASE,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

interface ParallaxFrameProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export const ParallaxFrame: React.FC<ParallaxFrameProps> = ({
  children,
  offset = 36,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const y = useSpring(yRaw, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

interface MagneticWrapProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticWrap: React.FC<MagneticWrapProps> = ({
  children,
  className = '',
  strength = 0.22,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setCoords({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => setCoords({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: coords.x, y: coords.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface FloatingAccentProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  rotate?: number;
}

export const FloatingAccent: React.FC<FloatingAccentProps> = ({
  children,
  className = '',
  amplitude = 7,
  duration = 4.6,
  rotate = 4,
}) => {
  return (
    <motion.div
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        rotate: [-rotate, rotate, -rotate],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const EditorialDivider: React.FC<{
  dark?: boolean;
  label?: string;
}> = ({ dark = false, label }) => (
  <div className="w-full flex items-center gap-4 my-2">
    <span className={`h-px flex-1 ${dark ? 'bg-white/15' : 'bg-ink/15'}`} />
    {label && (
      <span
        className={`font-mono text-[11px] uppercase tracking-[0.22em] ${
          dark ? 'text-lime/80' : 'text-maroon'
        }`}
      >
        {label}
      </span>
    )}
    <span className={`h-px flex-1 ${dark ? 'bg-white/15' : 'bg-ink/15'}`} />
  </div>
);
