import {create} from "zustand";

const useThemeStore = create((set) => ({
  darkMode: false,
  setDarkMode: (mode) => set({ darkMode: mode }),
}));

export default useThemeStore;
