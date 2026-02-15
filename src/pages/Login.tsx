import React, { useState } from "react";
import { login } from "../api/api";

export default function Login({ onLogin }: { onLogin: () => void }) {
    const [useDemo, setUseDemo] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (useDemo) {
        // automatyczne logowanie do demo
        localStorage.setItem("token", "demo-token");
        onLogin();
        return;
      }

      // zwyk³e logowanie
      if (name === "demo" && password === "demo123") {
        localStorage.setItem("token", "demo-token");
        onLogin();
      } else {
        setError("Wrong username or password");
      }
    };


    return (
  <div 
    style={{
      display: "flex",
      justifyContent: "center", // wyœrodkowanie poziome
      alignItems: "center",     // wyœrodkowanie pionowe
      height: "100vh",          // ca³a wysokoœæ widoku
      width: "100vw",            // ca³a szerokoœæ widoku
      backgroundColor: "#f0f2f5",
      fontFamily: "Arial, sans-serif"
    }}
  >
    <form 
      onSubmit={handleSubmit} 
      style={{
        width: "300px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        autoComplete="username"
        disabled={useDemo}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        autoComplete="current-password"
        disabled={useDemo}
      />

      <button
        type="submit"
        style={{
          padding: "10px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#28a745",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Login
      </button>
      <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="checkbox"
            checked={useDemo}
            onChange={e => setUseDemo(e.target.checked)}
          />
          Use demo account
        </label>

      {error && <p style={{ color: 'red', textAlign: "center" }}>{error}</p>}
    </form>
  </div>
);


}


