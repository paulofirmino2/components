import styled from 'styled-components';

export const Wrapper = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${props => props.theme.colors.disabled};
  height: 72px;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md};
`;

export const UserInfoWrapper = styled.div`
  display: flex;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${props => props.theme.spacing.xs};

  p {
    font-size: ${props => props.theme.fontSize.base};
    line-height: 120%;
  }
`;

export const LogoutButton = styled.button`
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
`;
