import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App"
import "./index.css";

const SetupScreen = () => {
  const save = () => {
    const u = (document.getElementById("u") as HTMLInputElement).value;
    const k = (document.getElementById("k") as HTMLInputElement).value;
    const g = (document.getElementById("g") as HTMLInputElement).value;

    if (u && k && g) {
      localStorage.setItem("VITE_SUPABASE_URL", u.trim());
      localStorage.setItem("VITE_SUPABASE_ANON_KEY", k.trim());
      localStorage.setItem("VITE_GEMINI_API_KEY", g.trim());
      localStorage.setItem("APP_CONFIGURED", "true");
      window.location.href = "/";
    } else {
      alert("Fill all fields");
    }
  };

  return (
    <div
      style={{
        padding: "50px",
        background: "#111",
        color: "white",
        height: "100vh",
      }}
    >
      <h2>Setup Needed</h2>
      <input
        id="u"
        placeholder="Supabase URL"
        style={{ display: "block", margin: "10px 0", padding: "10px" }}
      />
      <input
        id="k"
        placeholder="Anon Key"
        style={{ display: "block", margin: "10px 0", padding: "10px" }}
      />
      <input
        id="g"
        placeholder="Gemini Key"
        style={{ display: "block", margin: "10px 0", padding: "10px" }}
      />
      <button
        onClick={save}
        style={{ padding: "10px 20px", background: "blue", color: "white" }}
      >
        Save & Start App
      </button>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
const isDone = localStorage.getItem("APP_CONFIGURED") === "true";

if (!isDone) {
  root.render(<SetupScreen />);
} else {
  root.render(<App />);
}
