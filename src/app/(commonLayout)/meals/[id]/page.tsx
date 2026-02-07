import { mealService } from "@/services/meals.services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/meals/AddToCartButton";
import ReviewSection from "@/components/meals/ReviewSection";
import { 
  Clock, Star, MapPin, ChevronLeft, ShieldCheck, Flame, Utensils, Share2 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Global_Image } from "@/lib/defaultImage";

export default async function MealDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await mealService.getMealById(id);

  if (!response?.data) notFound();
  const meal = response.data;

  return (
    <div className="min-h-screen bg-zinc-50/30 dark:bg-zinc-950 pb-10">
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Button variant="ghost" asChild className="h-9 rounded-full gap-2 px-3 text-muted-foreground">
            <Link href="/meals">
              <ChevronLeft className="size-4" />
              <span className="text-sm font-bold">Menu</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full"><Share2 className="size-4" /></Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-5 relative aspect-square rounded-[2rem] overflow-hidden shadow-xl bg-white">
            <Image
              src={Global_Image}
              alt={meal.name} fill className="object-cover" priority
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge className="bg-orange-600 text-[10px] px-3 py-1 rounded-full border-none font-bold">
                <Flame className="size-3 mr-1 fill-white" /> POPULAR
              </Badge>
              {!meal.isAvailable && (
                <Badge variant="destructive" className="text-[10px] px-3 py-1 rounded-full font-bold">SOLD OUT</Badge>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 lg:pl-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-orange-600 font-bold text-[10px] uppercase tracking-widest">
                  {meal.category?.name || "Premium"}
                </span>
                <div className="h-1 w-1 rounded-full bg-zinc-300" />
                <div className="flex items-center gap-1">
                  <Star className="size-3 fill-orange-500 text-orange-500" />
                  <span className="text-xs font-bold">4.9</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-zinc-900 dark:text-zinc-50">
                {meal.name}
              </h1>
              
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                {meal.description || "Freshly prepared with authentic ingredients for a perfect taste."}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100">
                <Clock className="size-4 text-orange-600" />
                <span className="text-xs font-bold uppercase tracking-tighter">25 min</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100">
                <Utensils className="size-4 text-orange-600" />
                <span className="text-xs font-bold uppercase tracking-tighter">1 Person</span>
              </div>
              <div className="col-span-2 md:col-span-1 flex items-center gap-2 p-3 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100/50">
                <MapPin className="size-4 text-orange-600" />
                <span className="text-xs font-bold truncate tracking-tighter">{meal.provider?.name?.split(' ')[0] || "Chef"} Kitchen</span>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-5 rounded-[2rem] border border-zinc-100 shadow-sm space-y-4">
              <div className="flex items-end gap-1.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase pb-1.5">Total Price:</span>
                <span className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50">{meal.price}</span>
                <span className="text-lg font-bold text-orange-600 pb-1">TK</span>
              </div>
              <AddToCartButton mealId={meal.id} stock={meal.stock || 20} price={meal.price} />
              
              <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase pt-1">
                <span className="flex items-center gap-1"><ShieldCheck className="size-3 text-green-600" /> Fresh</span>
                <span className="flex items-center gap-1"><ShieldCheck className="size-3 text-green-600" /> Hygiene</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <ReviewSection mealId={id} />
        </div>
      </main>
    </div>
  );
}