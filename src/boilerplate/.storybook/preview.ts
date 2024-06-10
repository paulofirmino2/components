import { ThemeProvider } from 'styled-components';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import GlobalStyles from '../src/styles/globalStyles';
import { withRouter } from 'storybook-addon-react-router-v6';

import themeDefault from '../src/theme/ThemeDefault';

export const decorators = [
  withRouter,
  withThemeFromJSXProvider({
    themes: {
      default: themeDefault,
    },
    Provider: ThemeProvider,
    GlobalStyles,
  }),
];
