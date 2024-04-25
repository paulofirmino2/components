import styled from 'styled-components';

export const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: ${props => props.theme.spacing.lg2};

  span {
    font-size: ${props => props.theme.fontSize.base};
  }
`;
