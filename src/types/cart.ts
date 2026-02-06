export interface CartItem {
  id: string;
  mealId: string;
  quantity: number;
  price: number;
  meal: {
    name: string;
    image: string;
    price: number;
  };
}

export interface CartData {
  id: string;
  userId: string;
  items: CartItem[];
}