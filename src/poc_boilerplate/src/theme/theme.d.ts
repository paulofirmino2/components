/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';

import theme from './ThemeDefault';

type ThemeInterface = typeof theme;

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}
