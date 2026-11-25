import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CONTACT_DATA } from '../data/contact';
import { EXPERIENCE_DATA } from '../data/experience';
import { TECH_MEMORIES_DATA } from '../data/memories';
import { ABOUT_STORY_DATA, PROFILE_DATA } from '../data/profile';
import { PROJECTS_DATA } from '../data/projects';
import { TECH_CATEGORIES, TECH_ITEMS } from '../data/skills';
import { portfolioApi } from '../lib/api';
import type { PortfolioSnapshot } from '../types/portfolio';

const DEFAULT_SNAPSHOT: PortfolioSnapshot = {
  profile: PROFILE_DATA,
  aboutStory: ABOUT_STORY_DATA,
  projects: PROJECTS_DATA,
  experience: EXPERIENCE_DATA,
  techCategories: TECH_CATEGORIES,
  skills: TECH_ITEMS,
  memories: TECH_MEMORIES_DATA,
  contact: CONTACT_DATA,
};

interface PortfolioContextValue extends PortfolioSnapshot {
  isLoading: boolean;
  refreshPortfolio: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextValue>({
  ...DEFAULT_SNAPSHOT,
  isLoading: false,
  refreshPortfolio: async () => {},
});

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snapshot, setSnapshot] = useState<PortfolioSnapshot>(DEFAULT_SNAPSHOT);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshPortfolio = useCallback(async () => {
    try {
      const live = await portfolioApi.getPublicPortfolio();
      setSnapshot(live);
    } catch {
      // Preserve static fallback defaults if API server is not running (e.g. static preview)
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshPortfolio();
  }, [refreshPortfolio]);

  return (
    <PortfolioContext.Provider value={{ ...snapshot, isLoading, refreshPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
