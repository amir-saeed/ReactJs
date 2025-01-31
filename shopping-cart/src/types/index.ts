export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface ProductState {
  items: Product[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
}
