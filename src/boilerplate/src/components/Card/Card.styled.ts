import styled from 'styled-components';

export const Wrapper = styled.section`
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.md};
  padding: ${props => props.theme.spacing.base};
`;
