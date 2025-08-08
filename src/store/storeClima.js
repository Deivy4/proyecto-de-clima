import { create } from "zustand";

const useStore = create((set) => ({
  ciudad: "Buenos Aires",
  setCiudad: (ciudad) => set({ ciudad }),
}));

export default useStore;
