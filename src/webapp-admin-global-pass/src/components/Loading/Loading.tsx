import { FC } from 'react';
import ReactLoading from 'react-loading';

import { LoadingProps } from './Loading.types';

const Loading: FC<LoadingProps> = ({
  color = '#4379C1',
  delay = 0,
  type = 'spin',
  height = 64,
  width = 64,
}) => (
  <ReactLoading
    color={color}
    delay={delay}
    type={type}
    height={height}
    width={width}
  />
);

export default Loading;
