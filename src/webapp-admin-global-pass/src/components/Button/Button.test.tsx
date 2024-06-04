import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import themeDefault from '@/theme/ThemeDefault';

import { Button, ButtonProps } from '.';

const builder = (props: ButtonProps = {}): ButtonProps => ({
  ...props,
});

const setup = (props = { buttonProps: builder() }) => {
  const { buttonProps } = props;
  const onClick = jest.fn();
  const renderResult = render(
    <ThemeProvider theme={themeDefault}>
      <Button {...buttonProps} onClick={onClick} />
    </ThemeProvider>
  );
  const buttonElement = renderResult.getByRole('button');

  return {
    buttonElement,
    buttonProps,
    onClick,
    ...renderResult,
  };
};

describe('Button', () => {
  test('should render with default props', () => {
    const label = 'Testing button';
    const { getByText, container } = setup({
      buttonProps: { children: label },
    });

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveProperty('type', 'submit');
    expect(container.firstChild).toHaveStyle({ height: '4.9rem' });
    expect(container.firstChild).toHaveStyle({
      backgroundColor: themeDefault.colors.white,
    });
  });
});
