import React, { FC, useState } from 'react';

import { Autocomplete } from 'components/form';
import { Button, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import * as S from '../../units';

import { IRequirementField } from './types';

export const RequirementField: FC<IRequirementField> = ({
    groupIndex,
    requirementIndex,
    requirementOptions,
    isLoadingChapters,
    isFirstRequirementRow,
    canDeleteRequirement,
    onAddRequirement,
    onDeleteRequirement,
}) => {
    const [searchText, setSearchText] = useState('');

    const requirementOptionsFiltered = requirementOptions.filter((requirement) =>
        requirement.value.toLowerCase().includes(searchText.toLowerCase()),
    );

    return (
        <S.RequirementRow>
            <S.SelectContainer>
                <Autocomplete
                    fullWidth
                    name={`groups.${groupIndex}.requirements.${requirementIndex}.requirementId`}
                    label="Требование"
                    options={requirementOptionsFiltered}
                    onInputChange={setSearchText}
                    disabled={isLoadingChapters}
                />
            </S.SelectContainer>
            <S.IconButtonContainer>
                {isFirstRequirementRow ? (
                    <Button
                        type="button"
                        size="medium"
                        onClick={onAddRequirement}
                        startIcon={<Icon iconName={Icons.Add} />}
                    />
                ) : (
                    <Button
                        type="button"
                        size="medium"
                        onClick={onDeleteRequirement}
                        startIcon={<Icon iconName={Icons.Delete} />}
                        disabled={!canDeleteRequirement}
                    />
                )}
            </S.IconButtonContainer>
        </S.RequirementRow>
    );
};
