
"use client";

import { Utensils, Coffee, Pizza, IceCream, Moon } from "lucide-react";

const categories = [
  { name: "All", icon: <Utensils size={18} /> },
  { name: "Breakfast", icon: <Coffee size={18} /> },
  { name: "Lunch", icon: <Pizza size={18} /> },
  { name: "Dinner", icon: <Moon size={18} /> },
  { name: "Dessert", icon: <IceCream size={18} /> },
];

export default function CategoryFilter() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat.name}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:border-orange-500 hover:text-orange-600 transition-all font-bold whitespace-nowrap active:scale-95"
        >
          {cat.icon}
          {cat.name}
        </button>
      ))}
    </div>
  );
}