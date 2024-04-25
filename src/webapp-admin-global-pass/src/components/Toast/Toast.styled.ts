import styled from 'styled-components';

export const ToasterWrapper = styled.div`
  position: relative;
`;

export const MessageWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-left: ${({ theme }) => theme.spacing.xl};
  margin-right: ${({ theme }) => theme.spacing.xl};

  div {
    margin-right: 0;
  }
`;

export const ToastWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 300px;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: 0;
`;

export const Icon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;
