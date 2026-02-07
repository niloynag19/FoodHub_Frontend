import { getCartAction } from "@/actions/customer.actions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DeleteCartItem from "@/components/cart/DeleteCartItem";
import Link from "next/link";
import CheckoutButton from "@/components/checkout/CheckoutForm";
import { Global_Image } from "@/lib/defaultImage";

export default async function CartPage() {
  const result = await getCartAction();
  const cart = result?.data;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-muted-foreground">Add some delicious meals to your cart to get started!</p>
        <Link href="/meals" className="mt-4">
          <Button variant="outline" className="rounded-full">Browse Meals</Button>
        </Link>
      </div>
    );
  }

  const totalAmount = cart.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-orange-600">My Cart 🛒</h1>

      <div className="grid gap-6">
        {cart.items.map((item: any) => (
          <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-[1.2rem] shadow-sm border border-orange-50 dark:border-zinc-800">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-100">
              <Image
                src={Global_Image}
                alt={item.meal.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-grow">
              <h3 className="font-bold text-lg">{item.meal.name}</h3>
              <p className="text-orange-600 font-semibold">{item.price} TK × {item.quantity}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <p className="font-bold text-xl">{item.price * item.quantity} TK</p>
              <DeleteCartItem itemId={item.id} />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-10 p-6 bg-orange-600 rounded-[1.5rem] text-white flex justify-between items-center shadow-xl shadow-orange-100 dark:shadow-none">
        <div>
          <p className="opacity-80 text-sm">Total Amount</p>
          <h2 className="text-3xl font-black">{totalAmount} TK</h2>
        </div>
        <CheckoutButton
          cartItems={cart.items}

          providerId={cart.items[0]?.meal?.providerId || cart.items[0]?.providerId}
        />
      </div>
    </div>
  );
}