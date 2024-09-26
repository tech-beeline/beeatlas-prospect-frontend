import React, { FC, useState } from 'react';
import { Label, TableData, TableRow } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { IPackageTableRow } from './types';
import * as S from './units';

export const PackageTableRow: FC<IPackageTableRow> = ({ index, packagePart }) => {
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
                        <div>{index + 1}</div>
                    </S.FlexContainer>
                </TableData>
                <TableData>{packagePart.partId}</TableData>
                <TableData>
                    <Label title="Ошибка" type="error" />
                </TableData>
            </TableRow>
            {expanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={4}>{packagePart.payload}</S.TableDataStyled>
                </TableRow>
            )}
        </>
    );
};
