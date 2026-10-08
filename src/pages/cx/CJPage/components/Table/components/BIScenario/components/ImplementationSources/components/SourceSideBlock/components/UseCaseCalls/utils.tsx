import React from 'react';

import { Link } from 'components/other';

import { IProjectUsecaseOperationTableItem } from 'api/usecase/types';
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

export const getUseCaseCallFields = (
    operation: IProjectUsecaseOperationTableItem,
): ICallField[] => [
    {
        label: 'ПРИЛОЖЕНИЕ',
        value: getApplicationValue(operation),
    },
    {
        label: 'ТЕХНИЧЕСКАЯ ВОЗМОЖНОСТЬ',
        value: formatNullableString(operation.technicalCapability),
    },
    {
        label: 'ENDPOINT',
        value: formatNullableString(operation.call),
    },
    {
        label: 'ОПИСАНИЕ',
        value: formatNullableString(operation.action),
    },
];

export const getUseCasePageUrl = (id: number): string =>
    `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.USECASE_PATH}?id=${id}`;
