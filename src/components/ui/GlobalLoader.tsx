"use client";

import { UtensilsCrossed, ChefHat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function GlobalLoader() {
  const [currentTip, setCurrentTip] = useState(0);
  const tips = [
    "Check your delivery address for faster service.",
    "Browse meals by categories to find your favorites.",
    "Verified restaurants ensure the highest hygiene standards.",
    "Save your favorite meals to order them quickly next time.",
    "Check the 'Offers' section for exciting daily deals!",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [tips.length]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 text-center bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl">
      <div className="max-w-md w-full relative">
        
        {/* Animated Logo Section */}
        <div className="mb-12 flex flex-col items-center gap-6 relative">
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-30 dark:opacity-20 rounded-full"></div>
            <div className="relative w-24 h-24 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-[2rem] flex items-center justify-center shadow-2xl border-4 border-white dark:border-zinc-900">
              <UtensilsCrossed className="size-12 text-white" strokeWidth={2.5} />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tighter italic text-zinc-900 dark:text-white"
          >
            Food<span className="text-orange-500">Hub</span>
          </motion.h1>
        </div>

        {/* Text Section */}
        <div className="space-y-3 mb-10">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-black tracking-tight text-zinc-800 dark:text-zinc-100"
          >
            Crafting your experience...
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-zinc-500 dark:text-zinc-400 font-medium"
          >
            Preparing personalized meal recommendations
          </motion.p>
        </div>

        {/* Sleek Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-12 relative"
        >
          <motion.div 
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-orange-500 to-transparent" 
          />
        </motion.div>

        {/* Pro Tips Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none overflow-hidden h-28 flex flex-col items-center justify-center relative mt-6"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm z-10">
             <ChefHat size={12} className="text-orange-500" />
             <span className="font-black text-orange-500 uppercase tracking-widest text-[9px]">
               Pro Tip
             </span>
          </div>
          <div className="w-full relative flex items-center justify-center mt-2 h-full">
            <AnimatePresence mode="wait">
              <motion.p 
                key={currentTip}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 italic font-medium absolute text-center w-full px-4"
              >
                "{tips[currentTip]}"
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
