import type { ContactData } from '../types/portfolio';

export const CONTACT_DATA: ContactData = {
  eyebrow: '06 — LET’S CONNECT',
  headline: "Let's build intelligent systems worth trusting.",
  subline:
    'Open to AI/ML internships, engineering collaborations, and conversations around applied ML, RAG systems, and agentic workflows.',
  email: 'sharviaggarwal210@gmail.com',
  links: [
    {
      id: 'email',
      label: 'Email',
      value: 'sharviaggarwal210@gmail.com',
      href: 'mailto:sharviaggarwal210@gmail.com',
      note: 'Best for internships & direct collaborations',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/sharviagg',
      href: 'https://linkedin.com/in/sharviagg',
      note: 'Connect & follow engineering updates',
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'github.com/sharviaggarwal',
      href: 'https://github.com/sharviaggarwal',
      note: 'Explore repositories & code',
    },
  ],
};
