import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  MessageCircle, 
  Code, 
  Palette, 
  Layout, 
  FileText, 
  Award, 
  Share2 
} from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

interface ServicesPageProps {
  setActivePage?: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = () => {
  const { services, openQuickEnquiry, siteConfig } = useStudioData();
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || 'srv-web-dev');

  const activeService = services.find((s) => s.id === selectedServiceId) || services[0];

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
        return <Share2 className="w-5 h-5 text-[#078BFF]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#078BFF]" />;
    }
  };

  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="pt-10 sm:pt-14 pb-20 space-y-16 sm:space-y-20">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#078BFF]">
            Studio Capabilities
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#F5F5F2] tracking-tight">
            Design & Development Services Crafted Without Compromise.
          </h1>
          <p className="text-base sm:text-lg text-[#A5AAB5] font-light leading-relaxed">
            From strategic digital web flagships to print collateral, wedding suites, and conversion-optimized ad campaigns. Explore our six dedicated core disciplines below.
          </p>
        </div>

        {/* Quick Nav Filter Tabs */}
        <div className="flex flex-wrap gap-2.5 pt-8 mt-4 border-t border-[#252B36]">
          {services.map((service) => {
            const isSelected = service.id === selectedServiceId;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#078BFF] text-white shadow-lg shadow-[#078BFF]/25 font-semibold'
                    : 'bg-[#10141D] text-[#A5AAB5] border border-[#252B36] hover:text-white hover:border-[#A5AAB5]/40'
                }`}
              >
                {getServiceIcon(service.category)}
                <span>{service.title}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Service Spotlight Section */}
      {activeService && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0F131D] border border-[#252B36] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Details Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#10141D] border border-[#078BFF]/40 text-[#078BFF] text-xs font-semibold uppercase tracking-wider font-heading">
                    {activeService.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#A5AAB5]">
                    <Clock className="w-3.5 h-3.5 text-[#078BFF]" />
                    <span>Turnaround: {activeService.turnaround}</span>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#F5F5F2]">
                  {activeService.title}
                </h2>

                <p className="text-sm sm:text-base text-[#078BFF] font-medium leading-relaxed">
                  {activeService.tagline}
                </p>

                <p className="text-sm text-[#A5AAB5] leading-relaxed">
                  {activeService.description}
                </p>

                {/* What is Included Checklist */}
                <div className="pt-4 space-y-3">
                  <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-[#F5F5F2]">
                    What is Included:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeService.included.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#A5AAB5]">
                        <CheckCircle2 className="w-4 h-4 text-[#078BFF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-4 space-y-3 border-t border-[#252B36]">
                  <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-[#F5F5F2]">
                    Deliverables:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeService.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#A5AAB5]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#078BFF] shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-6 border-t border-[#252B36] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A5AAB5] block font-heading">
                      Standard Investment
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-heading text-[#078BFF]">
                      {activeService.startingPriceINR}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openQuickEnquiry(activeService.title)}
                      className="px-6 py-3 rounded-xl bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg shadow-[#078BFF]/25 cursor-pointer"
                    >
                      Order Now / Enquire
                    </button>

                    <a
                      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                        `Hello JAIXO STUDIO, I would like to order or enquire about your service: ${activeService.title} (${activeService.startingPriceINR}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-[#10141D] hover:bg-[#252B36] border border-[#252B36] text-[#078BFF] transition-colors"
                      title="Direct WhatsApp chat"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Mockup Preview Column */}
              <div className="lg:col-span-5 relative">
                <div className="rounded-2xl overflow-hidden border border-[#252B36] bg-[#080B12] shadow-2xl relative group">
                  <img
                    src={activeService.previewImage}
                    alt={activeService.title}
                    className="w-full h-80 sm:h-96 lg:h-[450px] object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#080B12]/80 backdrop-blur-md border border-[#252B36] text-[11px] text-[#A5AAB5]">
                    Studio Specimen Mockup • {activeService.category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Package Breakdown Cards For The Active Service */}
      {activeService && activeService.packages && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#078BFF]">
              Structured Tiers
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#F5F5F2] mt-1">
              Package Options for {activeService.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeService.packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-[#10141D] border-2 border-[#078BFF] shadow-2xl shadow-[#078BFF]/10 relative'
                    : 'bg-[#0F131D] border border-[#252B36] hover:border-[#252B36]/80'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#078BFF] text-white text-[10px] font-heading font-bold uppercase tracking-wider">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-4">
                  <h4 className="text-lg font-heading font-bold text-[#F5F5F2]">
                    {pkg.name}
                  </h4>
                  <p className="text-xs text-[#A5AAB5] leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-2xl font-bold font-heading text-white">
                      {pkg.priceINR}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-[#252B36] space-y-2 text-xs text-[#A5AAB5]">
                    <div className="flex items-center justify-between">
                      <span>Timeline:</span>
                      <strong className="text-white">{pkg.timeline}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Revisions:</span>
                      <strong className="text-white">{pkg.revisions}</strong>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#252B36] space-y-2">
                    <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] block">
                      Deliverables:
                    </span>
                    {pkg.deliverables.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2 text-xs text-[#A5AAB5]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#078BFF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => openQuickEnquiry(`${activeService.title} — ${pkg.name}`)}
                    className={`w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      pkg.popular
                        ? 'bg-[#078BFF] hover:bg-[#0077e6] text-white shadow-lg shadow-[#078BFF]/25'
                        : 'bg-[#10141D] hover:bg-[#252B36] text-[#F5F5F2] border border-[#252B36]'
                    }`}
                  >
                    Select {pkg.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Complete All-Services Directory / Alternating Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-[#252B36]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#078BFF]">
            Full Portfolio Of Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#F5F5F2]">
            Comprehensive Discipline Overview
          </h2>
          <p className="text-xs sm:text-sm text-[#A5AAB5]">
            Browse all our service packages, turnaround times, and starting rates in Indian Rupees (₹).
          </p>
        </div>

        <div className="space-y-12">
          {services.map((srv, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={srv.id}
                id={srv.slug}
                className="p-8 sm:p-10 rounded-2xl bg-[#0F131D] border border-[#252B36] hover:border-[#252B36]/80 transition-colors"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Text Column */}
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-heading font-bold text-[#078BFF]">0{index + 1}</span>
                      <span className="text-xs font-heading uppercase tracking-wider text-[#A5AAB5]">• {srv.category}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#F5F5F2]">
                      {srv.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A5AAB5] leading-relaxed">
                      {srv.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {srv.included.slice(0, 4).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#A5AAB5]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#078BFF]" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#252B36]">
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-wider text-[#A5AAB5]">Starting Rate</span>
                        <p className="text-lg font-heading font-bold text-[#078BFF]">{srv.startingPriceINR}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => openQuickEnquiry(srv.title)}
                          className="px-5 py-2.5 rounded-lg bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Order Now
                        </button>
                        <button
                          onClick={() => {
                            setSelectedServiceId(srv.id);
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          className="px-4 py-2.5 rounded-lg bg-[#10141D] hover:bg-[#252B36] border border-[#252B36] text-[#A5AAB5] hover:text-white text-xs transition-colors cursor-pointer"
                        >
                          View Packages
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <div className="rounded-xl overflow-hidden border border-[#252B36] bg-[#080B12]">
                      <img
                        src={srv.previewImage}
                        alt={srv.title}
                        className="w-full h-64 object-cover object-center hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom Requirement Bottom Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#10141D] border border-[#252B36] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Need a Custom Cross-Discipline Package?
            </h3>
            <p className="text-xs sm:text-sm text-[#A5AAB5]">
              We offer bundled solutions for startups, brand launches, and multi-collateral marketing drives.
            </p>
          </div>
          <button
            onClick={() => openQuickEnquiry('Custom Cross-Discipline Project')}
            className="px-7 py-3 rounded-xl bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
          >
            Let's Discuss Requirements
          </button>
        </div>
      </section>
    </div>
  );
};
