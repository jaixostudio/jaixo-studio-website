import React from 'react';
import { 
  Sparkles, 
  Target, 
  CheckCircle, 
  Layers, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

interface AboutPageProps {
  setActivePage: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActivePage }) => {
  const { siteConfig, openQuickEnquiry } = useStudioData();

  const studioSteps = [
    {
      number: '01',
      title: "Understanding the Client's Requirements",
      tagline: 'Deep Discovery & Strategic Briefing',
      description:
        'Every impactful design starts with attentive listening. We dive deep into your brand identity, target demographic, industry landscape, and core project objectives before laying a single pixel or sketch.',
      deliverables: ['Creative Brief Alignment', 'Audience & Competitor Scan', 'Deliverable Scope Confirmation'],
    },
    {
      number: '02',
      title: 'Developing Creative Concepts',
      tagline: 'Exploration, Layout Architecture & Typography',
      description:
        'We explore moodboards, typographic pairings, color systems, and layout hierarchies. We develop tailored concepts that bridge strategic business goals with striking aesthetic distinction.',
      deliverables: ['Curated Moodboards', 'Typographic Hierarchy Proofs', 'Initial Design Directions'],
    },
    {
      number: '03',
      title: 'Creating Professional Designs',
      tagline: 'Precision Execution & Craftsmanship',
      description:
        'With the concept chosen, we execute with meticulous attention to detail. Whether coding a responsive web application in modern React or engineering vector print files with exact bleeds, precision is uncompromising.',
      deliverables: ['Pixel-Perfect UI/UX Design', '300 DPI Print-Ready Layouts', 'Responsive Mobile Testing'],
    },
    {
      number: '04',
      title: 'Delivering Polished Final Outputs',
      tagline: 'Quality Control, Handover & Launch',
      description:
        'The final output is inspected for contrast, formatting, responsiveness, and file cleanliness. We deliver complete production-ready source files, deploy live applications, and provide ongoing guidance.',
      deliverables: ['Production Master Files (AI/PSD/Word)', 'Deployed High-Speed Websites', 'Revision & Handover Support'],
    },
  ];

  const coreValues = [
    {
      icon: <Target className="w-5 h-5 text-[#078BFF]" />,
      title: 'Intentional Clarity',
      description:
        'We believe design should solve problems, not introduce clutter. Every typographic choice, margin, and color accent serves a clear communication purpose.',
    },
    {
      icon: <Layers className="w-5 h-5 text-[#078BFF]" />,
      title: 'Craft Over Cliché',
      description:
        'We deliberately avoid generic AI trends, hyper-saturated purple gradients, and over-used templates. We create bespoke, timeless design work tailored to each client.',
    },
    {
      icon: <Clock className="w-5 h-5 text-[#078BFF]" />,
      title: 'Turnaround Discipline',
      description:
        'Time is a critical asset for modern businesses. We establish firm milestones and respect deadlines, delivering high-urgency collateral in as little as 24 hours.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#078BFF]" />,
      title: 'Honest Transparency',
      description:
        'No hidden costs, no exaggerated claims, and no opaque communication. We publish our rates, communicate directly, and treat every project with authentic care.',
    },
  ];

  return (
    <div className="pt-10 sm:pt-14 pb-20 space-y-16 sm:space-y-20">
      {/* Top Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10141D] border border-[#252B36] text-xs font-heading font-medium tracking-[0.2em] text-[#078BFF] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#078BFF]" />
              <span>Studio Philosophy • {siteConfig.tagline}</span>
            </div>

            {/* Exact Requested Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-[#F5F5F2] tracking-tight leading-[1.08]">
              Creativity Meets Purpose.
            </h1>

            <p className="text-base sm:text-xl text-[#A5AAB5] font-light leading-relaxed max-w-2xl">
              {siteConfig.brandName} is a modern independent creative design studio providing professional digital design and web development services to individuals, businesses, startups, and organisations.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => openQuickEnquiry('General About Us Enquiry')}
                className="px-7 py-3 rounded-xl bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg shadow-[#078BFF]/25 cursor-pointer"
              >
                Work With Our Studio
              </button>
              <button
                onClick={() => {
                  setActivePage('portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3 rounded-xl bg-[#10141D] hover:bg-[#252B36] border border-[#252B36] text-[#F5F5F2] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Explore Selected Works
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="p-8 rounded-3xl bg-[#0F131D] border border-[#252B36] space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#10141D] border border-[#078BFF]/40 flex items-center justify-center font-heading font-black text-2xl text-white">
                J<span className="text-[#078BFF]">X</span>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#078BFF] block">
                  Studio Creed
                </span>
                <p className="text-lg font-heading font-bold text-white">
                  "CREATE BEYOND LIMITS."
                </p>
                <p className="text-xs text-[#A5AAB5] leading-relaxed">
                  We exist to eliminate the gap between ambition and visual execution. We elevate every touchpoint into an enduring impression.
                </p>
              </div>
              <div className="pt-4 border-t border-[#252B36] text-xs text-[#A5AAB5] space-y-1">
                <div>Operating: <strong className="text-white">Global Remote Studio</strong></div>
                <div>Origin: <strong className="text-white">India</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4-Step Approach (Mandatory Prompt Requirement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#078BFF]">
            Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#F5F5F2]">
            Our 4-Step Creative Process
          </h2>
          <p className="text-xs sm:text-sm text-[#A5AAB5]">
            How we take your raw concepts and transform them into disciplined, polished digital & print assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {studioSteps.map((step) => (
            <div
              key={step.number}
              className="p-8 sm:p-10 rounded-2xl bg-[#0F131D] border border-[#252B36] hover:border-[#078BFF]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-heading font-black text-[#078BFF]">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-heading uppercase tracking-wider text-[#A5AAB5] px-2.5 py-1 rounded bg-[#10141D] border border-[#252B36]">
                    Phase {step.number}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#F5F5F2]">
                  {step.title}
                </h3>

                <p className="text-xs font-heading font-semibold uppercase tracking-wider text-[#078BFF]">
                  {step.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[#A5AAB5] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#252B36] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#A5AAB5] block font-heading">
                  Milestone Deliverables:
                </span>
                {step.deliverables.map((d, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-xs text-[#A5AAB5]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#078BFF]" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values & Quality Commitment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#0F131D] border border-[#252B36] space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#078BFF]">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#F5F5F2]">
              Our Studio Values & Quality Commitment
            </h2>
            <p className="text-xs sm:text-sm text-[#A5AAB5]">
              Every project is managed with direct ownership, authentic craftsmanship, and zero artificial bloat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#10141D] border border-[#252B36] space-y-3">
                <div className="p-2.5 rounded-xl bg-[#080B12] border border-[#252B36] w-fit">
                  {val.icon}
                </div>
                <h4 className="text-base font-heading font-bold text-[#F5F5F2]">
                  {val.title}
                </h4>
                <p className="text-xs text-[#A5AAB5] leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h3 className="text-2xl font-heading font-bold text-[#F5F5F2]">
            Ready to Begin Your Creative Journey?
          </h3>
          <p className="text-xs sm:text-sm text-[#A5AAB5]">
            Contact our studio directly or submit a project brief. We look forward to creating beyond limits with you.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-xl bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-[#078BFF]/25"
            >
              Get in Touch with Studio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
