import React, { useEffect } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

export const ProjectModal: React.FC = () => {
  const { 
    projects,
    selectedProjectForModal, 
    openProjectModal,
    closeProjectModal, 
    openQuickEnquiry, 
    siteConfig 
  } = useStudioData();

  const currentIndex = selectedProjectForModal
    ? projects.findIndex((p) => p.id === selectedProjectForModal.id)
    : -1;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < projects.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      openProjectModal(projects[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      openProjectModal(projects[currentIndex + 1]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProjectModal();
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) openProjectModal(projects[currentIndex - 1]);
      } else if (e.key === 'ArrowRight') {
        if (currentIndex >= 0 && currentIndex < projects.length - 1) {
          openProjectModal(projects[currentIndex + 1]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeProjectModal, currentIndex, openProjectModal, projects]);

  if (!selectedProjectForModal) return null;

  const project = selectedProjectForModal;
  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello JAIXO STUDIO, I saw your design project "${project.title}" (${project.category}) in your portfolio and would like to commission a similar project.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={closeProjectModal} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-5xl max-h-[94vh] overflow-y-auto bg-[#0F131D] border border-[#252B36] rounded-2xl shadow-2xl z-10 flex flex-col">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0F131D]/98 border-b border-[#252B36] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#10141D] border border-[#078BFF]/40 text-[#078BFF] text-xs font-semibold uppercase tracking-wider font-heading">
              {project.category}
            </span>
            {currentIndex >= 0 && (
              <span className="text-xs text-[#A5AAB5] hidden sm:inline font-mono">
                Design {currentIndex + 1} of {projects.length}
              </span>
            )}
          </div>

          {/* Navigation & Close Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={!hasPrev}
              className={`p-2 rounded-xl border border-[#252B36] transition-colors ${
                hasPrev
                  ? 'bg-[#10141D] text-[#F5F5F2] hover:bg-[#252B36] hover:text-[#078BFF] cursor-pointer'
                  : 'bg-[#080B12] text-[#252B36] cursor-not-allowed'
              }`}
              title="Previous design (Left Arrow)"
              aria-label="Previous design"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              disabled={!hasNext}
              className={`p-2 rounded-xl border border-[#252B36] transition-colors ${
                hasNext
                  ? 'bg-[#10141D] text-[#F5F5F2] hover:bg-[#252B36] hover:text-[#078BFF] cursor-pointer'
                  : 'bg-[#080B12] text-[#252B36] cursor-not-allowed'
              }`}
              title="Next design (Right Arrow)"
              aria-label="Next design"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={closeProjectModal}
              className="p-2 ml-1 rounded-xl bg-[#10141D] hover:bg-[#252B36] text-[#A5AAB5] hover:text-white transition-colors cursor-pointer border border-[#252B36]"
              aria-label="Close modal"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Main Title & Client */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-[#F5F5F2] leading-tight">
              {project.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#A5AAB5]">
              {project.client && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#078BFF]" />
                  <span>
                    Client / Organisation:{' '}
                    <strong className="text-[#F5F5F2] font-medium">{project.client}</strong>
                  </span>
                </div>
              )}

              {project.year && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#078BFF]" />
                  <span>
                    Year: <strong className="text-[#F5F5F2] font-medium">{project.year}</strong>
                  </span>
                </div>
              )}

              {project.designType && (
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#078BFF]" />
                  <span>
                    Design Format:{' '}
                    <strong className="text-[#078BFF] font-medium">{project.designType}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* High-Resolution Artwork Showcase */}
          <div className="relative rounded-2xl overflow-hidden border border-[#252B36] bg-[#080B12] flex items-center justify-center p-2 sm:p-4 group">
            <img
              src={project.fullImage || project.previewImage}
              alt={project.title}
              className="w-auto h-auto max-h-[68vh] max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-300"
            />

            {/* Quick in-image overlay buttons */}
            {hasPrev && (
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#078BFF] text-white backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                aria-label="Previous design"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {hasNext && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#078BFF] text-white backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                aria-label="Next design"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Narrative & Case Study Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-[#078BFF] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Design Overview</span>
                </h3>
                <p className="text-[#A5AAB5] text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.challenge && (
                <div className="p-4 rounded-xl bg-[#10141D] border border-[#252B36] space-y-1.5">
                  <h4 className="text-xs font-heading font-bold text-[#F5F5F2] uppercase tracking-wider">
                    Project Context
                  </h4>
                  <p className="text-xs text-[#A5AAB5] leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}
            </div>

            {/* Right Meta Column */}
            <div className="lg:col-span-5 space-y-4">
              {/* Deliverables Checklist */}
              {project.deliverables && project.deliverables.length > 0 && (
                <div className="p-4 rounded-xl bg-[#10141D] border border-[#252B36] space-y-2.5">
                  <h4 className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#F5F5F2]">
                    Design Deliverables
                  </h4>
                  <ul className="space-y-1.5">
                    {project.deliverables.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-[#A5AAB5]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#078BFF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tools Used */}
              {project.toolsUsed && project.toolsUsed.length > 0 && (
                <div className="p-4 rounded-xl bg-[#10141D] border border-[#252B36] space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-[#078BFF]" />
                    <h4 className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#F5F5F2]">
                      Tools & Software
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.toolsUsed.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded bg-[#080B12] border border-[#252B36] text-[10px] text-[#A5AAB5]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Commission Actions */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={() => {
                    closeProjectModal();
                    openQuickEnquiry(`Project Commission: ${project.title}`);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-[#078BFF]/20"
                >
                  <span>Order Similar Design</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#10141D] hover:bg-[#252B36] border border-[#252B36] text-[#F5F5F2] hover:text-[#078BFF] text-xs font-medium uppercase tracking-wider transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#078BFF]" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
