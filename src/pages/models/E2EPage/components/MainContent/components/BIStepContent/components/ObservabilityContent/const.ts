export enum AlertSource {
    E2E = 'E2E',
    USE_CASE = 'USE_CASE',
}

export const ALERT_SOURCE_LABEL: Record<AlertSource, string> = {
    [AlertSource.E2E]: 'Шаг E2E-сценария',
    [AlertSource.USE_CASE]: 'Use Case',
};

export const ALERT_SOURCE_OPTIONS = [
    { id: AlertSource.E2E, label: ALERT_SOURCE_LABEL[AlertSource.E2E] },
    { id: AlertSource.USE_CASE, label: ALERT_SOURCE_LABEL[AlertSource.USE_CASE] },
];

export const USECASE_ALERTS_UNAVAILABLE =
    'Алерты по Use Case пока не строятся: сервис дашбордов дорабатывается';
