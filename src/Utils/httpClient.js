import axios from "axios";
import { BASE_URI, TOKEN } from "../constants";

const HEADERS = {
    "Content-Type": "application/json",
};

export const HttpClient = axios.create({
    baseURL: BASE_URI,
    headers: {
        ...HEADERS,
    },
});

HttpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN) || "";
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});
