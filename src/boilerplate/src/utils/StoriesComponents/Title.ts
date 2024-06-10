import styled from 'styled-components';

export const Title = styled.span`
  margin-left: 2rem;
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;
