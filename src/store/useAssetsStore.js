import { create } from "zustand";

export const useAssetsStore = create((set) => ({
  assets: [], // all assets
  history: [], // asset history
  totalAssets: 0,
  allocatedAssets: 0,
  remainingAssets: 0,

  setAssets: (data) => {
    const total = data.length;
    const allocated = data.filter(a => a.status === "ALLOCATED").length;
    const remaining = total - allocated;
    set({ assets: data, totalAssets: total, allocatedAssets: allocated, remainingAssets: remaining });
  },

  addAsset: (asset) => set(state => ({ assets: [...state.assets, asset], totalAssets: state.totalAssets + 1 })),
  updateAsset: (id, updated) => set(state => ({
    assets: state.assets.map(a => a.id === id ? { ...a, ...updated } : a)
  })),
  deleteAsset: (id) => set(state => ({ assets: state.assets.filter(a => a.id !== id), totalAssets: state.totalAssets - 1 })),

  setHistory: (data) => set({ history: data }),
  addHistory: (entry) => set(state => ({ history: [...state.history, entry] })),
}));
