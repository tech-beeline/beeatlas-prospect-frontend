import { IStepsScenarion } from 'api/bi/types';

import { ImplementationSource, ImplementationSourceType } from './types';

export const getImplementationSources = (biStep: IStepsScenarion): ImplementationSource[] => {
    const sources: ImplementationSource[] = [];

    const relations = biStep.relations ?? [];
    if (relations.length > 0) {
        sources.push({
            type: ImplementationSourceType.MANUAL,
            key: 'manual',
            name: 'Реализация, настроенная вручную',
            relations,
        });
    }

    (biStep.e2e ?? []).forEach((e2e) =>
        sources.push({
            type: ImplementationSourceType.E2E,
            key: `e2e-${e2e.id}`,
            name: e2e.name || e2e.code,
            e2e,
        }),
    );

    (biStep.useCases ?? []).forEach((useCase) =>
        sources.push({
            type: ImplementationSourceType.USE_CASE,
            key: `use-case-${useCase.id}`,
            name: useCase.name || useCase.code,
            useCase,
        }),
    );

    return sources;
};
