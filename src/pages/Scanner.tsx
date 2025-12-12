import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Upload, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Scanner = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ name: string; info: string } | null>(null);
  const [user, setUser] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-artifact", {
        body: { image }
      });
      if (error) throw error;
      setResult(data);
      
      // Save scan to database if user is logged in
      if (user) {
        await supabase.from("scanned_artifacts").insert({
          user_id: user.id,
          artifact_name: data.name,
          artifact_info: data.info,
          image_url: null // We don't store the image, just the base64 was for analysis
        });
      }
      
      toast.success("Artifact identified!");
    } catch (error: any) {
      toast.error(error.message || "Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="font-display text-xl font-semibold">Artifact Scanner</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">Scan an Artifact</h2>
          <p className="text-muted-foreground">Upload a photo of a sculpture or painting to learn about its history</p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          
          {image ? (
            <div className="space-y-4">
              <img src={image} alt="Uploaded" className="w-full rounded-xl aspect-square object-cover" />
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => { setImage(null); setResult(null); }}>Clear</Button>
                <Button variant="hero" className="flex-1" onClick={analyzeImage} disabled={loading}>
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Analyzing...</> : <><Sparkles className="w-4 h-4" />Identify</>}
                </Button>
              </div>
            </div>
          ) : (
            <button onClick={() => fileInputRef.current?.click()} className="w-full aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-4">
              <Upload className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground">Click to upload an image</p>
            </button>
          )}
        </div>

        {result && (
          <div className="bg-card rounded-2xl p-6 shadow-soft animate-scale-in">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gold" />
              <h3 className="font-display text-lg font-semibold">Artifact Identified</h3>
            </div>
            <h4 className="font-semibold text-xl mb-3">{result.name}</h4>
            <p className="text-muted-foreground leading-relaxed">{result.info}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;
