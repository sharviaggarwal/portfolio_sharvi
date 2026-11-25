import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/layout/Navbar';
import { ContactSection } from './components/sections/ContactSection';
import { HomePage } from './pages/HomePage';
import { ProjectCaseStudyPage } from './pages/ProjectCaseStudyPage';
import { AdminPage } from './pages/AdminPage';

const PublicLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-white text-ink">
    <Navbar />
    <div className="flex-1">
      <Outlet />
    </div>
    <ContactSection />
  </div>
);

export const App: React.FC = () => {
  return (
    <MotionConfig reducedMotion="user">
      <PortfolioProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
            </Route>
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </MotionConfig>
  );
};

export default App;
