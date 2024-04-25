import styled from 'styled-components';

import { SpacingBottomType } from '@/types/SpacingBottom';
import { addSpacingBottom } from '@/utils/components/SpacingBottom/SpacingBottom.styles';

export const EmployeeImageUploadWrapper = styled.div<{
  spacing?: SpacingBottomType;
}>`
  ${({ spacing }) => spacing && addSpacingBottom(spacing)}
  #capture {
    margin-top: ${props => props.theme.spacing.base};
  }
`;

export const AvatarWrapper = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CaptureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  button {
    margin-top: ${props => props.theme.spacing.md};
  }
`;
