import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Clock, Star, Heart, Camera, User, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { museums } from "@/data/museums";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Suggestion {
  name: string;
  location: string;
  reason: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const filteredMuseums = searchQuery 
    ? museums.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : museums.slice(0, 6);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchSuggestions = async () => {
    setLoadingSuggestions(true);
    try {
      const { data, error } = await supabase.functions.invoke("museum-suggestions", {
        body: { 
          visitedMuseums: [],
          wishlist: [],
          userPreferences: "Interest in Indian art, history, and culture"
        }
      });
      if (error) throw error;
      setSuggestions(data.suggestions || []);
      toast.success("AI suggestions loaded!");
    } catch (error: any) {
      toast.error(error.message || "Failed to get suggestions");
    } finally {
      setLoadingSuggestions(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">M</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground">Museum Guide</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/museums" className="text-muted-foreground hover:text-foreground transition-colors">Museums</Link>
            <Link to="/scanner" className="text-muted-foreground hover:text-foreground transition-colors">Scanner</Link>
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
          </nav>
          {user ? (
            <Link to="/dashboard">
              <Button variant="hero" size="sm">
                <User className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button variant="hero" size="sm">
                <User className="w-4 h-4" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </header>

      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Discover India's Rich <span className="text-gradient">Cultural Heritage</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore thousands of museums, track your visits, scan artifacts, and create your personal cultural journey across India.
            </p>
            
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search museums by name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base rounded-xl shadow-soft"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/museums">
                <Button variant="hero" size="lg">
                  Explore Museums
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/scanner">
                <Button variant="outline" size="lg">
                  <Camera className="w-5 h-5" />
                  Scan Artifact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-primary/5 to-gold/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">AI Museum Suggestions</h2>
                  <p className="text-sm text-muted-foreground">Personalized recommendations powered by Gemini</p>
                </div>
              </div>
              <Button 
                variant="gold" 
                onClick={fetchSuggestions} 
                disabled={loadingSuggestions}
              >
                {loadingSuggestions ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Getting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Get Suggestions
                  </>
                )}
              </Button>
            </div>

            {suggestions.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                {suggestions.map((suggestion, i) => (
                  <div 
                    key={i} 
                    className="bg-card rounded-xl p-5 shadow-soft border border-border/50 hover:shadow-medium transition-all"
                  >
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">{suggestion.name}</h3>
                    <p className="text-sm text-primary flex items-center gap-1 mb-3">
                      <MapPin className="w-3 h-3" />
                      {suggestion.location}
                    </p>
                    <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                  </div>
                ))}
              </div>
            )}

            {suggestions.length === 0 && !loadingSuggestions && (
              <div className="bg-card/50 rounded-xl p-8 text-center border border-dashed border-border">
                <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Click "Get Suggestions" to receive AI-powered museum recommendations</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">Featured Museums</h2>
              <p className="text-muted-foreground">Explore India's most iconic cultural institutions</p>
            </div>
            <Link to="/museums">
              <Button variant="ghost">
                View All
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMuseums.map((museum, index) => (
              <Link 
                key={museum.id} 
                to={`/museum/${museum.id}`}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <article className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 group-hover:-translate-y-1 animate-slide-up">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={museum.imageUrl} 
                      alt={museum.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full mb-2">
                        {museum.category}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-primary-foreground">{museum.name}</h3>
                    </div>
                    <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors">
                      <Heart className="w-5 h-5 text-primary" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {museum.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-gold fill-gold" />
                        {museum.rating}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{museum.description}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {museum.openingHours}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Your Cultural Journey Awaits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: "Discover Museums", desc: "Browse 15+ museums with detailed info, exhibits, and visitor guides" },
              { icon: Camera, title: "Scan Artifacts", desc: "Use AI to identify sculptures and paintings instantly" },
              { icon: Heart, title: "Track Your Journey", desc: "Build wishlists, log visits, and write personal reviews" },
            ].map((feature, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Museum Guide India. Discover, Explore, Remember.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
