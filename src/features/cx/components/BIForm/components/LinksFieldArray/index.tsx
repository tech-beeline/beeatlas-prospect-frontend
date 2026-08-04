import React, { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Text } from 'components/core';
import { TextField } from 'components/form';
import { IconButton } from 'components/ui';
import { Button } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { FormValues } from '../../form';
import * as S from '../units';

import { ILinksFieldArray } from './types';

export const LinksFieldArray: FC<ILinksFieldArray> = ({
    fullscreen = false,
    fieldName,
    title,
    itemLabel = 'Ссылка',
}) => {
    const { control } = useFormContext<FormValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldName as any,
    });

    const handleAddClick = () => {
        append({ value: '' }, { shouldFocus: false });
    };

    return (
        <S.Container>
            <S.FlexContainer>
                <Text id={fieldName} variant={fullscreen ? 'subtitle1' : 'subtitle2'}>
                    {title}
                </Text>

                {fullscreen ? (
                    <Button variant="outlined" onClick={handleAddClick} type="button">
                        Добавить
                    </Button>
                ) : (
                    <IconButton
                        iconName={Icons.Add}
                        size="medium"
                        onClick={handleAddClick}
                        type="button"
                    />
                )}
            </S.FlexContainer>
            {fields.map((field, index) => (
                <div key={field.id}>
                    <S.FieldsContainer>
                        <S.FieldsFlexContainer>
                            <S.GrowContainer>
                                <TextField name={`${fieldName}.${index}.value`} label={itemLabel} />
                            </S.GrowContainer>

                            {fullscreen ? (
                                <IconButton
                                    iconName={Icons.Delete}
                                    size="medium"
                                    type="button"
                                    variant="outlined"
                                    onClick={() => remove(index)}
                                />
                            ) : (
                                <IconButton
                                    iconName={Icons.Delete}
                                    size="medium"
                                    type="button"
                                    onClick={() => remove(index)}
                                />
                            )}
                        </S.FieldsFlexContainer>
                        <TextField
                            name={`${fieldName}.${index}.description`}
                            label="Описание ссылки"
                        />
                    </S.FieldsContainer>
                    {fields.length !== 1 && index + 1 !== fields.length && <S.DividerStyled />}
                </div>
            ))}
        </S.Container>
    );
};
