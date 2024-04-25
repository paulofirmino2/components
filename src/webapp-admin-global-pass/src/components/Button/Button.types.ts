import { ButtonHTMLAttributes } from 'react';

export type Variants = 'primary' | 'secondary' | 'link';

export type Sizes = 'sm' | 'md';

export type ButtonStyledProps = {
  variant?: Variants;
  fullWidth?: boolean;
  sizevariant?: Sizes;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyledProps;
