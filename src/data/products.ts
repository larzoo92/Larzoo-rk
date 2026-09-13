import { Product, Coupon } from '../types';

export const CATEGORIES = [
  { id: 'groceries', name: 'Groceries', emoji: '🌾', color: 'bg-amber-50 text-amber-700 border-amber-200', desc: 'Atta, Rice, Dal, Oil' },
  { id: 'vegetables', name: 'Fruits & Vegetables', emoji: '🥦', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', desc: 'Fresh & Handpicked' },
  { id: 'electronics', name: 'Electronics', emoji: '🔌', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', desc: 'Devices & Accessories' },
  { id: 'home', name: 'Home Essentials', emoji: '🧼', color: 'bg-rose-50 text-rose-700 border-rose-200', desc: 'Cleaners & Disinfectants' },
  { id: 'personal', name: 'Personal Care', emoji: '🧴', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', desc: 'Beauty & Hygiene' },
  { id: 'construction', name: 'Construction Materials', emoji: '🏗️', color: 'bg-orange-50 text-orange-700 border-orange-200', desc: 'Cement, Bars & Bricks' },
  { id: 'hotel', name: 'Hotel Supplies', emoji: '🏨', color: 'bg-sky-50 text-sky-700 border-sky-200', desc: 'Towels, Linens, Soaps' },
  { id: 'restaurant', name: 'Restaurant Supplies', emoji: '🍽️', color: 'bg-violet-50 text-violet-700 border-violet-200', desc: 'Plates, Cutlery & Pans' },
  { id: 'industrial', name: 'Industrial Products', emoji: '🥽', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', desc: 'Drills, Safety Helmets' },
  { id: 'logistics', name: 'Logistics Services', emoji: '🚚', color: 'bg-teal-50 text-teal-700 border-teal-200', desc: 'Full-Truck & Cargo slots' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'g1',
    name: 'Fortune Premium Kachi Ghani Mustard Oil',
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80&auto=format&fit=crop',
    unit: '1 Litre',
    price: 172,
    originalPrice: 195,
    discount: 11,
    rating: 4.8,
    reviewsCount: 1420,
    stars: 5,
    isBestseller: true,
    stock: 50,
    description: '100% pure cold-pressed mustard oil with a robust aroma and intense flavor. Ideal for traditional cooking.'
  },
  {
    id: 'g2',
    name: 'Aashirvaad Shudh Chakki Atta',
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80&auto=format&fit=crop',
    unit: '10 kg',
    price: 430,
    originalPrice: 495,
    discount: 13,
    rating: 4.9,
    reviewsCount: 4239,
    stars: 5,
    isBestseller: true,
    stock: 25,
    description: 'Made from premium quality heavy grains, ground in traditional stone chakki.'
  },
  {
    id: 'g3',
    name: 'Daawat Rozana Gold Basmati Rice',
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80&auto=format&fit=crop',
    unit: '5 kg',
    price: 369,
    originalPrice: 485,
    discount: 24,
    rating: 4.7,
    reviewsCount: 915,
    stars: 4,
    isBestseller: true,
    stock: 40,
    description: 'Long grain aromatic rice grown in the foothill soils of the Himalayas.'
  },
  {
    id: 'g4',
    name: 'Tata Salt - Vacuum Evaporated Iodized',
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&q=80&auto=format&fit=crop',
    unit: '1 kg',
    price: 28,
    originalPrice: 30,
    discount: 6,
    rating: 4.9,
    reviewsCount: 8122,
    stars: 5,
    isBestseller: true,
    stock: 120,
    description: 'Purity and iodine assurance in every single crystal.'
  },
  {
    id: 'v1',
    name: 'Farm-Fresh Red Onions (Pyaaz)',
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=500&q=80&auto=format&fit=crop',
    unit: '1 kg',
    price: 38,
    originalPrice: 65,
    discount: 41,
    rating: 4.6,
    reviewsCount: 618,
    stars: 4,
    isBestseller: true,
    stock: 300,
    description: 'Sourced directly from farmers in Maharashtra. Handpicked, cured, and stored cleanly.'
  },
  {
    id: 'g5',
    name: 'Saffola Gold Refined Sunflower Oil',
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80&auto=format&fit=crop',
    unit: '1 Litre',
    price: 145,
    originalPrice: 177,
    discount: 18,
    rating: 4.7,
    reviewsCount: 890,
    stars: 5,
    isBestseller: true,
    stock: 65,
    description: 'Dual seed technology offers the goodness of two oils in one with antioxidants.'
  },
  
  // Extra products matching the category rows
  {
    id: 'e1',
    name: 'OnePlus Nord Buds 2r TWS',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80&auto=format&fit=crop',
    unit: '1 Unit',
    price: 1899,
    originalPrice: 2299,
    discount: 17,
    rating: 4.5,
    reviewsCount: 1450,
    stars: 4,
    stock: 12,
    description: 'True wireless earbuds with 12.4mm dynamic drivers.'
  },
  {
    id: 'ho1',
    name: 'Premium 100% Cotton Hotel Bath Towels',
    category: 'hotel',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=500&q=80&auto=format&fit=crop',
    unit: 'Set of 6 (600 GSM)',
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.7,
    reviewsCount: 312,
    stars: 4,
    stock: 35,
    description: 'Ultra-absorbent luxury cotton towels for premium resorts.'
  },
  {
    id: 'r1',
    name: 'Eco-Friendly Bioplastic Takeout Containers',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80&auto=format&fit=crop',
    unit: 'Pack of 100',
    price: 549,
    originalPrice: 899,
    discount: 38,
    rating: 4.7,
    reviewsCount: 388,
    stars: 5,
    stock: 90,
    description: 'Biodegradable sugarcane pulp boxes.'
  },
  {
    id: 'c1',
    name: 'Ultratech Premium OPC 53 Grade Cement',
    category: 'construction',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=500&q=80&auto=format&fit=crop',
    unit: '50 kg Bag',
    price: 435,
    originalPrice: 520,
    discount: 16,
    rating: 4.8,
    reviewsCount: 531,
    stars: 5,
    stock: 150,
    description: 'High compressive strength cement for heavy RCC structures.'
  }
];

export const COUPONS: Coupon[] = [
  {
    code: 'ZEPTOZOOM',
    discount: 100,
    type: 'fixed',
    minOrder: 499,
    description: '₹100 discount on cart value above ₹499!'
  },
  {
    code: 'LARZOOBULK',
    discount: 15,
    type: 'percentage',
    minOrder: 2500,
    description: '15% off on orders above ₹2,500!'
  }
];
