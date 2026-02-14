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
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}


