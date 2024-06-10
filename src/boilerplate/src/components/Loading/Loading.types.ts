type LoadingType =
  | 'blank'
  | 'balls'
  | 'bars'
  | 'bubbles'
  | 'cubes'
  | 'cylon'
  | 'spin'
  | 'spinningBubbles'
  | 'spokes';

export type LoadingStyledProps = {
  color?: string;
  delay?: number;
  type?: LoadingType;
  height?: string | number;
  width?: string | number;
};

export type LoadingProps = LoadingStyledProps;
