import { ButtonHTMLAttributes } from 'react';

import { SpacingBottomType } from '@/types/SpacingBottom';

export type Sizes = 'sm' | 'md';

export type Icons = 'search' | 'closeEye' | 'openEye';

export type Options = {
  value: string;
  label: string;
};

export type SelectStyledProps = {
  spacing?: SpacingBottomType;
  errorMessage?: string;
  $errorMessage?: string;
  label?: string;
  sizevariant?: Sizes;
  fullWidth?: boolean;
  options?: Options[];
  placeholder?: string;
  value?: string;
  onChangeOption?: (value: string) => void;
  defaultOption?: string;
};

export type SelectProps = ButtonHTMLAttributes<HTMLButtonElement> &
  SelectStyledProps;
