import { formatNullableString } from 'utils/formatters';

import { IUsecaseCallNode } from '../../types';

import { ICallDetailsField } from './types';

const formatMetric = (value: number | null) =>
    value === null || value === undefined ? formatNullableString(null) : String(value);

export const getCallDetailsFields = ({ node, item }: IUsecaseCallNode): ICallDetailsField[] => {
    const { discoveredOperation } = node;
    const operation = discoveredOperation.operation ?? discoveredOperation;

    return [
        { label: 'Метод', value: formatNullableString(item.call) },
        { label: 'Тип', value: formatNullableString(operation.type) },
        { label: 'Стереотип', value: formatNullableString(null) },
        { label: 'Путь', value: formatNullableString(operation.name) },
        { label: 'RPS', value: formatMetric(discoveredOperation.rps) },
        { label: 'Latency', value: formatMetric(discoveredOperation.latency) },
        { label: 'Error rate', value: formatMetric(discoveredOperation.errorRate) },
        {
            label: 'Интерфейс',
            value: formatNullableString(discoveredOperation.discoveredInterface.name),
        },
        { label: 'Контейнер', value: formatNullableString(null) },
    ];
};
