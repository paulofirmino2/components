import { css } from 'styled-components';

import { SpacingBottomType } from '@/types/SpacingBottom';

export const addSpacingBottom = (spacing: SpacingBottomType) => css`
  margin-bottom: ${({ theme }) => theme.spacing[spacing]};
`;
