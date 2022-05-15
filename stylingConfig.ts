const colors = {
  matrix: "#B1645D",
  petiteOrchard: "#DB9690",
  petiteOrchardLight: "#DD9E98",
  roseFog: "#DFA9A4",
  alto: "#D9D9D9",
  mineShaft: "#393838",
  emperor: "#4F4F4F",
  tumbleweed: "#DBAC80",
  copper: "#ad7d34",
  tussock: "#D09258",
  craterBrown: "#462523",
};

const fonts = {
  courierPrime: `"Courier Prime", monospace`,
  openSans: `"Open Sans", sans-serif`,
};

const decentColors = {
  blueGem: "#3A0CA3",
  coconutCream: "#FAF5E4",
  persianRose: "#F72585",
  purple: "#7209B7",
  spray: "#5FF2D9",
  scorpion: "#5E5E5E",
  mineShaft: "#2B2B2B",
  nobel: "#B5B5B5",
};

const decentFonts = {
  senilita: `"Senilita", sans-serif`,
};

const breakpoints: { [key: string]: number } = {
  xxs: 320,
  xs: 375,
  s: 425,
  m: 600,
  l: 768,
  xl: 1024,
  xxl: 1400,
};

export default { colors, fonts, decentColors, decentFonts, breakpoints };
