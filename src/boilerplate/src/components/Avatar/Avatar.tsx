import { FC } from 'react';

import { getInitialsName } from '@/utils/formatString';

import * as Styled from './Avatar.styled';
import { AvatarProps } from './Avatar.types';

const Avatar: FC<AvatarProps> = ({ name, src, sizevariant }) => (
  <Styled.AvatarWrapper>
    <Styled.AvatarRoot sizevariant={sizevariant}>
      <Styled.AvatarImage src={src} alt={name} />
      <Styled.AvatarFallback delayMs={600}>
        {name ? getInitialsName(name) : 'US'}
      </Styled.AvatarFallback>
    </Styled.AvatarRoot>
  </Styled.AvatarWrapper>
);

export default Avatar;
