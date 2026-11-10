import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-6 py-20 lg:py-28">
      {/* Background ambient lighting caustics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Subtle champagne radial aura center-top */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[550px] rounded-full opacity-20 blur-[130px] animate-ambient-drift"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 168, 128, 0.45) 0%, rgba(142, 117, 82, 0.2) 45%, transparent 75%)',
          }}
        />

        {/* Deep amber glass reflection bottom-left */}
        <div
          className="absolute -bottom-20 left-10 w-[420px] h-[420px] rounded-full opacity-15 blur-[100px] animate-subtle-caustic"
          style={{
            background:
              'radial-gradient(circle, rgba(204, 119, 34, 0.35) 0%, rgba(197, 168, 128, 0.15) 50%, transparent 80%)',
          }}
        />

        {/* Subtle film grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Fine architectural hairline grid lines */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between pointer-events-none opacity-[0.04]">
          <div className="w-px h-full bg-[#F5F2EB]" />
          <div className="w-px h-full bg-[#F5F2EB] hidden md:block" />
          <div className="w-px h-full bg-[#F5F2EB]" />
        </div>
      </div>

      {/* Hero content container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Studio monoline kicker */}
        <div className="inline-flex items-center gap-3 text-[11px] sm:text-xs font-medium tracking-[0.35em] text-[#C5A880] uppercase mb-8 sm:mb-10">
          <span className="w-8 h-px bg-[#C5A880]/50" aria-hidden="true" />
          <span>Haute Parfumerie Visual Direction</span>
          <span className="w-8 h-px bg-[#C5A880]/50" aria-hidden="true" />
        </div>

        {/* Large NOIRÉ logo */}
        <div className="mb-6 sm:mb-8 select-none">
          <h2 className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-[0.22em] text-[#F5F2EB] font-light leading-none uppercase drop-shadow-2xl">
            NOIRÉ
          </h2>
          <p className="mt-2 text-[10px] sm:text-xs tracking-[0.55em] text-[#A79F93] uppercase">
            Advertising · Editorial · Still Life
          </p>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.14em] text-[#F5F2EB] font-normal uppercase max-w-3xl leading-[1.15] mb-6 sm:mb-8 text-balance">
          THE ART OF LUXURY.
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-[#C8C1B4] font-light tracking-[0.04em] max-w-2xl leading-relaxed mb-10 sm:mb-12">
          Creative perfume advertising that makes every fragrance unforgettable.
        </p>

        {/* Button: "EXPLORE OUR WORK" */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={onExploreClick}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 text-xs font-medium tracking-[0.25em] text-[#080808] bg-[#F5F2EB] hover:bg-[#C5A880] transition-all duration-300 uppercase cursor-pointer shadow-lg hover:shadow-[#C5A880]/20"
          >
            <span>EXPLORE OUR WORK</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1 text-[#080808]" />
          </button>

          <a
            href="#about"
            className="px-6 py-4 text-xs font-medium tracking-[0.22em] text-[#C5A880] hover:text-[#F5F2EB] transition-colors uppercase border border-[#C5A880]/30 hover:border-[#C5A880] duration-300"
          >
            Studio Vision
          </a>
        </div>

        {/* Ambient editorial note below */}
        <div className="mt-14 sm:mt-20 pt-8 border-t border-[#22201D] w-full max-w-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] tracking-[0.2em] uppercase text-[#7D7569]">
          <span>Paris · Milan · New York</span>
          <span className="flex items-center gap-1.5 text-[#C5A880]">
            <Sparkles className="w-3 h-3" />
            <span>Independent Works</span>
          </span>
          <span>Vol. 2024 / 2025</span>
        </div>
      </div>
    </section>
  );
};
