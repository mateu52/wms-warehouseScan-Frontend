import React, { useState } from "react";
import { login } from "../api/api";

export default function Login({ onLogin }: { onLogin: () => void }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(name, password);
            onLogin();
        } catch (err: any) {
            setError(err.message);
            setPassword("");
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
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        autoComplete="current-password"
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

      {error && <p style={{ color: 'red', textAlign: "center" }}>{error}</p>}
    </form>
  </div>
);


}


