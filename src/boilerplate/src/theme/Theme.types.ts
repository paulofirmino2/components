type ColorsText = {
  dark: string;
  medium: string;
  light: string;
  disabled: string;
};

type ColorsBrand = {
  darkness: string;
  dark: string;
  medium: string;
  light: string;
};

type Colors = {
  error: string;
  white: string;
  black: string;
  border: string;
  disabled: string;
  text: ColorsText;
  brand: ColorsBrand;
};

type FontSize = {
  xs: string;
  sm: string;
  md: string;
  base: string;
  intermediary: string;
  lg: string;
  xl: string;
};

type Breakpoint = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export type Spacing = {
  xs: string;
  sm: string;
  md: string;
  base: string;
  lg: string;
  lg2: string;
  xl: string;
  xxl: string;
};

type FontFamily = {
  base: string;
  secondary: string;
  ibm: string;
};

type FontWeight = {
  base: number;
  bold: number;
  medium: number;
};

type LineHeight = {
  base: string;
  high: string;
};

type Radius = {
  sm: string;
  md: string;
  lg: string;
  xs: string;
};

export type ThemeType = {
  colors: Colors;
  fontSize: FontSize;
  fontFamily: FontFamily;
  breakpoint: Breakpoint;
  spacing: Spacing;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
  radius: Radius;
};
