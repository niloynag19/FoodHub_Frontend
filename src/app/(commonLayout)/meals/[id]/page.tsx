import { mealService } from "@/services/meals.services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/meals/AddToCartButton";
import ReviewSection from "@/components/meals/ReviewSection";
import {
  Clock, Star, MapPin, ChevronLeft, ShieldCheck, Flame,
  Utensils, Share2, Heart, CheckCircle2, Leaf, Thermometer
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

  const nutritionInfo = [
    { label: "Calories", value: "520", unit: "kcal" },
    { label: "Protein", value: "32", unit: "g" },
    { label: "Carbs", value: "45", unit: "g" },
    { label: "Fat", value: "18", unit: "g" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-950 dark:to-zinc-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-10 rounded-full gap-2 px-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            <Link href="/meals" className="flex items-center">
              <ChevronLeft className="size-4" />
              <span className="text-sm font-medium">Back to Menu</span>
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Heart className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Share2 className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronLeft className="size-4 mx-2 rotate-180" />
            <Link href="/meals" className="hover:text-foreground transition-colors">Menu</Link>
            <ChevronLeft className="size-4 mx-2 rotate-180" />
            <span className="font-medium text-foreground truncate max-w-[200px]">{meal.name}</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Image */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
              <Image
                src={Global_Image}
                alt={meal.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Image Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-4 py-1.5 rounded-full border-none font-semibold shadow-lg">
                  <Flame className="size-3.5 mr-1.5 fill-white" /> POPULAR
                </Badge>
                {!meal.isAvailable && (
                  <Badge variant="destructive" className="text-xs px-4 py-1.5 rounded-full font-semibold shadow-lg">
                    SOLD OUT
                  </Badge>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-zinc-800"
              >
                <Heart className="size-5" />
              </Button>
            </div>

            {/* Nutrition Info */}
            <div className="mt-8 bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-200/50 dark:border-zinc-800/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Thermometer className="size-5 text-orange-500" />
                Nutritional Information
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {nutritionInfo.map((item, index) => (
                  <div key={index} className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                    <div className="text-2xl font-bold text-foreground">{item.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">{item.unit}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-8">
            {/* Header Info */}
            <div className="space-y-4">
              <div className="flex items-center flex-wrap gap-3">
                <Badge variant="secondary" className="rounded-full px-4 py-1.5 font-medium">
                  {meal.category?.name || "Premium"}
                </Badge>
                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-full">
                  <Star className="size-4 fill-amber-500 text-amber-500" />
                  <span className="text-sm font-bold">4.9</span>
                  <span className="text-xs text-muted-foreground">(128 reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                {meal.name}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {meal.description || "Freshly prepared with authentic ingredients for a perfect taste experience. Each ingredient is carefully selected to ensure premium quality and flavor."}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800/50 border border-zinc-200/50 dark:border-zinc-800/50">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                  <Clock className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Prep Time</div>
                  <div className="text-lg font-semibold">25 min</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800/50 border border-zinc-200/50 dark:border-zinc-800/50">
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/30">
                  <Utensils className="size-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Serves</div>
                  <div className="text-lg font-semibold">1 Person</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/10 border border-orange-200/50 dark:border-orange-800/30">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <MapPin className="size-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Kitchen</div>
                  <div className="text-lg font-semibold truncate">{meal.provider?.name?.split(' ')[0] || "Chef"}</div>
                </div>
              </div>
            </div>

            {/* Quality Badges */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="rounded-full px-4 py-2 gap-2 border-green-200 dark:border-green-800">
                <Leaf className="size-4 text-green-600 dark:text-green-400" />
                Fresh Ingredients
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-2 gap-2 border-blue-200 dark:border-blue-800">
                <ShieldCheck className="size-4 text-blue-600 dark:text-blue-400" />
                Hygiene Certified
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-2 gap-2 border-purple-200 dark:border-purple-800">
                <CheckCircle2 className="size-4 text-purple-600 dark:text-purple-400" />
                Quality Guaranteed
              </Badge>
            </div>

            {/* Price & Add to Cart */}
            <div className="bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800/50 rounded-3xl p-6 shadow-xl border border-zinc-200/50 dark:border-zinc-800/50">
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">Total Price</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {meal.price}
                    </span>
                    <span className="text-xl font-semibold text-muted-foreground">TK</span>
                    <span className="ml-2 text-sm text-muted-foreground line-through">TK {Math.round(meal.price * 1.2)}</span>
                    <Badge className="ml-2 bg-green-500 hover:bg-green-600">Save 20%</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {meal.stock || 20} items left in stock
                  </div>
                </div>

                <AddToCartButton
                  // className="h-14 text-base font-semibold rounded-xl"
                  mealId={meal.id}
                  stock={meal.stock || 20}
                  price={meal.price}
                />

                <div className="text-center text-sm text-muted-foreground pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="size-4" />
                    <span>Free delivery in 25-35 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Customer Reviews</h2>
            <p className="text-muted-foreground">See what others are saying about this meal</p>
          </div>
          <ReviewSection mealId={id} />
        </div>
      </main>
    </div>
  );
}