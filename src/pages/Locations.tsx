import React, { useEffect, useState } from "react";
import { getLocations } from "../api/api";
import { Location } from "../types/Location";

export default function Locations() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getLocations().then(setLocations).catch(err => setError(err.message));
    }, []);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
  <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <h2>Locations</h2>

    <ul style={{ listStyle: "none", padding: 0 }}>
      {locations.map(l => (
        <li
          key={l.id}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            marginBottom: "5px",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9"
          }}
        >
          {l.name}
        </li>
      ))}
    </ul>
  </div>
);

}
