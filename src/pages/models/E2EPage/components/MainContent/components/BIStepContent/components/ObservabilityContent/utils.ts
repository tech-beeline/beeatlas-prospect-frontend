import dayjs from 'dayjs';

import { IDashboardVersionStatus, IStagingSequenceAlert } from 'api/staging-sequence/types';
import { IUsecaseByBiStepCode } from 'api/usecase/types';

import { IPublishCard, IPublishCardField } from './components/PublishCard/types';
import {
    ALERT_SOURCE_LABEL,
    AlertSource,
    PUBLISH_TARGET_NAME,
    PUBLISH_TARGET_TITLE,
    PublishTarget,
    USECASE_ALERTS_UNAVAILABLE,
} from './const';
import {
    IAlertCardParams,
    IAlertImplementations,
    IBuiltImplementation,
    IDashboardCardParams,
} from './types';

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

const getVersionFields = (data: IStagingSequenceAlert): IPublishCardField[] => [
    { label: 'Версия', value: data.version },
    { label: 'Дата генерации', value: dayjs(data.created).local().format('DD.MM.YYYY, HH:mm:ss') },
    { label: 'Инициатор', value: data.creator },
];

const getDashboardFields = (
    data: IDashboardVersionStatus,
    built: IBuiltImplementation | null,
): IPublishCardField[] => {
    const fields = getVersionFields(data);
    if (built) fields.push({ label: 'Тип реализации', value: ALERT_SOURCE_LABEL[built.source] });
    fields.push({ label: 'Реализация', value: built?.implementation.name ?? data.sourceUid });
    return fields;
};

export const getAlertCardContent = ({
    source,
    selected,
    data,
    hasError,
}: IAlertCardParams): PublishCardContent => {
    const sourceFields = [
        { label: 'Тип реализации', value: ALERT_SOURCE_LABEL[source] },
        { label: 'Реализация', value: selected?.name },
    ];

    if (source !== AlertSource.E2E) {
        return {
            title: PUBLISH_TARGET_TITLE[PublishTarget.ALERTS],
            descriptions: [USECASE_ALERTS_UNAVAILABLE],
            fields: sourceFields,
            actionLabel: getActionLabel(PublishTarget.ALERTS, false),
        };
    }

    return {
        title: PUBLISH_TARGET_TITLE[PublishTarget.ALERTS],
        descriptions: data
            ? [String(data.id)]
            : hasError
            ? ['Для этого процесса алерты еще не создавались']
            : [],
        status: data?.status,
        fields: data ? [...getVersionFields(data), ...sourceFields] : [],
        note: data?.note,
        actionLabel: getActionLabel(PublishTarget.ALERTS, !!data),
    };
};

export const getDashboardCardContent = ({
    data,
    hasError,
    built,
}: IDashboardCardParams): PublishCardContent => ({
    title: PUBLISH_TARGET_TITLE[PublishTarget.DASHBOARD],
    descriptions: data
        ? [String(data.id)]
        : hasError
        ? ['Для этого шага дашборд еще не создавался']
        : [],
    status: data?.status,
    fields: data ? getDashboardFields(data, built) : [],
    note: data?.note,
    actionLabel: getActionLabel(PublishTarget.DASHBOARD, !!data),
});
