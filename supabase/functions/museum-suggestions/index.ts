import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { visitedMuseums, wishlist, userPreferences } = await req.json();
    const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");
    
    if (!OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY is not configured");
    }

    console.log("Getting museum suggestions with OpenRouter...");

    const prompt = `Based on the user's museum visiting history and preferences, suggest 3 museums they might enjoy visiting next.

User's visited museums: ${JSON.stringify(visitedMuseums || [])}
User's wishlist: ${JSON.stringify(wishlist || [])}
User preferences: ${userPreferences || "General interest in Indian culture and history"}

Please suggest museums from India that would complement their interests. For each suggestion, provide:
1. Museum name
2. City/Location
3. Why they would enjoy it (2-3 sentences)

Respond ONLY in valid JSON format:
{
  "suggestions": [
    {"name": "...", "location": "...", "reason": "..."},
    {"name": "...", "location": "...", "reason": "..."},
    {"name": "...", "location": "...", "reason": "..."}
  ]
}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://lovable.dev",
        "X-Title": "Museum Guide App",
      },
      body: JSON.stringify({
        model: "amazon/nova-2-lite-v1:free",
        messages: [
          { role: "system", content: "You are a helpful museum expert specializing in Indian museums. Always respond with valid JSON only." },
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error("Failed to get suggestions");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    console.log("OpenRouter response received:", content.substring(0, 100));
    
    try {
      // Extract JSON from the response (handle markdown code blocks)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return new Response(JSON.stringify(parsed), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("No valid JSON in response");
    } catch {
      return new Response(JSON.stringify({ 
        suggestions: [
          { name: "National Museum", location: "New Delhi", reason: "A comprehensive collection of Indian art and history spanning 5000 years." },
          { name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya", location: "Mumbai", reason: "Excellent collection of art, natural history, and archaeology." },
          { name: "Indian Museum", location: "Kolkata", reason: "One of the oldest museums in Asia with diverse collections." }
        ]
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
