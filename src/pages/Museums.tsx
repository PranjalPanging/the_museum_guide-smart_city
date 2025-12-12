import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Heart, Filter, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { museums } from "@/data/museums";

const Museums = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(museums.map(m => m.category))];
  
  const filteredMuseums = museums.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="font-display text-xl font-semibold">Museums Directory</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search museums..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(cat)}>
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-muted-foreground mb-6">{filteredMuseums.length} museums found</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMuseums.map(museum => (
            <Link key={museum.id} to={`/museum/${museum.id}`} className="group">
              <article className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all group-hover:-translate-y-1">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img src={museum.imageUrl} alt={museum.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 bg-primary/90 text-primary-foreground text-xs rounded-full mb-2">{museum.category}</span>
                    <h3 className="font-display text-lg font-semibold text-primary-foreground">{museum.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{museum.city}</span>
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-gold fill-gold" />{museum.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{museum.description}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Museums;
