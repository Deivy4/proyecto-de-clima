const rangosColores = [
  { init: -20, end: 0, color: "#0077FF" }, // Azul intenso - muy frío
  { init: 0, end: 10, color: "#339CFF" }, // Azul brillante
  { init: 10, end: 20, color: "#00C853" }, // Verde fuerte
  { init: 20, end: 25, color: "#FFD600" }, // Amarillo vivo
  { init: 25, end: 30, color: "#FF9800" }, // Naranja intenso
  { init: 30, end: 35, color: "#FF5252" }, // Rojo vivo
  { init: 35, end: 50, color: "#D50000" }, // Rojo intenso
];

export function GetColorByRango(valor) {
  const rango = rangosColores.find((x) => valor >= x.init && valor <= x.end);
  return rango ? rango.color : "#CCCCCC"; // Color por defecto si no hay rango
}
