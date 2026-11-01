import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Eye, 
  CheckCircle2, 
  Code, 
  Palette, 
  FileText, 
  Award, 
  Layout, 
  Share2,
  Building2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

interface HomePageProps {
  setActivePage: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActivePage }) => {
  const { siteConfig, services, projects, openProjectModal, openQuickEnquiry } = useStudioData();

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

  // Curated list of featured posters for the homepage carousel/slider
  const carouselPosters = projects.filter((p) => p.featured && p.previewImage).slice(0, 8);
  const activePostersList = carouselPosters.length > 0 ? carouselPosters : projects.slice(0, 6);

  // Carousel State & Controls
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // 1. Automatically change to next poster every 2000ms
  // 4 & 5. Pause on hover, resume on mouse leave
  // 8. Loop continuously
  // 9. Clean up interval on unmount to prevent memory leaks
  useEffect(() => {
    if (isCarouselHovered || activePostersList.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentPosterIndex((prev) => (prev + 1) % activePostersList.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isCarouselHovered, activePostersList.length]);

  const handleNextPoster = () => {
    setCurrentPosterIndex((prev) => (prev + 1) % activePostersList.length);
  };

  const handlePrevPoster = () => {
    setCurrentPosterIndex((prev) => (prev - 1 + activePostersList.length) % activePostersList.length);
  };

  const handleSelectPoster = (idx: number) => {
    setCurrentPosterIndex(idx);
  };

  // 7. Mobile Touch Swipe Handlers
  const minSwipeDistance = 45;
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      handleNextPoster(); // Swiped Left -> Next
    } else if (distance < -minSwipeDistance) {
      handlePrevPoster(); // Swiped Right -> Previous
    }
  };

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'Websites':
        return <Code className="w-5 h-5 text-[#078BFF]" />;
      case 'Posters':
        return <Palette className="w-5 h-5 text-[#078BFF]" />;
      case 'Invitations':
        return <Layout className="w-5 h-5 text-[#078BFF]" />;
      case 'Resumes':
        return <FileText className="w-5 h-5 text-[#078BFF]" />;
      case 'Certificates':
        return <Award className="w-5 h-5 text-[#078BFF]" />;
      case 'Social Media Designs':
      case 'Advertisements':
        return <Share2 className="w-5 h-5 text-[#078BFF]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#078BFF]" />;
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden">
        {/* Subtle background radial accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#078BFF]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Headline Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Studio Tagline Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#10141D] border border-[#252B36] text-xs font-heading font-medium tracking-[0.2em] text-[#078BFF] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#078BFF] animate-ping" />
                <span>{siteConfig.brandName} • {siteConfig.tagline}</span>
              </div>

              {/* Exact Requested Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-[#F5F5F2] tracking-tight leading-[1.08]">
                {siteConfig.heroHeadline}
              </h1>

              {/* Supporting Editorial Paragraph */}
              <p className="text-base sm:text-lg text-[#A5AAB5] leading-relaxed max-w-2xl font-light">
                {siteConfig.heroSubheadline}
              </p>

              {/* Primary & Secondary Call To Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    setActivePage('portfolio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#078BFF]/25 cursor-pointer"
                >
                  <span>Explore Our Work</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => openQuickEnquiry()}
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#10141D] hover:bg-[#161C28] border border-[#252B36] hover:border-[#078BFF]/50 text-[#F5F5F2] text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4 text-[#078BFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Studio Metrics Highlights */}
              <div className="pt-8 border-t border-[#252B36]/60 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-[#F5F5F2]">6+</div>
                  <div className="text-xs text-[#A5AAB5] tracking-wide uppercase mt-1">Core Disciplines</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-[#F5F5F2]">100%</div>
                  <div className="text-xs text-[#A5AAB5] tracking-wide uppercase mt-1">Bespoke Design</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-[#078BFF]">24–48h</div>
                  <div className="text-xs text-[#A5AAB5] tracking-wide uppercase mt-1">Fast Turnaround</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Composition - Clean Minimalist Poster Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none flex flex-col items-center">
                {/* Main Clean Showcase Frame - Zero Obscuring Overlays */}
                <div 
                  className="relative w-full rounded-2xl overflow-hidden border border-[#252B36] bg-[#0A0E17] shadow-2xl group aspect-[3/4] flex items-center justify-center p-3 sm:p-4 select-none cursor-pointer"
                  onMouseEnter={() => setIsCarouselHovered(true)}
                  onMouseLeave={() => setIsCarouselHovered(false)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onClick={() => openProjectModal(activePostersList[currentPosterIndex])}
                >
                  {/* Rotating Complete Poster with Smooth Crossfade & object-contain */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {activePostersList.map((poster, index) => {
                      const isActive = index === currentPosterIndex;
                      return (
                        <div
                          key={poster.id || index}
                          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                            isActive
                              ? 'opacity-100 z-10 pointer-events-auto'
                              : 'opacity-0 z-0 pointer-events-none'
                          }`}
                        >
                          <img
                            src={poster.previewImage}
                            alt={poster.title}
                            className="w-full h-full object-contain rounded-lg drop-shadow-2xl"
                            loading={index <= 1 ? 'eager' : 'lazy'}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Previous Arrow Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevPoster();
                    }}
                    aria-label="Previous poster"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#080B12]/80 hover:bg-[#078BFF] text-[#F5F5F2] hover:text-white border border-[#252B36] flex items-center justify-center backdrop-blur-md transition-all duration-200 opacity-60 group-hover:opacity-100 hover:scale-110 shadow-xl cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Next Arrow Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextPoster();
                    }}
                    aria-label="Next poster"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#080B12]/80 hover:bg-[#078BFF] text-[#F5F5F2] hover:text-white border border-[#252B36] flex items-center justify-center backdrop-blur-md transition-all duration-200 opacity-60 group-hover:opacity-100 hover:scale-110 shadow-xl cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Compact Caption & Indicators BELOW Poster (Outside Artwork Area) */}
                {activePostersList[currentPosterIndex] && (
                  <div className="w-full pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
                    {/* Compact Project Caption: Title & Category */}
                    <div 
                      onClick={() => openProjectModal(activePostersList[currentPosterIndex])}
                      className="text-center sm:text-left cursor-pointer group flex-1 min-w-0"
                    >
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#078BFF]">
                          {activePostersList[currentPosterIndex].category}
                        </span>
                        <span className="text-[10px] text-[#A5AAB5] font-mono">
                          {currentPosterIndex + 1} / {activePostersList.length}
                        </span>
                        {isCarouselHovered && (
                          <span className="text-[9px] font-mono uppercase text-amber-400 font-semibold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                            Paused
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-heading font-medium text-[#F5F5F2] group-hover:text-[#078BFF] transition-colors truncate mt-0.5">
                        {activePostersList[currentPosterIndex].title}
                      </h4>
                    </div>

                    {/* Pagination Indicators Placed Neatly Below Poster */}
                    <div className="flex items-center gap-1.5 shrink-0 py-1">
                      {activePostersList.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectPoster(idx)}
                          aria-label={`Go to poster ${idx + 1}`}
                          className={`transition-all duration-300 rounded-full cursor-pointer ${
                            idx === currentPosterIndex
                              ? 'w-5 h-1.5 bg-[#078BFF] shadow-[0_0_8px_#078BFF]'
                              : 'w-1.5 h-1.5 bg-[#A5AAB5]/30 hover:bg-[#A5AAB5]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STUDIO STATEMENT ===================== */}
      <section className="border-y border-[#252B36] bg-[#0A0E17] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#078BFF]">
                Studio Positioning
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#F5F5F2] mt-2">
                CREATE BEYOND LIMITS.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-4">
              <p className="text-lg sm:text-xl text-[#F5F5F2] font-light leading-relaxed">
                JAIXO STUDIO is an independent creative studio dedicated to crafting distinguished visual identities, high-conversion marketing graphics, and custom digital flagships.
              </p>
              <p className="text-sm text-[#A5AAB5] leading-relaxed">
                We believe exceptional design is not superficial decoration—it is strategic clarity. Whether crafting high-impact commercial campaigns, institutional and technical event posters, social advocacy graphics, or bespoke digital experiences, we apply rigorous typographic hierarchy and precision design to make your brand impossible to ignore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SERVICES OVERVIEW ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#252B36]">
          <div>
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#078BFF]">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#F5F5F2] mt-2">
              Our Core Creative Disciplines
            </h2>
          </div>
          <button
            onClick={() => {
              setActivePage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#078BFF] hover:text-white transition-colors cursor-pointer"
          >
            <span>View Full Services & Deliverables</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Editorial Asymmetric Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative p-8 rounded-2xl bg-[#0F131D] border border-[#252B36] hover:border-[#078BFF]/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Top Service Number & Icon */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-heading font-bold text-[#252B36] group-hover:text-[#078BFF] transition-colors">
                    0{index + 1}
                  </span>
                  <div className="p-2.5 rounded-xl bg-[#10141D] border border-[#252B36] group-hover:border-[#078BFF]/40 transition-colors">
                    {getServiceIcon(service.category)}
                  </div>
                </div>

                <h3 className="text-xl font-heading font-bold text-[#F5F5F2] group-hover:text-white transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-[#A5AAB5] leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                {/* Key Deliverables Highlights */}
                <div className="pt-2 space-y-1.5 border-t border-[#252B36]/60">
                  {service.included.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-[#A5AAB5]">
                      <span className="w-1 h-1 rounded-full bg-[#078BFF]" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Price & Quick CTA */}
              <div className="pt-6 mt-6 border-t border-[#252B36] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A5AAB5] block font-heading">
                    Investment
                  </span>
                  <span className="text-xs font-bold text-[#078BFF]">
                    {service.startingPriceINR}
                  </span>
                </div>

                <button
                  onClick={() => openQuickEnquiry(service.title)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#10141D] hover:bg-[#078BFF] text-[#F5F5F2] hover:text-white text-xs font-medium tracking-wide transition-colors border border-[#252B36] hover:border-[#078BFF] cursor-pointer"
                >
                  Enquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FEATURED PROJECTS ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#252B36]">
          <div>
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#078BFF]">
              Selected Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#F5F5F2] mt-2">
              Featured Studio Projects
            </h2>
          </div>
          <button
            onClick={() => {
              setActivePage('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#078BFF] hover:text-white transition-colors cursor-pointer"
          >
            <span>View All Projects in Archive</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-10">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => openProjectModal(project)}
              className="group cursor-pointer rounded-2xl bg-[#0F131D] border border-[#252B36] hover:border-[#078BFF]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div className="relative overflow-hidden bg-[#080B12] aspect-[3/4] flex items-center justify-center p-3">
                <img
                  src={project.previewImage}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-transparent to-transparent opacity-40 group-hover:opacity-75 transition-opacity" />
                
                {/* Category & Year Tag */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#080B12]/90 backdrop-blur-md border border-[#252B36] text-[10px] font-heading font-semibold text-[#078BFF] uppercase tracking-wider line-clamp-1 max-w-[200px]">
                    {project.category}
                  </span>
                  {project.year && (
                    <span className="px-2 py-0.5 rounded bg-[#10141D]/90 border border-[#252B36] text-[10px] text-[#A5AAB5] font-mono">
                      {project.year}
                    </span>
                  )}
                </div>

                {/* Hover Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#078BFF] text-white text-xs font-semibold uppercase tracking-wider shadow-lg">
                    <Eye className="w-4 h-4" />
                    <span>View Project</span>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between bg-[#0F131D]">
                <div className="space-y-1.5">
                  {project.client && (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#A5AAB5] line-clamp-1">
                      <Building2 className="w-3.5 h-3.5 text-[#078BFF] shrink-0" />
                      <span>{project.client}</span>
                    </div>
                  )}
                  <h3 className="text-base font-heading font-bold text-[#F5F5F2] group-hover:text-white transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  {project.designType && (
                    <div className="flex items-center gap-1.5 text-[10px] text-[#078BFF] font-medium">
                      <Layers className="w-3 h-3 shrink-0" />
                      <span className="line-clamp-1">{project.designType}</span>
                    </div>
                  )}
                  <p className="text-xs text-[#A5AAB5] leading-relaxed line-clamp-2 pt-0.5">
                    {project.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#252B36]/60 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.toolsUsed.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded bg-[#10141D] border border-[#252B36] text-[10px] text-[#A5AAB5]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] text-[#078BFF] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== WHY CHOOSE JAIXO STUDIO ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[#0F131D] border border-[#252B36] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#078BFF]/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-2xl space-y-4 mb-12">
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#078BFF]">
              The Studio Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#F5F5F2]">
              Why Work With JAIXO STUDIO?
            </h2>
            <p className="text-sm text-[#A5AAB5] leading-relaxed">
              We operate as a focused creative partner, combining the strategic sophistication of high-end design houses with agile execution and transparent collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3 p-5 rounded-2xl bg-[#10141D] border border-[#252B36]">
              <div className="w-10 h-10 rounded-xl bg-[#078BFF]/10 border border-[#078BFF]/30 flex items-center justify-center text-[#078BFF]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-bold text-[#F5F5F2]">
                100% Bespoke Craft
              </h3>
              <p className="text-xs text-[#A5AAB5] leading-relaxed">
                Zero generic AI templates or copied themes. Every layout is intentionally constructed around your brand narrative.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#10141D] border border-[#252B36]">
              <div className="w-10 h-10 rounded-xl bg-[#078BFF]/10 border border-[#078BFF]/30 flex items-center justify-center text-[#078BFF]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-bold text-[#F5F5F2]">
                Turnaround Discipline
              </h3>
              <p className="text-xs text-[#A5AAB5] leading-relaxed">
                Strict milestones and delivery schedules. Urgent collateral delivered within 24 to 48 hours without compromising quality.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#10141D] border border-[#252B36]">
              <div className="w-10 h-10 rounded-xl bg-[#078BFF]/10 border border-[#078BFF]/30 flex items-center justify-center text-[#078BFF]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-bold text-[#F5F5F2]">
                Direct Collaboration
              </h3>
              <p className="text-xs text-[#A5AAB5] leading-relaxed">
                No middle managers or agency bureaucracy. Work directly with the designer and developer responsible for your output.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#10141D] border border-[#252B36]">
              <div className="w-10 h-10 rounded-xl bg-[#078BFF]/10 border border-[#078BFF]/30 flex items-center justify-center text-[#078BFF]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-bold text-[#F5F5F2]">
                Production-Ready Files
              </h3>
              <p className="text-xs text-[#A5AAB5] leading-relaxed">
                Clean source code, vector PDFs with bleed marks, and fully editable Word/Figma files ready for seamless execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CLIENT ENQUIRY BANNER ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#10141D] to-[#080B12] border border-[#252B36] text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#078BFF]">
              Transform Your Vision
            </span>

            <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#F5F5F2] leading-tight">
              Ready to Make Your Brand Stand Out?
            </h2>

            <p className="text-sm sm:text-base text-[#A5AAB5] font-light leading-relaxed">
              Whether you need a single executive resume, an advertising campaign suite, or a complete digital website flagship, we are ready to build.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => openQuickEnquiry()}
                className="px-8 py-3.5 rounded-xl bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-xl shadow-[#078BFF]/25 cursor-pointer"
              >
                Start Your Project Today
              </button>

              <button
                onClick={() => {
                  setActivePage('pricing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-xl bg-[#10141D] hover:bg-[#161C28] border border-[#252B36] text-[#F5F5F2] text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Review Pricing Packages
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
