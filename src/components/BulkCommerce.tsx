import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building, GraduationCap, PartyPopper, Utensils, 
  ChevronRight, Shield, Calculator, CheckCircle2, DollarSign 
} from 'lucide-react';

interface B2BService {
  id: string;
  title: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  sla: string;
  features: string[];
}

export const BulkCommerce: React.FC = () => {
  // Slider states for the B2B direct pricing calculator
  const [selectedProduct, setSelectedProduct] = useState<'onions' | 'rice' | 'plates' | 'milk'>('onions');
  const [quantity, setQuantity] = useState(100); // in kg or units

  // Product configurations
  const productConfigs = {
    onions: {
      name: "Graded Red Onions",
      basePrice: 40, // per kg
      step: 50,
      min: 50,
      max: 2000,
      unit: "kg",
      discounts: [
        { maxQty: 100, price: 40 },
        { maxQty: 500, price: 32 },
        { maxQty: 1000, price: 26 },
        { maxQty: 99999, price: 22 },
      ]
    },
    rice: {
      name: "Basmati Raw Rice (Gr-A)",
      basePrice: 90,
      step: 100,
      min: 100,
      max: 5000,
      unit: "kg",
      discounts: [
        { maxQty: 250, price: 90 },
        { maxQty: 1000, price: 78 },
        { maxQty: 2500, price: 71 },
        { maxQty: 99999, price: 65 },
      ]
    },
    plates: {
      name: "Biodegradable Areca Eco-Plates",
      basePrice: 12, // per plate
      step: 250,
      min: 250,
      max: 10000,
      unit: "pcs",
      discounts: [
        { maxQty: 500, price: 12 },
        { maxQty: 2000, price: 9.5 },
        { maxQty: 5000, price: 7.8 },
        { maxQty: 99999, price: 6.2 },
      ]
    },
    milk: {
      name: "Homogenized Milk (Full Cream)",
      basePrice: 62, // per litre
      step: 30,
      min: 30,
      max: 1500,
      unit: "litres",
      discounts: [
        { maxQty: 100, price: 62 },
        { maxQty: 300, price: 58 },
        { maxQty: 850, price: 55 },
        { maxQty: 99999, price: 51 },
      ]
    }
  };

  const activeProduct = productConfigs[selectedProduct];

  // Calculate pricing based on volume ladder
  const getProductPricePerUnit = (qty: number) => {
    const matched = activeProduct.discounts.find(d => qty <= d.maxQty);
    return matched ? matched.price : activeProduct.basePrice;
  };

  const pricePerUnit = getProductPricePerUnit(quantity);
  const totalCost = pricePerUnit * quantity;
  const retailSum = activeProduct.basePrice * quantity;
  const savings = retailSum - totalCost;

  const b2bServices: B2BService[] = [
    {
      id: 'restaurant',
      title: 'Restaurant Procurement',
      icon: <Utensils className="w-5 h-5 text-teal-400" />,
      tagline: 'Farm-to-Kitchen in 6 hours.',
      description: 'Daily fresh produce, high-grade spices, packaging materials, and bulk proteins directly to your restaurant floor. Bypasses standard logistics delays with a strict cold-chain network.',
      sla: '5:00 AM Delivery Guarantee',
      features: ['Automated recurring ordering calendars', 'Weekly credit terms upon Trade Verification', 'Grade-A physical inspection reports available']
    },
    {
      id: 'hotel',
      title: 'Hotel Consolidation',
      icon: <Building className="w-5 h-5 text-cyan-400" />,
      tagline: 'Hospitality-grade inventory simplified.',
      description: 'Streamline procurement for linens, gourmet foods, organic bathroom toiletries, custom bedroom amenities, and bulk cleaning supplies. Align multiple hotel properties to single unified billing channels.',
      sla: 'Priority Multi-Vehicular Dispatches',
      features: ['Tier-1 brand partnerships for premium stock', 'Integrated ERP API endpoints', 'Scheduled weekly freight plans']
    },
    {
      id: 'pg',
      title: 'PG & Hostel Contracts',
      icon: <GraduationCap className="w-5 h-5 text-emerald-400" />,
      tagline: 'Predictable high-volume ingredients catering.',
      description: 'Perfect for student housing chains and PG accommodations requiring thousands of meals daily. We supply bulk grade cereals, fresh milk, daily staples, and cleaning agents under flat-rate contracts.',
      sla: 'Zero-Stockout Alerts',
      features: ['Dedicated volume account executives', 'Flexible sizing buckets (15kg, 50kg)', 'Instant supplier replacements within 2 hours']
    },
    {
      id: 'wedding',
      title: 'Wedding & Event Logistics',
      icon: <PartyPopper className="w-5 h-5 text-purple-400" />,
      tagline: 'Turnkey event sourcing schedules.',
      description: 'Designed for wedding planners and event coordinators sourcing massive amounts of custom decorative assets, flowers, disposable dinnerware, beverages, and stage properties on tight deadlines.',
      sla: '1-Hour Critical Reserve Buffers',
      features: ['Dynamic venue dock path routing', 'Short term rental sourcing options', 'Bespoke florist connections']
    },
  ];

  return (
    <section className="py-24 bg-transparent border-b border-white/5 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D4FF]/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-[#00D4FF] rounded-full border border-white/10 text-xs mb-4 backdrop-blur-md">
            B2B Procurement Solutions
          </div>
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight leading-tight">
            Premium Enterprise Sourcing Matrix
          </h2>
          <p className="mt-4 text-slate-350">
            Larzoo shifts trade coordination from chaotic WhatsApp channels into a transparent, audit-ready wholesale platform serving India's top business establishments.
          </p>
        </div>

        {/* Section row: 1. Service Cards Grid | 2. Sourcing pricing calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Service Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {b2bServices.map((svc) => (
              <div 
                key={svc.id} 
                className="p-6 bg-white/5 border border-white/10 hover:border-[#00D4FF]/40 transition-all rounded-2xl flex flex-col justify-between group cursor-pointer backdrop-blur-md"
              >
                <div className="space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F172A] border border-white/10 text-slate-300">
                    {svc.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white group-hover:text-[#00D4FF] transition-colors">{svc.title}</h3>
                    <p className="text-[10px] uppercase font-mono text-[#00D4FF] font-semibold tracking-wide">{svc.tagline}</p>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{svc.description}</p>
                </div>

                <div className="pt-4 border-t border-white/5 mt-4 space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 text-[#00A99D] text-[10px] font-mono rounded font-semibold backdrop-blur-md">
                    SLA: {svc.sla}
                  </span>
                  <ul className="space-y-1 text-[10px] text-slate-450 font-sans">
                    {svc.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Calculator interactive panel */}
          <div className="lg:col-span-5">
            <div className="p-8 bg-[#0F172A]/70 border border-white/10 rounded-2xl flex flex-col justify-between h-full shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4FF]/5 rounded-full blur-2xl" />
              
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#00D4FF]" />
                  <h3 className="text-md font-bold text-white">Live Wholesaler Price Ladder</h3>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed">
                  Toggle commodities below. Drag the slider to observe instant cost reduction margins negotiated in real-time across agrarian markets.
                </p>

                {/* Vertical Category Selector */}
                <div className="grid grid-cols-4 gap-2 bg-[#0F172A] p-1.5 rounded-xl border border-white/5">
                  {(Object.keys(productConfigs) as Array<keyof typeof productConfigs>).map((prod) => {
                    const active = selectedProduct === prod;
                    const label = prod === 'onions' ? 'Onions' : prod === 'rice' ? 'Rice' : prod === 'plates' ? 'Areca' : 'Milk';
                    return (
                      <button
                        key={prod}
                        onClick={() => {
                          setSelectedProduct(prod);
                          setQuantity(productConfigs[prod].min);
                        }}
                        className={`py-2 px-1 text-[10px] font-bold rounded-lg uppercase tracking-wide text-center transition-all cursor-pointer ${
                          active ? 'bg-gradient-to-r from-[#00D4FF] to-[#00A99D] text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* The Product parameters view */}
                <div className="p-4 bg-[#0F172A]/80 rounded-xl border border-white/5 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-semibold">{activeProduct.name}</span>
                    <span className="font-bold text-white">{activeProduct.basePrice} / {activeProduct.unit} (Retail Spot)</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-500">Vol quantity:</span>
                      <span className="text-[#00D4FF] font-bold">{quantity} {activeProduct.unit}</span>
                    </div>

                    <input 
                      type="range"
                      min={activeProduct.min}
                      max={activeProduct.max}
                      step={activeProduct.step}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#000000]"
                      style={{ accentColor: '#00D4FF' }}
                    />

                    <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                      <span>Min: {activeProduct.min} {activeProduct.unit}</span>
                      <span>Max Cap: {activeProduct.max} {activeProduct.unit}</span>
                    </div>
                  </div>
                </div>

                {/* Vol pricing stats breakdown */}
                <div className="space-y-2 border-t border-white/5 pt-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Regular Market Price:</span>
                    <span className="text-slate-300 font-mono line-through">₹{retailSum.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Larzoo Wholesaler Spot Contract:</span>
                    <span className="text-emerald-400 font-bold font-mono">₹{pricePerUnit} / {activeProduct.unit}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm border-t border-white/5 pt-2 font-sans">
                    <span className="text-white font-semibold">Total Cost:</span>
                    <span className="text-white font-extrabold text-lg font-mono">₹{totalCost.toLocaleString()}</span>
                  </div>
                </div>

              </div>

              {/* SAVINGS STAT BAR */}
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs mt-6 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#00D4FF]" />
                  <span className="text-slate-300 font-semibold">Volume Margin Saved:</span>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-extrabold text-sm font-mono leading-none">₹{savings.toLocaleString()}</div>
                  <span className="text-[10px] text-slate-500 font-mono">({Math.round((savings / retailSum) * 100)}% Discount)</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
