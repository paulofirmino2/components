import styled from 'styled-components';

import { Link } from './Link';

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;

  ${Link} {
    margin-right: ${props => props.theme.spacing.lg};
  }
`;
