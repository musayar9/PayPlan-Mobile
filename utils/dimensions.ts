import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const isSmallDevice = SCREEN_WIDTH < 375;

export const layout = {
  window: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  isSmallDevice,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: isSmallDevice ? 12 : 16,
  lg: isSmallDevice ? 16 : 24,
  xl: isSmallDevice ? 24 : 32,
};

export const typography = {
  small: isSmallDevice ? 11 : 12,
  regular: isSmallDevice ? 12 : 14,
  large: isSmallDevice ? 14 : 16,
  xlarge: isSmallDevice ? 18 : 20,
};

export const forms = {
  inputHeight: isSmallDevice ? 45 : 50,
  maxWidth: Math.min(400, SCREEN_WIDTH * 0.85),
};
