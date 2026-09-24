import React, { FC } from 'react';

import { Text } from 'components/core';
import { Checkbox, TableData, TableRow } from 'components/ui';

import { IRequirementTableRowProps } from '../../types';

import * as S from './units';

export const RequirementTableRow: FC<IRequirementTableRowProps> = ({
    requirement,
    selected,
    onSelectionChange,
}) => {
    return (
        <TableRow dense>
            {onSelectionChange && (
                <TableData>
                    <Checkbox
                        aria-label={`Выбрать требование ${requirement.code || requirement.title}`}
                        checked={selected}
                        onChange={(event) =>
                            onSelectionChange(requirement.id, event.target.checked)
                        }
                    />
                </TableData>
            )}
            <TableData>
                <S.TitleCell>
                    <Text variant="body3">{requirement.title}</Text>
                    {requirement.code && (
                        <Text inactive variant="body3">
                            {requirement.code}
                        </Text>
                    )}
                </S.TitleCell>
            </TableData>
            <TableData>
                <S.Description>{requirement.description || '—'}</S.Description>
            </TableData>
        </TableRow>
    );
};
