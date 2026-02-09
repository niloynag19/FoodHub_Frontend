import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Global_Image } from "@/lib/defaultImage";
import { 
  Search, ShoppingBag, Zap, ShieldCheck, Star, ArrowRight, 
  UtensilsCrossed, CheckCircle2, ChevronRight, Users, Truck, Quote, Plus,
  MapPin, Clock, Phone, Sparkles, ChefHat, Leaf, Clock4, Trophy, Download,
  BadgePercent, Gift
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const displayImage = Global_Image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop";

  const categories = [
    { name: "Burgers", icon: UtensilsCrossed, color: "from-orange-500 to-red-500", count: 120 },
    { name: "Pizza", icon: ChefHat, color: "from-yellow-500 to-orange-500", count: 85 },
    { name: "Biryani", icon: Sparkles, color: "from-amber-600 to-amber-800", count: 45 },
    { name: "Desserts", icon: Gift, color: "from-pink-500 to-rose-500", count: 62 },
    { name: "Healthy", icon: Leaf, color: "from-green-500 to-emerald-600", count: 78 },
    { name: "Pasta", icon: UtensilsCrossed, color: "from-blue-500 to-indigo-500", count: 54 },
  ];

  const stats = [
    { icon: Users, value: "50k+", label: "Active Users", suffix: "users" },
    { icon: UtensilsCrossed, value: "500+", label: "Restaurants", suffix: "partners" },
    { icon: Clock4, value: "15-30", label: "Avg Delivery", suffix: "minutes" },
    { icon: Star, value: "4.9", label: "Rating", suffix: "/5 stars" },
  ];

  const features = [
    { icon: ShieldCheck, title: "100% Safe", desc: "Hygienic packaging & contactless delivery" },
    { icon: Clock, title: "30 Min Delivery", desc: "Get your food hot and fresh in minutes" },
    { icon: BadgePercent, title: "Best Offers", desc: "Exclusive discounts for our customers" },
    { icon: Trophy, title: "Premium Quality", desc: "Curated selection of top restaurants" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/20 to-white dark:from-zinc-950 dark:via-zinc-900/50 dark:to-zinc-950 transition-colors duration-300">
      
      {/* Hero Section - Redesigned */}
      <section className="relative pt-20 lg:pt-28 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-purple-50/30 dark:from-orange-950/10 dark:via-transparent dark:to-purple-950/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 max-w-xl">
              <div className="inline-flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-md opacity-50" />
                  <div className="relative flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-2 rounded-full">
                    <Zap className="fill-current" size={16} />
                    <span className="text-xs font-black uppercase tracking-wider">Fastest Delivery in BD</span>
                  </div>
                </div>
                <div className="h-1 w-8 bg-gradient-to-r from-orange-500 to-transparent rounded-full" />
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[0.95]">
                  <span className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-white bg-clip-text text-transparent">
                    CRAVING?
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent italic">
                    WE DELIVER
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-white bg-clip-text text-transparent">
                    HAPPINESS.
                  </span>
                </h1>
                
                <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium max-w-md leading-relaxed">
                  Fresh food from 500+ top restaurants delivered to your doorstep in minutes. 
                  Your satisfaction is our priority.
                </p>
              </div>

              {/* Search Bar */}
              <div className="space-y-4">
                <div className="relative group max-w-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="relative flex items-center bg-white dark:bg-zinc-900 rounded-2xl p-1 shadow-lg border border-zinc-200 dark:border-zinc-800 group-hover:shadow-xl transition-all duration-300">
                    <Search className="ml-4 text-zinc-400" size={20} />
                    <Input 
                      placeholder="Search restaurants, cuisines, or dishes..." 
                      className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base py-6 placeholder:text-zinc-400"
                    />
                    <Button className="h-full px-8 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold gap-2 transition-all duration-300">
                      <Search size={18} />
                      Search
                    </Button>
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">Popular:</span>
                  {["Burger", "Pizza", "Biryani", "Sushi", "Pasta"].map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:pl-12">
              <div className="relative max-w-lg mx-auto">
                {/* Floating Badges */}
                <div className="absolute -top-4 -left-4 z-20">
                  <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-3 animate-float">
                    <div className="h-12 w-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                      <ShieldCheck className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white">100% Fresh</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Quality Guaranteed</p>
                    </div>
                  </div>
                </div>

                {/* Main Image */}
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-purple-500/20 z-10" />
                  <Image 
                    src={displayImage} 
                    alt="Delicious Food" 
                    fill 
                    className="object-cover scale-110 hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>

                {/* Delivery Time Badge */}
                <div className="absolute -bottom-4 -right-4 z-20">
                  <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white p-4 rounded-2xl shadow-2xl">
                    <div className="flex items-center gap-2">
                      <Clock className="animate-pulse" size={20} />
                      <div>
                        <p className="text-sm font-bold">30 MIN</p>
                        <p className="text-xs opacity-90">Delivery Time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-white dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200/50 dark:border-zinc-800/50 group-hover:border-orange-200 dark:group-hover:border-orange-900/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-xl flex items-center justify-center">
                      <stat.icon className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <p className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">{stat.suffix}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-1 w-6 bg-gradient-to-r from-orange-500 to-transparent rounded-full" />
              <span className="text-orange-600 font-black uppercase text-xs tracking-widest">Simple Steps</span>
              <div className="h-1 w-6 bg-gradient-to-l from-orange-500 to-transparent rounded-full" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                How It{" "}
              </span>
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent italic">
                Works
              </span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              Get your favorite food in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-orange-200 dark:via-orange-900/50 to-transparent" />
            
            {[
              { 
                icon: MapPin, 
                step: "01",
                title: "Set Location", 
                desc: "Enter your delivery address to see available restaurants",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                icon: UtensilsCrossed, 
                step: "02",
                title: "Choose Food", 
                desc: "Browse thousands of dishes from top-rated restaurants",
                color: "from-orange-500 to-amber-500"
              },
              { 
                icon: Truck, 
                step: "03",
                title: "Fast Delivery", 
                desc: "Get your food delivered hot and fresh in 30 minutes",
                color: "from-green-500 to-emerald-500"
              },
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white dark:bg-zinc-900/50 backdrop-blur-sm rounded-3xl p-8 border border-zinc-200/50 dark:border-zinc-800/50 group-hover:border-orange-200 dark:group-hover:border-orange-900/50 transition-all duration-300">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-md opacity-30`} />
                      <div className={`relative h-20 w-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white`}>
                        <step.icon size={32} />
                      </div>
                      <div className="absolute -top-2 -right-2 h-10 w-10 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900">
                        <span className="text-lg font-black text-zinc-900 dark:text-white">{step.step}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{step.title}</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2">
                <div className="h-1 w-6 bg-gradient-to-r from-orange-500 to-transparent rounded-full" />
                <span className="text-orange-600 font-black uppercase text-xs tracking-widest">Explore</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black">
                <span className="bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                  Popular{" "}
                </span>
                <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent italic">
                  Categories
                </span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-lg">
                Discover delicious meals from our curated categories
              </p>
            </div>
            
            <Button 
              asChild 
              variant="ghost" 
              className="group mt-6 lg:mt-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/20"
            >
              <Link href="/categories" className="gap-2">
                View All Categories
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/meals?category=${category.name}`}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-white dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-4 border border-zinc-200/50 dark:border-zinc-800/50 group-hover:border-orange-200 dark:group-hover:border-orange-900/50 transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="space-y-4">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                      <div className={`relative h-16 w-16 mx-auto bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="text-white" size={24} />
                      </div>
                    </div>
                    
                    <div className="text-center space-y-1">
                      <h3 className="font-bold text-zinc-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {category.count} items
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200/50 dark:border-zinc-800/50 group-hover:border-orange-200 dark:group-hover:border-orange-900/50 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="h-14 w-14 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-xl flex items-center justify-center">
                      <feature.icon className="text-orange-600" size={24} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-4xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
              {/* Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-black text-white">
                    Get the{" "}
                    <span className="italic bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
                      Foodhub App
                    </span>
                  </h2>
                  <p className="text-lg text-amber-50/90 max-w-md">
                    Order faster, track deliveries in real-time, and get exclusive app-only deals!
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Zap, text: "Faster ordering" },
                    { icon: Gift, text: "Exclusive deals" },
                    { icon: MapPin, text: "Live tracking" },
                    { icon: BadgePercent, text: "Priority support" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <item.icon className="text-white" size={18} />
                      </div>
                      <span className="text-sm font-medium text-white">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* App Store Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="h-14 px-6 rounded-xl bg-black hover:bg-black/90 text-white gap-3">
                    <div className="text-left">
                      <p className="text-xs opacity-70">Download on</p>
                      <p className="text-lg font-bold">App Store</p>
                    </div>
                  </Button>
                  <Button className="h-14 px-6 rounded-xl bg-white hover:bg-white/90 text-black gap-3">
                    <div className="text-left">
                      <p className="text-xs opacity-70">Get it on</p>
                      <p className="text-lg font-bold">Google Play</p>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Phone Mockup */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-64 h-96">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm rounded-3xl border border-white/20" />
                  <div className="absolute inset-4 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl overflow-hidden">
                    <Image 
                      src={displayImage} 
                      alt="App Preview" 
                      fill 
                      className="object-cover opacity-50"
                    />
                  </div>
                  
                  {/* App UI Elements */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-12 bg-white/10 backdrop-blur-sm rounded-full" />
                  <div className="absolute top-32 left-8 right-8 space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-12 bg-white/5 backdrop-blur-sm rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2">
                <div className="h-1 w-6 bg-gradient-to-r from-orange-500 to-transparent rounded-full" />
                <span className="text-orange-600 font-black uppercase text-xs tracking-widest">Join Us</span>
                <div className="h-1 w-6 bg-gradient-to-l from-orange-500 to-transparent rounded-full" />
              </div>
              <h2 className="text-4xl lg:text-6xl font-black">
                <span className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-white bg-clip-text text-transparent">
                  Ready to Experience{" "}
                </span>
                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent italic">
                  Foodhub?
                </span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                Join thousands of happy customers and hundreds of restaurant partners
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="h-14 px-8 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold gap-3 group"
              >
                <Link href="/register?role=customer">
                  Order Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 hover:border-orange-500 dark:hover:border-orange-500 text-zinc-900 dark:text-white font-bold"
              >
                <Link href="/register?role=provider">
                  Become a Partner
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}