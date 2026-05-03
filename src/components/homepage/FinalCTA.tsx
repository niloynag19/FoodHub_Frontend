import { ArrowRight, Sparkles, Utensils, Users, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const FinalCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black dark:from-zinc-900 dark:via-black dark:to-zinc-950 border border-zinc-800 shadow-2xl p-8 sm:p-16 lg:p-20 text-center">
          
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-gradient-to-b from-orange-500/20 via-rose-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
          
          {/* Floating Accents */}
          <div className="hidden md:flex absolute top-16 left-16 h-16 w-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl items-center justify-center rotate-12 animate-[bounce_4s_infinite]">
            <Utensils className="text-orange-400 w-8 h-8" />
          </div>
          <div className="hidden md:flex absolute bottom-16 right-16 h-16 w-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl items-center justify-center -rotate-12 animate-[bounce_5s_infinite_1s]">
            <Sparkles className="text-rose-400 w-8 h-8" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            {/* Header */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-sm font-bold tracking-wide uppercase shadow-sm mx-auto">
                <Users size={16} className="text-orange-400" />
                <span className="opacity-90">Join 50,000+ Foodies Today</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
                Ready to Experience <br/>
                <span className="italic bg-gradient-to-r from-orange-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                  Foodhub?
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Whether you're looking to satisfy your cravings or grow your restaurant business, you're in the perfect place to start.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
              <Button
                asChild
                size="lg"
                className="h-16 px-10 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-lg font-bold gap-3 shadow-xl hover:shadow-orange-500/25 transition-all hover:-translate-y-1 group w-full sm:w-auto"
              >
                <Link href="/register?role=customer">
                  Order Food Now
                  <ArrowRight
                    className="group-hover:translate-x-1.5 transition-transform"
                    size={20}
                  />
                </Link>
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-16 px-10 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/20 hover:border-orange-500/50 hover:text-orange-400 text-white text-lg font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 gap-3 group w-full sm:w-auto backdrop-blur-md"
              >
                <Link href="/register?role=provider">
                  <Store size={20} className="group-hover:scale-110 transition-transform" />
                  Become a Partner
                </Link>
              </Button>
            </div>

            {/* Micro-footer inside CTA */}
            <p className="text-sm text-zinc-500 font-medium">
              No credit card required • Free to sign up • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
