import React, { FC } from 'react';

import { TableHeaderData } from 'components/ui';
import { TableBody, TableHead, TableRow } from 'components/ui';

import { RequirementRow } from './components';
import { IRequirementsTable } from './types';
import * as S from './units';

export const RequirementsTable: FC<IRequirementsTable> = ({ nfr, activeItem }) => {
    return (
        <S.TableStyled>
            <TableHead>
                <TableRow>
                    <TableHeaderData>Нефункциональное требование</TableHeaderData>
                    <TableHeaderData>Описание</TableHeaderData>
                    <TableHeaderData>Источник</TableHeaderData>
                    <S.TableHeaderDataMaxWidth>Версия</S.TableHeaderDataMaxWidth>
                </TableRow>
            </TableHead>
            <TableBody>
                {nfr.map((n) => (
                    <RequirementRow key={n.id} nfr={n} activeItem={activeItem} />
                ))}
            </TableBody>
        </S.TableStyled>
    );
};
