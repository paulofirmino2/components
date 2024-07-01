import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { describe, expect, vi } from 'vitest';

import theme from '@/theme/ThemeDefault';

import 'jest-styled-components';

import { Button, ButtonProps } from '.';

const builder = (props: ButtonProps = {}): ButtonProps => ({
  ...props,
});

const setup = (props = { buttonProps: builder() }) => {
  const { buttonProps } = props;
  const onClick = vi.fn();

  const renderResult = render(
    <ThemeProvider theme={theme}>
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
  test('should render with primary props', async () => {
    const label = 'Testing button';
    const variant = 'primary';
    const { getByText, container } = setup({
      buttonProps: { children: label, id: 'NOTHOVER', variant },
    });

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveProperty('type', 'submit');
    expect(container.firstChild).toHaveStyle({ height: '48px' });
    expect(container.firstChild).toHaveStyle({ border: 'none' });
    expect(container.firstChild).toHaveStyle({ cursor: 'pointer' });
    expect(container.firstChild).toHaveStyle({
      background: theme.colors.brand.dark,
    });
    expect(container.firstChild).toHaveStyle({ color: theme.colors.white });
    expect(container.firstChild).toHaveStyle({ borderRadius: theme.radius.lg });
    expect(container.firstChild).toHaveStyle({
      fontWeight: theme.fontWeight.bold,
    });
    expect(container.firstChild).toHaveStyle({ fontSize: theme.fontSize.md });
  });

  test('should render with default props and hover', async () => {
    const label = 'Testing button hover';
    const { getByText, container } = setup({
      buttonProps: { children: label, variant: 'primary' },
    });

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({
      background: theme.colors.white,
    });
    expect(container.firstChild).toHaveStyle({
      color: theme.colors.brand.dark,
    });
    expect(container.firstChild).toHaveStyle({
      border: `1px solid ${theme.colors.brand.dark}`,
    });
  });

  test('should render with secondary props', async () => {
    const label = 'Testing button secondary';
    const { getByText, container } = setup({
      buttonProps: { children: label, id: 'NOTHOVER', variant: 'secondary' },
    });

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({
      background: theme.colors.white,
    });
    expect(container.firstChild).toHaveStyle({
      color: theme.colors.brand.dark,
    });
    expect(container.firstChild).toHaveStyle({
      border: `1px solid ${theme.colors.brand.dark}`,
    });
  });

  test('should render with secondary props and hover', async () => {
    const label = 'Testing button secondary hover';
    const { getByText, container } = setup({
      buttonProps: { children: label, variant: 'secondary' },
    });

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({
      background: theme.colors.border,
    });
    expect(container.firstChild).toHaveStyle({
      color: theme.colors.white,
    });
    expect(container.firstChild).toHaveStyle({
      border: `1px solid ${theme.colors.white}`,
    });
  });

  test('should render with fullwidth props', async () => {
    const label = 'Testing button';
    const { getByText, container } = setup({
      buttonProps: { children: label, fullWidth: true },
    });

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({
      width: '100%',
    });
  });

  test('should render with size SM props', async () => {
    const label = 'Testing button SM';
    const { getByText, container } = setup({
      buttonProps: { children: label, sizevariant: 'sm' },
    });

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({
      height: '36px',
    });
  });

  test('disabled to have attribute disabled', async () => {
    const label = 'Testing button disabled';
    const { container } = setup({
      buttonProps: { children: label, disabled: true },
    });

    expect(container.firstChild).toBeDisabled();
  });

  test('triggers onClick handler', () => {
    const label = 'Testing button onClick';
    const { buttonElement, onClick } = setup({
      buttonProps: { children: label },
    });
    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalled();
  });

  test('does not trigger onClick handler when disabled', () => {
    const label = 'Testing button';
    const { buttonElement, onClick } = setup({
      buttonProps: { children: label, disabled: true },
    });
    fireEvent.click(buttonElement);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('triggers onBlur handler', () => {
    const label = 'Testing button onBlur';
    const blur = vi.fn();
    const { buttonElement } = setup({
      buttonProps: { children: label, onBlur: blur },
    });

    fireEvent.blur(buttonElement);
    expect(blur).toHaveBeenCalled();
  });

  it('should call onClick when the button is clicked', () => {
    const label = 'Testing button onClick';
    const { buttonElement, onClick } = setup({
      buttonProps: { children: label },
    });

    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
