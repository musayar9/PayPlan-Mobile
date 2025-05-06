import axios from "axios";

const BASE_URL = "http://192.168.1.18:5000";
//const BASE_URL = "http://10.0.2.2:5000";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
