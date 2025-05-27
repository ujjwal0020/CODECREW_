import axios from "axios";
import { BASE_URL } from "./constants";

// Create a centralized axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send cookies for authentication
});

export default api;
