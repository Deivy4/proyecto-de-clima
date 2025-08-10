import { useEffect, useRef, useState } from "react";
import storeClima from "../store/storeClima";
import axios from "axios";
import { GetColorByRango } from "../utils/rangosClimas";
const API_KEY = import.meta.env.VITE_APIKEY_CLIMA;

export default function MostrarInformacionClima() {
  const ciudad = storeClima((state) => state.ciudad);

  // Estados
  const [clima, setClima] = useState(null);
  const [imagenClima, setImagenClima] = useState(null);
  const [grados, setGrados] = useState(0);
  const [targetGrados, setTargetGrados] = useState(0);

  const [visibleImage, setVisibleImage] = useState(false);
  // Referencia del canvas
  const canvasRef = useRef(null);

  const onErroImage = () => {
    setImagenClima("/images/ciudades/buenos-aires.webp");
  };
  // Función para dibujar termómetro
  const CrearTermometro = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = 80;
    const height = 300;
    const bulbRadius = 30;
    const tubeWidth = 20;
    const tubeHeight = height - bulbRadius * 2 - 20;

    ctx.clearRect(0, 0, width, height);

    // Bulbo
    ctx.beginPath();
    ctx.fillStyle = "#ddd";
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.arc(width / 2, height + 20 - bulbRadius, bulbRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Tubo
    ctx.beginPath();
    ctx.fillRect(
      (width - tubeWidth) / 2,
      height + 20 - bulbRadius * 2 - tubeHeight,
      tubeWidth,
      tubeHeight
    );
    ctx.strokeRect(
      (width - tubeWidth) / 2,
      height + 20 - bulbRadius * 2 - tubeHeight,
      tubeWidth,
      tubeHeight
    );

    // Mercurio
    const minTemp = -10;
    const maxTemp = 40;
    const clampedGrados = Math.min(Math.max(grados, minTemp), maxTemp);
    const mercuryHeight =
      ((clampedGrados - minTemp) / (maxTemp - minTemp)) * tubeHeight;

    ctx.beginPath();
    ctx.fillStyle = GetColorByRango(grados);
    ctx.fillRect(
      (width - tubeWidth) / 2 + 2,
      height + 20 - bulbRadius * 2 - mercuryHeight,
      tubeWidth - 4,
      mercuryHeight + bulbRadius
    );
    ctx.arc(
      width / 2,
      height + 20 - bulbRadius,
      bulbRadius - 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.stroke();

    // Texto
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${clampedGrados.toFixed(1)} °C`, width / 2, 30);
  };

  // Fetch clima (función reusable)
  const fetchClima = async (ciudadBusqueda) => {
    if (!ciudadBusqueda) return;
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
          ciudadBusqueda.name
        )}&aqi=no`
      );
      setClima(response.data);
      setImagenClima(ciudad.pathImage);
    } catch (error) {
      console.error("Error al obtener los datos del clima:", error);
    }
  };

  // useEffect para traer clima en montaje y cuando cambia ciudad
  useEffect(() => {
    fetchClima(ciudad);
  }, [ciudad]);

  // useEffect para dibujar termómetro cuando cambia grados
  useEffect(() => {
    CrearTermometro();
  }, [grados]);

  // useEffect para actualizar targetGrados cuando cambia clima
  useEffect(() => {
    if (clima) setTargetGrados(clima.current.temp_c);
  }, [clima]);

  // useEffect para animar temperatura suavemente
  useEffect(() => {
    let animationFrameId;

    const animateTemperature = () => {
      setGrados((prev) => {
        const diff = targetGrados - prev;
        if (Math.abs(diff) < 0.1) return targetGrados;
        return prev + diff * 0.1;
      });
      animationFrameId = requestAnimationFrame(animateTemperature);
    };

    animationFrameId = requestAnimationFrame(animateTemperature);

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetGrados]);
  useEffect(() => {
    setVisibleImage(true);
    setTimeout(() => {
      setVisibleImage(false);
    }, 2000);
  }, [imagenClima]);

  return (
    <div className="w-full items-center flex justify-around gap-2">
      <canvas ref={canvasRef} width={80} height={340} />
      {clima && (
        <div className="w-3/4">
          {imagenClima && (
            <img
              className={`border shadow shadow-white min-w-60 ${
                visibleImage ? "img-ciudad-fadeIn" : ""
              }`}
              loading="lazy"
              src={imagenClima}
              onError={onErroImage}
            />
          )}
        </div>
      )}
    </div>
  );
}
