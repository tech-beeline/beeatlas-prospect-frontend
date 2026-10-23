import React from 'react';
import { IRootCall } from 'features/e2e/types';

import { Link } from 'components/other';

import { IStructurizrContainerData } from 'api/product/types';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { ICallField } from '../CallCard/types';

export const getE2ECallFields = (
    { stereotype, operation, operationId }: IRootCall,
    containers: IStructurizrContainerData[] = [],
    isLoading = false,
    isError = false,
): ICallField[] => {
    const interfaces = containers.flatMap((container) => container.interfaces);
    const iface = interfaces.find((item) =>
        item.operations.some((item) => item.id === operationId),
    );
    const endpoint = iface?.operations.find((item) => item.id === operationId);
    const capability = endpoint?.techCapability ?? iface?.techCapability;
    const applicationUrl = `${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${encodeURIComponent(
        operation?.productAlias ?? '',
    )}`;

    return [
        {
            label: 'ПРИЛОЖЕНИЕ',
            value: operation?.productAlias ? (
                <Link title={operation.productAlias} url={applicationUrl} />
            ) : (
                formatNullableString(null)
            ),
        },
        {
            label: 'ТЕХНИЧЕСКАЯ ВОЗМОЖНОСТЬ',
            value: capability ? (
                <Link
                    title={capability.name}
                    url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${capability.id}&type=TECH`}
                />
            ) : isError ? (
                'Не удалось загрузить'
            ) : isLoading ? (
                'Загрузка…'
            ) : (
                formatNullableString(null)
            ),
        },
        {
            label: 'ИНТЕРФЕЙС',
            value: iface ? (
                <Link
                    title={iface.name}
                    url={`${applicationUrl}&tab=INTERFACES_AND_METHODS&id=${iface.id}&type=arch_interface`}
                />
            ) : (
                formatNullableString(operation?.interfaceCode)
            ),
        },
        {
            label: 'ENDPOINT',
            value: endpoint ? (
                <Link
                    title={[endpoint.type, endpoint.name].filter(Boolean).join(' ')}
                    url={`${applicationUrl}&tab=INTERFACES_AND_METHODS&id=${endpoint.id}&type=arch_operation`}
                />
            ) : (
                formatNullableString(
                    [stereotype, operation?.type, operation?.name].filter(Boolean).join(' '),
                )
            ),
        },
    ];
};
