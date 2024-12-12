import axios from "axios";



export const authInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    // baseURL:"http://localhost:3001",
    timeout: 5000
});

