import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { TechWorldSection } from '../components/sections/TechWorldSection';
import { ProjectLabSection } from '../components/sections/ProjectLabSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';

export const HomePage: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <TechWorldSection />
      <ProjectLabSection />
      <ExperienceSection />
    </main>
  );
};
