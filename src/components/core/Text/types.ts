import { ReactNode } from 'react';
import { TypographyVariant } from '@beeline/design-system-react';

export interface IText {
    variant: TypographyVariant;
    children: ReactNode;
    inactive?: boolean;
}
