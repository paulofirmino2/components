import styled from 'styled-components';

export const WrapperText = styled.div`
  span {
    font-size: ${props => props.theme.fontSize.base};
    margin-right: ${props => props.theme.spacing.md};
    width: 110px;
  }
`;
