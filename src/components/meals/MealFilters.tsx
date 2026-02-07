"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MealFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition(); 
  
  const [text, setText] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(text, 500);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (debouncedSearch !== currentSearch) {
      handleFilterChange("search", debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <div className={`flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center gap-4 mb-8 ${isPending ? "opacity-50" : "opacity-100"} transition-opacity`}>
    
      <div className="relative flex-grow max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search for your favorite meal..."
          className="pl-10 h-12 rounded-2xl border-zinc-200 focus-visible:ring-orange-500 shadow-sm bg-background"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {text && (
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => {
              setText("");
              handleFilterChange("search", "");
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent text-muted-foreground hover:text-orange-500"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      <Select 
        value={searchParams.get("category") || "all"} 
        onValueChange={(v) => handleFilterChange("category", v)}
      >
        <SelectTrigger className="h-12 w-full md:w-[180px] rounded-2xl border-zinc-200 focus:ring-orange-500">
          <SlidersHorizontal className="mr-2 size-4 text-orange-500" />
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="chicken">Chicken</SelectItem>
          <SelectItem value="beef">Beef</SelectItem>
          <SelectItem value="veg">Vegetarian</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={searchParams.get("sortBy") || "createdAt"} 
        onValueChange={(v) => handleFilterChange("sortBy", v)}
      >
        <SelectTrigger className="h-12 w-full md:w-[180px] rounded-2xl border-zinc-200 focus:ring-orange-500">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="createdAt">Newest</SelectItem>
          <SelectItem value="price">Price: Low to High</SelectItem>
          <SelectItem value="name">Name: A-Z</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}