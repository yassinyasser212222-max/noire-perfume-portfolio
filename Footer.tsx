import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-[#1C1A17] text-[#8E8578] py-16 sm:py-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-12">
        {/* Top row: Wordmark and Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-[#1A1815]">
          <div>
            <span className="font-serif text-3xl sm:text-4xl tracking-[0.25em] text-[#F5F2EB] uppercase block">
              NOIRÉ
            </span>
            <p className="mt-2 text-xs tracking-[0.25em] text-[#C5A880] uppercase">
              Luxury Perfume Advertising
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-xs tracking-[0.2em] uppercase text-[#A79F93]">
            <a href="#portfolio" className="hover:text-[#F5F2EB] transition-colors">
              Portfolio
            </a>
            <a href="#about" className="hover:text-[#F5F2EB] transition-colors">
              About
            </a>
            <a href="#expertise" className="hover:text-[#F5F2EB] transition-colors">
              Philosophy
            </a>
            <a href="#contact" className="hover:text-[#F5F2EB] transition-colors">
              Contact
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#C5A880] hover:text-[#F5F2EB] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center row: Required Core Identity Lines */}
        <div className="space-y-3">
          <p className="font-serif text-lg sm:text-xl text-[#F5F2EB] tracking-[0.05em]">
            NOIRÉ — Luxury Perfume Advertising.
          </p>
          <p className="text-xs sm:text-sm text-[#A9A093] font-light">
            Creative concepts and independent design work.
          </p>
        </div>

        {/* Bottom row: Independent Portfolio Disclaimer & Copyright */}
        <div className="pt-8 border-t border-[#141311] flex flex-col md:flex-row md:items-center justify-between gap-6 text-[11px] leading-relaxed text-[#6E665A]">
          <p className="max-w-3xl">
            Disclaimer: This is an independent design portfolio, not an official website affiliated with the perfume brands (Valentino, Yves Saint Laurent, Jean Paul Gaultier, Giorgio Armani, Dior, Chanel). All registered trademarks, logos, and product likenesses remain the exclusive property of their respective Maisons and copyright holders.
          </p>
          <div className="shrink-0 font-mono tracking-widest text-[#7C7468]">
            © {new Date().getFullYear()} NOIRÉ STUDIO.
          </div>
        </div>
      </div>
    </footer>
  );
};
