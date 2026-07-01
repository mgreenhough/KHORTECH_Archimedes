import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UnitSystem } from '../types/calculator';

interface AppState {
  // Unit system
  unitSystem: UnitSystem;
  setUnitSystem: (system: UnitSystem) => void;

  // Theme
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Recent calculators (last 5)
  recent: string[];
  addRecent: (calculatorId: string) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (calculatorId: string) => void;
  isFavorite: (calculatorId: string) => boolean;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  // Active calculator
  activeCalculator: string | null;
  setActiveCalculator: (id: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Unit system
      unitSystem: 'metric',
      setUnitSystem: (system) => set({ unitSystem: system }),

      // Sidebar
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      // Recent
      recent: [],
      addRecent: (calculatorId) =>
        set((state) => ({
          recent: [
            calculatorId,
            ...state.recent.filter((id) => id !== calculatorId),
          ].slice(0, 5),
        })),

      // Favorites
      favorites: [],
      toggleFavorite: (calculatorId) =>
        set((state) => ({
          favorites: state.favorites.includes(calculatorId)
            ? state.favorites.filter((id) => id !== calculatorId)
            : [...state.favorites, calculatorId],
        })),
      isFavorite: (calculatorId) => get().favorites.includes(calculatorId),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      searchOpen: false,
      setSearchOpen: (open) => set({ searchOpen: open }),

      // Active calculator
      activeCalculator: null,
      setActiveCalculator: (id) => {
        if (id) {
          get().addRecent(id);
        }
        set({ activeCalculator: id });
      },
    }),
    {
      name: 'archimedes-store',
      partialize: (state) => ({
        unitSystem: state.unitSystem,
        sidebarCollapsed: state.sidebarCollapsed,
        recent: state.recent,
        favorites: state.favorites,
      }),
    }
  )
);