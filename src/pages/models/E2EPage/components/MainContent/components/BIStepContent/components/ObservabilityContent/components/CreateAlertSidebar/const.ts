import { type Option } from 'components/ui';

export enum AlertSource {
    E2E = 'E2E',
    USE_CASE = 'USE_CASE',
}

export const ALERT_SOURCE_OPTIONS: Option<string>[] = [
    { id: AlertSource.E2E, value: 'Шаг E2E-сценария' },
    { id: AlertSource.USE_CASE, value: 'Use Case', disabled: true },
];
