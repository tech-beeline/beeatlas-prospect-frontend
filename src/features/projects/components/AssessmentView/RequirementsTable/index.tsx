import React, { FC } from 'react';

import { Text } from 'components/core';
import { TableBody, TableHead, TableHeaderData, TableRow } from 'components/ui';

import { RequirementTableRow } from './components/RequirementTableRow';
import { IRequirementTableProps } from './types';
import * as S from './units';

export const RequirementTable: FC<IRequirementTableProps> = ({
    requirements,
    emptyText,
    titleHeader = 'Название',
    descriptionHeader = 'Описание',
}) => {
    if (!requirements.length) {
        return (
            <Text inactive variant="body2">
                {emptyText}
            </Text>
        );
    }

    return (
        <S.TableStyled>
            <TableHead>
                <TableRow>
                    <S.TitleHeader>{titleHeader}</S.TitleHeader>
                    <TableHeaderData>{descriptionHeader}</TableHeaderData>
                </TableRow>
            </TableHead>
            <TableBody>
                {requirements.map((requirement) => (
                    <RequirementTableRow requirement={requirement} key={requirement.id} />
                ))}
            </TableBody>
        </S.TableStyled>
    );
};
