import { FC } from 'react';

import * as Styled from './Button.styled';
import { ButtonProps } from './Button.types';

const Button: FC<ButtonProps> = ({ children, ...others }) => (
  <Styled.Button {...others}>{children}</Styled.Button>
);

export default Button;
