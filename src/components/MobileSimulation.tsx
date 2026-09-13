import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, ShoppingBag, Search, Sparkles, MapPin, 
  Trash2, ArrowRight, CheckCircle, RefreshCw, Star, Play 
} from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  unit: string;
}

export const MobileSimulation: React.FC = () => {
  const [activeMobileScreen, setActiveMobileScreen] = useState<'store' | 'ai' | 'cart' | 'tracking'>('store');
  const [cart, setCart] = useState<CartItem[]>([
    { id: '1', name: "Farm Fresh Tomatoes", price: 28, qty: 10, unit: "kg" },
    { id: '2', name: "Graded Red Onions", price: 30, qty: 5, unit: "kg" },
  ]);

  // Tracking state simulator
  const [trackingStep, setTrackingStep] = useState(3); // Default at "Out for delivery"

  const addToCart = (item: { id: string; name: string; price: number; unit: string }) => {
    setCart(prev => {
      const match = prev.find(i => i.id === item.id);
      if (match) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 5 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 5, unit: item.unit }];
    });
  };

  const getSubtotal = () => cart.reduce((acc, c) => acc + (c.price * c.qty), 0);
  const deliveryFee = 60;
  const bulkDiscount = 40;
  const total = getSubtotal() + deliveryFee - bulkDiscount;

  return (
    <section className="py-24 bg-transparent border-b border-white/5 relative">
      <div className="absolute inset-0 bg-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual pitch descriptions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-[#00D4FF] rounded-full border border-white/10 text-xs backdrop-blur-md">
              Consumer Mobile Client
            </div>
            
            <h2 className="text-4xl font-sans font-bold text-white tracking-tight leading-tight">
               Precision Crafted Hyperlocal Mobile Simulation
            </h2>
            
            <p className="text-slate-350 leading-relaxed font-sans text-sm">
               Explore Larzoo's consumer-facing workspace. Inside this interactive virtual device, togglers let you review real-time product additions, AI-powered reordering menus, instant wholesale billing invoice checklists, and moving delivery vehicle telemetry maps.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex gap-3">
                <div className="p-2 bg-white/5 text-[#00D4FF] rounded-xl border border-white/10">
                  <ShoppingBag className="w-4 h-4 text-[#00D4FF]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">One-Handed Dynamic Sourcing</h4>
                  <p className="text-xs text-slate-400 leading-relaxed pt-0.5">Rapid shopping carts automatically switch bulk discounts depending on volume parameters.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2 bg-white/5 text-[#00A99D] rounded-xl border border-white/10">
                  <Sparkles className="w-4 h-4 text-[#00A99D]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Automated Smart Reordering Flow</h4>
                  <p className="text-xs text-slate-400 leading-relaxed pt-0.5">Assigned repeat-purchase buttons trigger instantaneous shipping allocations with zero keystroke friction.</p>
                </div>
              </div>
            </div>

            {/* Selector handles outside of virtual device */}
            <div className="flex flex-wrap gap-2 pt-6">
              {[
                { id: 'store', label: '1. Food Listing' },
                { id: 'ai', label: '2. Larzoo AI Chat' },
                { id: 'cart', label: '3. Cart Invoice' },
                { id: 'tracking', label: '4. Transit Tracking' },
              ].map((scr) => (
                <button
                  key={scr.id}
                  id={`btn-mob-${scr.id}`}
                  onClick={() => setActiveMobileScreen(scr.id as any)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    activeMobileScreen === scr.id 
                      ? 'bg-gradient-to-r from-[#00D4FF] to-[#00A99D] text-slate-950 border-[#00D4FF]/30 shadow-md font-extrabold' 
                      : 'bg-white/5 text-slate-300 border-white/10 hover:border-[#00D4FF]/30 backdrop-blur-md'
                  }`}
                >
                  {scr.label}
                </button>
              ))}
            </div>
          </div>

          {/* Core Interactive Virtual Chassis Frame */}
          <div className="lg:col-span-6 flex justify-center">
            
            <div className="w-[310px] h-[610px] bg-[#0E1726]/80 p-3 rounded-[38px] border-[5px] border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.8)] relative flex flex-col overflow-hidden backdrop-blur-xl">
              {/* iPhone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-xl z-30 flex justify-center items-center">
                <div className="w-12 h-1 bg-slate-900 rounded-full mb-1" />
              </div>

              {/* virtual viewport screens container */}
              <div className="flex-1 rounded-[28px] overflow-hidden bg-[#0A0F1D]/90 border border-white/10 relative z-10 flex flex-col justify-between pt-7 pb-2 text-white font-sans text-xs">
                
                {/* Header elements inside mobile display */}
                <div className="p-3 border-b border-white/5 bg-slate-950/40 flex justify-between items-center text-[10px] font-mono text-slate-400 shrink-0">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#00D4FF]" />
                    <span className="truncate max-w-[90px] font-sans font-bold text-white text-[9px]">Koramangala, BLR</span>
                  </div>
                  <span className="text-white text-[9px] font-extrabold">9:41 AM • 5G</span>
                </div>

                {/* Switch contents dynamically inside viewer screen */}
                <div className="flex-1 overflow-y-auto p-3 relative bg-slate-950/20">
                  
                  {activeMobileScreen === 'store' && (
                    <div className="space-y-4">
                      {/* Search Bar */}
                      <div className="flex items-center gap-2 p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-550 text-slate-450">
                        <Search className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-[10px] text-slate-500">Search 12,800+ fresh items...</span>
                      </div>

                      {/* Promoted banner */}
                      <div className="p-3 bg-gradient-to-r from-teal-950 to-slate-900 border border-teal-500/20 rounded-lg space-y-1">
                        <div className="text-[9px] font-bold text-teal-400 font-mono uppercase tracking-wide">Larzoo Fresh Harvest</div>
                        <h4 className="text-xs font-bold text-white">Daily Staples up to 30% Off</h4>
                      </div>

                      {/* Simple inventory lists */}
                      <div className="space-y-2">
                        <h5 className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold font-mono">Wholesale Produce</h5>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'tomatoes', name: "Farm Tomatoes", price: 28, unit: "kg", rating: 4.8 },
                            { id: 'onions', name: "Graded Red Onions", price: 30, unit: "kg", rating: 4.7 },
                            { id: 'capsicum', name: "Green Capsicum", price: 40, unit: "kg", rating: 4.9 },
                            { id: 'basmati', name: "Basmati Rice gr", price: 90, unit: "kg", rating: 4.6 },
                          ].map((x) => (
                            <div key={x.id} className="p-2.5 bg-slate-905 bg-slate-900 border border-slate-850 rounded-lg flex flex-col justify-between space-y-2">
                              <div className="space-y-0.5">
                                <div className="text-[10.5px] font-bold text-white truncate">{x.name}</div>
                                <div className="text-[9px] text-slate-500">₹{x.price} per {x.unit}</div>
                              </div>
                              <div className="flex justify-between items-center pt-1 border-t border-slate-850/60 mt-1">
                                <span className="text-[9px] text-yellow-400 flex items-center font-mono font-bold"><Star className="w-2.5 h-2.5 fill-current" /> {x.rating}</span>
                                <button
                                  id={`btn-mob-add-${x.id}`}
                                  onClick={() => addToCart({ id: x.id, name: x.name, price: x.price, unit: x.unit })}
                                  className="px-2 py-1 bg-teal-500 text-slate-950 hover:scale-105 active:scale-95 text-[9px] font-bold rounded cursor-pointer"
                                >
                                  + ADD
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMobileScreen === 'ai' && (
                    <div className="space-y-4 flex flex-col h-full justify-between">
                      <div className="space-y-3 flex-1 h-[250px] overflow-y-auto">
                        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                          <p className="text-[9px] text-teal-400 font-mono tracking-wider font-semibold uppercase">Larzoo Assistant</p>
                          <p className="text-[10.5px] text-slate-300 leading-relaxed pt-1">
                            Hi! I calculated your weekly Stanza PG consumption. Shall I auto-reorder tomatoes and milk matching standard constraints?
                          </p>
                        </div>

                        <div className="p-2.5 bg-teal-900/10 border border-teal-500/20 text-teal-400 rounded-lg text-[10px] flex items-center justify-between">
                          <span>Confirm daily milk (30L)?</span>
                          <button
                            id="btn-confirm-mob-order"
                            onClick={() => {
                              setActiveMobileScreen('cart');
                              addToCart({ id: 'milk', name: "Homogenized Milk", price: 62, unit: "litres" });
                            }}
                            className="px-2 py-0.5 bg-teal-500 text-slate-950 font-bold rounded text-[9px] cursor-pointer"
                          >
                            Reorder
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-1 px-2 border border-slate-800 bg-slate-950 rounded-lg flex items-center justify-between shrink-0">
                        <span className="text-[10px] text-slate-650 text-slate-500 truncate">Sourcing standard bulk quantities...</span>
                        <button className="bg-teal-500 rounded p-1 text-slate-950 font-bold"><ArrowRight className="w-3 h-3 text-slate-950" /></button>
                      </div>
                    </div>
                  )}

                  {activeMobileScreen === 'cart' && (
                    <div className="space-y-4 flex flex-col justify-between h-full">
                      <div className="space-y-2 max-h-[190px] overflow-y-auto">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1 mb-2">Checkout Balance</h4>
                        
                        {cart.length === 0 ? (
                          <p className="text-slate-500 text-[10px] pt-4 text-center">Your shopping cart is empty.</p>
                        ) : (
                          cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-[10.5px] p-1 border-b border-slate-850 pb-1 font-mono">
                              <span className="text-white truncate font-sans max-w-[120px]">{item.name} <span className="text-slate-500 text-[9.5px]">x{item.qty} {item.unit}</span></span>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-205 text-slate-350">₹{item.price * item.qty}</span>
                                <button 
                                  onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))}
                                  className="text-red-400 hover:text-white transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Invoice totals */}
                      {cart.length > 0 && (
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-[9.5px] font-mono space-y-1 shrink-0">
                          <div className="flex justify-between">
                            <span className="text-slate-450 text-slate-400">Total Produce Cost:</span>
                            <span className="text-slate-300">₹{getSubtotal().toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">B2B Flat Cargo Fee:</span>
                            <span className="text-slate-300">₹{deliveryFee}</span>
                          </div>
                          <div className="flex justify-between text-emerald-400 font-bold">
                            <span>Sourcing Volume Credit:</span>
                            <span>-₹{bulkDiscount}</span>
                          </div>
                          <div className="flex justify-between font-bold text-white border-t border-slate-800 pt-1 text-xs font-sans">
                            <span>Total Bill:</span>
                            <span className="text-teal-400">₹{total.toLocaleString()}</span>
                          </div>

                          <button
                            id="btn-place-order-mob"
                            onClick={() => setActiveMobileScreen('tracking')}
                            className="w-full mt-2 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-extrabold text-[10px] rounded-lg shadow uppercase tracking-wide transition-all hover:scale-102 cursor-pointer"
                          >
                             Swipe to Confirm Delivery
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {activeMobileScreen === 'tracking' && (
                    <div className="space-y-4 flex flex-col h-full justify-between">
                      <div>
                        {/* Static tracking header */}
                        <div className="text-center p-3.5 bg-slate-950/60 border border-slate-850 rounded-lg space-y-0.5">
                          <div className="text-[8px] font-bold text-teal-400 font-mono tracking-widest uppercase">dispatched shipment</div>
                          <h4 className="text-sm font-extrabold text-white">ETA: 20-25 mins</h4>
                        </div>

                        {/* Interactive Timeline check steps */}
                        <div className="space-y-3 pt-3">
                          {[
                            { step: 1, label: "Wholesale Order Confirmed", status: "Resolved at 9:42 AM" },
                            { step: 2, label: "Farms Load Physical Quality Check", status: "100% Passed at 9:43 AM" },
                            { step: 3, label: "Cargo Loaded on Rajesh Van", status: "Fulfillment Sector-B in transit" },
                            { step: 4, label: "Last-Mile Dock Handover Complete", status: "SLA delivery timeline" },
                          ].map((t) => {
                            const resolved = t.step <= trackingStep;
                            return (
                              <div key={t.step} className="flex gap-2.5 items-start">
                                <span className={`w-3.5 h-3.5 rounded-full border text-[8px] font-bold flex items-center justify-center shrink-0 ${
                                  resolved ? 'bg-teal-500 border-teal-500 text-slate-950' : 'border-slate-800 bg-slate-900 text-slate-500'
                                }`}>
                                  {resolved ? '✓' : t.step}
                                </span>
                                <div className="space-y-0.5">
                                  <div className={`text-[10px] font-bold ${resolved ? 'text-white' : 'text-slate-500'}`}>{t.label}</div>
                                  <div className="text-[8px] font-mono text-slate-500">{t.status}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Simulator toggler inside simulator */}
                      <div className="flex gap-1.5 shrink-0 pt-2 border-t border-slate-850 font-mono text-[8px]">
                        <button
                          id="btn-sim-reset"
                          onClick={() => setTrackingStep(1)}
                          className="px-1.5 py-1 bg-slate-900 border border-slate-800 text-slate-500 hover:text-white rounded"
                        >
                          Step 1
                        </button>
                        <button
                          id="btn-sim-inc"
                          onClick={() => setTrackingStep(prev => Math.min(prev + 1, 4))}
                          className="px-2 py-1 bg-teal-950 border border-teal-850 text-teal-400 hover:bg-teal-900 rounded flex-1 text-center"
                        >
                          Simulate Progress
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom One-Handed Sticky Drawer Launcher bar as requested by mobile experience focus */}
                <div className="p-2 border-t border-slate-850 bg-slate-950 shrink-0">
                  <div className="grid grid-cols-4 gap-1 text-[8.5px] text-center text-slate-500 font-mono uppercase tracking-wide">
                    <button id="btn-mbar-store" onClick={() => setActiveMobileScreen('store')} className={`flex flex-col items-center gap-0.5 cursor-pointer ${activeMobileScreen === 'store' ? 'text-teal-400 font-bold' : ''}`}>
                      <span>Store</span>
                    </button>
                    <button id="btn-mbar-ai" onClick={() => setActiveMobileScreen('ai')} className={`flex flex-col items-center gap-0.5 cursor-pointer ${activeMobileScreen === 'ai' ? 'text-teal-400 font-bold' : ''}`}>
                      <span>REORDER</span>
                    </button>
                    <button id="btn-mbar-cart" onClick={() => setActiveMobileScreen('cart')} className={`flex flex-col items-center gap-0.5 cursor-pointer ${activeMobileScreen === 'cart' ? 'text-teal-400 font-bold' : ''}`}>
                      <span>CART ({cart.reduce((acc, c) => acc + c.qty, 0)})</span>
                    </button>
                    <button id="btn-mbar-track" onClick={() => setActiveMobileScreen('tracking')} className={`flex flex-col items-center gap-0.5 cursor-pointer ${activeMobileScreen === 'tracking' ? 'text-teal-400 font-bold' : ''}`}>
                      <span>TRACK</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
