import { ButtonHTMLAttributes, ChangeEvent } from 'react';

export type InputFileStyledProps = {
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  errorMessage?: string;
};

export type InputFileProps = ButtonHTMLAttributes<HTMLInputElement> &
  InputFileStyledProps;
