import styled from 'styled-components';

export const Link = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  color: ${props => props.theme.colors.brand.dark};
  font-size: ${props => props.theme.fontSize.base};
  font-weight: ${props => props.theme.fontWeight.bold};
  padding: ${props => props.theme.spacing.md} 0;

  &:not([disabled]):hover {
    color: ${props => props.theme.colors.brand.darkness};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.text.dark};
    cursor: not-allowed;
    border: none;
  }
`;
