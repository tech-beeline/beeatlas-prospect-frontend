import React from 'react';
import { Label, TableData, TableRow } from '@beeline/design-system-react';

import { Link } from 'components/other';

import * as R from 'router/const';

export const TechnologiesRow = () => {
    return (
        <>
            <TableRow>
                <TableData>
                    <Link url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`} title="draw.io" />
                </TableData>
                <TableData>
                    <Label title="Adopt" variant="contained" type="success" />
                </TableData>

                <TableData>
                    <Label type="success" variant="outline" title="Допустимо КИ" />
                </TableData>
                <TableData>Технорадар/Structurizr</TableData>
            </TableRow>
            <TableRow>
                <TableData>
                    <Link
                        url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=1`}
                        title="Structurizr OnPremise"
                    />
                </TableData>
                <TableData>
                    <Label title="Adopt" variant="contained" type="success" />
                </TableData>

                <TableData>
                    <Label type="success" variant="outline" title="Допустимо КИ" />
                </TableData>
                <TableData>Технорадар/Structurizr</TableData>
            </TableRow>
        </>
    );
};
