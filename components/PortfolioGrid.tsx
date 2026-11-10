import React from 'react';
import { Sparkles, RotateCcw, Info } from 'lucide-react';
import { PortfolioProject } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { getEffectiveImage } from '../utils/storage';

interface PortfolioGridProps {
  projects: PortfolioProject[];
  customImages: Record<string, string>;
  onPreview: (project: PortfolioProject) => void;
  onUploadImage: (projectId: string, dataUrl: string) => void;
  onResetImage: (projectId: string) => void;
  onResetAllImages: () => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  projects,
  customImages,
  onPreview,
  onUploadImage,
  onResetImage,
  onResetAllImages,
}) => {
  const customCount = Object.keys(customImages).length;

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20 pb-8 border-b border-[#22201D]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] text-[#C5A880] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Campaign Monograph</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F2EB] uppercase tracking-[0.08em] font-normal leading-tight">
            SELECTED WORKS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9C9487] font-light tracking-wide max-w-xl">
            A showcase of creative advertising concepts for the world's most prestigious fragrance houses.
          </p>
        </div>

        {/* Global actions bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {customCount > 0 && (
            <button
              type="button"
              onClick={onResetAllImages}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#C5A880]/30 hover:border-[#C5A880] text-[#C5A880] hover:text-[#F5F2EB] transition-colors uppercase tracking-[0.15em] cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All ({customCount})</span>
            </button>
          )}

          <div className="flex items-center gap-2 text-[#7D7569] text-xs tracking-wider">
            <Info className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Click any artwork to expand fullscreen</span>
          </div>
        </div>
      </div>

      {/* 2-column responsive gallery containing the 6 requested projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((project, index) => {
          const effectiveImage = getEffectiveImage(project, customImages);
          const hasCustom = Boolean(customImages[project.id]);

          return (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              imageUrl={effectiveImage}
              hasCustomImage={hasCustom}
              onPreview={onPreview}
              onUploadImage={onUploadImage}
              onResetImage={onResetImage}
            />
          );
        })}
      </div>

      {/* Quick designer guide callout at bottom of gallery */}
      <div className="mt-16 p-6 sm:p-8 bg-[#0E0D0B] border border-[#22201D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F5F2EB] mb-1">
            Studio Artwork Management
          </h4>
          <p className="text-xs text-[#8E8578] max-w-xl leading-relaxed">
            All six project slots are configured to accept your custom advertising designs. Drag & drop images directly onto any card, or use the replace button. Your changes are saved directly in your browser.
          </p>
        </div>
        <div className="text-xs text-[#C5A880] tracking-widest uppercase font-mono shrink-0">
          6 of 6 SLOTS ACTIVE
        </div>
      </div>
    </section>
  );
};
