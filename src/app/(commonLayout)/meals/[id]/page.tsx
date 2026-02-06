import { mealService } from "@/services/meals.services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Star, 
  MapPin, 
  ShoppingCart, 
  ChevronLeft, 
  ShieldCheck,
  Flame,
  Utensils
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MealDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await mealService.getMealById(id);

  if (!response?.data) {
    notFound(); // খাবার খুঁজে না পেলে ৪০৪ পেজ দেখাবে
  }

  const meal = response.data;

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950">
      {/* ১. টপ নেভিগেশন */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="rounded-full gap-2">
          <Link href="/meals">
            <ChevronLeft className="size-4" /> Back to Menu
          </Link>
        </Button>
      </div>

      <main className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* ২. লেফট সাইড: ইমেজ সেকশন */}
          <div className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image
              src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
              alt={meal.name}
              fill
              className="object-cover"
              priority
            />
            {!meal.isAvailable && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <Badge className="text-2xl px-8 py-3 bg-red-600">Sold Out</Badge>
              </div>
            )}
          </div>

          {/* ৩. রাইট সাইড: কন্টেন্ট সেকশন */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400 border-none px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {meal.category?.name || "Premium Meal"}
                </Badge>
                <Badge variant="outline" className="rounded-full gap-1 border-zinc-200">
                  <Flame className="size-3 text-orange-500 fill-orange-500" /> High Protein
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-tight">
                {meal.name}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`size-4 ${i < 4 ? "fill-orange-500 text-orange-500" : "text-zinc-300"}`} />
                    ))}
                  </div>
                  <span className="text-foreground font-bold">4.8 (2.5k Reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-orange-500" />
                  <span>Preparation: 25-30 min</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {meal.description}
            </p>

            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <Utensils className="size-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Prepared by</p>
                  <h4 className="font-bold text-foreground">{meal.provider?.name}</h4>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-zinc-500 bg-zinc-50 dark:bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-100 dark:border-zinc-700">
                <MapPin className="size-3" /> 2.4 km away
              </div>
            </div>

            {/* ৫. প্রাইস এবং অর্ডার বাটন */}
            <div className="pt-8 border-t border-dashed border-zinc-200 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Price</span>
                <span className="text-5xl font-black text-foreground tracking-tighter">
                  {meal.price} <span className="text-2xl text-orange-600 ml-1">TK</span>
                </span>
              </div>
              
              <Button 
                disabled={!meal.isAvailable}
                className="w-full sm:flex-grow h-16 rounded-[1.5rem] bg-orange-600 hover:bg-zinc-900 text-white text-lg font-bold shadow-xl shadow-orange-200 dark:shadow-none transition-all duration-300 gap-3"
              >
                <ShoppingCart className="size-6" />
                Add to Cart
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs text-muted-foreground font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-green-500" /> Quality Verified
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-green-500" /> Hygiene Guaranteed
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}