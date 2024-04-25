import styled from 'styled-components';

import breakpoints from '@/utils/mediaQueries/media';

export const DialogContent = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: #2c3a49;
    font-family: ${props => props.theme.fontFamily.ibm};
    font-size: ${props => props.theme.fontSize.md};
    margin-bottom: ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${breakpoints.sm}) {
    p {
      font-size: ${props => props.theme.fontSize.sm};
    }
  }
`;

export const BoxEmployee = styled.div`
  display: flex;
  border-radius: ${props => props.theme.radius.md};
  border: 1px solid ${props => props.theme.colors.disabled};
  padding: 0 ${props => props.theme.spacing.md};
  align-items: center;
  width: 100%;
  height: 56px;
`;

export const DialogActionWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  margin-top: ${props => props.theme.spacing.lg};

  #btn-back {
    margin-right: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${breakpoints.sm}) {
    button {
      width: 100%;
    }
  }
`;
