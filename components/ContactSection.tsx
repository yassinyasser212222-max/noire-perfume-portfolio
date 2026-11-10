import React, { useState } from 'react';
import { Instagram, MessageCircle, Mail, Send, CheckCircle2, Settings2, ExternalLink } from 'lucide-react';
import { StudioContactConfig } from '../types/portfolio';
import { formatInstagramUrl, formatWhatsAppUrl } from '../utils/storage';

interface ContactSectionProps {
  contactConfig: StudioContactConfig;
  onUpdateContactConfig: (config: StudioContactConfig) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactConfig,
  onUpdateContactConfig,
}) => {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [tempInstagram, setTempInstagram] = useState(contactConfig.instagramHandle);
  const [tempWhatsApp, setTempWhatsApp] = useState(contactConfig.whatsappNumber);
  const [tempEmail, setTempEmail] = useState(contactConfig.email);

  // Inquiry form states
  const [formState, setFormState] = useState({
    name: '',
    brand: '',
    email: '',
    serviceType: 'Campaign Advertising',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const instagramUrl = formatInstagramUrl(contactConfig.instagramHandle);
  const whatsAppUrl = formatWhatsAppUrl(
    contactConfig.whatsappNumber,
    'Hello NOIRÉ Studio, I am interested in collaborating on a perfume campaign concept.'
  );

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContactConfig({
      ...contactConfig,
      instagramHandle: tempInstagram.trim(),
      whatsappNumber: tempWhatsApp.trim(),
      email: tempEmail.trim(),
    });
    setShowConfigModal(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormError('Please complete all required fields.');
      return;
    }

    setFormError(null);
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFormState({
      name: '',
      brand: '',
      email: '',
      serviceType: 'Campaign Advertising',
      message: '',
    });
    setFormSubmitted(false);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Decorative ambient caustic */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-15 blur-[140px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, #C5A880 0%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-block text-xs font-medium tracking-[0.35em] text-[#C5A880] uppercase mb-4">
            Direct Inquiries · Collaborations
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#F5F2EB] uppercase tracking-[0.08em] font-normal leading-tight mb-6">
            HAVE A PROJECT IN MIND?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#9F9688] font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            We partner with luxury fragrance Maisons, independent perfumers, and creative agencies to produce campaign imagery that commands global distinction.
          </p>
        </div>

        {/* Primary Contact Buttons Bar (Instagram, WhatsApp, Email) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
          {/* Instagram Button */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0E0D0B] hover:bg-[#181613] text-[#F5F2EB] hover:text-[#C5A880] border border-[#2B2721] hover:border-[#C5A880]/50 transition-all duration-200 text-xs font-medium tracking-[0.2em] uppercase group shadow-md"
            aria-label={`Connect with NOIRÉ on Instagram: @${contactConfig.instagramHandle}`}
          >
            <Instagram className="w-4 h-4 text-[#C5A880] transition-transform group-hover:scale-110" />
            <span>Instagram</span>
            <ExternalLink className="w-3 h-3 text-[#70685D] group-hover:text-[#C5A880]" />
          </a>

          {/* WhatsApp Button */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#F5F2EB] hover:bg-[#C5A880] text-[#080808] transition-all duration-200 text-xs font-medium tracking-[0.2em] uppercase group shadow-md hover:shadow-[#C5A880]/20"
            aria-label={`Chat with NOIRÉ on WhatsApp: ${contactConfig.whatsappNumber}`}
          >
            <MessageCircle className="w-4 h-4 text-[#080808] transition-transform group-hover:scale-110" />
            <span>Chat on WhatsApp</span>
            <ExternalLink className="w-3 h-3 text-[#080808]/60" />
          </a>

          {/* Email Button */}
          <a
            href={`mailto:${contactConfig.email}?subject=NOIR%C3%89%20Perfume%20Advertising%20Inquiry`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0E0D0B] hover:bg-[#181613] text-[#F5F2EB] hover:text-[#C5A880] border border-[#2B2721] hover:border-[#C5A880]/50 transition-all duration-200 text-xs font-medium tracking-[0.2em] uppercase group shadow-md"
            aria-label={`Email NOIRÉ Studio: ${contactConfig.email}`}
          >
            <Mail className="w-4 h-4 text-[#C5A880] transition-transform group-hover:scale-110" />
            <span>Direct Email</span>
          </a>

          {/* Configure Placeholder Links Trigger */}
          <button
            type="button"
            onClick={() => setShowConfigModal(true)}
            className="w-full sm:w-auto p-4 text-[#8C8375] hover:text-[#C5A880] hover:bg-[#141210] border border-dashed border-[#2B2721] hover:border-[#C5A880]/40 transition-colors text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            title="Configure your Instagram handle and WhatsApp number"
            aria-label="Configure contact placeholders"
          >
            <Settings2 className="w-4 h-4" />
            <span className="sm:hidden">Configure Links</span>
          </button>
        </div>

        {/* Studio Inquiry Form Container */}
        <div className="max-w-3xl mx-auto bg-[#0E0D0B] border border-[#22201D] p-8 sm:p-12">
          <div className="mb-8 pb-6 border-b border-[#1C1A17] flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl text-[#F5F2EB] uppercase tracking-[0.08em]">
                Project Brief
              </h3>
              <p className="text-xs text-[#8E8578] mt-1">
                Tell us about your fragrance launch, timeline, and artistic direction.
              </p>
            </div>
            <span className="text-[11px] font-mono tracking-widest text-[#C5A880] uppercase">
              STUDIO PARIS
            </span>
          </div>

          {formSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#C5A880] mx-auto animate-bounce" />
              <h4 className="font-serif text-2xl text-[#F5F2EB] uppercase tracking-wide">
                Inquiry Received
              </h4>
              <p className="text-sm text-[#9C9487] max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to NOIRÉ. Our creative directors will review your brief and reply within 24 business hours.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-[#080808] bg-[#F5F2EB] hover:bg-[#C5A880] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="client-name" className="block text-xs font-medium tracking-[0.15em] text-[#C5A880] uppercase mb-2">
                    Your Name *
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Laurent Mercier"
                    className="w-full bg-[#141210] border border-[#282520] focus:border-[#C5A880] px-4 py-3 text-sm text-[#F5F2EB] placeholder-[#5C554B] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="client-brand" className="block text-xs font-medium tracking-[0.15em] text-[#C5A880] uppercase mb-2">
                    Maison / Brand Name
                  </label>
                  <input
                    id="client-brand"
                    type="text"
                    value={formState.brand}
                    onChange={(e) => setFormState({ ...formState, brand: e.target.value })}
                    placeholder="e.g. Maison Parfums"
                    className="w-full bg-[#141210] border border-[#282520] focus:border-[#C5A880] px-4 py-3 text-sm text-[#F5F2EB] placeholder-[#5C554B] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="client-email" className="block text-xs font-medium tracking-[0.15em] text-[#C5A880] uppercase mb-2">
                    Email Address *
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@maison.com"
                    className="w-full bg-[#141210] border border-[#282520] focus:border-[#C5A880] px-4 py-3 text-sm text-[#F5F2EB] placeholder-[#5C554B] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="service-type" className="block text-xs font-medium tracking-[0.15em] text-[#C5A880] uppercase mb-2">
                    Scope of Collaboration
                  </label>
                  <select
                    id="service-type"
                    value={formState.serviceType}
                    onChange={(e) => setFormState({ ...formState, serviceType: e.target.value })}
                    className="w-full bg-[#141210] border border-[#282520] focus:border-[#C5A880] px-4 py-3 text-sm text-[#F5F2EB] outline-none transition-colors cursor-pointer"
                  >
                    <option value="Campaign Advertising">Campaign Advertising & Key Visuals</option>
                    <option value="Editorial Still Life">Editorial Still Life & Lighting</option>
                    <option value="Packaging & Flacon Direction">Packaging & Flacon Creative Direction</option>
                    <option value="Digital Launch Experience">Digital Launch & Motion Asset Series</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="client-message" className="block text-xs font-medium tracking-[0.15em] text-[#C5A880] uppercase mb-2">
                  Project Vision & Timeline *
                </label>
                <textarea
                  id="client-message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Share details regarding your fragrance concept, key aesthetic references, release schedule, and required deliverables..."
                  className="w-full bg-[#141210] border border-[#282520] focus:border-[#C5A880] px-4 py-3 text-sm text-[#F5F2EB] placeholder-[#5C554B] outline-none transition-colors resize-none"
                />
              </div>

              {formError && (
                <div className="text-xs text-rose-400 tracking-wide">
                  {formError}
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-[#787063] tracking-wide">
                  Direct Response Guarantee: 24h
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 text-xs font-medium tracking-[0.2em] text-[#080808] bg-[#F5F2EB] hover:bg-[#C5A880] transition-colors uppercase cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Configuration modal for user to change Instagram / WhatsApp links */}
      {showConfigModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="config-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn"
        >
          <div className="bg-[#12110E] border border-[#302B23] max-w-md w-full p-6 sm:p-8 shadow-2xl">
            <h3 id="config-modal-title" className="font-serif text-2xl text-[#F5F2EB] uppercase tracking-wide mb-2">
              Configure Contact Links
            </h3>
            <p className="text-xs text-[#958C7F] mb-6 leading-relaxed">
              Customize the destination links for the Instagram and WhatsApp buttons to match your real studio profiles.
            </p>

            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div>
                <label htmlFor="config-instagram" className="block text-xs text-[#C5A880] uppercase tracking-wider mb-1">
                  Instagram Username or Handle
                </label>
                <input
                  id="config-instagram"
                  type="text"
                  value={tempInstagram}
                  onChange={(e) => setTempInstagram(e.target.value)}
                  placeholder="e.g. noire.perfume.studio or @yourhandle"
                  className="w-full bg-[#080808] border border-[#2B2721] px-3.5 py-2.5 text-sm text-[#F5F2EB] outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label htmlFor="config-whatsapp" className="block text-xs text-[#C5A880] uppercase tracking-wider mb-1">
                  WhatsApp Number (with country code)
                </label>
                <input
                  id="config-whatsapp"
                  type="text"
                  value={tempWhatsApp}
                  onChange={(e) => setTempWhatsApp(e.target.value)}
                  placeholder="e.g. +33 1 40 50 60 70 or +15551234567"
                  className="w-full bg-[#080808] border border-[#2B2721] px-3.5 py-2.5 text-sm text-[#F5F2EB] outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label htmlFor="config-email" className="block text-xs text-[#C5A880] uppercase tracking-wider mb-1">
                  Studio Email
                </label>
                <input
                  id="config-email"
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  placeholder="studio@noireperfume.design"
                  className="w-full bg-[#080808] border border-[#2B2721] px-3.5 py-2.5 text-sm text-[#F5F2EB] outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#958C7F] hover:text-[#F5F2EB] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs uppercase tracking-wider text-[#080808] bg-[#C5A880] hover:bg-[#F5F2EB] transition-colors font-medium cursor-pointer"
                >
                  Save Links
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
