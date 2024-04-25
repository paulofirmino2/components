export type ToastVariants = 'success' | 'error' | 'warning';

type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type ToastStyledProps = {
  variant: ToastVariants;
  position?: ToastPosition;
  duration?: number;
  id?: string;
};

export type ToastProps = ToastStyledProps;
