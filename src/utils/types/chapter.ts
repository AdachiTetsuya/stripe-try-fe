export interface Chapter {
  id: number;
  title: string;
  isFree: boolean;
  price: number;
  productId: string;
  priceId: string;
  isLocked: boolean;
}
export interface ChapterAPI {
  id: number;
  title: string;
  is_free: boolean;
  price: number;
  product_id: string;
  price_id: string;
  is_locked: boolean;
}
