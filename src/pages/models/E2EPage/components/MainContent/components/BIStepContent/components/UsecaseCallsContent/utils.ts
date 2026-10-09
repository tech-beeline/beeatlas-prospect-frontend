import dayjs from 'dayjs';

import { mapProjectUsecaseOperationNode } from 'api/queries/usecase/utils';
import {
    IProjectUsecaseDetails,
    IProjectUsecaseOperationApplication,
    IProjectUsecaseOperationNode,
} from 'api/usecase/types';
import * as R from 'router/const';
import { formatDateToUTC, formatNullableString } from 'utils/formatters';

import { ICallNode } from '../CallsWorkspace/types';

import { usecaseCallStatusMap } from './const';

const formatMetric = (value: number | null) =>
    value === null || value === undefined ? formatNullableString(null) : String(value);

export const buildUsecaseCalls = (
    nodes: IProjectUsecaseOperationNode[],
    parentApplication: IProjectUsecaseOperationApplication | null = null,
    pathPrefix = '',
): ICallNode[] =>
    [...nodes]
        .sort((a, b) => a.order - b.order)
        .map((node, index) => {
            const item = mapProjectUsecaseOperationNode(node, parentApplication);
            const { discoveredOperation } = node;
            const connected = discoveredOperation.operation;
            const operation = connected ?? discoveredOperation;
            const id = `${pathPrefix}${index}-${node.discoveredOperationId}`;

            return {
                id,
                call: formatNullableString(item.call),
                product: item.callee.mnemonic,
                productTitle: discoveredOperation.discoveredInterface.product?.name,
                status: usecaseCallStatusMap[item.status],
                fields: [
                    { label: 'Метод', value: formatNullableString(item.call) },
                    { label: 'Тип', value: formatNullableString(operation.type) },
                    { label: 'Путь', value: formatNullableString(operation.name) },
                    {
                        label: 'RPS',
                        value: formatMetric(connected?.sla?.rps ?? discoveredOperation.rps),
                    },
                    {
                        label: 'Latency',
                        value: formatMetric(connected?.sla?.latency ?? discoveredOperation.latency),
                    },
                    {
                        label: 'Error rate',
                        value: formatMetric(
                            connected?.sla?.errorRate ?? discoveredOperation.errorRate,
                        ),
                    },
                    {
                        label: 'Интерфейс',
                        value: formatNullableString(
                            connected?.interface?.code ??
                                discoveredOperation.discoveredInterface.name,
                        ),
                    },
                    {
                        label: 'Контейнер',
                        value: formatNullableString(connected?.interface?.container?.code),
                    },
                ],
                children: buildUsecaseCalls(node.children, item.callee, `${id}/`),
            };
        });

export const getUsecaseUrl = (usecaseId: number) =>
    `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.USECASE_PATH}?id=${usecaseId}`;

export const formatUsecaseDate = (usecase: IProjectUsecaseDetails) =>
    dayjs(formatDateToUTC(usecase.updatedDate ?? usecase.createdDate))
        .local()
        .format('DD.MM.YYYY, HH:mm');
