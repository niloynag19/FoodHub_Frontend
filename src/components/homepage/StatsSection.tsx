"use client";

import { useRef } from "react";
import { Users, Store, Timer, Star, MapPin, ShoppingBag, TrendingUp, Award, Activity } from "lucide-react";
import { motion, useInView } from "framer-motion";

export const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      title: "Active Users",
      value: "500K+",
      description: "Food lovers across the country ordering their favorite meals daily.",
      icon: Users,
      trend: "+15% this month",
      colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
      bgClass: "bg-gradient-to-br from-orange-500/10 to-orange-600/5 dark:from-orange-500/20 dark:to-orange-600/5",
      borderClass: "border-orange-500/20",
      iconBg: "bg-orange-500/20 text-orange-600 dark:text-orange-400",
    },
    {
      title: "Partner Restaurants",
      value: "2,500+",
      description: "Top-rated local & global culinary brands.",
      icon: Store,
      trend: "+50 new this week",
      colSpan: "col-span-1 lg:col-span-1",
      bgClass: "bg-white dark:bg-zinc-900/80 backdrop-blur-xl",
      borderClass: "border-zinc-200 dark:border-zinc-800",
      iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "App Rating",
      value: "4.9/5",
      description: "Based on 2M+ verified reviews.",
      icon: Star,
      trend: "Top 10 App",
      colSpan: "col-span-1 lg:col-span-1",
      bgClass: "bg-white dark:bg-zinc-900/80 backdrop-blur-xl",
      borderClass: "border-zinc-200 dark:border-zinc-800",
      iconBg: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Average Delivery",
      value: "22 Min",
      description: "From the kitchen to your door, piping hot.",
      icon: Timer,
      trend: "Fastest in the city",
      colSpan: "col-span-1 lg:col-span-1",
      bgClass: "bg-white dark:bg-zinc-900/80 backdrop-blur-xl",
      borderClass: "border-zinc-200 dark:border-zinc-800",
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Cities Covered",
      value: "45+",
      description: "Expanding rapidly across the nation.",
      icon: MapPin,
      trend: "3 new cities",
      colSpan: "col-span-1 lg:col-span-1",
      bgClass: "bg-white dark:bg-zinc-900/80 backdrop-blur-xl",
      borderClass: "border-zinc-200 dark:border-zinc-800",
      iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      title: "Daily Orders",
      value: "100K+",
      description: "Millions of meals successfully delivered with a smile every single day.",
      icon: ShoppingBag,
      trend: "Record breaking",
      colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
      bgClass: "bg-gradient-to-tr from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 text-white shadow-xl shadow-zinc-900/20",
      borderClass: "border-zinc-800 dark:border-zinc-700",
      iconBg: "bg-white/10 text-white",
      isDark: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="py-16 relative overflow-hidden bg-orange-50/60 dark:bg-zinc-900/50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 dark:bg-orange-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />
      
      {/* Animated subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:[mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold tracking-wide uppercase mb-4 shadow-sm border border-orange-200/50 dark:border-orange-800/50"
          >
            <Activity size={14} className="animate-pulse" />
            Industry Leading Platform
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight"
          >
            By The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 italic">Numbers</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
          >
            We've built a robust platform that scales with your appetite. See why millions of users and thousands of restaurants choose FoodHub.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[minmax(160px,auto)]"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.01 }}
              className={`group relative rounded-[1.5rem] p-6 border ${stat.borderClass} ${stat.bgClass} ${stat.colSpan} overflow-hidden transition-all duration-300 flex flex-col justify-between`}
            >
              {/* Card Background Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl ${stat.iconBg} shadow-inner`}>
                  <stat.icon size={22} strokeWidth={2.5} />
                </div>
                {stat.trend && (
                  <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-sm ${stat.isDark ? 'bg-white/20 text-white backdrop-blur-md' : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 border border-green-200/50 dark:border-green-800/50'}`}>
                    <TrendingUp size={12} strokeWidth={2.5} />
                    {stat.trend}
                  </div>
                )}
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-1.5 ${stat.isDark ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
                  {stat.value}
                </h3>
                <p className={`text-base md:text-lg font-extrabold mb-1 ${stat.isDark ? 'text-white/95' : 'text-zinc-800 dark:text-zinc-200'}`}>
                  {stat.title}
                </p>
                <p className={`text-xs md:text-sm leading-relaxed ${stat.isDark ? 'text-zinc-300' : 'text-zinc-500 dark:text-zinc-400'}`}>
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
