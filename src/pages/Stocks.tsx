import { useEffect, useState } from "react";
import { getStocks, addStockIn, addStockOut, getProducts, getLocations } from "../api/api";
import { StockSummary } from "../types/Stock";
import type { Product } from "../types/Product";
import type { Location } from "../types/Location";

export default function Stocks() {
    const [stocks, setStocks] = useState<StockSummary[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [error, setError] = useState("");

    const [productId, setProductId] = useState<number>();
    const [locationId, setLocationId] = useState<number>();
    const [quantity, setQuantity] = useState<number>(0);

    const fetchData = async () => {
        try {
            const [stocksData, productsData, locationsData] = await Promise.all([
                getStocks(),
                getProducts(),
                getLocations()
            ]);
            setStocks(stocksData);
            setProducts(productsData);
            setLocations(locationsData);
        } catch (err: any) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleIn = async () => {
        if (!productId || !locationId || quantity <= 0) {
            setError("Fill all fields correctly");
            return;
        }

        try {
            await addStockIn(productId, locationId, quantity);
            setQuantity(0);
            fetchData();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleOut = async () => {
        if (!productId || !locationId || quantity <= 0) {
            setError("Fill all fields correctly");
            return;
        }

        try {
            await addStockOut(productId, locationId, quantity);
            setQuantity(0);
            fetchData();
        } catch (err: any) {
            setError(err.message);
        }
    };

   return (
  <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <h2>Stocks</h2>

    {/* Formularz dodawania/odejmowania stocku */}
    <div style={{
      display: "flex",
      gap: "15px",
      marginBottom: "20px",
      alignItems: "center",
      flexWrap: "wrap"
    }}>
      <div>
        <label>Product:</label><br />
        <select value={productId} onChange={e => setProductId(Number(e.target.value))}>
          <option value="">Select product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Location:</label><br />
        <select value={locationId} onChange={e => setLocationId(Number(e.target.value))}>
          <option value="">Select location</option>
          {locations.map(l => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Quantity:</label><br />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          min={0}
          onChange={e => setQuantity(Number(e.target.value))}
          style={{ width: "80px" }}
        />
      </div>

      <button
        onClick={handleIn}
        style={{ backgroundColor: "green", color: "white", padding: "5px 15px", border: "none", cursor: "pointer" }}
      >
        Add
      </button>

      <button
        onClick={handleOut}
        style={{ backgroundColor: "red", color: "white", padding: "5px 15px", border: "none", cursor: "pointer" }}
      >
        Remove
      </button>
    </div>

    {error && <p style={{ color: "red" }}>{error}</p>}

    {/* Tabela stocków */}
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ backgroundColor: "#f0f0f0" }}>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Product</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Location</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {stocks
          .filter(s => s.quantity > 0)
          .map((s, idx) => (
            <tr key={idx} style={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px" }}>{s.productName}</td>
              <td style={{ padding: "8px" }}>{s.locationName}</td>
              <td style={{ padding: "8px" }}>{s.quantity}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);


}
