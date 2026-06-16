import type { TypographyLinkState, TypographyVariant } from './types';

export const buildTypographyClassName = ({
    variant,
    ellipsis,
    inactive,
    linkState,
    className,
}: {
    variant: TypographyVariant;
    ellipsis: boolean;
    inactive: boolean;
    linkState?: TypographyLinkState;
    className?: string;
}): string =>
    [
        'dsb_typography',
        `dsb_typography__${variant}`,
        ellipsis && 'dsb_typography_ellipsis',
        inactive && 'dsb_typography_inactive',
        linkState && `dsb_typography__${variant}-${linkState}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

export const getTypographyRole = (variant: TypographyVariant): string | undefined => {
    if (variant.includes('h')) {
        return 'heading';
    }

    if (variant.includes('Link')) {
        return 'link';
    }

    return undefined;
};
