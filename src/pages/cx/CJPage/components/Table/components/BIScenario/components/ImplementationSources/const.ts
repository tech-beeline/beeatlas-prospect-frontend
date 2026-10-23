import { ImplementationSourceType } from './types';

export const implementationSourceMeta: Record<ImplementationSourceType, { label: string }> = {
    [ImplementationSourceType.MANUAL]: { label: 'Реализация, настроенная вручную' },
    [ImplementationSourceType.USE_CASE]: { label: 'Use Case' },
    [ImplementationSourceType.E2E]: { label: 'Шаг E2E сценария' },
};
