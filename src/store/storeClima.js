import { create } from "zustand";

const useStore = create((set) => ({
  ciudad: {
    name: "Buenos Aires",
    pathImage: "/images/ciudades/buenos-aires.webp",
  },
  setCiudad: (ciudad) => set({ ciudad }),
}));

export default useStore;
