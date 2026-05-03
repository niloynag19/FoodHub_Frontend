"use client";

import { useState, useEffect } from "react";
import { Star, Send, MessageSquare } from "lucide-react";
import { createReviewAction, getReviewsAction } from "@/actions/review.action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface ReviewSectionProps {
  mealId: string;
  customerId?: string;
}

export default function ReviewSection({ mealId, customerId: propCustomerId }: ReviewSectionProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: session } = authClient.useSession();
  
  // Use 'as any' to allow accessing the .role property without TS errors
  const currentUser = session?.user as any;
  const currentUserId = propCustomerId || currentUser?.id;

  const fetchReviews = async () => {
    const res = await getReviewsAction(mealId);
    if (res.success) setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, [mealId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validation
    if (!currentUser) {
      return toast.error("Authentication required. Please login!");
    }

    // Role Check: Only CUSTOMER allowed
    if (currentUser.role !== "CUSTOMER") {
      return toast.error("Only customers are authorized to review meals.");
    }

    if (rating === 0) return toast.error("Please select a star rating!");
    if (!comment.trim()) return toast.error("Feedback comment cannot be empty!");

    setLoading(true);

    // 2. Call Action with session data passed as an object
    const res = await createReviewAction(
      { rating, comment, mealId },
      { id: currentUser.id, role: currentUser.role }
    );

    if (res.success) {
      toast.success(res.message);
      setRating(0);
      setComment("");
      fetchReviews(); 
    } else {
      toast.error(res.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="mt-16 space-y-12">
      {/* Review Form */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm">
        <h3 className="text-xl font-black italic uppercase mb-6 flex items-center gap-2 text-zinc-900">
          <MessageSquare size={20} className="text-orange-500" /> Write a Review
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                className="p-1 hover:scale-110 transition-transform outline-none"
              >
                <Star 
                  size={24} 
                  className={rating >= s ? "fill-orange-500 text-orange-500" : "text-zinc-200"} 
                />
              </Button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={currentUser ? "How was the meal? Share your experience..." : "Please login as a customer to write a review"}
            disabled={!currentUser || currentUser.role !== "CUSTOMER"}
            className="w-full bg-zinc-50 rounded-2xl p-5 outline-none focus:ring-2 focus:ring-orange-500/20 text-sm font-medium disabled:opacity-50"
            rows={4}
          />

          <Button
            disabled={loading || !currentUser || currentUser.role !== "CUSTOMER"}
            className="bg-zinc-900 text-white rounded-xl px-8 font-black uppercase text-[10px] tracking-widest h-12"
          >
            {loading ? "Posting..." : <span className="flex items-center gap-2 text-white">Post Review <Send size={14} /></span>}
          </Button>
        </form>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400 italic">Feedbacks ({reviews.length})</h4>
        <div className="grid gap-4">
          {reviews.length > 0 ? reviews.map((rev) => (
            <div key={rev.id} className="bg-white rounded-3xl p-6 border border-zinc-50 flex gap-4 transition-all hover:shadow-md">
              <div className="h-10 w-10 bg-zinc-100 rounded-full flex items-center justify-center font-black text-[10px] text-zinc-400 shrink-0">
                {rev.user?.name?.slice(0, 1).toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < rev.rating ? "fill-orange-500 text-orange-500" : "text-zinc-100"} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-zinc-300">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-zinc-600 text-sm font-medium">{rev.comment}</p>
              </div>
            </div>
          )) : (
            <div className="py-10 text-center border-2 border-dashed border-zinc-100 rounded-[2rem]">
              <p className="text-zinc-400 text-xs italic font-medium">No reviews yet for this meal.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}