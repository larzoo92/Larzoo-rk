import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Plus, Minus, Trash2, Ticket, ChevronRight, Clock, 
  CreditCard, Sparkles, AlertCircle, ShoppingBag, Check 
} from 'lucide-react';
import { CartItem, Coupon } from '../types';
import { COUPONS } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [deliverySlot, setDeliverySlot] = useState<'express' | 'scheduled'>('express');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [notes, setNotes] = useState('');

  // Sourcing coordinates
  const deliveryFee = cartItems.length === 0 ? 0 : 35;
  const handlingFee = cartItems.length === 0 ? 0 : 4;

  // Compute normal totals and applicable bulk discounts
  const subtotal = cartItems.reduce((acc, item) => {
    let itemPrice = item.product.price;
    
    // Check if bulk discount is unlocked
    if (item.product.bulkDiscountRule && item.quantity >= item.product.bulkDiscountRule.minQty) {
      const discountAmount = item.product.price * (item.product.bulkDiscountRule.discountPercent / 100);
      itemPrice = item.product.price - discountAmount;
    }
    
    return acc + (itemPrice * item.quantity);
  }, 0);

  // Unlocked savings from normal discounts
  const originalSubtotal = cartItems.reduce((acc, item) => {
    return acc + (item.product.originalPrice * item.quantity);
  }, 0);

  const normalSavings = originalSubtotal - subtotal;

  // Let's compute additional B2B Bulk pricing savings specifically
  const bulkExtraSavings = cartItems.reduce((acc, item) => {
    if (item.product.bulkDiscountRule && item.quantity >= item.product.bulkDiscountRule.minQty) {
      const discountValue = item.product.price * (item.product.bulkDiscountRule.discountPercent / 100);
      return acc + (discountValue * item.quantity);
    }
    return acc;
  }, 0);

  // Apply Coupon logic
  let couponDiscountValue = 0;
  if (selectedCoupon) {
    if (subtotal >= selectedCoupon.minOrder) {
      if (selectedCoupon.type === 'fixed') {
        couponDiscountValue = selectedCoupon.discount;
      } else {
        couponDiscountValue = Math.round(subtotal * (selectedCoupon.discount / 100));
      }
    }
  }

  const finalTotal = Math.max(0, subtotal + deliveryFee + handlingFee - couponDiscountValue);

  const handleApplyCouponCode = (code: string) => {
    setCouponError('');
    setCouponSuccess('');
    const matched = COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!matched) {
      setCouponError('Invalid coupon code.');
      setSelectedCoupon(null);
      return;
    }
    if (subtotal < matched.minOrder) {
      setCouponError(`Min order requirement is ₹${matched.minOrder} to use this coupon.`);
      setSelectedCoupon(null);
      return;
    }
    setSelectedCoupon(matched);
    setCouponSuccess(`Coupon "${matched.code}" applied successfully! Saved ₹${matched.type === 'fixed' ? matched.discount : Math.round(subtotal * (matched.discount / 100))}`);
  };

  const handleApplyClick = (coupon: Coupon) => {
    if (subtotal < coupon.minOrder) {
      setCouponError(`Min order requirement is ₹${coupon.minOrder} for ${coupon.code}`);
      setCouponSuccess('');
      setSelectedCoupon(null);
      return;
    }
    setSelectedCoupon(coupon);
    setCouponError('');
    setCouponSuccess(`Coupon "${coupon.code}" applied!`);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      onClearCart();
      setSelectedCoupon(null);
      setOrderPlaced(false);
      onClose();
    }, 4500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950 z-50"
          />

          {/* Cart Sidebar panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white text-slate-800 shadow-2xl flex flex-col justify-between z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-tight">My Basket</h3>
                  <p className="text-xs text-slate-500 font-medium">{cartItems.length} items in list</p>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Switcher */}
            {orderPlaced ? (
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center bg-teal-500/5 space-y-6">
                <div className="relative">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-24 h-24 bg-gradient-to-tr from-teal-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-extrabold text-3xl shadow-xl shadow-teal-500/20"
                  >
                    🎉
                  </motion.div>
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-teal-500"></span>
                  </span>
                </div>

                <div className="space-y-2 max-w-sm">
                  <h3 className="text-2xl font-extrabold text-slate-900">Order Locked Successfully!</h3>
                  <p className="text-sm text-slate-650 leading-relaxed">
                    Sourcing from Larzoo Local Hub: <span className="font-bold text-teal-600">Koramangala Express Station</span>.
                  </p>
                  <p className="text-xs text-slate-500 font-mono pt-1">
                    ETA: <span className="font-bold text-cyan-600 underline">9 Minutes</span>. Our delivery associate is loading fresh payloads now!
                  </p>
                </div>

                <div className="w-full bg-white border border-slate-100 p-4 rounded-xl shadow-sm text-left text-xs space-y-1.5 font-mono text-slate-600">
                  <div className="flex justify-between border-b border-slate-50 pb-1 text-slate-800 font-bold">
                    <span>Order Shipment ID</span>
                    <span>#LZ-2026-9048</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fulfillment Protocol</span>
                    <span className="text-teal-600">APMC Direct Matching</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verified Payment</span>
                    <span>COD / Standard Wallet</span>
                  </div>
                </div>

                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4.5, ease: 'linear' }}
                    className="h-full bg-teal-500"
                  />
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Securing dynamic trade ledger...</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-extrabold text-slate-800">Your basket is totally empty</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Browse our premium groceries, fresh vegetables, daily essentials, or bulk hotel & restaurant deals to place your fast order!
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 font-bold text-xs text-white rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
                >
                  Start Sourcing Now
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-5 bg-slate-50/50">
                {/* 10-Minute Delivery banner */}
                <div className="bg-teal-50/70 border border-teal-100/80 rounded-xl p-3 flex gap-3 text-xs text-teal-850">
                  <div className="p-1 bg-teal-500 text-white rounded-lg self-start shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-slate-900 leading-none">Delivering via Larzoo Express</h5>
                    <p className="text-slate-600 text-[11px]">Sourced and matched from Koramangala Hub in <span className="font-bold underline text-teal-700">9 Mins</span>.</p>
                  </div>
                </div>

                {/* Products list items scroll */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Sourced Items</h4>
                  
                  {cartItems.map((item) => {
                    // Check bulk discounts info
                    const hasBulkDiscount = item.product.bulkDiscountRule;
                    const isBulkUnlocked = hasBulkDiscount && item.quantity >= hasBulkDiscount.minQty;
                    const normalPrice = item.product.price;
                    const bulkPrice = hasBulkDiscount ? normalPrice * (1 - hasBulkDiscount.discountPercent / 100) : normalPrice;
                    const displayPrice = isBulkUnlocked ? bulkPrice : normalPrice;

                    return (
                      <div 
                        key={item.product.id} 
                        className="bg-white border border-slate-100 rounded-xl p-3 flex gap-3 relative shadow-sm"
                      >
                        {/* Discount Sticker */}
                        {item.product.discount > 0 && (
                          <div className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded leading-none shrink-0 z-20">
                            {item.product.discount}% OFF
                          </div>
                        )}

                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-16 h-16 rounded-xl object-cover border border-slate-100 bg-slate-50 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <h5 className="text-xs font-extrabold text-slate-900 truncate leading-tight pr-4">{item.product.name}</h5>
                            <p className="text-[10px] text-slate-500 font-medium pt-0.5">{item.product.unit}</p>
                          </div>

                          <div className="flex justify-between items-end mt-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-extrabold text-slate-800">₹{Math.round(displayPrice)}</span>
                              {item.product.originalPrice > normalPrice && (
                                <span className="text-[9px] text-slate-400 line-through font-mono">₹{item.product.originalPrice}</span>
                              )}
                            </div>

                            {/* Qty Selector */}
                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg p-1">
                              <button 
                                onClick={() => {
                                  if (item.quantity === 1) {
                                    onRemoveItem(item.product.id);
                                  } else {
                                    onUpdateQty(item.product.id, item.quantity - 1);
                                  }
                                }}
                                className="p-0.5 hover:bg-white text-slate-550 hover:text-slate-900 rounded cursor-pointer transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-extrabold text-slate-900 w-4 text-center font-mono">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                                className="p-0.5 hover:bg-white text-slate-550 hover:text-slate-900 rounded cursor-pointer transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Dynamic Bulk Threshold Warning indicator */}
                          {hasBulkDiscount && (
                            <div className="mt-2 text-[10px] bg-sky-50 border border-sky-100 p-1.5 rounded-lg flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-sky-600 shrink-0" />
                              <span className="text-sky-850 font-medium leading-tight">
                                {isBulkUnlocked ? (
                                  <span className="font-extrabold text-emerald-750">✓ Unlocked: {hasBulkDiscount.discountPercent}% bulk discount applied!</span>
                                ) : (
                                  <span>Add <span className="font-black text-sky-700">{hasBulkDiscount.minQty - item.quantity} more</span> to grab <strong className="font-bold underline text-cyan-650">{hasBulkDiscount.discountPercent}% OFF bulk rate</strong>!</span>
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery details picker */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Delivery Preferences</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setDeliverySlot('express')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        deliverySlot === 'express'
                          ? 'bg-teal-50 border-teal-500 text-teal-950 font-extrabold shadow-sm'
                          : 'bg-white border-slate-150 text-slate-550 hover:text-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold">Instant Delivery</span>
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-[10px] text-slate-500 pt-1 leading-normal font-medium">9 Mins. Best for vegetables, essentials, & groceries.</p>
                    </button>

                    <button 
                      onClick={() => setDeliverySlot('scheduled')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        deliverySlot === 'scheduled'
                          ? 'bg-amber-50 border-amber-500 text-amber-950 font-extrabold shadow-sm'
                          : 'bg-white border-slate-150 text-slate-550 hover:text-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold">Bulk APMC Slot</span>
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                      <p className="text-[10px] text-slate-500 pt-1 leading-normal font-medium">Delivery tomorrow morning with heavy vehicle logistics.</p>
                    </button>
                  </div>
                </div>

                {/* Coupons block code */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Select Coupons & Offers</h4>
                  <div className="bg-white border border-slate-105 rounded-xl p-3.5 space-y-3 shadow-sm">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="ENTER COUPON CODE" 
                        className="flex-1 bg-slate-50 border border-slate-205 py-2 px-3 rounded-xl text-xs font-mono uppercase font-bold placeholder-slate-400 focus:outline-none focus:border-teal-400 transition-colors"
                      />
                      <button 
                        onClick={() => handleApplyCouponCode(couponInput)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-850 font-extrabold text-[10px] tracking-wider text-white uppercase rounded-xl transition-all cursor-pointer hover:shadow-md"
                      >
                        Apply
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 leading-tight">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {couponError}
                      </p>
                    )}
                    {couponSuccess && (
                      <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 leading-tight">
                        <Check className="w-3 h-3 shrink-0" /> {couponSuccess}
                      </p>
                    )}

                    {/* Quick click list */}
                    <div className="border-t border-slate-100 pt-3 space-y-2">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase font-mono">Click to Redeem Discount Voucher</p>
                      
                      <div className="space-y-2">
                        {COUPONS.map((cp) => {
                          const isEligible = subtotal >= cp.minOrder;
                          const active = selectedCoupon?.code === cp.code;
                          
                          return (
                            <div 
                              key={cp.code}
                              onClick={() => isEligible && handleApplyClick(cp)}
                              className={`p-2.5 border rounded-xl flex items-center justify-between text-left transition-all ${
                                !isEligible 
                                  ? 'opacity-40 border-slate-100 cursor-not-allowed bg-slate-50' 
                                  : active
                                  ? 'border-emerald-500 bg-emerald-500/5 text-slate-900 cursor-pointer'
                                  : 'border-slate-150 hover:border-teal-300 hover:bg-teal-50/20 cursor-pointer'
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-black text-xs px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 rounded leading-none">
                                    {cp.code}
                                  </span>
                                  {active && (
                                    <span className="text-[9px] bg-emerald-500 text-white font-extrabold px-1 py-0.5 rounded leading-none shrink-0">
                                      APPLIED
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10.5px] text-slate-600 font-medium pt-1 truncate">{cp.description}</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sourcing Order notes */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Special Sourcing Notes</h4>
                  <textarea 
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g., Ring bell. Call before arrival. Handover premium hotel towels to lobby desk..."
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs placeholder-slate-400 focus:outline-none focus:border-teal-500 font-sans"
                  />
                </div>
              </div>
            )}

            {/* Sticky Bills Action summary */}
            {!orderPlaced && cartItems.length > 0 && (
              <div className="p-4 bg-white border-t border-slate-100 space-y-3 shadow-lg shrink-0">
                <div className="space-y-1.5 text-xs text-slate-550 border-b border-dashed border-slate-100 pb-3">
                  <div className="flex justify-between">
                    <span>Sourced Basket Value:</span>
                    <span className="font-mono text-slate-800">₹{originalSubtotal.toLocaleString()}</span>
                  </div>
                  
                  {normalSavings > 0 && (
                    <div className="flex justify-between text-rose-500 font-medium">
                      <span>Store Product Discounts:</span>
                      <span className="font-mono">-₹{(normalSavings - bulkExtraSavings).toLocaleString()}</span>
                    </div>
                  )}

                  {bulkExtraSavings > 0 && (
                    <div className="flex justify-between text-cyan-600 font-semibold">
                      <span>🎉 Unlocked B2B Bulk Discounts:</span>
                      <span className="font-mono">-₹{bulkExtraSavings.toLocaleString()}</span>
                    </div>
                  )}

                  {selectedCoupon && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Redeemed Coupon ({selectedCoupon.code}):</span>
                      <span className="font-mono">-₹{couponDiscountValue.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Express Logistics Handlings:</span>
                    <span className="font-mono text-slate-800">₹{(deliveryFee + handlingFee).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-1">
                  <div>
                    <h5 className="text-xs text-slate-400 uppercase tracking-widest font-mono font-bold">Final Bill Rate</h5>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-slate-900 font-mono">₹{finalTotal.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 line-through font-mono">₹{originalSubtotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handlePlaceOrder}
                    className="h-12 px-6 bg-gradient-to-r from-teal-500 to-cyan-400 hover:brightness-110 active:scale-95 font-black text-center text-xs tracking-wider text-slate-950 uppercase rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-xl shadow-cyan-500/20"
                  >
                    <CreditCard className="w-4 h-4" />
                    Place Order Now
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
