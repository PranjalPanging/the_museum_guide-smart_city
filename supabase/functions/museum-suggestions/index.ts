
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { visitedMuseums, wishlist, userPreferences, geminiKey } =
      await req.json();

    const API_KEY = geminiKey || Deno.env.get("GEMINI_API_KEY");

    if (!API_KEY) {
      throw new Error(
        "Gemini API Key is missing. Please provide it in settings."
      );
    }

    console.log("Generating museum suggestions...");

    const prompt = `Based on the user's museum visiting history and preferences, suggest 3 museums in India they might enjoy visiting next.
    
    User's visited museums: ${JSON.stringify(visitedMuseums || [])}
    User's wishlist: ${JSON.stringify(wishlist || [])}
    User preferences: ${
      userPreferences || "General interest in Indian culture and history"
    }
    
    Return ONLY a JSON object with this structure:
    {
      "suggestions": [
        {"name": "Museum Name", "location": "City, State", "reason": "Why they should go"}
      ]
    }`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            response_mime_type: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(errorData.error?.message || "Gemini API failure");
    }

    const result = await response.json();
    const content = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    try {
      const parsed = JSON.parse(content);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (parseError) {
      console.error("Parse Error. Raw content:", content);
      throw new Error("AI output was not valid JSON");
    }
  } catch (error: any) {
    console.error("Function Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
