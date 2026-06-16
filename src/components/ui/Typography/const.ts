import type { TypographyVariant } from './types';

export const DEFAULT_TYPOGRAPHY_VARIANT: TypographyVariant = 'body1';

export const TYPOGRAPHY_TAG_MAP: Partial<Record<TypographyVariant, keyof JSX.IntrinsicElements>> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body1: 'p',
    body2: 'p',
    body3: 'p',
    subtitle1: 'span',
    subtitle2: 'span',
    subtitle3: 'span',
    caption: 'span',
    overline: 'span',
    productName: 'span',
    nativeLink: 'a',
};
