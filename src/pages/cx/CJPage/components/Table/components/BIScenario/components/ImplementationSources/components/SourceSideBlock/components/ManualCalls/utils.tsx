import React from 'react';

import { Link } from 'components/other';

import { IRelations } from 'api/bi/types';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { ICallField } from '../CallCard/types';

export const getManualCallFields = (relation: IRelations): ICallField[] => [
    {
        label: 'ПРИЛОЖЕНИЕ',
        value:
            relation.productName && relation.productAlias ? (
                <Link
                    title={relation.productName}
                    url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${relation.productAlias}`}
                />
            ) : (
                formatNullableString(null)
            ),
    },
    {
        label: 'ТЕХНИЧЕСКАЯ ВОЗМОЖНОСТЬ',
        value:
            relation.tcName && relation.tcId ? (
                <Link
                    title={relation.tcName}
                    url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${relation.tcId}&type=TECH`}
                />
            ) : (
                formatNullableString(null)
            ),
    },
    {
        label: 'ИНТЕРФЕЙС',
        value:
            relation.productAlias && relation.interfaceName && relation.interfaceId ? (
                <Link
                    title={relation.interfaceName}
                    url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?tab=INTERFACES_AND_METHODS&cmdb=${relation.productAlias}&id=${relation.interfaceId}&type=arch_interface`}
                />
            ) : (
                formatNullableString(null)
            ),
    },
    {
        label: 'ENDPOINT',
        value:
            relation.productAlias && relation.operation && relation.operationId ? (
                <Link
                    title={relation.operation}
                    url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?tab=INTERFACES_AND_METHODS&cmdb=${relation.productAlias}&id=${relation.operationId}&type=arch_operation`}
                />
            ) : (
                formatNullableString(null)
            ),
    },
];

export const canShowSequenceDiagram = (relation: IRelations): boolean =>
    Boolean(relation.operation && relation.operationId && relation.tcCode) &&
    window.FEATURE_FLAGS.FLAG_IS_PROD === false;
