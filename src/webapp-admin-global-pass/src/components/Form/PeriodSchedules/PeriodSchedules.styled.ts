import styled from 'styled-components';

import breakpoints from '@/utils/mediaQueries/media';

export const SchedulesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.lg2};

  @media (max-width: ${breakpoints.sm}) {
    margin-left: 0;
    margin-top: ${props => props.theme.spacing.md};
  }
`;

export const SchedulesRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xs};

  input {
    width: 70px;
  }
`;

export const CheckboxWrapper = styled.div`
  width: 100px;
  margin-right: ${props => props.theme.spacing.md};
`;

export const Separator = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 0 ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.base};
`;
