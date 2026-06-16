import { ComponentProps, ReactNode } from 'react';

import type { TypographyVariant } from 'components/ui/Typography/types';

export interface IText extends Omit<ComponentProps<'div'>, 'ref'> {
    variant: TypographyVariant;
    children: ReactNode;
    inactive?: boolean;
    link?: boolean;
    visited?: boolean;
    pointer?: boolean;
}
