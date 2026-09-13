import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, Globe, Cpu, Users, Building, GraduationCap, PartyPopper, Utensils } from 'lucide-react';

interface HeroProps {
  onExploreProducts: () => void;
  onOpenSourcing: () => void;
  onSwitchDashboard: (dashboard: 'business' | 'supplier' | 'delivery' | 'admin' | 'none') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProducts,
  onOpenSourcing,
  onSwitchDashboard,
}) => {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 bg-transparent border-b border-white/5">
      {/* Decorative dynamic glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00D4FF]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-[#00A99D]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text branding */}
          <div className="lg:col-span-7 space-y-8">
            {/* Tag / Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00D4FF] text-xs font-semibold tracking-wide backdrop-blur-md"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D4FF]"></span>
              </span>
              India's First Unified Commerce Operating System
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-white leading-tight"
              >
                Anything.<br />
                <span className="bg-gradient-to-r from-[#00D4FF] to-[#00A99D] bg-clip-text text-transparent">
                  Anytime. Anywhere.
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-slate-350 max-w-xl leading-relaxed font-sans font-normal"
              >
                Order products, source bulk raw materials, dispatch custom requisitions, book logistics, and coordinate B2B procurement on one incredibly scalable, intelligent system.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                id="btn-hero-order"
                onClick={onExploreProducts}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#00A99D] rounded-xl font-bold text-slate-950 transition-all overflow-hidden flex items-center gap-2 shadow-[0_4px_20px_rgba(0,212,255,0.3)] hover:shadow-[0_4px_30px_rgba(0,212,255,0.5)] hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span className="relative flex items-center gap-2">
                  Order Premium Sourcing <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-slate-950" />
                </span>
              </button>

              <button 
                id="btn-hero-custom"
                onClick={onOpenSourcing}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-slate-200 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
              >
                Launch Sourcing Engine <Zap className="text-[#00D4FF] w-4 h-4" />
              </button>
            </motion.div>

            {/* Trust & Accreditations */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-white/5"
            >
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00A99D]" />
                  <span>Verified Supplier Network (12,800+)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#00D4FF]" />
                  <span>Pan-India Hyperlocal Chain</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>99.6% Automated SLAs</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick launcher grids showing corporate credibility */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-[1px] rounded-3xl bg-gradient-to-br from-white/15 to-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative"
            >
              <div className="absolute -top-3 -right-3 px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider bg-gradient-to-r from-[#00D4FF] to-[#00A99D] text-slate-950 rounded-lg shadow font-extrabold">
                SaaS Portals
              </div>
              
              <div className="bg-[#0F172A]/70 p-6 sm:p-8 rounded-[23px] space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#00D4FF] font-sans tracking-wide">Larzoo Core Portal Launcher</h3>
                  <p className="text-xs text-slate-400">Bypass manual pipelines. Toggle perspectives instantly to query, fulfill, and monitor logistics.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    id="hero-launch-business"
                    onClick={() => onSwitchDashboard('business')}
                    className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 hover:border-[#00A99D]/40 text-left transition-all group cursor-pointer"
                  >
                    <Building className="w-5 h-5 text-[#00A99D] mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-white">Business Portal</div>
                    <div className="text-[10px] text-slate-450">Procure bulk materials & invoice</div>
                  </button>

                  <button 
                    id="hero-launch-supplier"
                    onClick={() => onSwitchDashboard('supplier')}
                    className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 hover:border-[#00D4FF]/40 text-left transition-all group cursor-pointer"
                  >
                    <Users className="w-5 h-5 text-[#00D4FF] mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-white">Supplier Hub</div>
                    <div className="text-[10px] text-slate-450">Inventory bids & payout tracking</div>
                  </button>

                  <button 
                    id="hero-launch-delivery"
                    onClick={() => onSwitchDashboard('delivery')}
                    className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 hover:border-emerald-500/40 text-left transition-all group cursor-pointer"
                  >
                    <Zap className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-white">Logistics Client</div>
                    <div className="text-[10px] text-slate-450">Last-mile dispatch & routes</div>
                  </button>

                  <button 
                    id="hero-launch-admin"
                    onClick={() => onSwitchDashboard('admin')}
                    className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 hover:border-rose-500/40 text-left transition-all group cursor-pointer"
                  >
                    <Cpu className="w-5 h-5 text-rose-450 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-white">Global Control</div>
                    <div className="text-[10px] text-slate-450">System metrics & SLA locks</div>
                  </button>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-mono">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" /> NETWORK STATUS: OPTIMUM
                  </span>
                  <span className="font-mono text-slate-500">12.5k ACTIVE SHIPPERS</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
