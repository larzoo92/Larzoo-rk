import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Network, Activity, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

interface NetworkEvent {
  id: string;
  sender: string;
  recipient: string;
  amount: string;
  type: 'bulk' | 'sourcing' | 'logistics' | 'retail';
  timestamp: string;
}

export const NetworkVisualization: React.FC = () => {
  const [events, setEvents] = useState<NetworkEvent[]>([
    { id: '1', sender: 'Grading Hub Farm #34', recipient: 'Royal Greens PG Chain', amount: '450 kg Red Onions', type: 'bulk', timestamp: 'Just now' },
    { id: '2', sender: 'Premium Linen Wholesalers', recipient: 'Grand Marriott Banquet', amount: '80 Premium Sheets', type: 'sourcing', timestamp: '3s ago' },
    { id: '3', sender: 'Catering Source Warehouses', recipient: 'Wedding Reception Hall A', amount: '500 Silver Cutlery sets', type: 'sourcing', timestamp: '12s ago' },
    { id: '4', sender: 'Primary Dairy Co-Op', recipient: 'Hotel Taj Vista', amount: '350 Litres Grade-A Milk', type: 'bulk', timestamp: '24s ago' },
  ]);

  useEffect(() => {
    const senders = ['Graded Agritech Farms', 'Electronics Dist Co', 'Industrial Steel Hub', 'Linen Warehouse Delhi', 'Catering Depot BLR'];
    const recipients = ['Grand Orchid Hotel', 'Stanza PG Accommodations', 'Narendra Event Organizers', 'Cafe Coffee Day BLR', 'Greenwood Royal Villa'];
    const commodities = ['1200kg Basmati Rice', '45 Custom Acoustic Panels', '1.2 Tons Structural Iron', '200 High-grade Mattresses', '300 Fresh Catering Plates'];
    const types: ('bulk' | 'sourcing' | 'logistics' | 'retail')[] = ['bulk', 'sourcing', 'logistics', 'retail'];

    const interval = setInterval(() => {
      const newEvent: NetworkEvent = {
        id: String(Date.now()),
        sender: senders[Math.floor(Math.random() * senders.length)],
        recipient: recipients[Math.floor(Math.random() * recipients.length)],
        amount: commodities[Math.floor(Math.random() * commodities.length)],
        type: types[Math.floor(Math.random() * types.length)],
        timestamp: 'Just now',
      };
      setEvents(prev => [newEvent, ...prev.slice(0, 4)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-transparent border-b border-white/5 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-[#00D4FF] rounded-full border border-white/10 text-xs mb-4 backdrop-blur-md">
            <Network className="w-3.5 h-3.5" /> Network Topology
          </div>
          <h2 className="text-4xl font-sans font-bold text-white tracking-tight leading-tight">
            The Operating System of Local Commerce
          </h2>
          <p className="mt-4 text-slate-350">
            Larzoo couples smart algorithms, live transport tracking, and direct supply-to-buyer transactions into a singular high-velocity infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Animated SVG Map Visualization */}
          <div className="lg:col-span-8 p-[1px] rounded-3xl bg-gradient-to-br from-white/15 to-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
            
            {/* Legend indicators */}
            <div className="absolute top-4 left-4 p-3 bg-[#0F172A]/90 border border-white/10 rounded-xl text-[10px] space-y-2 z-20 font-mono backdrop-blur-lg">
              <div className="text-slate-400 font-semibold tracking-wide uppercase border-b border-white/5 pb-1 mb-1">Ecosystem Nodes</div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#00A99D] rounded-full inline-block" />
                <span className="text-slate-300">Verified Agritech & Suppliers ({">"}12.8k)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#00D4FF] rounded-full inline-block animate-pulse" />
                <span className="text-slate-200 font-bold">Larzoo Intelligent Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full inline-block" />
                <span className="text-slate-300">Enterprise Clients (Hotels/Weddings)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 border-t-2 border-dashed border-[#00D4FF]/50 relative top-0.5" />
                <span className="text-slate-400">Active Packet Streams</span>
              </div>
            </div>

            {/* SVG Network Map */}
            <svg 
              className="w-full h-full min-h-[300px] select-none text-slate-200" 
              viewBox="0 0 800 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="grad-teal-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00A99D" />
                  <stop offset="100%" stopColor="#00D4FF" />
                </linearGradient>
              </defs>

              {/* Pulsing Backlight */}
              <circle cx="400" cy="250" r="180" fill="url(#glow)" />

              {/* Grid backdrop */}
              <path d="M 0,250 H 800 M 400,0 V 500 M 0,125 H 800 M 0,375 H 800 M 200,0 V 500 M 600,0 V 500" stroke="#1E293B" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="3,3" />

              {/* Animated Packet Lines */}
              {/* Central hub is at 400,250 */}
              {/* Suppliers Left (120,130), (100,250), (120,370) */}
              {/* Customers Right (680,130), (700,250), (680,370) */}
              
              {/* Link paths */}
              <path id="link1" d="M 120,130 L 400,250" stroke="#00A99D" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
              <path id="link2" d="M 100,250 L 400,250" stroke="#00A99D" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
              <path id="link3" d="M 120,370 L 400,250" stroke="#00A99D" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />

              <path id="link4" d="M 400,250 L 680,130" stroke="#00D4FF" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
              <path id="link5" d="M 400,250 L 700,250" stroke="#00D4FF" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
              <path id="link6" d="M 400,250 L 680,370" stroke="#00D4FF" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />

              {/* Animated signal dots */}
              <circle r="4" fill="#00D4FF">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 120,130 L 400,250" />
              </circle>
              <circle r="4" fill="#00FFC2" begin="1s">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 100,250 L 400,250" />
              </circle>
              <circle r="4" fill="#00D4FF" begin="0.5s">
                <animateMotion dur="5s" repeatCount="indefinite" path="M 120,370 L 400,250" />
              </circle>
              
              <circle r="4" fill="#00E5FF">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 400,250 L 680,130" />
              </circle>
              <circle r="4" fill="#10B981" begin="1.5s">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 400,250 L 700,250" />
              </circle>
              <circle r="4" fill="#0062FF" begin="0.8s">
                <animateMotion dur="3.5s" repeatCount="indefinite" path="M 400,250 L 680,370" />
              </circle>

              {/* Concentric Signal Rings from Central Hub */}
              <circle cx="400" cy="250" r="30" fill="none" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.5">
                <animate attributeName="r" values="30;120;180" dur="4s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.8;0.3;0" dur="4s" repeatCount="indefinite" />
              </circle>

              {/* Supplier Node Circles */}
              <g className="cursor-pointer">
                <circle cx="120" cy="130" r="16" fill="#1E293B" stroke="#00A99D" strokeWidth="2" />
                <circle cx="120" cy="130" r="8" fill="#00A99D" />
                <text x="120" y="105" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">AGRI-FARMS</text>
              </g>

              <g className="cursor-pointer">
                <circle cx="100" cy="250" r="16" fill="#1E293B" stroke="#00A99D" strokeWidth="2" />
                <circle cx="100" cy="250" r="8" fill="#00A99D" />
                <text x="100" y="225" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">WHOLESALERS</text>
              </g>

              <g className="cursor-pointer">
                <circle cx="120" cy="370" r="16" fill="#1E293B" stroke="#00A99D" strokeWidth="2" />
                <circle cx="120" cy="370" r="8" fill="#00A99D" />
                <text x="120" y="402" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">EVENTS & LIQUIDATORS</text>
              </g>

              {/* Central Larzoo Operating System Hub */}
              <g className="cursor-pointer">
                <circle cx="400" cy="250" r="32" fill="#0F172A" stroke="url(#grad-teal-cyan)" strokeWidth="3" />
                <circle cx="400" cy="250" r="24" fill="#1E293B" stroke="#00D4FF" strokeWidth="1" strokeDasharray="4,4">
                  <animateTransform attributeName="transform" type="rotate" from="0 400 250" to="360 400 250" dur="10s" repeatCount="indefinite" />
                </circle>
                {/* Embedded OS glowing indicator */}
                <circle cx="400" cy="250" r="10" fill="#00D4FF" />
                <text x="400" y="205" textAnchor="middle" fill="#00D4FF" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="2">LARZOO OS</text>
              </g>

              {/* Customer Nodes (Hotel chains, Catering, PGs, Shippers, Consumers) */}
              <g className="cursor-pointer">
                <circle cx="680" cy="130" r="16" fill="#1E293B" stroke="#00D4FF" strokeWidth="2" />
                <circle cx="680" cy="130" r="8" fill="#00D4FF" />
                <text x="680" y="105" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">GRAND HOTELS</text>
              </g>

              <g className="cursor-pointer">
                <circle cx="700" cy="250" r="16" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
                <circle cx="700" cy="250" r="8" fill="#10B981" />
                <text x="700" y="225" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">RESTAURANTS</text>
              </g>

              <g className="cursor-pointer">
                <circle cx="680" cy="370" r="16" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
                <circle cx="680" cy="370" r="8" fill="#3B82F6" />
                <text x="680" y="402" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">PG ACCOMMODATIONS</text>
              </g>
            </svg>
          </div>

          {/* Logistics Stream details sidebox */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-[#00D4FF]" />
                <h3 className="text-md font-sans font-bold text-white">Live Dispatches Stream</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Larzoo monitors global agritech hubs, transport networks, and commercial kitchens to instantly reroute dispatches, avoiding bottlenecks.
              </p>

              {/* Interactive log dispatches list */}
              <div className="space-y-3 font-mono text-[11px]">
                {events.map((e) => (
                  <div key={e.id} className="p-3 bg-[#0F172A]/70 rounded-xl border border-white/5 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] mt-1.5 animate-pulse" />
                    <div className="flex-1 space-y-0.5">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span className="uppercase font-semibold tracking-wider text-[#00A99D]">{e.type} stream</span>
                        <span>{e.timestamp}</span>
                      </div>
                      <div className="text-slate-200">
                        <span className="text-white font-semibold">{e.sender}</span> → <span className="text-slate-400">{e.recipient}</span>
                      </div>
                      <div className="text-xs text-[#00D4FF] font-bold">{e.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SLA Trust Lock Panel */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#00D4FF]/10 rounded-full blur-xl" />
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-[#00D4FF]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Verified Operating Standard</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Our dynamic pooling contracts coordinate shipping rates with tier-1 transport providers, guaranteeing pricing drops as volume rises.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
