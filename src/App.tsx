import React, { useState } from "react";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Locations from "./pages/Locations";
import Stocks from "./pages/Stocks";

function App() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
    const [page, setPage] = useState("products");

    if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

    return (
        <div>
            <h1>WMS Frontend</h1>
            <button onClick={() => { localStorage.removeItem("token"); setLoggedIn(false); }}>Logout</button>
            <div>
                <button onClick={() => setPage("products")}>Products</button>
                <button onClick={() => setPage("locations")}>Locations</button>
                <button onClick={() => setPage("stocks")}>Stocks</button>
            </div>

            {page === "products" && <Products />}
            {page === "locations" && <Locations />}
            {page === "stocks" && <Stocks />}
        </div>
    );
}

export default App;


