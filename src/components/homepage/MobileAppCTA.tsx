import { Zap, Gift, MapPin, BadgePercent, Star, ArrowRight, QrCode, Smartphone, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MobileAppCTAProps {
  displayImage: string;
}

export const MobileAppCTA = ({ displayImage }: MobileAppCTAProps) => {
  return (
    <section className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] shadow-2xl">
          {/* Enhanced Background with Animated Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-rose-600 to-purple-700" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" />
          
          {/* Glowing Orbs */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 sm:p-12 lg:p-16 items-center">
            
            {/* Content Left Side */}
            <div className="lg:col-span-7 space-y-10 z-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-wide uppercase shadow-sm">
                  <Star size={16} className="text-amber-300 fill-amber-300" />
                  <span>4.9/5 Rating on App Store</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                  Your Favorite Food, <br/>
                  <span className="italic bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
                    Now in Your Pocket.
                  </span>
                </h2>
                
                <p className="text-lg sm:text-xl text-orange-50 max-w-xl leading-relaxed">
                  Experience lightning-fast ordering, exclusive app-only rewards, and real-time live tracking with the all-new FoodHub Mobile App.
                </p>
              </div>

              {/* Enhanced Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Zap, title: "Lightning Fast", desc: "1-tap easy ordering" },
                  { icon: Gift, title: "App-only Rewards", desc: "Earn points on every order" },
                  { icon: MapPin, title: "Live Tracking", desc: "Follow your food on the map" },
                  { icon: BadgePercent, title: "Priority Support", desc: "24/7 dedicated assistance" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="mt-1 h-12 w-12 shrink-0 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:bg-white/20 transition-all">
                      <item.icon className="text-amber-300" size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-orange-100/70 text-sm leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Area: Buttons & QR */}
              <div className="flex flex-col sm:flex-row items-center gap-8 pt-6 border-t border-white/10">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  {/* App Store Button */}
                  <Link href="https://apps.apple.com/app/foodhub" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-3 h-14 px-6 rounded-xl bg-black hover:bg-zinc-900 text-white border border-zinc-800 shadow-xl transition-transform hover:scale-105">
                    <Smartphone size={28} />
                    <div className="text-left flex flex-col justify-center">
                      <span className="text-[10px] uppercase font-semibold leading-none text-zinc-400">Download on the</span>
                      <span className="text-lg font-bold leading-none mt-1">App Store</span>
                    </div>
                  </Link>

                  {/* Google Play Button */}
                  <Link href="https://play.google.com/store/apps/details?id=com.foodhub" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-3 h-14 px-6 rounded-xl bg-white hover:bg-zinc-100 text-black border border-white/20 shadow-xl transition-transform hover:scale-105">
                    <Play size={24} className="ml-1" />
                    <div className="text-left flex flex-col justify-center">
                      <span className="text-[10px] uppercase font-semibold leading-none text-zinc-600">GET IT ON</span>
                      <span className="text-lg font-bold leading-none mt-1">Google Play</span>
                    </div>
                  </Link>
                </div>

                {/* QR Code Section - Hidden on small screens */}
                <div className="hidden lg:flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="h-16 w-16 bg-white p-1.5 rounded-xl shrink-0 shadow-lg flex items-center justify-center">
                    <QrCode className="text-zinc-900 w-full h-full" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-tight">Scan to <br/> Download</p>
                    <div className="flex items-center gap-1 mt-1 text-amber-300">
                      <ArrowRight size={14} />
                      <span className="text-xs font-bold uppercase tracking-wider">Free App</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Right Side: Enhanced Phone Mockup */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-12 lg:mt-0 perspective-1000">
              <div className="relative w-[280px] h-[580px] sm:w-[320px] sm:h-[650px] transform lg:rotate-[-5deg] hover:rotate-0 transition-transform duration-700 ease-out z-20">
                
                {/* Phone Frame */}
                <div className="absolute inset-0 bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-[6px] border-zinc-800/50">
                  <div className="absolute inset-0 rounded-[2.5rem] border border-zinc-700/50 pointer-events-none z-40" />
                  
                  {/* Screen Area */}
                  <div className="relative w-full h-full bg-white dark:bg-zinc-950 rounded-[2.25rem] overflow-hidden">
                    
                    {/* Dynamic Island / Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-900 rounded-b-3xl z-30" />
                    
                    {/* App Content Image */}
                    <div className="absolute inset-0 w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-10" />
                      <Image
                        src={displayImage}
                        alt="FoodHub App Interface"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    {/* App UI Overlay Elements */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 space-y-4">
                      {/* Floating Order Notification */}
                      <div className="bg-white/95 dark:bg-black/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20 dark:border-zinc-800 flex items-center gap-4 transform translate-y-2 hover:-translate-y-1 transition-transform">
                        <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <Zap className="text-emerald-500 w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Arriving in</p>
                          <p className="text-sm font-black text-zinc-900 dark:text-white">12 Minutes</p>
                        </div>
                      </div>

                      {/* Mock Home Bar */}
                      <div className="w-1/3 h-1.5 bg-white/50 rounded-full mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements Around Phone */}
                <div className="absolute -left-12 top-1/4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 dark:border-zinc-800 animate-[bounce_3s_infinite] z-30">
                  <Star className="text-amber-500 fill-amber-500 w-8 h-8" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 dark:border-zinc-800 animate-[bounce_4s_infinite_1s] z-30">
                  <Gift className="text-rose-500 w-8 h-8" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
