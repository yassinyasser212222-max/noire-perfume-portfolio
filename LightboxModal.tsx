import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Upload, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { PortfolioProject } from '../types/portfolio';
import { isValidImageFile } from '../utils/storage';

interface LightboxModalProps {
  project: PortfolioProject | null;
  allProjects: PortfolioProject[];
  customImages: Record<string, string>;
  onClose: () => void;
  onSelectProject: (project: PortfolioProject) => void;
  onUploadImage: (projectId: string, dataUrl: string) => void;
  onResetImage: (projectId: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  project,
  allProjects,
  customImages,
  onClose,
  onSelectProject,
  onUploadImage,
  onResetImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentIndex = project
    ? allProjects.findIndex((p) => p.id === project.id)
    : -1;

  const handleNext = useCallback(() => {
    if (currentIndex >= 0) {
      const nextIndex = (currentIndex + 1) % allProjects.length;
      onSelectProject(allProjects[nextIndex]);
      setIsZoomed(false);
    }
  }, [currentIndex, allProjects, onSelectProject]);

  const handlePrev = useCallback(() => {
    if (currentIndex >= 0) {
      const prevIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
      onSelectProject(allProjects[prevIndex]);
      setIsZoomed(false);
    }
  }, [currentIndex, allProjects, onSelectProject]);

  // Keyboard navigation
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose, handleNext, handlePrev]);

  if (!project) return null;

  const effectiveImage = customImages[project.id] || project.defaultImage;
  const hasCustom = Boolean(customImages[project.id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      alert('Please select a valid image file (PNG, JPG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadImage(project.id, reader.result);
      }
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Fullscreen Preview`}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-2xl text-[#F5F2EB] select-none animate-fadeIn"
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/10 z-20 bg-black/40">
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono tracking-widest text-[#C5A880] uppercase">
            {String(currentIndex + 1).padStart(2, '0')} / {String(allProjects.length).padStart(2, '0')}
          </span>
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          <h2 className="font-serif text-lg sm:text-xl tracking-[0.1em] text-[#F5F2EB] uppercase">
            {project.title}
          </h2>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          {effectiveImage && (
            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2.5 text-xs text-[#A9A093] hover:text-[#F5F2EB] hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
              title={isZoomed ? 'Fit to screen' : 'Zoom in 100%'}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider uppercase text-[#C5A880] border border-[#C5A880]/40 hover:bg-[#C5A880] hover:text-[#080808] transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Replace Artwork</span>
          </button>

          {hasCustom && (
            <button
              type="button"
              onClick={() => onResetImage(project.id)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider uppercase text-[#A9A093] border border-white/20 hover:border-white hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 text-xs text-[#F5F2EB] hover:text-[#C5A880] hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close fullscreen preview"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-auto">
        {/* Navigation arrow buttons */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black text-[#F5F2EB] hover:text-[#C5A880] border border-white/10 transition-all cursor-pointer backdrop-blur-md"
          aria-label="Previous project (Arrow Left)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 sm:right-8 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black text-[#F5F2EB] hover:text-[#C5A880] border border-white/10 transition-all cursor-pointer backdrop-blur-md"
          aria-label="Next project (Arrow Right)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Media display */}
        {effectiveImage ? (
          <div
            className={`transition-all duration-300 ease-out flex items-center justify-center ${
              isZoomed ? 'w-auto h-auto cursor-zoom-out' : 'max-h-[75vh] max-w-4xl cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={effectiveImage}
              alt={`${project.title} - Fullscreen View`}
              referrerPolicy="no-referrer"
              className={`object-contain rounded-none shadow-2xl transition-transform duration-300 ${
                isZoomed ? 'scale-125' : 'max-h-[75vh] w-auto'
              }`}
            />
          </div>
        ) : (
          /* Placeholder inside modal */
          <div className="max-w-md w-full aspect-square border border-[#C5A880]/30 bg-[#0E0D0B] p-8 flex flex-col items-center justify-center text-center shadow-2xl">
            <span className="text-[10px] tracking-[0.4em] font-sans text-[#C5A880] uppercase mb-3">
              PREVIEW PLACEHOLDER
            </span>
            <h3 className="font-serif text-3xl text-[#F5F2EB] uppercase tracking-[0.1em] mb-2">
              {project.title}
            </h3>
            <p className="font-serif italic text-sm text-[#C5A880] mb-6">
              "{project.tagline}"
            </p>
            <p className="text-xs text-[#908678] max-w-xs mb-8 leading-relaxed">
              This campaign slot is awaiting your bespoke creative artwork. Click below to load your high-resolution render.
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-medium tracking-[0.2em] text-[#080808] bg-[#C5A880] hover:bg-[#F5F2EB] transition-colors uppercase cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Custom Design</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Monograph Footer Bar */}
      <div className="px-6 sm:px-12 py-5 border-t border-white/10 bg-black/60 backdrop-blur-md z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div>
          <div className="flex items-center gap-2 text-[#C5A880] tracking-widest uppercase font-medium mb-1">
            <span>{project.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>
          <p className="font-serif italic text-sm text-[#F5F2EB]">
            "{project.tagline}"
          </p>
        </div>

        <div className="flex items-center gap-6 text-[#8F877B] text-[11px] tracking-wider uppercase">
          <div className="hidden md:block">
            <span className="text-[#645E54]">Art Direction:</span> {project.credits.artDirection}
          </div>
          <div className="hidden lg:block">
            <span className="text-[#645E54]">Concept:</span> {project.credits.concept}
          </div>
          <div>
            <span className="text-[#645E54]">Studio:</span> {project.credits.studio}
          </div>
        </div>
      </div>
    </div>
  );
};
