import type { BadgeSemantic, BadgeType } from './types';

export type BadgeColors = {
    backgroundColor: string;
    color: string;
    dotColor?: string;
};

export const BADGE_COLORS: Record<BadgeType, Record<BadgeSemantic, BadgeColors>> = {
    secondary: {
        danger: {
            backgroundColor: 'var(--color-status-error-background)',
            color: 'var(--color-status-error)',
        },
        warning: {
            backgroundColor: 'var(--color-status-warning-background)',
            color: 'var(--color-status-warning)',
        },
        success: {
            backgroundColor: 'var(--color-status-success-background)',
            color: 'var(--color-status-success)',
        },
        info: {
            backgroundColor: 'var(--color-status-info-background)',
            color: 'var(--color-status-info)',
        },
        neutral: {
            backgroundColor: 'var(--color-status-neutral-background)',
            color: 'var(--color-status-neutral)',
        },
        teal: {
            backgroundColor: 'var(--color-accent-teal-background)',
            color: 'var(--color-accent-teal)',
        },
        violet: {
            backgroundColor: 'var(--color-accent-purple-background)',
            color: 'var(--color-accent-purple)',
        },
        magenta: {
            backgroundColor: 'var(--color-accent-magenta-background)',
            color: 'var(--color-accent-magenta)',
        },
        aquamarine: {
            backgroundColor: 'var(--color-accent-aquamarine-background)',
            color: 'var(--color-accent-aquamarine)',
        },
    },
    primary: {
        danger: {
            backgroundColor: 'var(--color-status-error)',
            color: 'var(--color-text-active-inverse)',
        },
        warning: {
            backgroundColor: 'var(--color-status-warning)',
            color: 'var(--color-text-active-inverse)',
        },
        success: {
            backgroundColor: 'var(--color-status-success)',
            color: 'var(--color-text-active-inverse)',
        },
        info: {
            backgroundColor: 'var(--color-status-info)',
            color: 'var(--color-text-active-inverse)',
        },
        neutral: {
            backgroundColor: 'var(--color-status-neutral)',
            color: 'var(--color-text-active-inverse)',
        },
        teal: {
            backgroundColor: 'var(--color-accent-teal)',
            color: 'var(--color-text-active-inverse)',
        },
        violet: {
            backgroundColor: 'var(--color-accent-purple)',
            color: 'var(--color-text-active-inverse)',
        },
        magenta: {
            backgroundColor: 'var(--color-accent-magenta)',
            color: 'var(--color-text-active-inverse)',
        },
        aquamarine: {
            backgroundColor: 'var(--color-accent-aquamarine)',
            color: 'var(--color-text-active-inverse)',
        },
    },
    tertiary: {
        danger: {
            backgroundColor: 'transparent',
            color: 'var(--color-text-active)',
            dotColor: 'var(--color-status-error)',
        },
        warning: {
            backgroundColor: 'transparent',
            color: 'var(--color-text-active)',
            dotColor: 'var(--color-status-warning)',
        },
        success: {
            backgroundColor: 'transparent',
            color: 'var(--color-text-active)',
            dotColor: 'var(--color-status-success)',
        },
        info: {
            backgroundColor: 'transparent',
            color: 'var(--color-text-active)',
            dotColor: 'var(--color-status-info)',
        },
        neutral: {
            backgroundColor: 'transparent',
            color: 'var(--color-text-active)',
            dotColor: 'var(--color-status-neutral)',
        },
        teal: {
            backgroundColor: 'transparent',
            color: 'var(--color-text-active)',
            dotColor: 'var(--color-accent-teal)',
        },
        violet: {
            backgroundColor: 'transparent',
            color: 'var(--color-text-active)',
            dotColor: 'var(--color-accent-purple)',
        },
        magenta: {
            backgroundColor: 'transparent',
            color: 'var(--color-text-active)',
            dotColor: 'var(--color-accent-magenta)',
        },
        aquamarine: {
            backgroundColor: 'transparent',
            color: 'var(--color-text-active)',
            dotColor: 'var(--color-accent-aquamarine)',
        },
    },
};
