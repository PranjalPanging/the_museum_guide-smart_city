import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Ticket, Star, Heart, Check, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMuseumById } from "@/data/museums";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Exhibit } from "@/types/museum";
import ExhibitModal from "@/components/ExhibitModal";
import ReviewSection from "@/components/ReviewSection";

const MuseumDetail = () => {
  const { id } = useParams();
  const museum = getMuseumById(id || "");
  const [aiSummary, setAiSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const generateAISummary = async () => {
    if (!museum) return;
    setLoadingSummary(true);
    try {
      const response = await supabase.functions.invoke("museum-summary", {
        body: { 
          museumName: museum.name,
          city: museum.city,
          state: museum.state,
          category: museum.category,
          description: museum.longDescription
        }
      });
      if (response.error) throw response.error;
      setAiSummary(response.data.summary);
      toast.success("AI summary generated!");
    } catch (error: any) {
      toast.error(error.message || "Failed to generate summary");
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      toast.error("Please sign in to add to wishlist");
      return;
    }
    try {
      await supabase.from("wishlist").insert({ user_id: user.id, museum_id: id });
      toast.success("Added to wishlist!");
    } catch (error) {
      toast.error("Failed to add to wishlist");
    }
  };

  const handleVisited = async () => {
    if (!user) {
      toast.error("Please sign in to mark as visited");
      return;
    }
    try {
      await supabase.from("visited").insert({ user_id: user.id, museum_id: id });
      toast.success("Marked as visited!");
    } catch (error) {
      toast.error("Failed to mark as visited");
    }
  };

  if (!museum) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Museum not found</p>
          <Link to="/museums"><Button variant="hero">Browse Museums</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={museum.imageUrl} alt={museum.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Link to="/museums">
            <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur hover:bg-background">
              <ArrowLeft />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur hover:bg-background" onClick={handleWishlist}>
            <Heart className="text-primary" />
          </Button>
        </div>
        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-4">
          <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full mb-3">{museum.category}</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">{museum.name}</h1>
          <div className="flex items-center gap-4 text-primary-foreground/90">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{museum.city}, {museum.state}</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-gold fill-gold" />{museum.rating}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-gradient-to-r from-primary/5 to-gold/5 rounded-2xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">AI Museum Summary</h2>
                    <p className="text-sm text-muted-foreground">Powered by Gemini</p>
                  </div>
                </div>
                <Button variant="gold" size="sm" onClick={generateAISummary} disabled={loadingSummary}>
                  {loadingSummary ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
              {aiSummary ? (
                <div className="bg-card rounded-xl p-4 animate-fade-in">
                  <p className="text-foreground leading-relaxed">{aiSummary}</p>
                </div>
              ) : (
                <div className="bg-card/50 rounded-xl p-6 text-center border border-dashed border-border">
                  <Sparkles className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click "Generate" for an AI-powered summary of this museum</p>
                </div>
              )}
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">{museum.longDescription}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-6">Top 5 Exhibits</h2>
              <div className="space-y-4">
                {museum.topExhibits.map((exhibit) => (
                  <button
                    key={exhibit.id}
                    onClick={() => setSelectedExhibit(exhibit)}
                    className="w-full text-left flex gap-4 p-4 bg-card rounded-xl shadow-soft hover:shadow-medium hover:bg-accent/5 transition-all cursor-pointer group"
                  >
                    <img src={exhibit.imageUrl} alt={exhibit.name} className="w-24 h-24 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform" />
                    <div>
                      <h3 className="font-display font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">{exhibit.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{exhibit.description}</p>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        {exhibit.period && <span className="px-2 py-1 bg-muted rounded-full">Period: {exhibit.period}</span>}
                        {exhibit.origin && <span className="px-2 py-1 bg-muted rounded-full">Origin: {exhibit.origin}</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <ReviewSection museumId={id || ""} user={user} />
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
              <h3 className="font-display font-semibold mb-4 text-lg">Visitor Info</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Opening Hours</p>
                    <p className="text-muted-foreground">{museum.openingHours}</p>
                    <p className="text-muted-foreground">Closed: {museum.closedOn}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Ticket className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Ticket Price</p>
                    <p className="text-muted-foreground">Indian: ₹{museum.ticketPrice.indian}</p>
                    <p className="text-muted-foreground">Foreigner: ₹{museum.ticketPrice.foreigner}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sage/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">{museum.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button variant="hero" className="w-full" onClick={handleWishlist}>
                <Heart className="w-4 h-4" />
                Add to Wishlist
              </Button>
              <Button variant="outline" className="w-full" onClick={handleVisited}>
                <Check className="w-4 h-4" />
                Mark as Visited
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ExhibitModal 
        exhibit={selectedExhibit} 
        open={!!selectedExhibit} 
        onClose={() => setSelectedExhibit(null)} 
      />
    </div>
  );
};

export default MuseumDetail;
