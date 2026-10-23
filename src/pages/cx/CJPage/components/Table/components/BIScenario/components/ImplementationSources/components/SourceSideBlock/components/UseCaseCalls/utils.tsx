import React from 'react';

import { Link } from 'components/other';

import { mapProjectUsecaseOperationNode } from 'api/queries/usecase/utils';
import { IProjectUsecaseOperationNode, IProjectUsecaseOperationTableItem } from 'api/usecase/types';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { ICallField } from '../CallCard/types';

const getApplicationValue = ({ callee }: IProjectUsecaseOperationTableItem) => {
    if (!callee.mnemonic) {
        return formatNullableString(null);
    }

    if (callee.isPlanned) {
        return `${callee.mnemonic} (планируемое)`;
    }

    return (
        <Link
            title={callee.mnemonic}
            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${callee.mnemonic}`}
        />
    );
};

export const getUseCaseCallFields = (node: IProjectUsecaseOperationNode): ICallField[] => {
    const operation = mapProjectUsecaseOperationNode(node, null);
    const capability = operation.techCapability;
    const iface = node.discoveredOperation.operation?.interface;
    return [
        {
            label: 'ПРИЛОЖЕНИЕ',
            value: getApplicationValue(operation),
        },
        {
            label: 'ТЕХНИЧЕСКАЯ ВОЗМОЖНОСТЬ',
            value: capability?.id ? (
                <Link
                    title={operation.technicalCapability ?? ''}
                    url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${capability.id}&type=TECH`}
                />
            ) : (
                formatNullableString(operation.technicalCapability)
            ),
        },
        {
            label: 'ENDPOINT',
            value: formatNullableString(operation.call),
        },
        {
            label: 'ИНТЕРФЕЙС',
            value:
                iface && operation.callee.mnemonic && !operation.callee.isPlanned ? (
                    <Link
                        title={
                            node.discoveredOperation.discoveredInterface.name ||
                            iface.code ||
                            'Интерфейс'
                        }
                        url={`${R.MODELS_PATH}${R.APPS_PATH}${
                            R.VIEW_PATH
                        }?cmdb=${encodeURIComponent(
                            operation.callee.mnemonic,
                        )}&tab=INTERFACES_AND_METHODS&id=${iface.id}&type=arch_interface`}
                    />
                ) : (
                    formatNullableString(node.discoveredOperation.discoveredInterface.name)
                ),
        },
    ];
};

export const getUseCasePageUrl = (id: number): string =>
    `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.USECASE_PATH}?id=${id}`;
