import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Lock } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage, onOpenAdmin }) => {
  const { siteConfig, openQuickEnquiry } = useStudioData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B12]/90 backdrop-blur-md border-b border-[#252B36] py-3.5 shadow-2xl shadow-black/40'
          : 'bg-transparent py-5 border-b border-[#252B36]/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Tagline */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 group text-left cursor-pointer focus:outline-none"
            aria-label="JAIXO STUDIO Home"
          >
            {/* Geometric Studio Monogram */}
            <div className="w-10 h-10 rounded-xl bg-[#10141D] border border-[#252B36] group-hover:border-[#078BFF] transition-all duration-300 flex items-center justify-center relative overflow-hidden shadow-inner">
              <span className="font-heading font-black text-xl text-[#F5F5F2] tracking-tighter group-hover:text-white">
                J<span className="text-[#078BFF]">X</span>
              </span>
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#078BFF] rounded-bl-sm opacity-80" />
            </div>

            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-wider text-[#F5F5F2] group-hover:text-white transition-colors">
                {siteConfig.brandName}
              </span>
              <span className="text-[10px] tracking-[0.22em] text-[#078BFF] font-medium uppercase font-heading">
                {siteConfig.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#10141D]/80 border border-[#252B36] px-3 py-1.5 rounded-full">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-4 py-1.5 text-xs font-medium tracking-wide uppercase transition-all duration-200 rounded-full cursor-pointer ${
                    isActive
                      ? 'text-[#F5F5F2] bg-[#252B36]'
                      : 'text-[#A5AAB5] hover:text-[#F5F5F2] hover:bg-[#252B36]/40'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#078BFF]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#10141D] border border-[#252B36] text-[11px] text-[#A5AAB5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#078BFF] animate-pulse" />
              <span>Available for projects</span>
            </div>

            {/* Start a Project CTA */}
            <button
              onClick={() => openQuickEnquiry()}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold tracking-wide uppercase transition-all duration-200 shadow-lg shadow-[#078BFF]/20 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Admin Management discreet toggle */}
            <button
              onClick={onOpenAdmin}
              title="Admin Portal (Password Protected)"
              className="p-2 rounded-lg bg-[#10141D] border border-[#252B36] text-[#A5AAB5] hover:text-[#078BFF] hover:border-[#078BFF]/50 transition-colors cursor-pointer"
              aria-label="Open Admin"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-[#10141D] border border-[#252B36] text-[#A5AAB5]"
              aria-label="Admin Access"
            >
              <Lock className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-[#10141D] border border-[#252B36] text-[#F5F5F2] hover:text-white cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080B12]/98 border-b border-[#252B36] px-6 py-6 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#10141D] text-[#078BFF] border-l-2 border-[#078BFF]'
                      : 'text-[#A5AAB5] hover:text-white hover:bg-[#10141D]/50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-[#078BFF]" />}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[#252B36] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openQuickEnquiry();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#078BFF] text-white text-sm font-semibold tracking-wide uppercase"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-[#A5AAB5] px-2 pt-2">
                <span>{siteConfig.location}</span>
                <span className="text-[#078BFF]">● Available</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
