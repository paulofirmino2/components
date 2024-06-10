import styled from 'styled-components';

import breakpoints from '@/utils/mediaQueries/media';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
  }
`;
