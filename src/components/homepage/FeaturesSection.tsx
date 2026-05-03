import { ShieldCheck, Clock, BadgePercent, Trophy, Sparkles, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Lightning Fast Delivery",
      desc: "Our proprietary routing system ensures your food arrives hot and fresh, typically under 30 minutes.",
      highlight: "Under 30 Mins",
      color: "from-orange-500 to-rose-500",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
      stats: "99% On-time"
    },
    {
      icon: Trophy,
      title: "Premium Quality",
      desc: "We partner exclusively with top-rated restaurants and Michelin-starred chefs in your area.",
      highlight: "Top 1% Rated",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
      stats: "500+ Chefs"
    },
    {
      icon: ShieldCheck,
      title: "100% Safe & Secure",
      desc: "Strict hygiene protocols, tamper-proof packaging, and contactless delivery for your peace of mind.",
      highlight: "ISO Certified",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
      stats: "Zero Contact"
    },
    {
      icon: BadgePercent,
      title: "Unbeatable Offers",
      desc: "Enjoy daily flash sales, exclusive loyalty rewards, and up to 50% off on your favorite meals.",
      highlight: "Save Big",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-500",
      stats: "Daily Deals"
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-black transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-lighten" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-bold tracking-wide uppercase border border-orange-200/50 dark:border-orange-500/20 shadow-sm">
            <Sparkles size={16} className="animate-pulse" />
            The FoodHub Advantage
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tight">
            Why We're The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 italic">Best Choice</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
            We go above and beyond to deliver not just food, but an exceptional culinary experience directly to your doorstep.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              {/* Animated Border Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
              
              {/* Card */}
              <div className="relative h-full bg-white dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2rem] p-8 border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg shadow-zinc-200/20 dark:shadow-none hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col">
                
                {/* Top Corner Decoration */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${feature.color} opacity-10 rounded-bl-[4rem] -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-700 ease-out`} />

                {/* Header: Icon & Highlight Tag */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className={`h-16 w-16 ${feature.bgColor} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner`}>
                    <feature.icon className={`${feature.iconColor}`} size={32} strokeWidth={2} />
                  </div>
                  <span className={`px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-300 rounded-full border border-zinc-200 dark:border-zinc-700`}>
                    {feature.highlight}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-4 relative z-10 flex-grow">
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-zinc-900 group-hover:to-zinc-600 dark:group-hover:from-white dark:group-hover:to-zinc-400 transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>

                {/* Bottom Stats / Action */}
                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <Star className={`w-4 h-4 ${feature.iconColor} fill-current opacity-75`} />
                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{feature.stats}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full ${feature.bgColor} flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`}>
                    <ArrowRight className={`w-4 h-4 ${feature.iconColor}`} />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
