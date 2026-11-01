import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Plus, 
  Sparkles, 
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';
import { defaultPricingNote } from '../data/pricingData';

export const PricingPage: React.FC = () => {
  const { pricingData, openQuickEnquiry, siteConfig } = useStudioData();
  const [activeServiceId, setActiveServiceId] = useState<string>(pricingData[0]?.id || 'prc-web');

  const activeCategory = pricingData.find((p) => p.id === activeServiceId) || pricingData[0];
  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="pt-32 sm:pt-40 pb-24 space-y-20">
      {/* Top Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10141D] border border-[#252B36] text-xs font-heading font-medium tracking-[0.2em] text-[#078BFF] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#078BFF]" />
            <span>Transparent Agency Pricing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#F5F5F2] tracking-tight">
            Clear, Upfront Rates in Indian Rupees (₹).
          </h1>

          <p className="text-base sm:text-lg text-[#A5AAB5] font-light leading-relaxed">
            We believe in complete pricing transparency before you initiate contact. Explore our package deliverables, revision policies, and turnaround timelines by discipline below.
          </p>
        </div>

        {/* Mandatory Prompt Pricing Note */}
        <div className="mt-8 p-5 rounded-2xl bg-[#10141D] border-l-4 border-l-[#078BFF] border-y border-r border-[#252B36] flex items-start gap-3.5 max-w-3xl">
          <AlertCircle className="w-5 h-5 text-[#078BFF] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-[#F5F5F2]">
              Pricing Policy & Guidelines
            </h4>
            <p className="text-xs text-[#A5AAB5] leading-relaxed">
              "{defaultPricingNote}" All prices listed are configurable baseline markers. Final contracts are tailored to exact project scope.
            </p>
          </div>
        </div>

        {/* Service Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-8 mt-4 border-t border-[#252B36] no-scrollbar">
          {pricingData.map((category) => {
            const isSelected = category.id === activeServiceId;
            return (
              <button
                key={category.id}
                onClick={() => setActiveServiceId(category.id)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#078BFF] text-white shadow-lg shadow-[#078BFF]/25 font-semibold'
                    : 'bg-[#10141D] text-[#A5AAB5] border border-[#252B36] hover:text-white hover:border-[#A5AAB5]/40'
                }`}
              >
                <span>{category.serviceTitle}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Pricing Category Display */}
      {activeCategory && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Active Category Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#252B36]">
            <div>
              <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#078BFF]">
                Service Breakdown
              </span>
              <h2 className="text-3xl font-heading font-bold text-[#F5F5F2] mt-1">
                {activeCategory.serviceTitle}
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-[#A5AAB5] block">Baseline Starting Rate</span>
              <span className="text-xl font-bold font-heading text-[#078BFF]">
                {activeCategory.startingPrice}
              </span>
            </div>
          </div>

          {/* Pricing Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeCategory.packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  pkg.isFeatured
                    ? 'bg-[#10141D] border-2 border-[#078BFF] shadow-2xl shadow-[#078BFF]/15 relative'
                    : 'bg-[#0F131D] border border-[#252B36] hover:border-[#252B36]/80'
                }`}
              >
                {pkg.isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#078BFF] text-white text-[10px] font-heading font-bold uppercase tracking-wider">
                    Recommended Tier
                  </div>
                )}

                <div className="space-y-6">
                  {/* Tier Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-heading font-bold text-[#F5F5F2]">
                      {pkg.tierName}
                    </h3>
                    <p className="text-xs text-[#A5AAB5] leading-relaxed mt-1">
                      {pkg.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="py-2 border-y border-[#252B36]">
                    <span className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                      {pkg.price}
                    </span>
                    <span className="text-[11px] text-[#A5AAB5] block mt-1">
                      Inclusive of base deliverables & rounds
                    </span>
                  </div>

                  {/* Operational Timeline & Revisions */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-[#A5AAB5]">
                      <Clock className="w-4 h-4 text-[#078BFF]" />
                      <span>Timeline: <strong className="text-white">{pkg.timeline}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-[#A5AAB5]">
                      <RotateCcw className="w-4 h-4 text-[#078BFF]" />
                      <span>Revisions: <strong className="text-white">{pkg.revisions}</strong></span>
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#F5F5F2] block">
                      Included Deliverables:
                    </span>
                    {pkg.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#A5AAB5]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#078BFF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-8 mt-6 border-t border-[#252B36]">
                  <button
                    onClick={() =>
                      openQuickEnquiry(`${activeCategory.serviceTitle} — ${pkg.tierName} (${pkg.price})`)
                    }
                    className={`w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      pkg.isFeatured
                        ? 'bg-[#078BFF] hover:bg-[#0077e6] text-white shadow-lg shadow-[#078BFF]/25'
                        : 'bg-[#10141D] hover:bg-[#252B36] text-[#F5F5F2] border border-[#252B36]'
                    }`}
                  >
                    {pkg.ctaText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Charges / Add-on Options */}
          {activeCategory.additionalCharges && activeCategory.additionalCharges.length > 0 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0F131D] border border-[#252B36] space-y-4">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#078BFF]" />
                <h4 className="text-sm font-heading font-bold text-[#F5F5F2] uppercase tracking-wider">
                  Additional Add-ons & Surcharges for {activeCategory.serviceTitle}
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {activeCategory.additionalCharges.map((addon, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-4 rounded-xl bg-[#10141D] border border-[#252B36] flex items-center justify-between"
                  >
                    <span className="text-xs text-[#A5AAB5]">{addon.title}</span>
                    <span className="text-xs font-bold text-[#078BFF]">{addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Full Cross-Service Summary Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0F131D] border border-[#252B36] space-y-6">
          <div>
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#078BFF]">
              Comprehensive Matrix
            </span>
            <h3 className="text-2xl font-heading font-bold text-[#F5F5F2] mt-1">
              All Studio Services Starting Reference Table
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#252B36] text-[#A5AAB5] font-heading uppercase tracking-wider">
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Baseline Price (INR)</th>
                  <th className="py-3 px-4">Standard Delivery</th>
                  <th className="py-3 px-4">Revision Policy</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252B36]/60 text-[#A5AAB5]">
                {pricingData.map((item) => (
                  <tr key={item.id} className="hover:bg-[#10141D]/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#F5F5F2]">
                      {item.serviceTitle}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#078BFF]">
                      {item.startingPrice}
                    </td>
                    <td className="py-3.5 px-4">
                      {item.packages[0]?.timeline || '1 – 3 Days'}
                    </td>
                    <td className="py-3.5 px-4">
                      {item.packages[0]?.revisions || '2 Rounds'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openQuickEnquiry(item.serviceTitle)}
                        className="px-3 py-1.5 rounded-lg bg-[#10141D] hover:bg-[#078BFF] text-[#F5F5F2] hover:text-white border border-[#252B36] text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        Enquire
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Custom Requirement Bottom CTA (Mandatory requirement from prompt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#10141D] to-[#080B12] border border-[#252B36] flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#078BFF]">
              Tailored Quotes
            </span>
            <h3 className="text-2xl sm:text-4xl font-heading font-black text-[#F5F5F2]">
              Have a Custom Requirement? Let's Discuss.
            </h3>
            <p className="text-xs sm:text-sm text-[#A5AAB5] leading-relaxed font-light">
              Do you have a non-standard project scope, multi-phase roadmap, or bulk asset requirements? We draft bespoke, itemized proposals within 24 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <button
              onClick={() => openQuickEnquiry('Custom Requirement Discussion')}
              className="px-7 py-3.5 rounded-xl bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xl shadow-[#078BFF]/25 cursor-pointer"
            >
              Request Custom Quotation
            </button>

            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                'Hello JAIXO STUDIO, I have a custom requirement and would like to request an itemized quotation.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#10141D] hover:bg-[#252B36] border border-[#252B36] text-[#F5F5F2] hover:text-[#078BFF] text-xs font-medium uppercase tracking-wider transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#078BFF]" />
              <span>Instant WhatsApp Discussion</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
