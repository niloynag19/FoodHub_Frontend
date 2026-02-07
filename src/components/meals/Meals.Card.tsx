"use client";

import Image from "next/image";
import { ShoppingCart, Star, Clock, Heart, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Meal } from "@/types/types"; 
import Link from "next/link";

interface MealCardProps {
  meal: Meal;
}
export function MealCard({ meal }: MealCardProps) {
  const detailUrl = `/meals/${meal.id}`;

  return (
    <Card className="group relative flex flex-col h-full overflow-hidden rounded-[1.5rem] border-none bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      <Link href={detailUrl} className="relative aspect-[4/3] w-full overflow-hidden block">
        <Image
          src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
          alt={meal.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        <div className="absolute top-3 inset-x-3 flex justify-between items-center z-10">
          <Badge className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border-none px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider">
            {meal.category?.name || "Food"}
          </Badge>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-7 w-7 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-rose-500 shadow-sm"
            onClick={(e) => { e.preventDefault(); }}
          >
            <Heart className="size-3.5" />
          </Button>
        </div>

        {!meal.isAvailable && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <Badge variant="destructive" className="font-bold uppercase text-[10px]">Sold Out</Badge>
          </div>
        )}
      </Link>

      <CardContent className="flex flex-col flex-grow p-4 space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Link href={detailUrl} className="block group-hover:text-orange-600 transition-colors">
              <h3 className="text-base font-bold leading-tight line-clamp-1">
                {meal.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="size-3 fill-orange-500 text-orange-500" />
              <span className="text-[11px] font-bold">4.8</span>
            </div>
          </div>
          
          <p className="text-[12px] text-muted-foreground line-clamp-1 leading-relaxed">
            {meal.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
                <Clock className="size-3 text-orange-500" />
                <span>20m</span>
              </div>
              <div className="text-[11px] text-muted-foreground font-medium truncate max-w-[80px]">
                by {meal.provider?.name?.split(' ')[0]}
              </div>
           </div>
           <span className="text-sm font-black text-foreground">{meal.price} TK</span>
        </div>

        <div className="flex gap-2 pt-1">
          <Button 
            asChild
            variant="outline"
            className="h-9 flex-grow rounded-xl border-orange-100 text-[11px] font-bold hover:bg-orange-50 hover:text-orange-600 transition-all"
          >
            <Link href={`/meals/${meal.id}`}>
              Details <ArrowUpRight className="size-3 ml-1" />
            </Link>
          </Button>

          <Button 
            disabled={!meal.isAvailable}
            size="icon"
            className="h-9 w-9 shrink-0 rounded-xl bg-orange-600 hover:bg-zinc-900 text-white shadow-md active:scale-95"
          >
            <ShoppingCart className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}