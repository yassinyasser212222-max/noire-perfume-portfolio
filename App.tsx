import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { LightboxModal } from './components/LightboxModal';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { INITIAL_PROJECTS } from './data/projects';
import { PortfolioProject, StudioContactConfig } from './types/portfolio';
import {
  DEFAULT_CONTACT_CONFIG,
  loadCustomImages,
  saveCustomImages,
  clearAllCustomImages,
} from './utils/storage';

const STORAGE_KEY_CONTACT = 'noire_contact_config_v1';

export default function App() {
  const [projects] = useState<PortfolioProject[]>(INITIAL_PROJECTS);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [contactConfig, setContactConfig] = useState<StudioContactConfig>(DEFAULT_CONTACT_CONFIG);

  // Initialize from localStorage on mount
  useEffect(() => {
    const loadedImages = loadCustomImages();
    if (Object.keys(loadedImages).length > 0) {
      setCustomImages(loadedImages);
    }

    try {
      const storedContact = localStorage.getItem(STORAGE_KEY_CONTACT);
      if (storedContact) {
        const parsed = JSON.parse(storedContact) as StudioContactConfig;
        // Replace the original demo contact details with the owner's supplied details.
        const wasDemoContact =
          parsed.instagramHandle === 'noire.perfume.studio' ||
          parsed.whatsappNumber === '+33140506070' ||
          parsed.email === 'studio@noireperfume.design';
        if (!wasDemoContact) setContactConfig(parsed);
        else localStorage.setItem(STORAGE_KEY_CONTACT, JSON.stringify(DEFAULT_CONTACT_CONFIG));
      }
    } catch {
      // Fallback to default
    }
  }, []);

  const handleUploadImage = (projectId: string, dataUrl: string) => {
    setCustomImages((prev) => {
      const updated = { ...prev, [projectId]: dataUrl };
      saveCustomImages(updated);
      return updated;
    });
  };

  const handleResetImage = (projectId: string) => {
    setCustomImages((prev) => {
      const updated = { ...prev };
      delete updated[projectId];
      saveCustomImages(updated);
      return updated;
    });
  };

  const handleResetAllImages = () => {
    if (window.confirm('Reset all custom uploaded designs back to original studio artworks?')) {
      setCustomImages({});
      clearAllCustomImages();
    }
  };

  const handleUpdateContactConfig = (config: StudioContactConfig) => {
    setContactConfig(config);
    try {
      localStorage.setItem(STORAGE_KEY_CONTACT, JSON.stringify(config));
    } catch {
      // ignore
    }
  };

  const handleExploreClick = () => {
    const portfolioEl = document.getElementById('portfolio');
    if (portfolioEl) {
      portfolioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F2EB] flex flex-col font-sans selection:bg-[#C5A880] selection:text-black">
      {/* Top Bar Navigation */}
      <Header onOpenContact={handleOpenContact} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero onExploreClick={handleExploreClick} />

        {/* 2. Portfolio Section (2-column responsive gallery of 6 projects) */}
        <PortfolioGrid
          projects={projects}
          customImages={customImages}
          onPreview={(proj) => setSelectedProject(proj)}
          onUploadImage={handleUploadImage}
          onResetImage={handleResetImage}
          onResetAllImages={handleResetAllImages}
        />

        {/* 3. About Section ("CREATIVITY MEETS ELEGANCE") */}
        <AboutSection />

        {/* 4. Contact Section ("HAVE A PROJECT IN MIND?") */}
        <ContactSection
          contactConfig={contactConfig}
          onUpdateContactConfig={handleUpdateContactConfig}
        />
      </main>

      {/* 5. Footer (NOIRÉ — Luxury Perfume Advertising) */}
      <Footer />

      {/* Full-screen Lightbox Preview Modal */}
      <LightboxModal
        project={selectedProject}
        allProjects={projects}
        customImages={customImages}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onUploadImage={handleUploadImage}
        onResetImage={handleResetImage}
      />
    </div>
  );
}
