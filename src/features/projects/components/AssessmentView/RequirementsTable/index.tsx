import React, { FC } from 'react';

import { Text } from 'components/core';
import { Checkbox, TableBody, TableHead, TableHeaderData, TableRow } from 'components/ui';

import { RequirementTableRow } from './components/RequirementTableRow';
import { IRequirementTableProps } from './types';
import * as S from './units';

export const RequirementTable: FC<IRequirementTableProps> = ({
    requirements,
    emptyText,
    titleHeader = 'Название',
    descriptionHeader = 'Описание',
    selectedRequirementIds,
    onRequirementSelectionChange,
    onAllRequirementsSelectionChange,
}) => {
    if (!requirements.length) {
        return (
            <Text inactive variant="body2">
                {emptyText}
            </Text>
        );
    }

    const selectable = Boolean(
        selectedRequirementIds && onRequirementSelectionChange && onAllRequirementsSelectionChange,
    );
    const selectedIds = new Set(selectedRequirementIds);
    const selectedCount = requirements.filter(({ id }) => selectedIds.has(id)).length;
    const allSelected = selectedCount === requirements.length;
    const partiallySelected = selectedCount > 0 && !allSelected;

    return (
        <S.TableStyled>
            <TableHead>
                <TableRow>
                    {selectable && (
                        <S.SelectionHeader>
                            <Checkbox
                                aria-label="Выбрать все требования"
                                checked={allSelected || partiallySelected}
                                type={partiallySelected ? 'indeterminate' : 'checkbox'}
                                onChange={(event) =>
                                    onAllRequirementsSelectionChange!(
                                        requirements.map(({ id }) => id),
                                        event.target.checked,
                                    )
                                }
                            />
                        </S.SelectionHeader>
                    )}
                    <S.TitleHeader>{titleHeader}</S.TitleHeader>
                    <TableHeaderData>{descriptionHeader}</TableHeaderData>
                </TableRow>
            </TableHead>
            <TableBody>
                {requirements.map((requirement) => (
                    <RequirementTableRow
                        requirement={requirement}
                        key={requirement.id}
                        selected={selectedIds.has(requirement.id)}
                        onSelectionChange={selectable ? onRequirementSelectionChange : undefined}
                    />
                ))}
            </TableBody>
        </S.TableStyled>
    );
};
