import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesState = {
  favorites: number[];
  addFavorite: (id: number) => void;
  // removeFavorite: (tmdbId: number) => void;
  clearFavorites: () => void; // 👈 nuevo
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (id) =>
        set((state) => ({ favorites: [...state.favorites, id] })),
      // removeFavorite: (tmdbId) =>
      //   set((state) => ({
      //     favorites: state.favorites.filter((m) => m.tmdbId !== tmdbId),
      //   })),
      clearFavorites: () => set({ favorites: [] }), // 👈 resetea
    }),
    { name: "favorites-storage" }
  )
);
