import React, { useState, useEffect } from 'react';
import { ArrowUpRight, MessageCircle, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { useStudioData } from '../context/StudioDataContext';

interface FooterProps {
  setActivePage: (page: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onOpenAdmin }) => {
  const { siteConfig, services, openQuickEnquiry } = useStudioData();
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatted in IST (Asia/Kolkata)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello JAIXO STUDIO, I would like to inquire about your creative design and web development services.'
  )}`;

  return (
    <footer className="bg-[#080B12] border-t border-[#252B36] relative overflow-hidden">
      {/* Subtle background ambient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#078BFF]/40 to-transparent" />

      {/* Main Top Studio Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#252B36]">
          {/* Brand Manifesto Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#10141D] border border-[#252B36] flex items-center justify-center font-heading font-black text-lg text-white">
                J<span className="text-[#078BFF]">X</span>
              </div>
              <span className="font-heading font-bold text-2xl tracking-wider text-[#F5F5F2]">
                {siteConfig.brandName}
              </span>
            </div>

            <p className="text-[#A5AAB5] text-sm leading-relaxed max-w-md">
              {siteConfig.positioning}
            </p>

            {/* Studio Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#10141D] border border-[#252B36] text-xs font-heading font-medium tracking-[0.2em] text-[#078BFF] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#078BFF]" />
              {siteConfig.tagline}
            </div>

            {/* Studio Live Time & Location */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#A5AAB5]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#078BFF]" />
                <span>{siteConfig.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#078BFF]" />
                <span>Studio Time: {currentTime || 'Loading...'} IST</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-[#F5F5F2]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A5AAB5]">
              {['Home', 'Services', 'Portfolio', 'Pricing', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNav(item.toLowerCase())}
                    className="hover:text-[#078BFF] transition-colors cursor-pointer text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quick Directory */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-[#F5F5F2]">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A5AAB5]">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => handleNav('services')}
                    className="hover:text-[#078BFF] transition-colors cursor-pointer text-left line-clamp-1"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-[#F5F5F2]">
              Connect
            </h4>
            <ul className="space-y-3 text-xs text-[#A5AAB5]">
              <li>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#F5F5F2] hover:text-[#078BFF] transition-colors group"
                >
                  <InstagramIcon className="w-4 h-4 text-[#078BFF]" />
                  <span>{siteConfig.instagramHandle}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#F5F5F2] hover:text-[#078BFF] transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-[#078BFF]" />
                  <span>WhatsApp Chat</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="flex items-center gap-2 text-[#F5F5F2] hover:text-[#078BFF] transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#078BFF]" />
                  <span className="truncate">{siteConfig.contactEmail}</span>
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => openQuickEnquiry()}
                  className="w-full text-center px-3 py-2 rounded-lg bg-[#10141D] hover:bg-[#252B36] border border-[#252B36] text-[#078BFF] text-xs font-medium transition-colors cursor-pointer"
                >
                  Quick Project Enquiry
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A5AAB5]">
          <p>© {new Date().getFullYear()} JAIXO STUDIO. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#078BFF]" />
              <span>Independent Creative Studio</span>
            </span>
            <button
              onClick={onOpenAdmin}
              className="text-[#A5AAB5] hover:text-[#078BFF] transition-colors"
            >
              Studio CMS Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
