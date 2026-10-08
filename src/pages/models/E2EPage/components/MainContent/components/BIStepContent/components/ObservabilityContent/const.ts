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

export const E2E_ALERTS_PIPELINE = 'e2e_sequence_alerts';

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

export const PUBLISH_TARGET_PIPELINE: Record<PublishTarget, string> = {
    [PublishTarget.ALERTS]: E2E_ALERTS_PIPELINE,
    [PublishTarget.DASHBOARD]: E2E_DASHBOARD_PIPELINE,
};

export const PUBLISH_TARGET_EMPTY: Record<PublishTarget, string> = {
    [PublishTarget.ALERTS]: 'Для этого шага алерты еще не создавались',
    [PublishTarget.DASHBOARD]: 'Для этого шага дашборд еще не создавался',
};

export const PUBLISH_TARGET_UNMATCHED: Record<PublishTarget, string> = {
    [PublishTarget.ALERTS]:
        'Методы не найдены в архитектуре — цепочка вызовов будет построена до первого некорректного вызова:',
    [PublishTarget.DASHBOARD]: 'Методы не найдены в архитектуре и не попадут в дашборд:',
};

export const PUBLISH_TARGET_USECASE_UNAVAILABLE: Record<PublishTarget, string> = {
    [PublishTarget.ALERTS]: USECASE_ALERTS_UNAVAILABLE,
    [PublishTarget.DASHBOARD]: USECASE_DASHBOARD_UNAVAILABLE,
};
