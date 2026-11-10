import React from 'react';

interface HeaderProps {
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#080808]/90 backdrop-blur-md border-b border-[#1E1B18] transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2 text-2xl sm:text-3xl font-serif tracking-[0.25em] text-[#F5F2EB] uppercase whitespace-nowrap shrink-0 hover:text-[#C5A880] transition-colors"
          aria-label="NOIRÉ Studio Home"
        >
          <span>NOIRÉ</span>
          <span className="text-[10px] tracking-[0.3em] font-sans text-[#C5A880] opacity-80 uppercase ml-1">
            PARIS
          </span>
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav
          className="hidden md:flex items-center gap-8 text-xs font-medium tracking-[0.2em] uppercase text-[#A79F93]"
          aria-label="Primary Navigation"
        >
          <a
            href="#portfolio"
            className="hover:text-[#F5F2EB] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C5A880]"
          >
            Portfolio
          </a>
          <a
            href="#about"
            className="hover:text-[#F5F2EB] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C5A880]"
          >
            About
          </a>
          <a
            href="#expertise"
            className="hover:text-[#F5F2EB] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C5A880]"
          >
            Philosophy
          </a>
          <a
            href="#contact"
            className="hover:text-[#F5F2EB] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C5A880]"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenContact}
            className="px-5 py-2.5 text-xs font-medium tracking-[0.18em] uppercase text-[#080808] bg-[#F5F2EB] hover:bg-[#C5A880] transition-all duration-200 rounded-none whitespace-nowrap shrink-0 cursor-pointer shadow-sm hover:shadow-md"
          >
            Inquire Project
          </button>
        </div>
      </div>
    </header>
  );
};
