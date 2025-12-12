import { useState, useEffect } from "react";
import { Star, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Review {
  id: string;
  user_id: string;
  rating: number;
  notes: string | null;
  created_at: string;
  user_email?: string;
}

interface ReviewSectionProps {
  museumId: string;
  user: any;
}

const ReviewSection = ({ museumId, user }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [museumId]);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("museum_id", museumId)
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      // Fetch user emails for reviews with notes
      const reviewsWithEmails = await Promise.all(
        data.map(async (review) => {
          if (review.notes) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("email")
              .eq("id", review.user_id)
              .maybeSingle();
            return { ...review, user_email: profile?.email || "Anonymous" };
          }
          return review;
        })
      );
      setReviews(reviewsWithEmails);
    }
    setLoading(false);
  };

  const submitReview = async () => {
    if (!user) {
      toast.error("Please sign in to leave a review");
      return;
    }
    if (userRating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    setSubmitting(true);
    try {
      // Check if user already reviewed this museum
      const { data: existing } = await supabase
        .from("reviews")
        .select("id")
        .eq("user_id", user.id)
        .eq("museum_id", museumId)
        .maybeSingle();

      if (existing) {
        // Update existing review
        const { error } = await supabase
          .from("reviews")
          .update({ rating: userRating, notes: reviewText || null })
          .eq("id", existing.id);
        if (error) throw error;
        toast.success("Review updated!");
      } else {
        // Create new review
        const { error } = await supabase
          .from("reviews")
          .insert({ user_id: user.id, museum_id: museumId, rating: userRating, notes: reviewText || null });
        if (error) throw error;
        toast.success("Review submitted!");
      }

      setUserRating(0);
      setReviewText("");
      fetchReviews();
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length >= 2
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const reviewsWithNotes = reviews.filter(r => r.notes);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Reviews</h2>
        {averageRating && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full">
            <Star className="w-5 h-5 text-gold fill-gold" />
            <span className="font-semibold text-foreground">{averageRating}</span>
            <span className="text-muted-foreground text-sm">({reviews.length} reviews)</span>
          </div>
        )}
      </div>

      {/* Submit Review Form */}
      <div className="bg-card rounded-xl p-5 shadow-soft border border-border/50">
        <p className="font-medium mb-3 text-foreground">Rate this museum</p>
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setUserRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoverRating || userRating)
                    ? "text-gold fill-gold"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
        <Textarea
          placeholder="Write your experience (optional)..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="mb-4 min-h-[80px]"
        />
        <Button variant="hero" onClick={submitReview} disabled={submitting || userRating === 0}>
          <Send className="w-4 h-4" />
          {submitting ? "Submitting..." : "Submit Review"}
        </Button>
      </div>

      {/* Display Reviews */}
      {reviewsWithNotes.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Recent Reviews</h3>
          {reviewsWithNotes.map((review) => (
            <div key={review.id} className="bg-card rounded-xl p-4 shadow-soft border border-border/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{review.user_email}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${s <= review.rating ? "text-gold fill-gold" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">"{review.notes}"</p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(review.created_at || "").toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}

      {reviews.length === 0 && !loading && (
        <p className="text-center text-muted-foreground py-6">No reviews yet. Be the first to review!</p>
      )}
    </section>
  );
};

export default ReviewSection;
