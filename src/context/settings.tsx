import { create } from "zustand";
import { ThemeMap } from "@/types";

interface StoreState {
  sidenavColor?: string;
  sideNavType: string;
  themeType: string;
  selectedCatalogId: string | null;
  selectedSubCatalogId: string | null;
  selectedCategoryId: string | null;
  theme: ThemeMap;
  setSidenavColor: (color: string) => void;
  setSideNavType: (type: string) => void;
  setThemeType: (type: string) => void;
  setSelectedCatalogId: (id: string) => void;
  setSelectedSubCatalogId: (id: string) => void;
  setSelectedCategoryId: (id: string) => void;
}

const useSettings = create<StoreState>((set) => ({
  sidenavColor: "",
  sideNavType: "white",
  themeType: "light",
  selectedCatalogId: null,
  selectedSubCatalogId: null,
  selectedCategoryId: null,
  setSelectedCatalogId: (id) => set({ selectedCatalogId: id }),
  setSelectedSubCatalogId: (id) => set({ selectedSubCatalogId: id }),
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
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
      tabBg: "bg-gray-100",
      tabActive: "bg-[#FFFFFF]",
      
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
      tabActive: "bg-darkSidebar",
      tabBg: "bg-drawColor",
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
