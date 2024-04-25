import styled from 'styled-components';

import breakpoints from '@/utils/mediaQueries/media';

export const Wrapper = styled.aside`
  width: 216px;
  position: relative;

  @media (max-width: ${breakpoints.sm}) {
    display: none;
  }
`;

export const LogoWrapper = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  margin-left: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xxl};

  .logo {
    width: 180px;
  }
`;

export const Navbar = styled.nav`
  display: flex;
  flex-direction: column;

  img {
    margin-right: ${props => props.theme.spacing.xs};
  }

  a {
    position: relative;
    color: ${props => props.theme.colors.text.dark};
    font-size: ${props => props.theme.fontSize.base};
    display: flex;
    align-items: center;
    height: 40px;
    margin-left: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.xs};

    #right-arrow-icon {
      position: absolute;
      right: 0;
    }

    :hover {
      opacity: 0.5;
    }
  }
`;

export const UserInfoSidebarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
