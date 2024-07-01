import { InputHTMLAttributes } from 'react';

import { MaskItens } from '@/types/Mask';
import { SpacingBottomType } from '@/types/SpacingBottom';

export type Sizes = 'sm' | 'md';

export type Icons = 'search' | 'closeEye' | 'openEye';

export type InputStyledProps = {
  spacing?: SpacingBottomType;
  errorMessage?: string;
  label?: string;
  mask?: MaskItens;
  sizevariant?: Sizes;
  iconleft?: Icons;
  iconRight?: Icons;
  fullWidth?: boolean;
  $iconRight?: Icons;
  $iconleft?: Icons;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  InputStyledProps;
