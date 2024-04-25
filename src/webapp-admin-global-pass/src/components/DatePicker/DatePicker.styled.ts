import styled, { css } from 'styled-components';

import { SpacingBottomType } from '@/types/SpacingBottom';
import { addSpacingBottom } from '@/utils/components/SpacingBottom/SpacingBottom.styles';

interface WrapperProps {
  spacing?: SpacingBottomType;
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ spacing }) => css`
    ${spacing && addSpacingBottom(spacing)}
    input {
      color: #000;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      border-radius: ${({ theme }) => theme.radius.xs};
    }

    .MuiInputBase-root {
      font-size: 2rem;
    }

    .MuiFormLabel-root.Mui-focused {
      font-weight: 400;
      font-size: 2rem;
      color: ${({ theme }) => theme.colors.text.dark};
    }

    .MuiFormLabel-root {
      font-weight: 400;
      font-size: ${({ theme }) => theme.spacing.md};
      color: ${({ theme }) => theme.colors.text.dark};
    }

    .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
      border: 1px solid ${({ theme }) => theme.colors.border};
    }

    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 1px solid ${({ theme }) => theme.colors.border};
    }

    .MuiSvgIcon-root {
      width: 24px;
      height: 24px;
    }

    .MuiInputLabel-root.Mui-error {
      color: ${({ theme }) => theme.colors.error};
    }
  `}
`;

export const Error = styled.div`
  ${() => css`
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.error};
    margin-top: ${({ theme }) => theme.spacing.sm};
  `}
`;
