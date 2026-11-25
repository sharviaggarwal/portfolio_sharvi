import type { NavItem } from '../types/portfolio';

/**
 * Navigation items are rendered dynamically in the top bar and footer.
 * Add a new section anchor (e.g. "#publications") or route here and it will
 * appear automatically in the site navigation.
 */
export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/#home' },
  { id: 'about', label: 'About Me', href: '/#about' },
  { id: 'tech-world', label: 'My Tech World', href: '/#tech-world' },
  { id: 'project-lab', label: 'Project Lab', href: '/#project-lab' },
  { id: 'experience', label: 'Experience', href: '/#experience' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
];
