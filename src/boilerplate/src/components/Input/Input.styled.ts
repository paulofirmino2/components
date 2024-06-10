import InputMask from 'react-input-mask';
import styled, { css } from 'styled-components';

import { addSpacingBottom } from '@/utils/components/SpacingBottom/SpacingBottom.styles';

import { InputProps, Sizes } from './Input.types';

const sizeLabelVariants = (sizevariant = 'md') =>
  ({
    sm: css`
      font-size: ${({ theme }) => theme.spacing.md};
      margin-left: ${({ theme }) => theme.spacing.md};
      transform: translate(0, 15px);
    `,
    md: css`
      font-size: ${({ theme }) => theme.spacing.base};
      margin-left: ${({ theme }) => theme.spacing.md};
      transform: translate(0, 25px);
    `,
  })[sizevariant];

const wrapperModifiers = {
  error: () => css`
    ${InputText} {
      border: 1px solid ${({ theme }) => theme.colors.error};
    }
  `,
  disabled: () => css`
    ${InputText} {
      background-color: ${({ theme }) => theme.colors.disabled};
    }
    ${Label},
    ${InputText} {
      color: ${({ theme }) => theme.colors.text.medium};
      cursor: not-allowed;
    }
  `,
};

const sizeInputVariants = (sizevariant = 'md') =>
  ({
    sm: css`
      height: 36px;
      padding: 8px ${({ theme }) => theme.spacing.md} 0
        ${({ theme }) => theme.spacing.md};
      font-size: ${({ theme }) => theme.fontSize.md};
    `,
    md: css`
      height: 56px;
      padding: 8px ${({ theme }) => theme.spacing.md} 0
        ${({ theme }) => theme.spacing.md};
      font-size: ${({ theme }) => theme.fontSize.base};
    `,
  })[sizevariant];

const sizeInputWrapperVariants = (sizevariant = 'md') =>
  ({
    sm: css`
      font-size: ${({ theme }) => theme.fontSize.sm};
      transform: translate(0, 0);
    `,
    md: css`
      font-size: ${({ theme }) => theme.fontSize.md};
      transform: translate(0, 8px);
    `,
  })[sizevariant];

const placeholderMode = css`
  padding: ${({ theme }) => theme.spacing.md};
`;

const iconLeftMode = css`
  padding-left: 34px !important;
`;

const iconRightMode = css`
  padding-right: 34px !important;
`;

export const Label = styled.label<{ sizevariant: Sizes }>`
  font-weight: 400;
  font-size: ${({ theme }) => theme.spacing.base};
  line-height: 5.79px;
  position: absolute;
  transform-origin: top left;
  transition: 0.2s ease-in-out;

  ${({ sizevariant }) => sizeLabelVariants(sizevariant || 'md')}
`;

export const InputText = styled(InputMask)<InputProps>`
  outline: none;
  border-radius: ${({ theme }) => theme.radius.xs};
  border: 1px solid ${({ theme }) => theme.colors.border};
  line-height: 120%;

  ${({ sizevariant }) => sizeInputVariants(sizevariant || 'md')}
  ${({ label, placeholder }) => !label && placeholder && placeholderMode} 
  ${({ $iconleft }) => $iconleft && iconLeftMode}
  ${({ $iconRight }) => $iconRight && iconRightMode}
`;

export const Error = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const InputWrapper = styled.div<{
  sizevariant: Sizes;
}>`
  display: flex;
  flex-direction: column;
  position: relative;

  input[type='password']::-ms-reveal,
  input[type='password']::-ms-clear {
    display: none;
  }

  ${InputText} {
    &:focus {
      ~ ${Label} {
        color: ${({ theme }) => theme.colors.text.medium};
      }
    }
    &:focus,
    &:not(:placeholder-shown) {
      ~ ${Label} {
        line-height: 16px;
        display: block;
        ${({ sizevariant }) => sizeInputWrapperVariants(sizevariant || 'md')}
      }
    }

    :placeholder-shown {
      padding: ${({ theme }) => theme.spacing.md};
    }

    ::placeholder {
      color: ${({ theme }) => theme.colors.text.medium};
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }
`;

export const Wrapper = styled.div<InputProps>`
  ${({ errorMessage, disabled, spacing, fullWidth }) => css`
    width: ${fullWidth ? '100%' : 'auto'};

    position: relative;
    ${spacing && addSpacingBottom(spacing)}
    ${errorMessage && wrapperModifiers.error()}
    ${disabled && wrapperModifiers.disabled()}
  `}
`;

export const IconLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 8px;
  left: 8px;
`;

export const IconRightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 15px;
  right: 15px;
`;
