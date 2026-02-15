import React, { useEffect, useState } from "react";
import { getProducts, addProduct, deleteProduct } from "../api/api";
import { Product } from "../types/Product";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>(0);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = async () => {
    if (!name || price <= 0) {
        setError("Fill all fields correctly");
        return;
    }

    try {
        await addProduct(name, price);
        setName("");
        setPrice(0);
        setError("");
        fetchProducts();
    } catch (err: any) {
        setError(err.message);
    }
};


    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
  <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <h2>Products</h2>

    {/* Formularz dodawania produktu */}
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px", alignItems: "center", flexWrap: "wrap" }}>
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ padding: "5px" }}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
        style={{ padding: "5px", width: "80px" }}
      />
      <button
        onClick={handleAddProduct}
        style={{ backgroundColor: "green", color: "white", border: "none", padding: "5px 15px", cursor: "pointer" }}
      >
        Add Product
      </button>
    </div>

    {error && <p style={{ color: "red" }}>{error}</p>}

    {/* Tabela produktów */}
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ backgroundColor: "#f0f0f0" }}>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Barcode</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Price</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id} style={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
            <td style={{ padding: "8px" }}>{p.name}</td>
            <td style={{ padding: "8px" }}>{p.barcode}</td>
            <td style={{ padding: "8px" }}>{p.price}</td>
            <td style={{ padding: "8px" }}>
              <button
                onClick={() => handleDelete(p.id)}
                style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}
