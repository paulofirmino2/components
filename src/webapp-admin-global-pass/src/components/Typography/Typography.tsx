import { FC } from 'react';

import * as Styled from './Typography.styled';
import { TypographyProps } from './Typography.types';

const variantsComponents = {
  title: (props: TypographyProps) => (
    <Styled.H5 {...props}>{props.children}</Styled.H5>
  ),
  subTitle: (props: TypographyProps) => (
    <Styled.ParagraphSmall {...props}>{props.children}</Styled.ParagraphSmall>
  ),
  menu: (props: TypographyProps) => (
    <Styled.Span {...props}>{props.children}</Styled.Span>
  ),
};

const Typography: FC<TypographyProps> = props => (
  <>{variantsComponents[props.variant || 'subTitle'](props)}</>
);

export default Typography;
