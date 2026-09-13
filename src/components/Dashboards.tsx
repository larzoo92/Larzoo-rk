import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, Users, Zap, Cpu, BarChart3, TrendingUp, 
  Clock, Package, MapPin, Truck, AlertCircle, DollarSign, 
  FolderCheck, ShieldAlert, BadgeInfo, Check, RefreshCw 
} from 'lucide-react';

interface DashboardsProps {
  activeDashboard: 'business' | 'supplier' | 'delivery' | 'admin' | 'none';
  onSwitchDashboard: (db: 'business' | 'supplier' | 'delivery' | 'admin' | 'none') => void;
}

export const Dashboards: React.FC<DashboardsProps> = ({
  activeDashboard,
  onSwitchDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'business' | 'supplier' | 'delivery' | 'admin'>(
    activeDashboard === 'none' ? 'business' : (activeDashboard === 'none' ? 'business' : activeDashboard as any)
  );

  // Sync state if prop changes
  React.useEffect(() => {
    if (activeDashboard !== 'none') {
      setActiveTab(activeDashboard as any);
    }
  }, [activeDashboard]);

  // SLA Alert log for Admin
  const [slaLock, setSlaLock] = useState(true);
  const [assignedOrdersCount, setAssignedOrdersCount] = useState(14);

  return (
    <section id="dashboards-showcase" className="py-24 bg-transparent border-b border-white/5 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title details */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-[#00D4FF] rounded-full border border-white/10 text-xs mb-4 backdrop-blur-md font-sans">
              <Cpu className="w-3.5 h-3.5" /> Core Operations Control Center
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
              Enterprise Integrated SaaS Clients
            </h2>
            <p className="mt-2 text-slate-350 text-sm">
              Explore Larzoo's operational workspaces. Switch between corporate buyer dashboards, farming suppliers hubs, last-mile delivery couriers, and system control centers.
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl shrink-0 backdrop-blur-md">
            {[
              { id: 'business', label: 'Business Client', icon: <Building className="w-3.5 h-3.5" /> },
              { id: 'supplier', label: 'Supplier Hub', icon: <Users className="w-3.5 h-3.5" /> },
              { id: 'delivery', label: 'Delivery App', icon: <Zap className="w-3.5 h-3.5" /> },
              { id: 'admin', label: 'Ecosystem Admin', icon: <Cpu className="w-3.5 h-3.5" /> },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`dashboard-tab-${tab.id}`}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    onSwitchDashboard(tab.id as any);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active 
                      ? 'bg-gradient-to-r from-[#00D4FF] to-[#00A99D] text-slate-950 font-extrabold shadow' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display of dashboards with premium SaaS styling */}
        <div className="bg-[#0F172A]/40 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl relative min-h-[550px]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00D4FF] via-[#00A99D] to-emerald-450 opacity-90" />
          
          <AnimatePresence mode="wait">
            {activeTab === 'business' && (
              <motion.div
                key="business"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className="p-8 space-y-8"
              >
                {/* Statistics panel */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      Stanza Living Co-Living Pvt Ltd <span className="bg-teal-950/80 border border-teal-800 text-[10px] text-teal-400 font-mono tracking-wider px-2 py-0.5 rounded font-semibold">VERIFIED B2B ACCOUNT</span>
                    </h3>
                    <p className="text-xs text-slate-500">Corporate Member since Jan 2024 • Active Hub Zone: Koramangala Outer</p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <button id="btn-refresh-biz" className="text-xs text-teal-400 hover:text-white transition-colors bg-teal-950 border border-teal-850 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer">
                      <RefreshCw className="w-3.5 h-3.5 animate-pulse" /> Sync QuickBooks Invoicing
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Month To Date Spend</div>
                    <div className="text-2xl font-extrabold text-white font-mono">₹12,45,000</div>
                    <div className="text-[10.5px] text-emerald-400 font-mono flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +18.5% spend optimization</div>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Total Procurement Orders</div>
                    <div className="text-2xl font-extrabold text-white font-mono">320</div>
                    <div className="text-[10.5px] text-emerald-400 font-mono flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +12.7% auto-reorders</div>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Average Ordr Value</div>
                    <div className="text-2xl font-extrabold text-white font-mono">₹3,890</div>
                    <div className="text-[10.5px] text-emerald-405 text-emerald-400 font-mono flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +8.3% vs state benchmark</div>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">SLA Delivery Log Rate</div>
                    <div className="text-2xl font-extrabold text-slate-400 text-white font-mono">98.6%</div>
                    <div className="text-[10.5px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 0% CRITICAL DOCK DELAYS
                    </div>
                  </div>
                </div>

                {/* Split segment: Active Subscriptions & Spends Graph */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                  <div className="lg:col-span-8 p-6 bg-slate-950 border border-slate-850 rounded-xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-450 text-slate-350">Scheduled Recurring Deliveries</h4>
                      <span className="text-[11px] text-teal-400 cursor-pointer">Modify Calendars →</span>
                    </div>

                    <div className="space-y-3 font-mono text-[11px]">
                      {[
                        { item: "300 litres Farm Pasteurized Milk", freq: "Daily 5:00 AM", cost: "₹18,500/shpmt", status: "NEXT DISPATCH TOMORROW" },
                        { item: "500 kg Premium Graded Basmati Rice", freq: "Bi-Weekly (Alt Mon)", cost: "₹39,000/shpmt", status: "TRANSIT PREP - HUB BLR" },
                        { item: "150 Biodegradable Eco-Areca Plate Bundles", freq: "Weekly (Thursdays)", cost: "₹14,250/shpmt", status: "VENDOR ALLOCATED" },
                      ].map((sub, i) => (
                        <div key={i} className="p-4 bg-slate-900 border border-slate-850 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-0.5 flex-1">
                            <span className="text-white font-bold text-xs">{sub.item}</span>
                            <div className="text-slate-500 font-semibold">{sub.freq} • Raw Contract Allocation</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-teal-400 font-extrabold">{sub.cost}</div>
                            <span className="text-[9.5px] text-slate-450 text-cyan-400 font-semibold">{sub.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 p-6 bg-slate-950 border border-slate-850 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <BarChart3 className="w-4 h-4 text-teal-400" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-350">Spend By Category</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                        Larzoo automatically clusters bulk item invoicing, ensuring straightforward corporate GST declarations.
                      </p>
                    </div>

                    {/* SVG mini category chart */}
                    <div className="flex justify-center items-center h-32 relative">
                      <svg className="w-28 h-28 transform -rotate-90">
                        {/* 4 segments: Groceries, Vegetables, Cleaning, Custom sourcing */}
                        <circle cx="56" cy="56" r="46" fill="transparent" stroke="#1E293B" strokeWidth="8" />
                        
                        {/* Groceries 40% - Dasharray calculation: 2 * PI * R = 289 -> 40% = 115 */}
                        <circle cx="56" cy="56" r="46" fill="transparent" stroke="#00D4FF" strokeWidth="8" strokeDasharray="115 289" strokeDashoffset="0" />
                        
                        {/* Vegetables 30% - 30% = 87 */}
                        <circle cx="56" cy="56" r="46" fill="transparent" stroke="#00A99D" strokeWidth="8" strokeDasharray="87 289" strokeDashoffset="-115" />
                        
                        {/* Cleaning 20% - 20% = 58 */}
                        <circle cx="56" cy="56" r="46" fill="transparent" stroke="#10B981" strokeWidth="8" strokeDasharray="58 289" strokeDashoffset="-202" />
                      </svg>
                      
                      <div className="absolute flex flex-col justify-center items-center text-center">
                        <span className="text-sm font-bold text-white font-mono">₹12.4L</span>
                        <span className="text-[9px] text-slate-500">spends</span>
                      </div>
                    </div>

                    {/* Legend keys */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-4 border-t border-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded bg-cyan-400" />
                        <span className="text-slate-400">Groceries (40%)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded bg-teal-400" />
                        <span className="text-slate-400">Produce (30%)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded bg-emerald-400" />
                        <span className="text-slate-400">Cleaning (20%)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded bg-slate-700" />
                        <span className="text-slate-400">Others (10%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'supplier' && (
              <motion.div
                key="supplier"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className="p-8 space-y-8"
              >
                {/* Statistics panel */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                       Agri-Produce Grading Warehouse #88 <span className="bg-cyan-950/80 border border-cyan-800 text-[10px] text-cyan-400 font-mono tracking-wider px-2 py-0.5 rounded font-semibold">WHOLESALER MERCHANT</span>
                    </h3>
                    <p className="text-xs text-slate-500">Karnataka Agricultural Trade License: APMC-M-59201 • SLA Rank: Tier-1</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-950 border border-green-850 text-green-400 rounded-lg text-xs font-mono font-bold">
                       MOCK CONTRACTS ONLINE
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Today's Sales Revenue</div>
                    <div className="text-2xl font-extrabold text-white font-mono">₹78,450</div>
                    <div className="text-[10.5px] text-emerald-400 font-mono flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +12.4% vs last Thursday</div>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Pending Active Auctions</div>
                    <div className="text-2xl font-extrabold text-white font-mono">12</div>
                    <div className="text-[10.5px] text-slate-450 select-none text-slate-500">8 sourcing requests matching</div>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Incoming Load Bids</div>
                    <div className="text-2xl font-extrabold text-white font-mono">28</div>
                    <div className="text-[10.5px] text-emerald-400 font-mono flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +15% dispatch volume</div>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Refund / Return Rate</div>
                    <div className="text-2xl font-extrabold text-white font-mono">2.3%</div>
                    <div className="text-[10.5px] text-slate-500">SaaS target parameter limit &lt; 3.0%</div>
                  </div>
                </div>

                {/* Sales Sparkline & Live matching bids */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                  
                  {/* Matching sourcing requests bids */}
                  <div className="lg:col-span-7 p-6 bg-slate-950 border border-slate-850 rounded-xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-350">Incoming Bids Panel (Live Board)</h4>
                      <span className="text-[11px] text-cyan-400 cursor-pointer">Configure auto-bid parameters →</span>
                    </div>

                    <p className="text-xs text-slate-500">These requisitions are currently unassigned. Place a wholesale supply bid matching your cargo availability.</p>

                    <div className="space-y-3 font-mono text-[11px]">
                      {[
                        { request: "LZS-092518: 30 Bags Grade-A Areca Eco-plates", client: "Royal Orchid Events BLR", deadline: "Exp: Monday Morning", minBid: "₹21,000 max" },
                        { request: "LZS-401925: 1.5 Tons Premium Graded Onions", client: "Grand Taj Vista Hotel-B", deadline: "Exp: Tonight 10:00 PM", minBid: "₹38,000 limit" },
                      ].map((bid, idx) => (
                        <div key={idx} className="p-4 bg-slate-900 border border-slate-850 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-0.5 flex-1 animate-pulse">
                            <span className="text-white font-bold text-xs">{bid.request}</span>
                            <div className="text-slate-500 font-semibold">{bid.client} • {bid.deadline}</div>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <div className="text-right px-2">
                              <span className="text-[9px] text-slate-500 block uppercase font-mono">Target budget</span>
                              <div className="text-cyan-400 font-bold">{bid.minBid}</div>
                            </div>
                            <button className="px-3.5 py-2 bg-cyan-550 bg-cyan-600 rounded-lg text-slate-950 font-bold hover:bg-cyan-650 transition-all text-[11px] cursor-pointer">
                              Submit Bid Spot
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sparkline analytics display using custom SVG */}
                  <div className="lg:col-span-5 p-6 bg-slate-950 border border-slate-850 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-350">Aggregate Sales Velocity</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                        Weekly gross billing tracking. Dynamic pricing indexes coordinate supplier dispatch loads seamlessly.
                      </p>
                    </div>

                    {/* SVG Sparkline */}
                    <div className="h-28 flex items-end">
                      <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
                        <path
                          d="M 0,90 Q 50,45 100,55 T 200,20 T 300,30"
                          fill="none"
                          stroke="url(#sparkline-grad)"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 0,90 Q 50,45 100,55 T 200,20 T 300,30 L 300,100 L 0,100 Z"
                          fill="url(#sparkline-area)"
                          opacity="0.3"
                        />
                        <defs>
                          <linearGradient id="sparkline-grad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#00A99D" />
                            <stop offset="100%" stopColor="#00D4FF" />
                          </linearGradient>
                          <linearGradient id="sparkline-area" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00D4FF" />
                            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Circles marking key metrics */}
                        <circle cx="200" cy="20" r="4" fill="#00D4FF" />
                      </svg>
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-4 border-t border-slate-900">
                      <span>MON: ₹52,000</span>
                      <span>WED: ₹61,200</span>
                      <span className="text-cyan-400 font-bold">TODAY: ₹78,450</span>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}

            {activeTab === 'delivery' && (
              <motion.div
                key="delivery"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className="p-8 space-y-8"
              >
                {/* Statistics panel */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                       Courier Partner Node: Rajesh Kumar <span className="bg-emerald-950/80 border border-emerald-800 text-[10px] text-emerald-400 font-mono tracking-wider px-2 py-0.5 rounded font-semibold">LAST-MILE FREIGHT</span>
                    </h3>
                    <p className="text-xs text-slate-500">Vehicle Ref: KA-03-HL-9015 (Heavy Utility Van) • Zone Sector: Bengaluru Central-1</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 border border-teal-850 text-teal-400 rounded-lg text-xs font-mono font-bold animate-pulse">
                       GPS SYNC SIGNAL ACTIVE
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Today's Earnings Payout</div>
                    <div className="text-2xl font-extrabold text-white font-mono">₹1,850</div>
                    <div className="text-[10.5px] text-emerald-400 font-mono flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> Includes ₹450 bulk load heavy weight bonus</div>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Dispatches Fully Completed</div>
                    <div className="text-2xl font-extrabold text-white font-mono">12</div>
                    <div className="text-[10.5px] text-emerald-400 font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 100% SLA COMPLETED
                    </div>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Dispatch Route Queue</div>
                    <div className="text-2xl font-extrabold text-white font-mono">1 Active load</div>
                    <div className="text-[10.5px] text-cyan-400 font-bold font-mono">Bulk produce route active</div>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Courier rating score</div>
                    <div className="text-2xl font-extrabold text-white font-mono">4.9 / 5.0</div>
                    <div className="text-[10.5px] text-slate-450 text-slate-500">Vetted elite cohort standard</div>
                  </div>
                </div>

                {/* Map transit screen & Assigned dispatches list */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                  <div className="lg:col-span-8 p-6 bg-slate-950 border border-slate-850 rounded-xl space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-350">Assigned Freight Shipment route</h4>
                    
                    {/* Simulator map graphic mapping route coordinates */}
                    <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 relative h-48 overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                      
                      {/* Drawing map networks */}
                      <svg className="w-full h-full relative z-10" viewBox="0 0 600 200">
                        {/* Streets networks */}
                        <path d="M 0,100 H 600 M 150,0 V 200 M 450,0 V 200 M 0,50 L 600,150" stroke="#1E293B" strokeWidth="2" strokeDasharray="3,3" />
                        
                        {/* Route coordinates */}
                        <path d="M 150,100 L 300,150 L 450,100" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeDasharray="6,6" fill="none">
                          <animate attributeName="stroke-dashoffset" values="30;0" dur="2s" repeatCount="indefinite" />
                        </path>

                        {/* Nodes */}
                        <circle cx="150" cy="100" r="10" fill="#1E293B" stroke="#00A99D" strokeWidth="3" />
                        <text x="150" y="80" textAnchor="middle" fill="#00D4FF" fontSize="9" fontWeight="bold" fontFamily="monospace">AGRI-HUB #88</text>

                        <circle cx="300" cy="150" r="12" fill="#10B981" className="animate-pulse" />
                        <text x="300" y="180" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="monospace">KA-03 TRUCK (YOU)</text>

                        <circle cx="450" cy="100" r="10" fill="#1E293B" stroke="#10B981" strokeWidth="3" />
                        <text x="450" y="80" textAnchor="middle" fill="#E11D48" fontSize="9" fontWeight="bold" fontFamily="monospace">STANZA RESIDENCY</text>
                      </svg>
                    </div>
                  </div>

                  <div className="lg:col-span-4 p-6 bg-slate-950 border border-slate-850 rounded-xl space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-350">SLA Dock Parameters</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Assigned shipping docks mandate digital barcode confirmation during inventory handover.
                    </p>

                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-bold">Freight size:</span>
                        <span className="text-yellow-400 font-mono font-bold">350 kg heavy load</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-bold">Payout premium:</span>
                        <span className="text-emerald-400 font-mono font-bold">₹750 + ₹120 Heavy bonus</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-bold">ETA Target lock:</span>
                        <span className="text-white font-mono">10:45 AM (Strict)</span>
                      </div>
                    </div>

                    <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold rounded-xl transition-all shadow cursor-pointer">
                      Acknowledge Handover Barcodes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className="p-8 space-y-8"
              >
                {/* Statistics panel */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                       Larzoo Ecosystem Global Control Panel <span className="bg-rose-950/80 border border-rose-800 text-[10px] text-rose-450 text-rose-400 font-mono tracking-wider px-2 py-0.5 rounded font-semibold">ROOT SUPER-ADMIN</span>
                    </h3>
                    <p className="text-xs text-slate-500">Instance Server node ID: BLR-CLUSTER-09252 • API Gateways: Online</p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <button 
                      onClick={() => setSlaLock(prev => !prev)}
                      className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer ${
                        slaLock 
                          ? 'bg-rose-950/90 text-rose-400 border-rose-800' 
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      <ShieldAlert className="w-3.5 h-3.5" /> {slaLock ? "Strict SLA Lock ACTIVE" : "Strict SLA Lock PAUSED"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Ecosystem Total Bills Volume</div>
                    <div className="text-2xl font-extrabold text-white font-mono">₹45,78,000</div>
                    <div className="text-[10.5px] text-emerald-400 font-mono flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +12.1% monthly GMV scale</div>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Total System Orders</div>
                    <div className="text-2xl font-extrabold text-white font-mono">12,543</div>
                    <div className="text-[10.5px] text-emerald-400 font-mono font-semibold">+18.3% vs state targets</div>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Vetted Trade Suppliers</div>
                    <div className="text-2xl font-extrabold text-white font-mono">8,432</div>
                    <div className="text-[10.5px] text-emerald-350 text-emerald-400 font-semibold">+15.1% verified licenses</div>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Critical Transit Escapes</div>
                    <div className="text-2xl font-extrabold text-white text-rose-500 font-mono">0</div>
                    <div className="text-[10.5px] text-slate-500">All current assets fully accounted</div>
                  </div>
                </div>

                {/* Grid layout panel */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                  <div className="lg:col-span-8 p-6 bg-slate-950 border border-slate-850 rounded-xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-350">Active Global Operational Alerts</h4>
                      <span className="text-[11px] text-rose-450 text-rose-400 font-bold">Audit Database Logs →</span>
                    </div>

                    <div className="space-y-2 font-mono text-[11px]">
                      <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg flex items-center justify-between text-slate-350 text-slate-300">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                          <span>Custom Sourcing Bid Timeout: LZS-092518 (Royal Banquet)</span>
                        </div>
                        <button 
                          onClick={() => setAssignedOrdersCount(prev => prev - 1)}
                          className="px-2 py-1 bg-red-950 border border-red-800 text-red-300 rounded font-semibold text-[10px] hover:bg-red-900 transition-colors cursor-pointer"
                        >
                          Manual Force Assign Bid
                        </button>
                      </div>

                      <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg flex items-center justify-between text-slate-300">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500 shrink-0" />
                          <span>System Load Balanced: Bengaluru Hub Sector-12</span>
                        </div>
                        <span className="text-[10px] text-slate-500">100% optimum</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 p-6 bg-slate-950 border border-slate-850 rounded-xl space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-350">Super-Admin SLA Lock Parameters</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Enforcing strict system parameters redirects last-mile transit paths based on active driver scores and weather indicators automatically.
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-450 text-slate-350">
                        <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Force strict 99.6% Delivery SLAs: {slaLock ? "ACTIVE" : "DISABLED"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-350">
                        <BadgeInfo className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Auto-balance courier pools: ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
