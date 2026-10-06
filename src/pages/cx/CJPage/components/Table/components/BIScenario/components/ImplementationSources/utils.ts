import { IStepsScenarion } from 'api/bi/types';

import { ImplementationSource, ImplementationSourceType } from './types';

export const getImplementationSources = (biStep: IStepsScenarion): ImplementationSource[] => {
    const sources: ImplementationSource[] = [];

    if (biStep.relations?.length) {
        sources.push({
            type: ImplementationSourceType.MANUAL,
            key: 'manual',
            name: `Вызовов: ${biStep.relations.length}`,
            relations: biStep.relations,
        });
    }

    (biStep.useCases ?? []).forEach((useCase) =>
        sources.push({
            type: ImplementationSourceType.USE_CASE,
            key: `use-case-${useCase.id}`,
            name: [useCase.code, useCase.name].filter(Boolean).join(' '),
            useCase,
        }),
    );

    (biStep.e2e ?? []).forEach((e2e) =>
        sources.push({
            type: ImplementationSourceType.E2E,
            key: `e2e-${e2e.id}`,
            name: e2e.name || e2e.code,
            e2e,
        }),
    );

    return sources;
};
