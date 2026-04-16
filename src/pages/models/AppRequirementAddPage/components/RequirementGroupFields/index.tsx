import React, { FC, useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { Autocomplete } from 'components/form';

import { type FormValues, createRequirement } from '../../form';

import { RequirementField } from './components';
import { IRequirementGroupFields } from './types';
import * as S from './units';

export const RequirementGroupFields: FC<IRequirementGroupFields> = ({
    groupIndex,
    fieldsCount,
    onDeleteGroup,
    chapters,
    isLoadingChapters,
}) => {
    const [searchText, setSearchText] = useState('');
    const { control, watch } = useFormContext<FormValues>();
    const selectedChapterId = watch(`groups.${groupIndex}.situationId`);

    const { fields, append, remove } = useFieldArray({
        control,
        name: `groups.${groupIndex}.requirements`,
    });

    const chapterOptions = chapters
        .filter((chapter) => chapter.name.toLowerCase().includes(searchText.toLowerCase()))
        .map((chapter) => ({ id: chapter.id, value: chapter.name }));

    const requirementOptions = useMemo(() => {
        const selectedChapter =
            selectedChapterId === null
                ? null
                : chapters.find((chapter) => chapter.id === selectedChapterId);

        const allRequirements = selectedChapter
            ? selectedChapter.nfr
            : chapters.flatMap((chapter) => chapter.nfr);
        const optionsById = new Map<string, { id: number; value: string }>();

        allRequirements.forEach((requirement) => {
            if (optionsById.has(requirement.id)) {
                return;
            }

            const numericId = Number(requirement.id);

            if (Number.isNaN(numericId)) {
                return;
            }

            optionsById.set(requirement.id, {
                id: numericId,
                value: requirement.name,
            });
        });

        return Array.from(optionsById.values());
    }, [chapters, selectedChapterId]);

    return (
        <S.GroupWrapper>
            {groupIndex > 0 && (
                <S.GroupHeader>
                    <Text variant="subtitle2">Жизненная ситуация и требования</Text>
                    {fieldsCount > 1 && (
                        <IconButton
                            size="small"
                            iconName={Icons.Delete}
                            type="button"
                            onClick={() => onDeleteGroup(groupIndex)}
                        />
                    )}
                </S.GroupHeader>
            )}
            <S.GroupCard>
                <S.RequirementsList>
                    <S.RequirementRow>
                        <S.SelectContainer>
                            <Autocomplete
                                fullWidth
                                name={`groups.${groupIndex}.situationId`}
                                label="Жизненная ситуация"
                                options={chapterOptions}
                                disabled={isLoadingChapters}
                                onInputChange={setSearchText}
                            />
                        </S.SelectContainer>
                    </S.RequirementRow>
                    {fields.map((field, requirementIndex) => {
                        const isFirstRequirementRow = requirementIndex === 0;
                        const canDeleteRequirement = fields.length > 1;

                        return (
                            <RequirementField
                                key={field.id}
                                groupIndex={groupIndex}
                                requirementIndex={requirementIndex}
                                requirementOptions={requirementOptions}
                                isLoadingChapters={isLoadingChapters}
                                isFirstRequirementRow={isFirstRequirementRow}
                                canDeleteRequirement={canDeleteRequirement}
                                onAddRequirement={() => append(createRequirement())}
                                onDeleteRequirement={() => remove(requirementIndex)}
                            />
                        );
                    })}
                </S.RequirementsList>
            </S.GroupCard>
        </S.GroupWrapper>
    );
};
