import { BadgeSemantic } from 'components/ui';

import { ProjectUsecasePipelineOperationStatus } from 'api/staging-service/types';

import { CallDecisionType } from '../../types';

import { ICallDecisionOption } from './types';

export const CALL_DECISION_OPTIONS: ICallDecisionOption[] = [
    {
        type: CallDecisionType.EXISTING,
        title: 'Существует в спецификации архитектуры',
        description:
            'Вызов описан в архитектуре, автоматически сопоставить его не удалось. Укажите метод поиском',
    },
    {
        type: CallDecisionType.EXISTS_UNSPECIFIED,
        title: 'Существует, в спецификации архитектуры отсутствует',
        description: 'Вызов есть в системе, но в описание архитектуры не внесён',
    },
    {
        type: CallDecisionType.DEVELOP,
        title: 'Необходимо разработать',
        description: 'Интерфейс или метод создаётся в результате проекта',
    },
    {
        type: CallDecisionType.NOT_A_CALL,
        title: 'Не является вызовом',
        description: 'Шаг останется в Use Case информационной строкой и в маппинг не пойдёт',
    },
];

export const OPERATION_STATUS_BADGE: Record<
    Exclude<ProjectUsecasePipelineOperationStatus, 'unmapped'>,
    { label: string; semantic: BadgeSemantic }
> = {
    matched: { label: 'Подтверждён', semantic: 'success' },
    architect_specified: { label: 'Подтверждён', semantic: 'success' },
    planned: { label: 'Планируется', semantic: 'neutral' },
    exists_unspecified: { label: 'Вне спецификации', semantic: 'info' },
    not_a_call: { label: 'Не является вызовом', semantic: 'neutral' },
};
