import { ThemeType } from './Theme.types';

const theme: ThemeType = {
  colors: {
    error: '#FF3A29',
    white: '#ffffff',
    black: '#3D4045',
    border: '#C6C3D0',
    disabled: '#DEDCE4',
    text: {
      dark: '#525252',
      medium: '#8F8F8F',
      light: '#C7C7C7',
      disabled: '#DEDCE4',
    },
    brand: {
      darkness: '#18293B',
      dark: '#5055A4',
      medium: '#4379C1',
      light: '#3CA8F0',
    },
  },
  fontSize: {
    xs: '0.625rem',
    sm: '1.2rem',
    md: '1.4rem',
    base: '1.6rem',
    intermediary: '2rem',
    lg: '2.4rem',
    xl: '3.2rem',
  },
  lineHeight: {
    base: 'normal',
    high: '140%',
  },
  fontFamily: {
    base: '"Source Sans 3", sans-serif;',
    secondary: '"Inter", sans-serif;',
    ibm: '"IBM Plex Sans", sans-serif;',
  },
  fontWeight: {
    base: 400,
    medium: 500,
    bold: 700,
  },
  breakpoint: {
    sm: '450px',
    md: '768px',
    lg: '1170px',
    xl: '1440px',
  },
  spacing: {
    xs: '0.8rem',
    sm: '1rem',
    md: '1.6rem',
    base: '2rem',
    lg: '2.4rem',
    lg2: '3.2rem',
    xl: '4rem',
    xxl: '4.8rem',
  },
  radius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '24px',
  },
};

export default theme;
