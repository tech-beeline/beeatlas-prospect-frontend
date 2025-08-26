import React, { useState } from 'react';
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

import * as S from './units';

export const AppTable = () => {
    const [sortingVariant, setSortingVariant] = useState(false);
    return (
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
                <TableRow>
                    <TableData>
                        <Link title="ACRM" url="https://beeline.ru" />
                    </TableData>
                    <TableData>0-Core</TableData>
                    <TableData>Константинопольский Константин Константинович</TableData>
                </TableRow>
                <TableRow>
                    <TableData>
                        <Link title="B2B_manager" url="https://beeline.ru" />
                    </TableData>
                    <TableData>1-Mission Critical</TableData>
                    <TableData>Константинопольский Константин Константинович</TableData>
                </TableRow>
                <TableRow>
                    <TableData>
                        <Link title="BeePayXP" url="https://beeline.ru" />
                    </TableData>
                    <TableData>2-Business Critical</TableData>
                    <TableData>Константинопольский Константин Константинович</TableData>
                </TableRow>
                <TableRow>
                    <TableData>
                        <Link title="CRM_MNP" url="https://beeline.ru" />
                    </TableData>
                    <TableData>3-Business Operation</TableData>
                    <TableData>Константинопольский Константин Константинович</TableData>
                </TableRow>
                <TableRow>
                    <TableData>
                        <Link title="Comverse" url="https://beeline.ru" />
                    </TableData>
                    <TableData>4-Office Productivity</TableData>
                    <TableData>Константинопольский Константин Константинович</TableData>
                </TableRow>
            </TableBody>
        </Table>
    );
};
