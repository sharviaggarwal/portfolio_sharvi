import React from 'react';

export const SparkleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <path
      d="M16 2C16.8 10.2 21.8 15.2 30 16C21.8 16.8 16.8 21.8 16 30C15.2 21.8 10.2 16.8 2 16C10.2 15.2 15.2 10.2 16 2Z"
      fill="currentColor"
    />
  </svg>
);

export const HandDrawnArrow: React.FC<{ className?: string }> = ({
  className = 'w-14 h-8',
}) => (
  <svg viewBox="0 0 96 48" fill="none" className={className} aria-hidden="true">
    <path
      d="M6 34C24 14 54 11 83 22"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M74 12L85 22.5L71 27"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HandDrawnLoop: React.FC<{ className?: string }> = ({
  className = 'w-32 h-14',
}) => (
  <svg viewBox="0 0 180 76" fill="none" className={className} aria-hidden="true">
    <ellipse
      cx="90"
      cy="38"
      rx="82"
      ry="28"
      transform="rotate(-4 90 38)"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />
  </svg>
);

export const PaperClipAccent: React.FC<{ className?: string }> = ({
  className = 'w-7 h-12',
}) => (
  <svg viewBox="0 0 36 68" fill="none" className={className} aria-hidden="true">
    <path
      d="M11 22V48C11 54.6 16.4 60 23 60C29.6 60 35 54.6 35 48V15C35 8.9 30.1 4 24 4C17.9 4 13 8.9 13 15V44C13 47.9 16.1 51 20 51C23.9 51 27 47.9 27 44V18"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

export const TapeStrip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    aria-hidden="true"
    className={`h-6 w-24 bg-lime/80 border border-ink/10 backdrop-blur-sm shadow-sm ${className}`}
  />
);
