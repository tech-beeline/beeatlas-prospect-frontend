import type { LabelType } from './types';

export type LabelColors = {
    color: string;
    backgroundColor: string;
    borderColor: string;
};

export const LABEL_TYPE_COLORS: Record<LabelType, LabelColors> = {
    default: {
        color: 'var(--color-status-neutral)',
        backgroundColor: 'var(--color-status-neutral)',
        borderColor: 'var(--color-status-neutral)',
    },
    info: {
        color: 'var(--color-status-info)',
        backgroundColor: 'var(--color-status-info)',
        borderColor: 'var(--color-status-info)',
    },
    success: {
        color: 'var(--color-status-success)',
        backgroundColor: 'var(--color-status-success)',
        borderColor: 'var(--color-status-success)',
    },
    warning: {
        color: 'var(--color-status-warning)',
        backgroundColor: 'var(--color-status-warning)',
        borderColor: 'var(--color-status-warning)',
    },
    error: {
        color: 'var(--color-status-error)',
        backgroundColor: 'var(--color-status-error)',
        borderColor: 'var(--color-status-error)',
    },
    purple: {
        color: 'var(--color-accent-purple)',
        backgroundColor: 'var(--color-accent-purple)',
        borderColor: 'var(--color-accent-purple)',
    },
    teal: {
        color: 'var(--color-accent-teal)',
        backgroundColor: 'var(--color-accent-teal)',
        borderColor: 'var(--color-accent-teal)',
    },
    magenta: {
        color: 'var(--color-accent-magenta)',
        backgroundColor: 'var(--color-accent-magenta)',
        borderColor: 'var(--color-accent-magenta)',
    },
};
