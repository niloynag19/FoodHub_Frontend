"use client";

import { Search, ChefHat, CreditCard, Truck, CheckCircle2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: Search,
      step: "01",
      title: "Discover Local Flavors",
      desc: "Enter your address and explore thousands of top-rated restaurants near you.",
      features: ["Filter by cuisine type", "View real customer reviews", "Find exclusive deals"],
      color: "from-blue-500 to-indigo-500",
      shadow: "shadow-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: ChefHat,
      step: "02",
      title: "Customize Your Meal",
      desc: "Pick your favorite dishes and customize them exactly how you like.",
      features: ["Add special instructions", "Choose portion sizes", "Add extras & sides"],
      color: "from-orange-500 to-amber-500",
      shadow: "shadow-orange-500/20",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: CreditCard,
      step: "03",
      title: "Seamless Checkout",
      desc: "Pay securely with multiple payment options in just a few taps.",
      features: ["Multiple payment methods", "Save cards for later", "Apply promo codes"],
      color: "from-rose-500 to-pink-500",
      shadow: "shadow-rose-500/20",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
    {
      icon: Truck,
      step: "04",
      title: "Real-time Tracking",
      desc: "Watch your order journey from the restaurant kitchen straight to your door.",
      features: ["Live GPS tracking", "Estimated time of arrival", "Contactless delivery"],
      color: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const } 
    },
  };

  return (
    <section className="py-20 relative bg-slate-100 dark:bg-zinc-800/40 overflow-hidden" ref={ref}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="h-1 w-6 bg-gradient-to-r from-orange-500 to-transparent rounded-full" />
            <span className="text-orange-600 dark:text-orange-500 font-black uppercase text-xs tracking-widest bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">
              Simple Steps
            </span>
            <div className="h-1 w-6 bg-gradient-to-l from-orange-500 to-transparent rounded-full" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
              How It{" "}
            </span>
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent italic">
              Works
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            Your favorite meals delivered hot and fresh in 4 simple steps. We've optimized the entire process to ensure a seamless experience.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative"
        >
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-blue-200 via-orange-200 to-emerald-200 dark:from-blue-900/50 dark:via-orange-900/50 dark:to-emerald-900/50 z-0" />

          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="relative group z-10 flex flex-col h-full"
            >
              <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-[2rem] p-8 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 flex-grow hover:-translate-y-2 group-hover:border-orange-200 dark:group-hover:border-orange-900/50">
                
                {/* Step Number Badge */}
                <div className="absolute top-6 right-6 text-5xl font-black text-zinc-100 dark:text-zinc-800/60 select-none group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>

                {/* Icon Container */}
                <div className="relative mb-8">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                  <div className={`relative h-20 w-20 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-100 dark:border-zinc-700 shadow-sm ${step.shadow}`}>
                    <step.icon size={36} className={step.iconColor} strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                    {step.desc}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${step.iconColor}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
