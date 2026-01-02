import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Check, Star, Calendar, MapPin, User, LogOut, TrendingUp, Sparkles, Trophy, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { getMuseumById } from "@/data/museums";
import { toast } from "sonner";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [visited, setVisited] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [scannedCount, setScannedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        setTimeout(() => {
          fetchData(session.user.id);
        }, 0);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchData = async (userId: string) => {
    setLoading(true);
    const [w, v, r, p, s] = await Promise.all([
      supabase.from("wishlist").select("*").eq("user_id", userId),
      supabase.from("visited").select("*").eq("user_id", userId),
      supabase.from("reviews").select("*").eq("user_id", userId),
      supabase.from("profiles").select("*").eq("id", userId).single(),
      supabase.from("scanned_artifacts").select("id", { count: "exact" }).eq("user_id", userId)
    ]);
    setWishlist(w.data || []);
    setVisited(v.data || []);
    setReviews(r.data || []);
    setProfile(p.data);
    setScannedCount(s.count || 0);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-hero" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-foreground/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-4 py-6 relative">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-8">
            <div className="w-24 h-24 rounded-full bg-primary-foreground/20 flex items-center justify-center backdrop-blur shadow-glow">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="font-display text-3xl font-bold text-primary-foreground mb-1">
                {profile?.full_name || user?.user_metadata?.full_name || "Explorer"}
              </h1>
              <p className="text-primary-foreground/80">{user?.email}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-foreground/10 rounded-full text-sm text-primary-foreground backdrop-blur">
                  <Trophy className="w-3 h-3" />
                  {profile?.total_points || 0} Points
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-foreground/10 rounded-full text-sm text-primary-foreground backdrop-blur">
                  <TrendingUp className="w-3 h-3" />
                  Level {Math.floor((visited.length + reviews.length) / 3) + 1}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-12 mb-8 relative z-10">
          {[
            { icon: Heart, label: "Wishlist", value: wishlist.length, color: "from-rose-500 to-pink-500", bgColor: "bg-rose-50 dark:bg-rose-950" },
            { icon: Check, label: "Visited", value: visited.length, color: "from-emerald-500 to-green-500", bgColor: "bg-emerald-50 dark:bg-emerald-950" },
            { icon: Star, label: "Reviews", value: reviews.length, color: "from-amber-500 to-yellow-500", bgColor: "bg-amber-50 dark:bg-amber-950" },
            { icon: Camera, label: "Scanned", value: scannedCount, color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50 dark:bg-blue-950" },
          ].map(stat => (
            <div key={stat.label} className={`${stat.bgColor} rounded-2xl p-5 shadow-soft border border-border/50 hover:shadow-medium transition-all`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-soft`}>
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link to="/museums" className="group">
            <div className="bg-card rounded-xl p-4 shadow-soft hover:shadow-medium transition-all border border-border/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Explore Museums</p>
                <p className="text-sm text-muted-foreground">Discover new places</p>
              </div>
            </div>
          </Link>
          <Link to="/scanner" className="group">
            <div className="bg-card rounded-xl p-4 shadow-soft hover:shadow-medium transition-all border border-border/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">AI Scanner</p>
                <p className="text-sm text-muted-foreground">Identify artifacts</p>
              </div>
            </div>
          </Link>
        </div>

        <Tabs defaultValue="wishlist" className="w-full">
          <TabsList className="w-full justify-start mb-6 bg-card/50 p-1 rounded-xl">
            <TabsTrigger value="wishlist" className="flex items-center gap-2 data-[state=active]:bg-gradient-hero data-[state=active]:text-primary-foreground">
              <Heart className="w-4 h-4" />
              Wishlist ({wishlist.length})
            </TabsTrigger>
            <TabsTrigger value="visited" className="flex items-center gap-2 data-[state=active]:bg-gradient-hero data-[state=active]:text-primary-foreground">
              <Check className="w-4 h-4" />
              Visited ({visited.length})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2 data-[state=active]:bg-gradient-hero data-[state=active]:text-primary-foreground">
              <Star className="w-4 h-4" />
              Reviews ({reviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wishlist" className="animate-fade-in">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 bg-card/50 rounded-2xl border border-dashed border-border">
                <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-rose-500" />
                </div>
                <p className="text-lg font-medium text-foreground mb-2">No museums in wishlist</p>
                <p className="text-muted-foreground mb-4">Start adding museums you'd love to visit</p>
                <Link to="/museums">
                  <Button variant="hero">Browse Museums</Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {wishlist.map(item => {
                  const m = getMuseumById(item.museum_id);
                  if (!m) return null;
                  return (
                    <Link key={item.id} to={`/museum/${m.id}`} className="group">
                      <div className="flex gap-4 p-4 bg-card rounded-xl shadow-soft hover:shadow-medium transition-all border border-border/50">
                        <img src={m.imageUrl} alt={m.name} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors truncate">{m.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            {m.city}, {m.state}
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="w-4 h-4 text-gold fill-gold" />
                            <span className="text-sm font-medium">{m.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="visited" className="animate-fade-in">
            {visited.length === 0 ? (
              <div className="text-center py-16 bg-card/50 rounded-2xl border border-dashed border-border">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-500" />
                </div>
                <p className="text-lg font-medium text-foreground mb-2">No visited museums yet</p>
                <p className="text-muted-foreground mb-4">Start exploring and marking museums as visited</p>
                <Link to="/museums">
                  <Button variant="hero">Find Museums</Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {visited.map(item => {
                  const m = getMuseumById(item.museum_id);
                  if (!m) return null;
                  return (
                    <div key={item.id} className="flex gap-4 p-4 bg-card rounded-xl shadow-soft border border-border/50">
                      <img src={m.imageUrl} alt={m.name} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-foreground truncate">{m.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          {m.city}
                        </p>
                        <p className="text-sm text-primary flex items-center gap-1 mt-2">
                          <Calendar className="w-3 h-3" />
                          Visited: {new Date(item.visited_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="animate-fade-in">
            {reviews.length === 0 ? (
              <div className="text-center py-16 bg-card/50 rounded-2xl border border-dashed border-border">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-amber-500" />
                </div>
                <p className="text-lg font-medium text-foreground mb-2">No reviews yet</p>
                <p className="text-muted-foreground mb-4">Share your museum experiences with the community</p>
                <Link to="/museums">
                  <Button variant="hero">Write a Review</Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {reviews.map(item => {
                  const m = getMuseumById(item.museum_id);
                  if (!m) return null;
                  return (
                    <div key={item.id} className="p-5 bg-card rounded-xl shadow-soft border border-border/50">
                      <div className="flex gap-4 mb-4">
                        <img src={m.imageUrl} alt={m.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-foreground">{m.name}</h3>
                          <p className="text-sm text-muted-foreground">{m.city}</p>
                          <div className="flex gap-1 mt-2">
                            {[1,2,3,4,5].map(s => (
                              <Star key={s} className={`w-5 h-5 ${s <= item.rating ? "text-gold fill-gold" : "text-muted"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      {item.notes && (
                        <p className="text-muted-foreground bg-muted/50 p-3 rounded-lg italic">"{item.notes}"</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-3">
                        Reviewed on {new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
