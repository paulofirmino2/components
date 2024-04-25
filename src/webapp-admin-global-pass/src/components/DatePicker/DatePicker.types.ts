import { SpacingBottomType } from '@/types/SpacingBottom';

export type DatePickerProps = {
  spacing?: SpacingBottomType;
  label?: string;
  errorMessage?: string;
  disabled?: boolean;
  value: Date | null;
  onChangeValue: (value: Date | null) => void;
};
