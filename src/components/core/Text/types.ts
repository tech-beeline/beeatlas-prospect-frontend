import { ComponentProps, ReactNode } from 'react';
import { TypographyVariant } from '@beeline/design-system-react';

export interface IText extends Omit<ComponentProps<'div'>, 'ref'> {
    variant: TypographyVariant;
    children: ReactNode;
    inactive?: boolean;
    link?: boolean;
    visited?: boolean;
    pointer?: boolean;
}
