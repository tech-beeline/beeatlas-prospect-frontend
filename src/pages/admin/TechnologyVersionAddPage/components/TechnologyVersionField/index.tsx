import React, { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Select, TextField } from 'components/form';
import { Button, Divider, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { VersionValues } from '../../form';

import { ITechnologyVersionField } from './types';
import * as S from './units';

export const TechnologyVersionField: FC<ITechnologyVersionField> = ({
    index,
    fieldsCount,
    showAddButton,
    isLoading,
    techRingId,
    resetStatus,
    remove,
    append,
}) => {
    const statusOptions = techRingId
        ? [
              { id: 1, value: 'Adopt' },
              { id: 2, value: 'Trial' },
              { id: 3, value: 'Assess' },
              { id: 4, value: 'Hold' },
          ].filter((option) => option.id !== techRingId)
        : [];

    const { setValue } = useFormContext();

    useEffect(() => {
        if (resetStatus) {
            setValue(`versions.${index}.status`, statusOptions[0]?.id);
        }
    }, [statusOptions]);
    return (
        <S.Container>
            <S.FieldContainer>
                <S.FormRow>
                    <S.GrowContainer>
                        <TextField
                            fullWidth
                            name={`versions.${index}.versionStart`}
                            label="Начало диапазона*"
                            disabled={isLoading}
                            helperPosition="block"
                        />
                    </S.GrowContainer>
                    <S.GrowContainer>
                        <TextField
                            fullWidth
                            name={`versions.${index}.versionEnd`}
                            label="Конец диапазона"
                            disabled={isLoading}
                        />
                    </S.GrowContainer>
                    <S.GrowContainer>
                        <Select
                            fullWidth
                            name={`versions.${index}.status`}
                            label="Статус*"
                            options={statusOptions}
                            disabled={isLoading}
                        />
                    </S.GrowContainer>
                </S.FormRow>
            </S.FieldContainer>
            {fieldsCount !== 1 && index === 0 && <Divider />}
            {(fieldsCount === 1 || index !== 0) && (
                <S.ButtonContainer>
                    {showAddButton && index === fieldsCount - 1 ? (
                        <Button
                            onClick={() => append({} as unknown as VersionValues)}
                            startIcon={<Icon iconName={Icons.Add} />}
                            variant="plain"
                            size="small"
                        >
                            Добавить версию
                        </Button>
                    ) : (
                        <div />
                    )}
                    {index !== 0 && (
                        <Button size="small" onClick={() => remove(index)} variant="plain">
                            Удалить
                        </Button>
                    )}
                </S.ButtonContainer>
            )}
        </S.Container>
    );
};
