import { Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react';

export type DialogStyledProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  title?: string;
  children?: ReactNode;
  maxWidth?: number;
};

export type DialogProps = HTMLAttributes<HTMLInputElement> & DialogStyledProps;
