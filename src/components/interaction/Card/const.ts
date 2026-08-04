import { CardVariant } from './types';

export const cardVariantToBackgroundColorMap = {
    [CardVariant.TEAL]: 'var(--color-accent-teal-background)',
    [CardVariant.MAGENTA]: 'var(--color-accent-magenta-background)',
    [CardVariant.LEMON]: 'var(--color-accent-lemon-background)',
    [CardVariant.AQUAMARINE]: 'var(--color-accent-aquamarine-background)',
    [CardVariant.PURPLE]: 'var(--color-accent-purple-background)',
    [CardVariant.INFO]: 'var(--color-status-info-background)',
    [CardVariant.ERROR]: 'var(--color-status-error-background)',
    [CardVariant.WARNING]: 'var(--color-status-warning-background)',
    [CardVariant.SUCCESS]: 'var(--color-status-success-background)',
    [CardVariant.NEUTRAL]: 'var(--color-status-neutral-background)',
};
