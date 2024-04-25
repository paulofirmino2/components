import * as Checkbox from '@radix-ui/react-checkbox';
import styled from 'styled-components';

export const Wrapper = styled.main`
  display: flex;
  align-items: center;
`;

export const CheckboxRoot = styled(Checkbox.Root)`
  all: 'unset';
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.disabled};
  background-color: ${props => props.theme.colors.white};
`;

export const CheckboxIndicator = styled(Checkbox.Indicator)`
  width: 24px;
  border-radius: 4px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.brand.light};

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Label = styled.label`
  cursor: pointer;
  padding-left: 8px;
  font-size: ${props => props.theme.fontSize.base};
  color: ${props => props.theme.colors.text.dark};
`;
