import {create} from "zustand";

const useThemeStore = create((set) => ({
  darkMode: true, 
  setDarkMode: (mode) => set({ darkMode: mode }),
}));

export default useThemeStore;
