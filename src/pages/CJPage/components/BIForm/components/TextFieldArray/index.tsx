import React, { FC, Fragment } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Icon, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { TextField } from 'components/form';

import { FormValues } from '../../form';
import * as S from '../units';

import { ITextFieldArray } from './types';

export const TextFieldArray: FC<ITextFieldArray> = ({
    fullscreen = false,
    fieldName,
    title,
    itemLabel,
}) => {
    const { control } = useFormContext<FormValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldName as any,
    });

    const handleAddClick = () => {
        append({ value: '' }, { shouldFocus: false });
    };

    const NameContainer = fullscreen ? S.FieldsFlexContainer : Fragment;

    return (
        <div>
            <S.FlexContainer>
                <S.SubTitle id={fieldName}>{title}</S.SubTitle>
                {!fullscreen && (
                    <IconButton iconName={Icons.Add} size="large" onClick={handleAddClick} />
                )}
            </S.FlexContainer>
            {fields.map((field, index) => (
                <div key={field.id}>
                    {!fullscreen && (
                        <S.FlexContainer>
                            <S.SubTitleSmall>
                                {itemLabel} {index + 1}
                            </S.SubTitleSmall>
                            {fields.length > 1 && (
                                <IconButton
                                    iconName={Icons.Delete}
                                    size="large"
                                    onClick={() => remove(index)}
                                />
                            )}
                        </S.FlexContainer>
                    )}
                    <S.ChannelsContainer marginTop={fullscreen}>
                        <NameContainer>
                            <S.GrowContainer>
                                <TextField name={`${fieldName}.${index}.value`} label={itemLabel} />
                            </S.GrowContainer>

                            {fullscreen && index === 0 && (
                                <S.ButtonStyled onClick={handleAddClick} type="button">
                                    <Icon iconName={Icons.Add} size="large" />
                                </S.ButtonStyled>
                            )}
                            {fullscreen && index !== 0 && (
                                <S.ButtonStyled onClick={() => remove(index)} type="button">
                                    <Icon iconName={Icons.Delete} size="large" />
                                </S.ButtonStyled>
                            )}
                        </NameContainer>
                    </S.ChannelsContainer>
                </div>
            ))}
        </div>
    );
};
