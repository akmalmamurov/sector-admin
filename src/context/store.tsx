import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  auth: boolean;
  setAuth: (auth: boolean) => void;
};

const useStore = create<Store>()(
  persist(
    (set) => ({
      auth: false,
      setAuth: (auth) => set({ auth }),
    }),
    {
      name: "sector-admin",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
