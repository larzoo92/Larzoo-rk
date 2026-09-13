import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award } from 'lucide-react';

export const TrustMetrics: React.FC = () => {
  const certifications = [
    { title: "Sellers Pre-Vetted", number: "12,800+", detail: "Trade license & GST verification required prior to bidding." },
    { title: "Compliance Score", number: "99.8%", detail: "National agricultural and industrial grading checks passed." },
    { title: "On-Time Fulfillment", number: "99.6%", detail: "SLA logistics commitment across multi-state shipping routes." },
    { title: "Total Volume Handled", number: "₹8.5 Cr+", detail: "Monthly Gross Merchandise Volume generated safely." },
  ];

  return (
    <section className="py-20 bg-transparent border-b border-white/5 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF]/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2 relative group overflow-hidden backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#00D4FF]/5 rounded-full blur-xl group-hover:bg-[#00D4FF]/10 transition-colors" />
              <div className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">{item.number}</div>
              <div className="text-xs font-bold text-[#00D4FF] tracking-wide uppercase font-mono">{item.title}</div>
              <p className="text-[11px] text-slate-450 leading-relaxed pt-1">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Brand partners & testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8 border-t border-white/5">
          
          {/* Partners showcase */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-sans font-bold text-white tracking-wide">Trusted by Industry Authorities</h3>
              <p className="text-xs text-slate-350 pt-1">Grand hotel networks, student chains, catering houses, and localized transport partners leverage the Larzoo API ecosystem.</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Taj Hotels Vista", role: "Hospitality Chain" },
                { name: "Radisson Banquets", role: "Wedding Venues" },
                { name: "Stanza Living PG", role: "Co-Living Hubs" },
                { name: "ITC Kitchens Delhi", role: "HORECA Retail" },
                { name: "AgriCoop Karnataka", role: "Trade Farmers" },
                { name: "GMR Cargo Aviation", role: "Primary Freight" },
              ].map((p, i) => (
                <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl text-center space-y-0.5 backdrop-blur-md hover:border-[#00D4FF]/30 transition-all">
                  <div className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">verified client</div>
                  <div className="text-xs font-bold text-slate-350 truncate text-slate-300">{p.name}</div>
                  <div className="text-[9px] text-[#00D4FF] font-medium">{p.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sourcing credentials & security protocols */}
          <div className="bg-[#0F172A]/40 p-8 rounded-2xl border border-white/10 space-y-6 backdrop-blur-xl">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-white/5 text-[#00D4FF] border border-white/10 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Advanced Trade Insurance Pool</h4>
                <p className="text-xs text-slate-350 leading-relaxed">
                  Larzoo collateralizes bulk business transactions. If a contracted supplier violates quality parameters, our standard insurance pool instantly funds replacement shipment dispatches or refunds your balance within 2 hours.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-white/5 text-[#00D4FF] border border-white/10 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">ISO 9001:2020 Quality Framework</h4>
                <p className="text-xs text-[#00D4FF] leading-relaxed">
                  Every product segment handled by Larzoo shippers meets standardized inspection metrics, protecting hotels and wedding halls from inventory deviations.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
