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
        <div>
            <h2>Locations</h2>
            <ul>
                {locations.map(l => <li key={l.id}>{l.name}</li>)}
            </ul>
        </div>
    );
}
