import axios from "axios";

const BASE_URL = "http://192.168.1.15:5000";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
