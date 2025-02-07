import { create } from "zustand";
import { ThemeMap } from "@/types";

interface StoreState {
  sidenavColor?: string;
  sideNavType: string;
  themeType: string;
  theme: ThemeMap;
  setSidenavColor: (color: string) => void;
  setSideNavType: (type: string) => void;
  setThemeType: (type: string) => void;
}

const useSettings = create<StoreState>((set) => ({
  sidenavColor: "",
  sideNavType: "white",
  themeType: "light",

  theme: {
    white: {
      text: "text-textColor",
      bg: "bg-white",
      sidebar: "bg-white",
      header: "bg-header",
      linkSideBar: "bg-activeLight",
      mainColor: "bg-bodyColor",
      drawColor: "bg-white",
      switch: "input",
    },
    dark: {
      text: "text-white",
      bg: "bg-darkBg",
      sidebar: "bg-darkSidebar",
      header: "bg-darkBg",
      linkSideBar: "bg-activeDark",
      mainColor: "bg-darkBg",
      drawColor: "bg-drawColor",
      switch: "darkBg",
    },
  } as ThemeMap,

  setSidenavColor: (color) => set({ sidenavColor: color }),

  setSideNavType: (type) => set({ sideNavType: type }),

  setThemeType: (type) =>
    set({
      themeType: type,
      sideNavType: type === "dark" ? "dark" : "white",
    }),
}));

export default useSettings;
