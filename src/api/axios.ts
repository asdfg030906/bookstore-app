import axios from "axios";

export const authInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 5000
});
