import { create } from "zustand";

const useStore = create((set) => ({
  ciudad: { name: "Buenos Aires", pathImage: "" },
  setCiudad: (ciudad) => set({ ciudad }),
}));

export default useStore;
