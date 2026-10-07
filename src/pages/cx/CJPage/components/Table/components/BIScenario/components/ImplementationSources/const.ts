import { ImplementationSourceType } from './types';

export const implementationSourceMeta: Record<ImplementationSourceType, { label: string }> = {
    [ImplementationSourceType.MANUAL]: { label: 'Ручная привязка' },
    [ImplementationSourceType.USE_CASE]: { label: 'Use Case' },
    [ImplementationSourceType.E2E]: { label: 'E2E' },
};
