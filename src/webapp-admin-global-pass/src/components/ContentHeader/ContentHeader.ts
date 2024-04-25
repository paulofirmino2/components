import styled from 'styled-components';

import breakpoints from '@/utils/mediaQueries/media';

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.lg};

  input {
    width: 340px;
  }

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;

    input {
      width: 100%;
    }

    button {
      margin-top: ${props => props.theme.spacing.md};
    }
  }
`;
