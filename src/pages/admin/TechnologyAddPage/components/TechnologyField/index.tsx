import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, Divider, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { MultiSelect, Select, TextArea, TextField } from 'components/form';

import { FormValues, TechnologyValues } from '../../form';

import { ITechnologyField } from './types';
import * as S from './units';

export const TechnologyField: FC<ITechnologyField> = ({
    index,
    fieldsCount,
    showAddButton,
    isLoading,
    categoriesData,
    remove,
    append,
}) => {
    const { watch } = useFormContext<FormValues>();
    const comment = watch(`technologies.${index}.comment`);

    return (
        <S.Container>
            <S.FieldContainer>
                <S.FormRow>
                    <S.GrowContainer>
                        <TextField
                            fullWidth
                            name={`technologies.${index}.name`}
                            label="Название*"
                            disabled={isLoading}
                        />
                    </S.GrowContainer>
                    <S.GrowContainer>
                        <MultiSelect
                            fullWidth
                            name={`technologies.${index}.categories`}
                            label="Группа"
                            options={
                                categoriesData?.map((category) => ({
                                    id: category.id,
                                    value: category.name,
                                })) ?? []
                            }
                            disabled={isLoading}
                        />
                    </S.GrowContainer>
                </S.FormRow>
                <S.FormRow>
                    <S.GrowContainer>
                        <Select
                            fullWidth
                            name={`technologies.${index}.sector`}
                            label="Сектор*"
                            options={[
                                { id: 1, value: 'Фреймворки и инструменты' },
                                { id: 2, value: 'Платформа и инфраструктура' },
                                { id: 3, value: 'Управление данными' },
                                { id: 4, value: 'Языки' },
                            ]}
                            disabled={isLoading}
                        />
                    </S.GrowContainer>
                    <S.GrowContainer>
                        <Select
                            fullWidth
                            name={`technologies.${index}.ring`}
                            label="Статус*"
                            options={[
                                { id: 1, value: 'Adopt' },
                                { id: 2, value: 'Trial' },
                                { id: 3, value: 'Assess' },
                                { id: 4, value: 'Hold' },
                            ]}
                            disabled={isLoading}
                        />
                    </S.GrowContainer>
                </S.FormRow>
                <TextField
                    name={`technologies.${index}.link`}
                    label="Ссылка на страницу с описанием технологии"
                    disabled={isLoading}
                />
                <TextArea
                    name={`technologies.${index}.comment`}
                    label="Короткое описание"
                    helperText={`${comment?.length ?? 0}/255`}
                    maxLength={255}
                    disabled={isLoading}
                />
            </S.FieldContainer>
            {fieldsCount !== 1 && index === 0 && <Divider />}
            {(fieldsCount === 1 || index !== 0) && (
                <S.ButtonContainer>
                    {showAddButton && index === fieldsCount - 1 ? (
                        <Button
                            onClick={() => append({} as unknown as TechnologyValues)}
                            startIcon={<Icon iconName={Icons.Add} />}
                            variant="plain"
                            size="small"
                        >
                            Добавить технологию
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
