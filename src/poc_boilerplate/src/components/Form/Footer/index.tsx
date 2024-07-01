import styled from 'styled-components';

import breakpoints from '@/utils/mediaQueries/media';

export const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: ${props => props.theme.spacing.lg2};

  #cancel {
    margin-right: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;

    #cancel {
      margin-top: ${props => props.theme.spacing.md};
      margin-right: 0;
    }
  }
`;
