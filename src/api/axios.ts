import axios from "axios";

const baseURL = "https://woozy-gigantic-fear.glitch.me";

export const authInstance = axios.create({
    baseURL,
    // baseURL:"http://localhost:3001",
    timeout: 5000
});
