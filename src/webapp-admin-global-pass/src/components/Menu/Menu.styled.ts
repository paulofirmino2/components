import styled from 'styled-components';

import breakpoints from '@/utils/mediaQueries/media';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  z-index: 10;
  left: 0;
  display: flex;
  align-items: center;
  padding-top: 60px;
  position: absolute;
  flex-direction: column;
  background-color: #ffffff;

  .logo {
    margin-bottom: ${props => props.theme.spacing.base};
  }

  h5 {
    margin: 20px 0;
  }

  ul {
    width: 220px;
  }

  @media (min-width: ${breakpoints.md}) {
    display: none;
  }
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
  right: 16px;
  top: 16px;
`;
