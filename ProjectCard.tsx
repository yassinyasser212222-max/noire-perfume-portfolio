import React, { useRef, useState } from 'react';
import { Maximize2, Upload, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { PortfolioProject } from '../types/portfolio';
import { isValidImageFile } from '../utils/storage';

interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
  imageUrl: string | null;
  hasCustomImage: boolean;
  onPreview: (project: PortfolioProject) => void;
  onUploadImage: (projectId: string, dataUrl: string) => void;
  onResetImage: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  imageUrl,
  hasCustomImage,
  onPreview,
  onUploadImage,
  onResetImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const formattedIndex = String(index + 1).padStart(2, '0');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const processFile = (file: File) => {
    if (!isValidImageFile(file)) {
      setUploadError('Please select a valid image (PNG, JPG, WebP)');
      setTimeout(() => setUploadError(null), 4000);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadImage(project.id, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <article
      className={`group relative flex flex-col bg-[#0E0D0B] border transition-all duration-300 ${
        isDragOver
          ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30'
          : 'border-[#22201D] hover:border-[#3D372E]'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden file input for uploading design */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif"
        className="hidden"
        onChange={handleFileChange}
        aria-label={`Upload custom design for ${project.title}`}
      />

      {/* Visual media container (1:1 square aspect ratio matching high-fashion fragrance campaigns) */}
      <div
        className="relative aspect-square w-full overflow-hidden bg-[#141210] cursor-pointer"
        onClick={() => onPreview(project)}
      >
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={`${project.title} - Luxury Perfume Advertisement`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            {/* Subtle atmospheric vignette */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0E0D0B]/80 via-transparent to-black/20 pointer-events-none"
              aria-hidden="true"
            />
          </>
        ) : (
          /* High-end Luxury Editorial Placeholder */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#151412] via-[#0E0D0B] to-[#080808]">
            {/* Architectural decorative border */}
            <div className="absolute inset-4 border border-[#C5A880]/20 pointer-events-none" />
            <div className="absolute inset-5 border border-[#C5A880]/10 pointer-events-none" />

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-[#C5A880]/40 pointer-events-none" />
            <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-[#C5A880]/40 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-[#C5A880]/40 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-[#C5A880]/40 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center max-w-xs">
              <span className="text-[10px] tracking-[0.4em] font-sans text-[#C5A880] uppercase mb-2">
                PROJECT {formattedIndex} · EDITORIAL
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB] uppercase tracking-[0.1em] mb-2">
                {project.brand}
              </h4>
              <p className="font-serif italic text-sm text-[#C5A880] mb-6">
                {project.fragranceName}
              </p>

              <div className="w-8 h-px bg-[#C5A880]/40 mb-6" />

              <span className="text-xs font-light text-[#9A9184] tracking-wide mb-6 leading-relaxed">
                Slot reserved for your campaign artwork
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium tracking-[0.2em] text-[#080808] bg-[#C5A880] hover:bg-[#F5F2EB] transition-colors uppercase cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Design</span>
              </button>

              <span className="mt-3 text-[10px] tracking-[0.15em] text-[#70685D] uppercase">
                Drag & drop or click to replace
              </span>
            </div>
          </div>
        )}

        {/* Top badges bar on card overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <span className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-[#F5F2EB] bg-black/60 backdrop-blur-md border border-white/10 uppercase">
            {formattedIndex} / 06
          </span>

          <div className="flex items-center gap-2 pointer-events-auto">
            {hasCustomImage && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onResetImage(project.id);
                }}
                title="Reset to default design"
                className="p-2 text-xs text-[#C5A880] bg-black/70 hover:bg-black border border-[#C5A880]/40 transition-colors backdrop-blur-md cursor-pointer flex items-center gap-1.5"
                aria-label={`Reset custom design for ${project.title}`}
              >
                <RotateCcw className="w-3 h-3" />
                <span className="text-[10px] tracking-widest hidden sm:inline">RESET</span>
              </button>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              title="Replace design with your own artwork"
              className="p-2 text-xs text-[#F5F2EB] bg-black/70 hover:bg-[#C5A880] hover:text-[#080808] border border-white/10 transition-colors backdrop-blur-md cursor-pointer flex items-center gap-1.5"
              aria-label={`Upload or replace design for ${project.title}`}
            >
              <Upload className="w-3 h-3" />
              <span className="text-[10px] tracking-widest hidden sm:inline">REPLACE</span>
            </button>
          </div>
        </div>

        {/* Quick fullscreen preview hover button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/30 backdrop-blur-[2px]">
          <div className="px-4 py-2.5 bg-black/80 border border-[#C5A880]/60 text-[#F5F2EB] text-xs tracking-[0.2em] uppercase flex items-center gap-2 shadow-2xl">
            <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>View Fullscreen</span>
          </div>
        </div>
      </div>

      {/* Project details card body */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
        <div>
          {/* Metadata line without pill enclosures */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tracking-[0.18em] text-[#C5A880] uppercase mb-3 font-medium">
            <span>{project.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#8F877B]">{project.category}</span>
          </div>

          {/* Project Title */}
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB] uppercase tracking-[0.06em] leading-snug group-hover:text-[#C5A880] transition-colors mb-2">
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="font-serif italic text-sm text-[#A9A093] mb-4 tracking-wide">
            "{project.tagline}"
          </p>

          {/* Editorial description */}
          <p className="text-xs sm:text-sm text-[#7D7569] leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Card footer controls */}
        <div className="mt-6 pt-4 border-t border-[#1C1A17] flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => onPreview(project)}
            className="inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.18em] uppercase text-[#F5F2EB] hover:text-[#C5A880] transition-colors cursor-pointer group/link"
          >
            <span>Open Campaign</span>
            <Maximize2 className="w-3 h-3 text-[#C5A880] transition-transform group-hover/link:scale-110" />
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase text-[#A79F93] hover:text-[#F5F2EB] transition-colors cursor-pointer"
          >
            <ImageIcon className="w-3 h-3 text-[#C5A880]" />
            <span>{imageUrl ? 'Swap Artwork' : 'Upload Artwork'}</span>
          </button>
        </div>

        {uploadError && (
          <div className="mt-3 text-xs text-rose-400 tracking-wide text-center">
            {uploadError}
          </div>
        )}
      </div>
    </article>
  );
};
