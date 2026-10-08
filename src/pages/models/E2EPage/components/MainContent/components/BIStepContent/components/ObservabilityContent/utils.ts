import dayjs from 'dayjs';

import { IDashboardVersionStatus } from 'api/staging-sequence/types';
import { IUsecaseByBiStepCode } from 'api/usecase/types';

import { IPublishCard, IPublishCardField } from './components/PublishCard/types';
import {
    ALERT_SOURCE_LABEL,
    AlertSource,
    PUBLISH_TARGET_EMPTY,
    PUBLISH_TARGET_NAME,
    PUBLISH_TARGET_TITLE,
    PublishTarget,
} from './const';
import { IAlertImplementations, IBuiltImplementation, IPublishCardParams } from './types';

type PublishCardContent = Omit<IPublishCard, 'isLoading' | 'onAction'>;

export const getAlertImplementations = (
    e2eCodes: string[],
    usecases: IUsecaseByBiStepCode[],
): IAlertImplementations => ({
    [AlertSource.E2E]: e2eCodes.map((code) => ({ id: code, label: code, name: code })),
    [AlertSource.USE_CASE]: usecases.map(({ id, code, name }) => ({
        id: String(id),
        label: code,
        name,
    })),
});

export const getAvailableAlertSources = (implementations: IAlertImplementations) =>
    Object.values(AlertSource).filter((source) => implementations[source].length > 0);

export const findImplementation = (
    implementations: IAlertImplementations,
    implementationId: string | null | undefined,
): IBuiltImplementation | null => {
    for (const source of Object.values(AlertSource)) {
        const implementation = implementations[source].find(({ id }) => id === implementationId);
        if (implementation) return { source, implementation };
    }
    return null;
};

const getActionLabel = (target: PublishTarget, exists: boolean) =>
    `${exists ? 'Обновить' : 'Создать'} ${PUBLISH_TARGET_NAME[target]}`;

const getVersionFields = (
    data: IDashboardVersionStatus,
    built: IBuiltImplementation | null,
): IPublishCardField[] => [
    { label: 'Версия', value: data.version },
    { label: 'Дата генерации', value: dayjs(data.created).local().format('DD.MM.YYYY, HH:mm:ss') },
    { label: 'Инициатор', value: data.creator },
    { label: 'Тип реализации', value: built ? ALERT_SOURCE_LABEL[built.source] : '—' },
    { label: 'Реализация', value: built?.implementation.name ?? data.sourceUid ?? '—' },
];

export const getPublishCardContent = ({
    target,
    data,
    hasError,
    built,
}: IPublishCardParams): PublishCardContent => ({
    title: PUBLISH_TARGET_TITLE[target],
    descriptions: data ? [String(data.id)] : hasError ? [PUBLISH_TARGET_EMPTY[target]] : [],
    status: data?.status,
    fields: data ? getVersionFields(data, built) : [],
    url: data?.url ?? null,
    note: data?.note,
    actionLabel: getActionLabel(target, !!data),
});
