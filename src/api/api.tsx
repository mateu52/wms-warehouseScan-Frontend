const BASE_URL = "http://localhost:5250/api";

const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    return token;
};

export const login = async (name: string, password: string) => {
    const res = await fetch(`${BASE_URL}/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password })
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    localStorage.setItem("token", data.token);
    return data.token;
};

export const getProducts = async () => {
    const res = await fetch(`${BASE_URL}/Products`, {
        headers: { "Authorization": `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error("Fetching products failed");
    return res.json();
};

export const getLocations = async () => {
    const res = await fetch(`${BASE_URL}/Locations`, {
        headers: { "Authorization": `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error("Fetching locations failed");
    return res.json();
};

export const getStocks = async () => {
    const res = await fetch(`${BASE_URL}/Stocks`, {
        headers: { "Authorization": `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error("Fetching stocks failed");
    return res.json();
};

export const addStockIn = async (productId: number, locationId: number, quantity: number) => {
    const res = await fetch(`${BASE_URL}/Stocks/in`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId, locationId, quantity })
    });
    if (!res.ok) throw new Error("Adding stock failed");
};

export const addStockOut = async (productId: number, locationId: number, quantity: number) => {
    const res = await fetch(`${BASE_URL}/Stocks/out`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId, locationId, quantity })
    });
    if (!res.ok) throw new Error("Removing stock failed");
};
export const addProduct = async (name: string, price: number) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await fetch(`${BASE_URL}/Products`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ Name: name, Price: price, Unit: "szt" }) // tylko name i price
    });

    if (!res.ok) {
        const text = await res.text(); // ¿eby zobaczyæ dok³adny b³¹d
        throw new Error(`Adding product failed: ${text}`);
    }
};


export const deleteProduct = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await fetch(`${BASE_URL}/Products/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error("Deleting product failed");
};



