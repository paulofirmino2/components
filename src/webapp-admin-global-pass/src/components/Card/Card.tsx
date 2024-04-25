import { FC } from 'react';

import * as Styled from './Card.styled';
import { CardProps } from './Card.types';

const Card: FC<CardProps> = ({ children }) => (
  <Styled.Wrapper>{children}</Styled.Wrapper>
);

export default Card;
