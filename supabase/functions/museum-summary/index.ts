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
    const { museumName, city, state, category, description, geminiKey } =
      await req.json();

    const API_KEY = geminiKey || Deno.env.get("GEMINI_API_KEY");

    if (!API_KEY) {
      throw new Error("Gemini API Key is missing. Please add it to settings.");
    }

    console.log("Generating summary with Gemini for:", museumName);

    const prompt = `You are an expert museum guide. Generate a concise, engaging summary for this Indian museum in 2-3 sentences.
    
    Museum: ${museumName}
    Location: ${city}, ${state}
    Category: ${category}
    Description: ${description}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topP: 0.8,
            topK: 40,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini Error:", errorData);
      throw new Error(errorData.error?.message || "Gemini API failed");
    }

    const data = await response.json();
    const summary = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("Summary generated successfully");

    return new Response(JSON.stringify({ summary }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
