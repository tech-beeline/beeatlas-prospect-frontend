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

export const E2E_DASHBOARD_PIPELINE = 'e2e-dashboard';

export const USECASE_DASHBOARD_UNAVAILABLE =
    'Dashboard по Use Case пока не строится: сервис дашбордов дорабатывается';

export enum PublishTarget {
    ALERTS = 'ALERTS',
    DASHBOARD = 'DASHBOARD',
}

export const PUBLISH_TARGET_NAME: Record<PublishTarget, string> = {
    [PublishTarget.ALERTS]: 'alerts',
    [PublishTarget.DASHBOARD]: 'dashboard',
};

export const PUBLISH_TARGET_TITLE: Record<PublishTarget, string> = {
    [PublishTarget.ALERTS]: 'Alerts',
    [PublishTarget.DASHBOARD]: 'Dashboard',
};

export const PUBLISH_TARGET_USECASE_UNAVAILABLE: Record<PublishTarget, string> = {
    [PublishTarget.ALERTS]: USECASE_ALERTS_UNAVAILABLE,
    [PublishTarget.DASHBOARD]: USECASE_DASHBOARD_UNAVAILABLE,
};
