import * as Select from '@radix-ui/react-select';
import styled, { css } from 'styled-components';

import { addSpacingBottom } from '@/utils/components/SpacingBottom/SpacingBottom.styles';

import { SelectProps, Sizes } from './Select.types';

const sizeButtonVariants = (sizevariant = 'md') =>
  ({
    sm: css`
      height: 36px;
      padding: 8px ${({ theme }) => theme.spacing.md} 0
        ${({ theme }) => theme.spacing.md};
      font-size: ${({ theme }) => theme.fontSize.md};
      #value {
        font-size: ${({ theme }) => theme.fontSize.md};
        margin-top: 5px;
      }
    `,
    md: css`
      height: 56px;
      padding: 8px ${({ theme }) => theme.spacing.md} 0
        ${({ theme }) => theme.spacing.md};
      font-size: ${({ theme }) => theme.fontSize.base};
    `,
  })[sizevariant];

const sizeLabelVariant = (sizevariant = 'md') =>
  ({
    sm: css`
      font-size: ${({ theme }) => theme.fontSize.sm};
      top: 2px;
    `,
    md: css`
      font-size: ${({ theme }) => theme.fontSize.md};
    `,
  })[sizevariant];

const placeholderMode = css`
  padding: ${({ theme }) => theme.spacing.md};
`;

export const Label = styled.label<{ sizevariant: Sizes }>`
  font-weight: 400;
  font-size: ${({ theme }) => theme.spacing.base};
  line-height: 5.79px;
  position: absolute;
  color: ${({ theme }) => theme.colors.text.medium};
  line-height: 16px;
  display: block;
  top: 10px;
  cursor: pointer;

  ${({ sizevariant }) => sizeLabelVariant(sizevariant || 'md')}
`;

export const Error = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const SelectTrigger = styled(Select.SelectTrigger)<SelectProps>`
  outline: none;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.xs};

  border: 1px solid
    ${({ theme, $errorMessage }) =>
      $errorMessage ? theme.colors.error : theme.colors.border};
  line-height: 120%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  position: relative;
  width: 100%;
  cursor: pointer;

  #value {
    font-size: ${props => props.theme.fontSize.base};
    line-height: 120%;
    margin-top: 10px;
  }

  ${({ sizevariant }) => sizeButtonVariants(sizevariant || 'md')}
  ${({ label, placeholder }) => !label && placeholder && placeholderMode}


  &:disabled {
    border: 1px solid ${props => props.theme.colors.border};
    background: ${props => props.theme.colors.disabled};
    cursor: not-allowed;

    ${Label} {
      color: ${props => props.theme.colors.text.medium};
      cursor: not-allowed;
    }

    #value {
      color: ${props => props.theme.colors.text.dark};
    }
  }
`;

export const SelectIcon = styled(Select.SelectIcon)`
  color: ${props => props.theme.colors.text.dark};
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const SelectContent = styled(Select.Content)<{ $errorMessage?: string }>`
  overflow: hidden;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid
    ${({ theme, $errorMessage }) =>
      $errorMessage ? theme.colors.error : theme.colors.border};
  border-radius: 0 0 4px 4px;
  border-top: none;
  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
`;

export const SelectViewport = styled(Select.Viewport)`
  padding: 5px;
  margin-top: 10px;
`;

export const StyledItem = styled(Select.Item)`
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  font-size: ${props => props.theme.fontSize.base};
  line-height: 120%;
  user-select: none;

  &[data-disabled] {
    pointer-events: none;
  }

  &[data-highlighted] {
    outline: none;
    background-color: ${props => props.theme.colors.brand.medium};
    border-radius: ${props => props.theme.radius.xs};
    color: ${props => props.theme.colors.white};
    font-weight: ${props => props.theme.fontWeight.bold};
  }
`;

export const StyledItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const scrollButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: ${props => props.theme.colors.white};
  cursor: default;
`;

export const SelectScrollUpButton = styled(Select.ScrollUpButton)`
  ${scrollButtonStyles}
`;

export const SelectScrollDownButton = styled(Select.ScrollDownButton)`
  ${scrollButtonStyles}
`;

export const SelectRoot = styled(Select.Select)`
  position: relative;
`;

export const SelectValue = styled(Select.Value)`
  font-size: 16px;
  line-height: 120%;
`;

export const Wrapper = styled.div<SelectProps>`
  position: relative;
  min-width: 200px;
  ${({ spacing }) => spacing && addSpacingBottom(spacing)}

  width:${({ fullWidth }) => (fullWidth ? '100%' : 'auto')}
`;
