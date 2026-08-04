import type { ColorTypes } from '../types';

export const ICON_COLOR_VARIABLES: Record<ColorTypes, string> = {
    grey: 'var(--color-status-neutral)',
    red: 'var(--color-status-error)',
    orange: 'var(--color-status-warning)',
    green: 'var(--color-status-success)',
    blue: 'var(--color-status-info)',
    purple: 'var(--color-accent-purple)',
    teal: 'var(--color-accent-teal)',
    magenta: 'var(--color-accent-magenta)',
};
