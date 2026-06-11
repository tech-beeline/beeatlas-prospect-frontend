import React, { FC } from 'react';
import { ringIdToLabelStatusMap } from 'features/technologies';

import { Link } from 'components/other';
import { Label, TableData, TableRow } from 'components/ui';

import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { ITechnologiesRow } from './types';

export const TechnologiesRow: FC<ITechnologiesRow> = ({ techProduct }) => {
    const { tech, source } = techProduct;

    return (
        <TableRow>
            <TableData>
                <Link
                    outer={true}
                    title={tech.label}
                    url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=${tech.id}`}
                />
            </TableData>
            <TableData>
                <Label
                    title={tech.ring.name}
                    variant="contained"
                    type={ringIdToLabelStatusMap[tech.ring.id]}
                />
            </TableData>
            <TableData>
                <Label
                    title={tech.isCritical ? 'Допустимо КИ' : 'Не допустимо КИ'}
                    type={tech.isCritical ? 'success' : 'error'}
                    variant="outline"
                />
            </TableData>
            <TableData>{formatNullableString(source)}</TableData>
        </TableRow>
    );
};
