import { useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { Pillars } from '../components/sections/Pillars';
import { HorizontalProjects } from '../components/sections/HorizontalProjects';
import { ExperienceTimeline } from '../components/sections/ExperienceTimeline';
import { SkillsMatrix } from '../components/sections/SkillsMatrix';
import { ContactSection } from '../components/sections/ContactSection';
import { applyEditorialTheme } from '../lib/theme';

export function HomePage() {
  useEffect(() => {
    applyEditorialTheme('light', true);
    return () => {
      applyEditorialTheme('light', true);
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Pillars />
        <HorizontalProjects />
        <ExperienceTimeline />
        <SkillsMatrix />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
