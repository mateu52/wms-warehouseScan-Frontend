import React, { useEffect, useState } from "react";
import { getProducts } from "../api/api";
import { Product } from "../types/Product";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getProducts().then(setProducts).catch(err => setError(err.message));
    }, []);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Products</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Barcode</th>
                        <th>Unit</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.barcode}</td>
                            <td>{p.unit}</td>
                            <td>{p.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
