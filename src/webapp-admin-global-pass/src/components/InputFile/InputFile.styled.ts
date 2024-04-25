import styled from 'styled-components';

export const Wrapper = styled.main``;

export const VisuallyHiddenInput = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1;
`;

export const Button = styled.button`
  position: relative;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #ecf7fe;
  outline: none;
  cursor: pointer;
  border: 1px dashed ${({ theme }) => theme.colors.brand.light};
  color: ${({ theme }) => theme.colors.brand.light};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.base};

  img {
    margin-right: 2px;
  }
`;

export const Error = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const WrapperButton = styled.div`
  display: flex;
  flex-direction: column;
`;
