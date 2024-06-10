import styled, { css } from 'styled-components';

import { addSpacingBottom } from '@/utils/components/SpacingBottom/SpacingBottom.styles';
import breakpoints from '@/utils/mediaQueries/media';

import { TypographyStyled } from './Typography.types';

const TypographyBase = css<TypographyStyled>`
  text-align: ${({ align }) => align};
  ${({ spacing }) => spacing && addSpacingBottom(spacing)};
`;

const variants = {
  title: () => css`
    font-family: ${({ theme }) => theme.fontFamily.secondary};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.lg};
    line-height: 24px;

    @media (max-width: ${breakpoints.sm}) {
      font-size: ${({ theme }) => theme.fontSize.intermediary};
    }
  `,
  subTitle: () => css`
    color: ${({ theme }) => theme.colors.text.medium};
    font-size: ${({ theme }) => theme.fontSize.intermediary};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    letter-spacing: 0.4px;
  `,

  menu: () => css``,
};

export const H1 = styled.h1<TypographyStyled>`
  ${TypographyBase}

  ${({ variant }) => variants[variant || 'title']}
`;

export const ParagraphSmall = styled.p<TypographyStyled>`
  ${TypographyBase}

  ${({ variant }) => variants[variant || 'title']}
`;

export const Span = styled.span<TypographyStyled>`
  ${TypographyBase}
  ${({ variant }) => variants[variant || 'title']}
`;
