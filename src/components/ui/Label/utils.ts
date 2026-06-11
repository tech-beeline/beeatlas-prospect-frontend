import type { LabelProps, LabelVariant } from './types';

export const normalizeLabelVariant = ({
    variant,
    assign,
}: Pick<LabelProps, 'variant' | 'assign'>): LabelVariant => variant ?? assign ?? 'outline';
