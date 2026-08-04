import React, { FC, useRef } from 'react';
import dayjs from 'dayjs';
import {
    packageOperationToOperationNameMap,
    packageStatusToLabelTypeMap,
    packageStatusToStatusNameMap,
} from 'features/imported-data';

import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';
import { Label, TableData, TableRow } from 'components/ui';

import { useShowTooltip } from 'hooks';
import * as R from 'router/const';

import { IImportedDataRow } from './types';
import * as S from './units';

export const ImportedDataRow: FC<IImportedDataRow> = ({ packageData }) => {
    const operationRef = useRef<HTMLParagraphElement>(null);

    const showOperationTooltip = useShowTooltip(operationRef);

    return (
        <TableRow>
            <TableData>
                <Link
                    outer={false}
                    title={String(packageData.packageId)}
                    url={`${R.ADMIN_PATH}${R.IMPORTED_DATA_PATH}${R.PACKAGE_PATH}?id=${packageData.packageId}`}
                />
            </TableData>
            <TableData>
                <S.OperationContainer
                    ref={operationRef}
                    data-tooltip-id={`operation-${packageData.packageId}`}
                >
                    {packageOperationToOperationNameMap[packageData.operation] ??
                        packageData.operation}
                </S.OperationContainer>
                {showOperationTooltip && (
                    <TooltipContainer
                        largePadding
                        id={`operation-${packageData.packageId}`}
                        offset={8}
                        place="bottom"
                        noArrow
                    >
                        {packageOperationToOperationNameMap[packageData.operation] ??
                            packageData.operation}
                    </TooltipContainer>
                )}
            </TableData>
            <TableData>{dayjs(packageData.createdDate).format('DD-MM-YYYY')}</TableData>
            <TableData alignRight>
                {packageData.successParts}/{packageData.allParts}
            </TableData>
            <TableData alignRight>{packageData.processParts}</TableData>
            <TableData alignRight>{packageData.errorParts}</TableData>
            <TableData>
                <Label
                    title={packageStatusToStatusNameMap[packageData.status] ?? packageData.status}
                    variant="contained"
                    type={packageStatusToLabelTypeMap[packageData.status] ?? 'default'}
                />
            </TableData>
        </TableRow>
    );
};
