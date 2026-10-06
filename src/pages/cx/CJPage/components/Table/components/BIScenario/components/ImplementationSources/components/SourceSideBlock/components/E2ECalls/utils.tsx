import React from 'react';
import { IRootCall } from 'features/e2e/types';

import { Link } from 'components/other';

import { E2EContentOptions, E2ETreeItemType } from 'pages/models/E2EPage/types';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { ICallField } from '../CallCard/types';

export const getE2ECallFields = ({ stereotype, operation }: IRootCall): ICallField[] => [
    {
        label: 'ПРИЛОЖЕНИЕ',
        value: operation?.productAlias ? (
            <Link
                title={operation.productAlias}
                url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${operation.productAlias}`}
            />
        ) : (
            formatNullableString(null)
        ),
    },
    {
        label: 'ИНТЕРФЕЙС',
        value: formatNullableString(operation?.interfaceCode),
    },
    {
        label: 'ENDPOINT',
        value: formatNullableString(
            [stereotype, operation?.type, operation?.name].filter(Boolean).join(' '),
        ),
    },
];

export const getE2EPageUrl = (code: string): string =>
    `${R.MODELS_PATH}${R.E2E_PATH}?${new URLSearchParams({
        tab: E2EContentOptions.E2E,
        id: code,
        type: E2ETreeItemType.BI_STEP,
    }).toString()}`;
