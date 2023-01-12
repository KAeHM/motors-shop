import { extendTheme } from "@chakra-ui/react";
import "@fontsource/inter/variable.css";

const colorConfig = {
  colors: {
    brand: {
      100: "#EDEAFD",
      300: "#B0A6F0",
      500: "#5126EA",
      700: "#4529E6",
    },
    textColor: {
      200: "#495057",
    },
  },
};

const fontConfig = {
  fonts: {
    heading: `"InterVariable", sans-serif`,
    body: `"InterVariable", sans-serif`,
  },
};

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

export const theme = extendTheme({
  colors: colorConfig.colors,
  fonts: fontConfig.fonts,
  breakpoints,
});
