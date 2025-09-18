import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

type Style = {
  tabBarPadding: number;
  windowWidth: number;
  windowHeight: number;
};

type TextColors = {
  primary: string;
  secondary: string;
};

type BackgroundColors = {
  app: string;
  card: string;
  button: string;
};

type NavColors = {
  active: string;
  inactive: string;
};

type Colors = {
  primary: string;
  success: string;
  white: string;
  text: TextColors;
  background: BackgroundColors;
  border: string;
  nav: NavColors;
};

// Utility type for dot-notation color keys
type NestedColorKeys<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends string
    ? `${Prefix}${Extract<K, string>}`
    : `${Prefix}${Extract<K, string>}.${NestedColorKeys<T[K], "">}`;
}[keyof T];

type ColorKeys = NestedColorKeys<Colors>;

type GlobalStylesType = {
  colors: Colors;
  styles: Style;
  getColor: (color: ColorKeys, opacity?: number) => string;
};

export const GlobalStyles: GlobalStylesType = {
  colors: {
    primary: "#EB4B4B", // Main brand color (buttons, active states, tags)
    success: "#1DAA5D", // Success state (e.g., "WON")
    white: "#FFFFFF",
    text: {
      primary: "#261d1e", // Main headings, button text
      secondary: "#808080", // Metadata, descriptions
    },
    background: {
      card: "#F5F5F5", // Main app background
      app: "#FFFFFF", // Card surfaces
      button: "#261d1e",
    },
    border: "#E5E5E5", // Divider lines, outlines
    nav: {
      active: "#EB4B4B", // Active navigation icon
      inactive: "#808080", // Inactive navigation icon
    },
  },
  styles: <Style>{
    tabBarPadding: 100,
    windowWidth: width,
    windowHeight: height,
  },
  getColor: (color, opacity = 1) => {
    const keys = color.split(".");
    let hex: any = GlobalStyles.colors;

    for (const k of keys) {
      hex = hex[k];
    }

    if (!hex || typeof hex !== "string") {
      console.warn(`Color "${color}" not found in GlobalStyles.colors`);
      return "";
    }

    if (hex.startsWith("rgba") || hex.startsWith("rgb")) {
      return hex.replace(/(rgba?\(.*?,.*?,.*?),?.*?\)/, `$1,${opacity})`);
    }

    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },
};
