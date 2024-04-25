import styled from 'styled-components';

export const EmployeeWrapper = styled.div`
  display: flex;
  align-items: center;

  #name {
    font-size: ${props => props.theme.fontSize.base};
    margin-left: ${props => props.theme.spacing.md};
  }
`;
