import { FC } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import * as Styled from './Dialog.styled';
import { DialogProps } from './Dialog.types';

const DialogComponent: FC<DialogProps> = ({
  open,
  setOpen,
  title,
  children,
  maxWidth = 450,
}) => (
  <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Portal>
      <Styled.DialogOverlay />
      <Styled.DialogContent $maxWidth={maxWidth}>
        {title && <Styled.DialogTitle>{title}</Styled.DialogTitle>}
        {children}
        <Dialog.Close asChild />
      </Styled.DialogContent>
    </Dialog.Portal>
  </Dialog.Root>
);
export default DialogComponent;
