import React, { FC, useState } from 'react';
import {
    IconButton,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';

import { useGetSystemInfluenceQuery } from 'api/queries/product';

import { keyToCriticalMap } from './const';
import { IAppTable } from './types';
import * as S from './units';

export const AppTable: FC<IAppTable> = ({ cmdb }) => {
    const [sortingVariant, setSortingVariant] = useState(false);

    const { data } = useGetSystemInfluenceQuery(cmdb);
    return (
        <>
            {data && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData>
                                <S.FlexContainer>
                                    Зависимые системы{' '}
                                    <IconButton
                                        size="medium"
                                        iconName={Icons.Copy}
                                        data-tooltip-id="copy"
                                    />
                                    <TooltipContainer noArrow place="top" offset={8} id="copy">
                                        Копировать список
                                    </TooltipContainer>
                                </S.FlexContainer>
                            </TableHeaderData>
                            <TableHeaderData>
                                <S.FlexContainer>
                                    Критичность{' '}
                                    <IconButton
                                        size="medium"
                                        iconName={sortingVariant ? Icons.ArrowUp : Icons.ArrowDown}
                                        onClick={() => setSortingVariant(!sortingVariant)}
                                    />
                                </S.FlexContainer>
                            </TableHeaderData>
                            <TableHeaderData>Владелец</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.dependentSystems.map((system) => (
                            <TableRow key={system.alias}>
                                <TableData>
                                    <Link title={system.alias} url="https://beeline.ru" />
                                </TableData>
                                <TableData>
                                    {system.critical &&
                                        `${
                                            keyToCriticalMap[system.critical.split('_')[0]] ??
                                            system.critical.split('_')[0]
                                        } ${system.critical.split('_')[1]}`}
                                </TableData>
                                <TableData>{system.ownerName}</TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
};
