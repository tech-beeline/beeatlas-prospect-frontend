import React, { FC } from 'react';

import { TableBody, TableHead, TableRow } from 'components/ui';

import { PublicationsTableRow } from './components/PublicationsTableRow';
import { IPublicationsTable } from './types';
import * as S from './units';

export const PublicationsTable: FC<IPublicationsTable> = ({ data }) => {
    return (
        <S.TableStyled>
            <TableHead>
                <TableRow>
                    <S.TableDataFullWidth>Публикация</S.TableDataFullWidth>
                    <S.TableDataMinWidth>Источник</S.TableDataMinWidth>
                    <S.TableDataMinWidth>Статус</S.TableDataMinWidth>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((process) => (
                    <PublicationsTableRow key={process.id} process={process} />
                ))}
            </TableBody>
        </S.TableStyled>
    );
};
