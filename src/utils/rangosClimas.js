const rangosColores = [
  { init: 15, end: 50, color: "red" },
  { init: 0, end: 15, color: "blue" },
];

export function GetColorByRango(valor) {
  return rangosColores.find((x) => valor >= x.init && valor <= x.end).color;
}
