import { ReactElement } from 'react';
import {
  cleanup,
  render,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { afterEach } from 'vitest';

import theme from '../../theme/ThemeDefault';

afterEach(() => {
  cleanup();
});

const customRender = (ui: ReactElement, options: RenderOptions): RenderResult =>
  render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={theme}> {children}</ThemeProvider>
    ),
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render, userEvent };
