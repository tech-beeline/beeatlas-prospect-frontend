import React, { FC, useState } from 'react';
import { packageStatusToLabelTypeMap, packageStatusToStatusNameMap } from 'features/imported-data';

import { Label, TableData, TableRow } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { prettifyJSONString } from 'utils/helpers';

import { IPackageTableRow } from './types';
import * as S from './units';

export const PackageTableRow: FC<IPackageTableRow> = ({ packagePart }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <TableRow>
                <TableData>
                    <S.FlexContainer>
                        <S.IconButtonStyled
                            expanded={expanded}
                            size="medium"
                            iconName={Icons.NavArrowDown}
                            onClick={() => setExpanded(!expanded)}
                        />
                        <div>{packagePart.partNum}</div>
                    </S.FlexContainer>
                </TableData>
                <TableData>{packagePart.partId}</TableData>
                <TableData>
                    <Label
                        title={
                            packageStatusToStatusNameMap[packagePart.status] ?? packagePart.status
                        }
                        variant="outline"
                        type={packageStatusToLabelTypeMap[packagePart.status] ?? 'default'}
                    />
                </TableData>
            </TableRow>
            {expanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={4}>
                        <S.PayloadContainer>
                            {prettifyJSONString(packagePart.payload)}
                        </S.PayloadContainer>
                    </S.TableDataStyled>
                </TableRow>
            )}
        </>
    );
};
