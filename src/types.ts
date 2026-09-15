export interface Product {
  id: string;
  name: string;
  category: 'Hospital' | 'Hotel & Chef' | 'Security' | 'Industrial' | 'Corporate' | 'Custom Tees';
  price: number;
  originalPrice: number;
  bulkTierPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  description: string;
  badge?: string;
  tagColor?: string;
  sizes: string[];
  fabric: string;
  popularity: number;
  dateAdded: string;
  sku?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  qty: number;
  size: string;
  color: string;
  image: string;
  tierBadge?: string;
}

export interface PairedProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export type ViewTab =
  | 'home'
  | 'catalog'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'tracking'
  | 'account'
  | 'custom-bulk-order';
