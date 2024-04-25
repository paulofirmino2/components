import { FC } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';

import * as Styled from './Checkbox.styled';
import { CheckboxProps } from './Checkbox.types';

const Checkbox: FC<CheckboxProps> = ({
  id = 'checkbox',
  children,
  ...others
}) => (
  <Styled.Wrapper>
    <Styled.CheckboxRoot defaultChecked id={id} {...others}>
      <Styled.CheckboxIndicator>
        <CheckIcon />
      </Styled.CheckboxIndicator>
    </Styled.CheckboxRoot>
    <Styled.Label htmlFor={id}>{children}</Styled.Label>
  </Styled.Wrapper>
);

export default Checkbox;
