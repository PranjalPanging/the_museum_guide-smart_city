import { createClient } from "@supabase/supabase-js";

// We fetch these ONLY when called, not when the file is imported
const getKeys = () => {
  const url = localStorage.getItem("VITE_SUPABASE_URL");
  const anon = localStorage.getItem("VITE_SUPABASE_ANON_KEY");
  return { url, anon };
};

export const getSupabase = () => {
  const { url, anon } = getKeys();
  if (!url || !url.startsWith("http") || !anon) {
    return null;
  }
  return createClient(url, anon);
};

export const supabase = getSupabase() as any;
