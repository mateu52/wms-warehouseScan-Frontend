import React, { useEffect, useState } from "react";
import { getStocks, addStockIn, addStockOut } from "../api/api";
import { StockSummary } from "../types/Stock";

export default function Stocks() {
    const [stocks, setStocks] = useState<StockSummary[]>([]);
    const [error, setError] = useState("");
    const [productId, setProductId] = useState<number>(0);
    const [locationId, setLocationId] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);

    const fetchStocks = () => {
        getStocks().then(setStocks).catch(err => setError(err.message));
    };

    useEffect(() => {
        fetchStocks();
    }, []);

    const handleIn = async () => {
        try {
            await addStockIn(productId, locationId, quantity);
            fetchStocks();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleOut = async () => {
        try {
            await addStockOut(productId, locationId, quantity);
            fetchStocks();
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Stocks</h2>
            <div>
                <input type="number" placeholder="Product ID" value={productId} onChange={e => setProductId(+e.target.value)} />
                <input type="number" placeholder="Location ID" value={locationId} onChange={e => setLocationId(+e.target.value)} />
                <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(+e.target.value)} />
                <button onClick={handleIn}>Add Stock</button>
                <button onClick={handleOut}>Remove Stock</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Location</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((s, idx) => (
                        <tr key={idx}>
                            <td>{s.productName}</td>
                            <td>{s.locationName}</td>
                            <td>{s.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
