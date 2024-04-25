import * as AvatarPrimitive from '@radix-ui/react-avatar';
import styled, { css } from 'styled-components';

import { AvatarStyledProps } from './Avatar.types';

const sizeRootVariants = (sizevariant = 'md') =>
  ({
    sm: css`
      width: 40px;
      height: 40px;
    `,
    md: css`
      width: 40px;
      height: 40px;
    `,
    lg: css`
      width: 60px;
      height: 60px;
    `,
  })[sizevariant];

export const AvatarRoot = styled(AvatarPrimitive.Root)<AvatarStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;

  border-radius: 100%;
  border: 1px solid ${props => props.theme.colors.black};
  background-color: ${props => props.theme.colors.disabled};
  ${({ sizevariant }) => sizeRootVariants(sizevariant || 'md')}
`;

export const AvatarImage = styled(AvatarPrimitive.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

export const AvatarFallback = styled(AvatarPrimitive.Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.disabled};
  color: ${props => props.theme.colors.text.dark};
  font-size: ${props => props.theme.fontSize.base};
  font-weight: ${props => props.theme.fontWeight.bold};
`;

export const AvatarWrapper = styled.div`
  display: flex;
`;
