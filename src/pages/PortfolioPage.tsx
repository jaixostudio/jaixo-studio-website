import React, { useState } from 'react';
import { 
  Eye, 
  Filter, 
  Sparkles,
  Info,
  Layers,
  Building2,
  ArrowRight
} from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';
import type { ProjectCategory } from '../types';

export const PortfolioPage: React.FC = () => {
  const { projects, openProjectModal, openQuickEnquiry } = useStudioData();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All Projects');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ProjectCategory[] = [
    'All Projects',
    'Event & Promotional Posters',
    'Commercial Advertisements',
    'Awareness & Social Campaigns',
    'Festival & Celebration Designs',
    'College & Technical Event Designs',
    'Organisational & Corporate Designs',
    'Calendars & Event Collages',
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === 'All Projects' || p.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.designType && p.designType.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-10 sm:pt-14 pb-20 space-y-12">
      {/* Top Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10141D] border border-[#252B36] text-xs font-heading font-medium tracking-[0.2em] text-[#078BFF] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#078BFF]" />
            <span>Genuine Studio Portfolio • {projects.length} Verified Works</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#F5F5F2] tracking-tight">
            Original Graphic Design & Visual Identity Archive.
          </h1>

          <p className="text-base sm:text-lg text-[#A5AAB5] font-light leading-relaxed">
            A comprehensive catalog of actual commissioned posters, commercial brand campaigns, festival creatives, social advocacy artwork, and institutional collateral designed by JAIXO STUDIO.
          </p>
        </div>

        {/* Authenticity Notice */}
        <div className="mt-8 p-4 rounded-xl bg-[#10141D] border border-[#252B36] flex items-start gap-3 max-w-2xl text-xs text-[#A5AAB5]">
          <Info className="w-4 h-4 text-[#078BFF] shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#F5F5F2]">100% Genuine Portfolio:</strong> Every project shown here is extracted directly from our design archives, preserving original typography, layouts, clients, and creative execution.
          </span>
        </div>

        {/* Search & Category Filter Navigation Bar */}
        <div className="pt-8 mt-6 border-t border-[#252B36] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#A5AAB5]">
              <Filter className="w-4 h-4 text-[#078BFF]" />
              <span className="font-heading uppercase tracking-wider font-semibold">Filter by Category:</span>
            </div>

            {/* Quick search */}
            <div className="w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client, title, event..."
                className="w-full px-3.5 py-1.5 rounded-xl bg-[#10141D] border border-[#252B36] text-xs text-white placeholder-[#A5AAB5]/50 focus:border-[#078BFF] focus:outline-none"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === 'All Projects'
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#078BFF] text-white shadow-lg shadow-[#078BFF]/25 font-semibold'
                      : 'bg-[#10141D] text-[#A5AAB5] border border-[#252B36] hover:text-white hover:border-[#A5AAB5]/40'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#080B12] text-[#A5AAB5]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center space-y-4 rounded-2xl bg-[#0F131D] border border-[#252B36]">
            <p className="text-[#A5AAB5] text-sm">
              No projects found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All Projects');
              }}
              className="px-5 py-2 rounded-lg bg-[#078BFF] text-white text-xs font-semibold uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => openProjectModal(project)}
                className="group cursor-pointer rounded-2xl bg-[#0F131D] border border-[#252B36] hover:border-[#078BFF]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Artwork Media Container with Clean Framing */}
                <div className="relative overflow-hidden bg-[#080B12] aspect-[3/4] flex items-center justify-center p-3">
                  <img
                    src={project.previewImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02] drop-shadow-xl"
                  />

                  {/* Top Category Badge */}
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

                  {/* Hover Eye Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#078BFF] text-white text-xs font-semibold uppercase tracking-wider shadow-lg">
                      <Eye className="w-4 h-4" />
                      <span>View Full Artwork</span>
                    </div>
                  </div>
                </div>

                {/* Content Container */}
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

                  {/* Tools Badges */}
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
        )}
      </section>

      {/* Commission Similar Project Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F131D] via-[#10141D] to-[#0F131D] border border-[#252B36] text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#F5F5F2]">
            Need Custom Graphic Design Like These?
          </h3>
          <p className="text-xs sm:text-sm text-[#A5AAB5] max-w-xl mx-auto leading-relaxed">
            Whether you need event promotional posters, commercial product ads, institutional branding, or social campaign graphics, we craft original high-resolution design collateral tailored to your brand.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openQuickEnquiry('Commission Custom Design Project')}
              className="px-7 py-3 rounded-xl bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-[#078BFF]/25"
            >
              Start Your Design Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
