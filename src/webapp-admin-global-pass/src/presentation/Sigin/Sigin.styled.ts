import styled from 'styled-components';

import BackgroundImage from '@/assets/images/siginpage.png';
import breakpoints from '@/utils/mediaQueries/media';

export const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const Form = styled.form`
  height: 100%;
  width: 480px;
  padding: ${({ theme }) => theme.spacing.xl};

  .logo {
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
  }

  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const SiginImage = styled.div`
  background-image: url(${BackgroundImage});
  width: calc(100vw - 480px);
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: auto;
  position: relative;

  @media (max-width: ${breakpoints.sm}) {
    display: none;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;
