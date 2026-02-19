import { useState } from "react";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Locations from "./pages/Locations";
import Stocks from "./pages/Stocks";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [page, setPage] = useState("products");

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const tabs = [
    { key: "products", label: "Products" },
    { key: "locations", label: "Locations" },
    { key: "stocks", label: "Stocks" }
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>WMS Frontend</h1>
        <button
          onClick={() => { localStorage.removeItem("token"); setLoggedIn(false); }}
          style={{ padding: "5px 15px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>

      {/* Zak³adki */}
      <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setPage(t.key)}
            style={{
              padding: "10px 20px",
              border: "1px solid #ccc",
              borderBottom: page === t.key ? "2px solid green" : "1px solid #ccc",
              backgroundColor: page === t.key ? "#f0fff0" : "#fff",
              cursor: "pointer",
              fontWeight: page === t.key ? "bold" : "normal",
              borderRadius: "4px 4px 0 0"
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Treœæ zak³adki */}
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "0 4px 4px 4px" }}>
        {page === "products" && <Products />}
        {page === "locations" && <Locations />}
        {page === "stocks" && <Stocks />}
      </div>
    </div>
  );
}


export default App;


