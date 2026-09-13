export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  unit: string; // e.g., "1 kg", "500g", "1 Bag", "Pack of 4"
  price: number; // Current discounted price
  originalPrice: number; // Strikethrough price
  discount: number; // Percentage off, e.g., 20
  rating: number;
  reviewsCount: number;
  stars: number;
  isBestseller?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  stock: number;
  description: string;
  bulkDiscountRule?: {
    minQty: number;
    discountPercent: number;
    label: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discount: number; // Absolute discount in ₹ or percentage
  type: 'fixed' | 'percentage';
  minOrder: number;
  description: string;
}
