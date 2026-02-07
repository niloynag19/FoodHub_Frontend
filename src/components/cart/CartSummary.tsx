"use client";

import CheckoutButton from "../checkout/CheckoutForm";


interface CartSummaryProps {
  cartItems: any[];
  providerId: string;
}

export default function CartSummary({ cartItems, providerId }: CartSummaryProps) {
  const totalPrice = cartItems.reduce((acc, item) => 
    acc + (item.price * item.quantity), 0
  );

  return (
    <div className="max-w-4xl mx-auto mt-16 px-4">
      <div className="bg-white rounded-[3.5rem] p-8 md:p-14 border border-zinc-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden group">
        
    
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
          
          <div className="text-center md:text-left space-y-3">
            <p className="text-zinc-400 font-black uppercase text-[10px] tracking-[0.4em] mb-1">
              Final Payable Amount
            </p>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <span className="text-7xl font-black text-zinc-900 tracking-tighter">
                {totalPrice}
              </span>
              <div className="flex flex-col -space-y-1">
                <span className="text-2xl font-black text-orange-600 italic">TK</span>
                <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">BDT</span>
              </div>
            </div>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full inline-block">
              Free Delivery Included
            </p>
          </div>

          
          <div className="w-full md:w-[350px] space-y-4">
            <CheckoutButton cartItems={cartItems} providerId={providerId} />
            <div className="flex justify-center items-center gap-4 text-zinc-300">
              <div className="h-[1px] w-full bg-zinc-100" />
              <span className="text-[9px] font-black uppercase whitespace-nowrap tracking-widest">
                Secure SSL
              </span>
              <div className="h-[1px] w-full bg-zinc-100" />
            </div>
          </div>
        </div>

        <div className="absolute -right-20 -bottom-20 h-80 w-80 bg-orange-50 rounded-full blur-[100px] opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
        <div className="absolute -left-20 -top-20 h-60 w-60 bg-zinc-50 rounded-full blur-[80px] opacity-40" />
      </div>
    </div>
  );
}