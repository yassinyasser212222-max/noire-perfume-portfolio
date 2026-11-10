import React from 'react';
import { Eye, Flame, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-28 sm:py-36 px-6 sm:px-8 lg:px-12 bg-[#0A0907] border-y border-[#1E1B18] overflow-hidden">
      {/* Subtle ambient light gradient */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #C5A880 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] text-[#C5A880] uppercase mb-6">
          <span className="w-6 h-px bg-[#C5A880]" aria-hidden="true" />
          <span>The Studio Manifesto</span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#F5F2EB] uppercase tracking-[0.08em] font-normal leading-[1.1] mb-8 sm:mb-12 max-w-4xl text-balance">
          CREATIVITY MEETS ELEGANCE.
        </h2>

        {/* Primary requested text + editorial expansion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            {/* The exact requested text prominent as lead editorial quote */}
            <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#E8D8C3] leading-relaxed mb-8">
              "NOIRÉ creates modern and sophisticated visual concepts for luxury fragrance brands."
            </p>

            <div className="space-y-6 text-sm sm:text-base text-[#9C9384] font-light leading-relaxed">
              <p>
                Founded at the intersection of haute perfumery and contemporary art direction, NOIRÉ crafts arresting visual campaigns that translate the unseen essence of scent into tactile, unforgettable imagery.
              </p>
              <p>
                We collaborate with visionary Maisons, perfumers, and creative directors worldwide to distill complex olfactory pyramids into iconic visual identities. From Roman sunlight raking across chiseled glass to the intimate warmth of an amber sunset, every frame is an exercise in sculptural discipline and emotional resonance.
              </p>
            </div>

            {/* Studio Principles Monograph */}
            <div className="mt-12 pt-8 border-t border-[#22201D] grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs uppercase tracking-[0.18em]">
              <div>
                <span className="text-[#C5A880] block mb-1">Discipline</span>
                <span className="text-[#F5F2EB]">Haute Parfumerie</span>
              </div>
              <div>
                <span className="text-[#C5A880] block mb-1">Philosophy</span>
                <span className="text-[#F5F2EB]">Sculptural Minimalism</span>
              </div>
              <div>
                <span className="text-[#C5A880] block mb-1">Presence</span>
                <span className="text-[#F5F2EB]">Global Editorial</span>
              </div>
            </div>
          </div>

          {/* Right column: 3 Pillars of Craft */}
          <div id="expertise" className="lg:col-span-5 space-y-8 bg-[#0E0D0B] p-8 sm:p-10 border border-[#22201D]">
            <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EB] uppercase tracking-[0.1em] pb-4 border-b border-[#22201D]">
              Visual Philosophy
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#C5A880]">
                  <Eye className="w-3.5 h-3.5" />
                  <span>01. Olfactory Translation</span>
                </div>
                <h4 className="font-serif text-lg text-[#F5F2EB]">From Scent to Vision</h4>
                <p className="text-xs text-[#8F877B] leading-relaxed">
                  Translating top, heart, and base notes into lighting temperatures, stone textures, and chromatic harmony that captivate before the first spritz.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#1C1A17]">
                <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#C5A880]">
                  <Flame className="w-3.5 h-3.5" />
                  <span>02. Materiality & Form</span>
                </div>
                <h4 className="font-serif text-lg text-[#F5F2EB]">Sculptural Lighting</h4>
                <p className="text-xs text-[#8F877B] leading-relaxed">
                  Treating every flacon as architectural sculpture. Revealing faceted glass reflections, ribbed metal collars, and liquid amber refraction with exacting precision.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#1C1A17]">
                <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#C5A880]">
                  <Award className="w-3.5 h-3.5" />
                  <span>03. Campaign Impact</span>
                </div>
                <h4 className="font-serif text-lg text-[#F5F2EB]">Unforgettable Presence</h4>
                <p className="text-xs text-[#8F877B] leading-relaxed">
                  Crafting high-definition campaign assets that command attention across global billboards, luxury print editions, and digital flagship showcases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
