import { create } from "zustand";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (username, password) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post("/auth/login", { username, password });

      const payload = res.data?.data;
      const token = payload?.token || null;
      const uname = payload?.username || username;
      const role = payload?.role || "EMPLOYEE";

      const user = { username: uname, role };

      set({ user, token, loading: false });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token || "");

      // Return role so that Login.jsx can navigate
      return { success: true, role };
    } catch (err) {
      set({ error: err.response?.data?.message || "Login failed", loading: false });
      return { success: false };
    }
  },

  logout: (navigate) => {
    set({ user: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    if (navigate) navigate("/");
  },

  loadUserFromStorage: () => {
    try {
      const userStr = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (userStr && userStr !== "undefined") {
        set({ user: JSON.parse(userStr), token: token || null });
      } else {
        set({ user: null, token: null });
      }
    } catch (err) {
      console.error("Failed to load user", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set({ user: null, token: null });
    }
  },
}));
