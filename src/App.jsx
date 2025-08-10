import { useState } from "react";
import "./App.css";
import ciudades from "./data/ciudades.json";
import MostrarInformacionClima from "./components/MostrarInformacionClima";
import storeClima from "./store/storeClima";
function App() {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("Buenos Aires");
  const { setCiudad } = storeClima();
  const manejarCambioCiudad = (nuevaCiudadId) => {
    setCiudadSeleccionada(nuevaCiudadId);
    setCiudad(ciudades.find((x) => x.id == nuevaCiudadId));
  };
  return (
    <>
      <main className=" flex justify-center items-center h-dvh bg-gray-500">
        <div className="max-w-450px] max-h-[500px] shadow-2xs bg-linear-to-bl from-violet-500 to-fuchsia-500 rounded justify-around min-w-[400px] min-h-[500px] flex w-2/4 h-2/3 bg-white p-4 flex-col items-start gap-4">
          <h2 className=" -mb-6 font-poppins text-center w-full text-white text-[18px]">
            Temperaturas de las provincias de Argentina
          </h2>
          <MostrarInformacionClima />
          <select
            value={ciudadSeleccionada}
            onChange={(e) => manejarCambioCiudad(e.target.value)}
            className="font-poppins border border-gray-300 rounded p-2 w-full select-provincias"
          >
            {ciudades.map((ciudad, index) => (
              <option key={index} value={ciudad.id}>
                {ciudad.name}
              </option>
            ))}
          </select>
        </div>
      </main>
    </>
  );
}

export default App;
