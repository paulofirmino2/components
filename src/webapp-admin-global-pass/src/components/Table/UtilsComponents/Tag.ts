import styled, { css } from 'styled-components';

import { Status } from '@/flux/modules/employee/types';
import breakpoints from '@/utils/mediaQueries/media';

const variantStyles = (variant = 'primary') =>
  ({
    active: css`
      color: #10ab61;
      background-color: rgba(16, 171, 97, 0.08);
    `,
    block: css`
      color: ${props => props.theme.colors.text.dark};
      background-color: ${props => props.theme.colors.disabled};
    `,
    pending: css`
      color: #ffb200;
      background-color: rgba(255, 178, 0, 0.1);
    `,
    invited_pending: css`
      color: ${props => props.theme.colors.text.dark};
      background-color: ${props => props.theme.colors.disabled};
    `,
    approved: css`
      color: #10ab61;
      background-color: rgba(16, 171, 97, 0.08);
    `,
    rejected: css`
      color: ${props => props.theme.colors.error};
      background-color: rgba(255, 58, 41, 0.1);
    `,
  })[variant];

export const Tag = styled.div<{ variant: 'active' | 'block' | Status }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 27px;
  width: 100%;
  border-radius: ${props => props.theme.radius.xs};
  font-size: ${props => props.theme.fontSize.base};
  ${({ variant }) => variantStyles(variant)}

  @media (max-width: ${breakpoints.sm}) {
    width: 70px;
    font-size: ${props => props.theme.fontSize.md};
  }
`;
