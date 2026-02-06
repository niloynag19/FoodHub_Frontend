"use client";

import Image from "next/image";
import { ShoppingCart, Star, Clock, MapPin, Heart, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Meal } from "@/types/types"; 


interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  return (
    <Card className="group relative flex flex-col h-full overflow-hidden rounded-[2rem] border-none bg-card shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
          alt={meal.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        <div className="absolute top-4 inset-x-4 flex justify-between items-center z-10">
          <Badge className="bg-orange-600/90 hover:bg-orange-600 text-white backdrop-blur-md border-none px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">
            <Flame className="size-3 mr-1 fill-white" />
            Trending
          </Badge>
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white text-rose-500 shadow-sm">
            <Heart className="size-4 fill-none hover:fill-rose-500 transition-all" />
          </Button>
        </div>
        {!meal.isAvailable && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <span className="border-2 border-white text-white px-4 py-1 rounded-md font-black uppercase tracking-widest -rotate-12">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <CardContent className="flex flex-col flex-grow p-6 space-y-4">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-tighter text-muted-foreground">
          <span className="text-orange-600">{meal.category?.name || "Delicious"}</span>
          <div className="flex items-center gap-1">
            <Star className="size-3 fill-orange-500 text-orange-500" />
            <span className="text-foreground">4.9 (120+)</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black leading-tight text-foreground group-hover:text-orange-600 transition-colors line-clamp-1">
            {meal.name}
          </h3>
          <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed min-h-[40px]">
            {meal.description}
          </p>
        </div>

        <div className="flex items-center gap-4 pt-2 border-t border-muted/50">
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <Clock className="size-3.5 text-orange-500" />
            <span>20 min</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold truncate">
            <MapPin className="size-3.5 text-orange-500" />
            <span className="truncate">{meal.provider?.name}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Price</span>
            <span className="text-2xl font-black text-foreground tracking-tighter">{meal.price} TK</span>
          </div>
          
          <Button 
            disabled={!meal.isAvailable}
            className="h-12 w-12 rounded-2xl bg-orange-600 hover:bg-zinc-900 text-white shadow-lg shadow-orange-200 dark:shadow-none transition-all duration-300 active:scale-90"
          >
            <ShoppingCart className="size-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}