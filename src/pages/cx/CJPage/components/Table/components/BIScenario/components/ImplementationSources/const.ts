import { ImplementationSourceType } from './types';

export const implementationSourceMeta: Record<
    ImplementationSourceType,
    { label: string; color: string }
> = {
    [ImplementationSourceType.MANUAL]: {
        label: 'Ручная привязка',
        color: 'var(--color-status-neutral)',
    },
    [ImplementationSourceType.USE_CASE]: {
        label: 'Use Case',
        color: 'var(--color-status-info)',
    },
    [ImplementationSourceType.E2E]: {
        label: 'E2E',
        color: 'var(--color-accent-magenta)',
    },
};
