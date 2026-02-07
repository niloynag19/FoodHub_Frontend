"use client";

import { UtensilsCrossed } from "lucide-react";

export default function Loading() {
  const tips = [
    "Check your delivery address for faster service.",
    "Browse meals by categories to find your favorites.",
    "Verified restaurants ensure the highest hygiene standards.",
    "Save your favorite meals to order them quickly next time.",
    "Check the 'Offers' section for exciting daily deals!",
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full">
        
        {/* Animated Logo Section */}
        <div className="mb-12 flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-20 animate-pulse rounded-full"></div>
            <div className="relative w-20 h-20 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-3xl flex items-center justify-center shadow-2xl rotate-3">
              <UtensilsCrossed className="size-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tighter italic text-white">
            Food<span className="text-orange-500">Hub</span>
          </h1>
        </div>

        {/* Modern Dot Loader */}
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        {/* Text Section */}
        <div className="space-y-3 mb-12">
          <h2 className="text-2xl font-bold text-gray-100">
            Fueling your journey...
          </h2>
          <p className="text-gray-500 font-medium">
            Preparing personalized meal recommendations for you
          </p>
        </div>

        {/* Sleek Progress Bar */}
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-12">
          <div className="h-full bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 animate-progress-flow" 
               style={{ width: '100%' }} />
        </div>


        <div className="p-6 bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden h-24 flex items-center justify-center">
          <div className="relative w-full h-full">
            {tips.map((tip, index) => (
              <p 
                key={index}
                className="absolute inset-0 flex items-center justify-center text-sm leading-relaxed text-gray-300 italic font-medium opacity-0 animate-tip-fade"
                style={{ animationDelay: `${index * 4}s` }}
              >
                &quot;{tip}&quot;
              </p>
            ))}
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 font-bold text-orange-500 uppercase tracking-widest text-[10px]">
              Pro Tip
            </span>
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-12 text-zinc-600 text-[10px] font-medium uppercase tracking-[0.2em]">
          © 2026 FoodHub. All rights reserved.
        </p>
      </div>

      <style jsx global>{`
        @keyframes progress-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes tip-fade {
          0% { opacity: 0; transform: translateY(10px); }
          5% { opacity: 1; transform: translateY(0); }
          20% { opacity: 1; transform: translateY(0); }
          25% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 0; }
        }

        .animate-progress-flow {
          animation: progress-flow 2s infinite ease-in-out;
        }

        .animate-tip-fade {
          animation: tip-fade 20s infinite; /* Total time = tips count * 4s */
        }
      `}</style>
    </div>
  );
}