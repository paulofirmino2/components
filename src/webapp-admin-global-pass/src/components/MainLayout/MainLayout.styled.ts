import styled from 'styled-components';

import breakpoints from '@/utils/mediaQueries/media';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  width: calc(100vw - 216px);
  background-color: #e4e9f0;
  min-height: 100vh;

  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
  }
`;

export const Header = styled.header`
  display: none;
  background-color: ${props => props.theme.colors.white};
  height: 50px;
  align-items: center;
  padding: 0 ${props => props.theme.spacing.md};
  justify-content: space-between;

  @media (max-width: ${breakpoints.sm}) {
    display: flex;
  }
`;

export const LogoWrapper = styled.div`
  .logo {
    width: 120px;
  }
`;

export const MenuButton = styled.button`
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
