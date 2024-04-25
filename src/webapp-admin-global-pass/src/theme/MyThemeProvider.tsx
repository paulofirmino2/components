import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../styles/globalStyles';

import theme from './ThemeDefault';

type Props = {
  children: ReactNode;
};

const MyThemeProvider = ({ children }: Props) => (
  <ThemeProvider theme={theme}>
    {children}
    <GlobalStyles />
  </ThemeProvider>
);

export default MyThemeProvider;
