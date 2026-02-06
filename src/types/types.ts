
export interface Category {
  id: string;
  name: string;
}


export interface Provider {
  id: string;
  name: string;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  providerId: string;
  categoryId: string;
  category: Category;   
  provider: Provider;   
  reviews?: any[];
}

export interface CartPayload {
  mealId: string;
  quantity: number;
  price: number;
}

export interface CartResponse {
  success: boolean;
  message: string;
  data?: any;
}


