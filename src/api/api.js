import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api", // backend base URL
});

// ======================= SEND JWT IF PRESENT =======================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ======================= AUTO-LOGOUT ON 401 =======================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      // Prevent redirect loop on login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ======================= AUTH =======================
export const login = (username, password) =>
  api.post("/auth/login", { username, password });

export const register = (userData) => api.post("/auth/register", userData);

// ======================= ASSETS =======================
export const getAssets = () => api.get("/assets");
export const createAsset = (asset) => api.post("/assets", asset);
export const updateAsset = (id, asset) => api.put(`/assets/${id}`, asset);
export const deleteAsset = (id) => api.delete(`/assets/${id}`);

// ======================= ASSET HISTORY =======================
export const getAssetHistory = () => api.get("/assetHistory");
export const createAssetHistory = (history) =>
  api.post("/assetHistory", history);
export const updateAssetHistory = (id, history) =>
  api.put(`/assetHistory/${id}`, history);
export const deleteAssetHistory = (id) => api.delete(`/assetHistory/${id}`);

// ======================= STATS =======================
export const getAssetStats = () => api.get("/assets/stats");

export default api;
