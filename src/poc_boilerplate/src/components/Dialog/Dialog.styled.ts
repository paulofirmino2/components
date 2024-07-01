import * as Dialog from '@radix-ui/react-dialog';
import styled, { keyframes } from 'styled-components';

import breakpoints from '@/utils/mediaQueries/media';

const overlayShow = keyframes`
  0% { 
    opacity: 0;
  };

  100%
   {
     opacity: 0.7;
  };
`;

const contentShow = keyframes`
  0% { 
    opacity: 0; 
    transform: translate(-50%, -48%) scale(.96);
  }

  100% { 
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1)
 }
`;

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: #3d4045;
  opacity: 0.7;
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DialogContent = styled(Dialog.Content)<{ $maxWidth: number }>`
  border-radius: ${props => props.theme.radius.md};
  background: ${props => props.theme.colors.white};
  border: 1px solid #dee2e6;
  box-shadow:
    0px 20px 20px 0px rgba(0, 0, 0, 0.08),
    0px 0px 2px 0px rgba(0, 0, 0, 0.12);

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: ${({ $maxWidth }) => $maxWidth}px;
  max-height: 85vh;
  padding: ${props => props.theme.spacing.lg};
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }
`;

export const DialogTitle = styled(Dialog.Title)`
  margin: 0;
  font-weight: ${props => props.theme.fontWeight.medium};
  color: #2c3a49;
  font-size: ${props => props.theme.fontSize.intermediary};
  font-family: ${props => props.theme.fontFamily.ibm};
  margin-bottom: ${props => props.theme.spacing.xs};

  @media (max-width: ${breakpoints.sm}) {
    font-size: ${props => props.theme.fontSize.base};
  }
`;
