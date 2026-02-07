"use client";

import { useState } from "react";
import { Star, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReviewSection({ mealId }: { mealId: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ mealId, rating, comment });
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 space-y-16">
      
      <div className="bg-white rounded-[3rem] p-10 border border-zinc-100 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
            <MessageSquare size={24} />
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-zinc-900">Add a Review</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform active:scale-90"
              >
                <Star
                  size={32}
                  className={`transition-colors ${
                    (hover || rating) >= star ? "fill-orange-500 text-orange-500" : "text-zinc-200"
                  }`}
                />
              </Button>
            ))}
          </div>

          <textarea
            placeholder="How was the meal? Share your experience..."
            className="w-full h-32 bg-zinc-50 rounded-3xl p-6 border-none focus:ring-2 focus:ring-orange-500/20 outline-none font-medium text-zinc-600 transition-all"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button className="bg-zinc-900 hover:bg-orange-600 text-white px-10 h-14 rounded-2xl font-black uppercase tracking-widest text-xs transition-all">
            Submit Review
          </Button>
        </form>
      </div>
      <div className="space-y-8">
        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-400">Customer Feedback</h3>
        
        <div className="grid gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white/50 backdrop-blur-sm rounded-[2.5rem] p-8 border border-zinc-50 flex gap-6 group hover:bg-white hover:shadow-lg transition-all">
              <div className="h-14 w-14 bg-zinc-100 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                U{i}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <p className="font-black uppercase text-zinc-900 tracking-tighter">User Name</p>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} className={s <= 4 ? "fill-orange-500 text-orange-500" : "text-zinc-200"} />
                    ))}
                  </div>
                </div>
                <p className="text-zinc-500 leading-relaxed font-medium">
                  The food was absolutely delicious! Great portion size and very fresh. Will definitely order again.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}