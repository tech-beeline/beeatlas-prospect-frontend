import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Select } from 'components/form';

import * as S from '../units';

export const EntersFieldArray = () => {
    const { control } = useFormContext();

    const {
        fields: enterFields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: 'enters',
    });

    return (
        <div>
            <S.FlexContainer>
                <S.SubTitle>Входы и выходы</S.SubTitle>
                <IconButton
                    iconName={Icons.Add}
                    size="large"
                    onClick={() => append({ enter: 0, exit: 0 })}
                />
            </S.FlexContainer>
            {enterFields.map((field, index) => (
                <div key={field.id}>
                    <S.FlexContainer>
                        <S.SubTitleSmall>Вход и выход {index + 1}</S.SubTitleSmall>
                        <IconButton
                            iconName={Icons.Delete}
                            size="large"
                            onClick={() => remove(index)}
                        />
                    </S.FlexContainer>
                    <S.FieldsContainer>
                        <Select
                            name={`enters.${index}.enter`}
                            label="Вход*"
                            options={[
                                {
                                    id: 0,
                                    value: 'Нет входа',
                                },
                                {
                                    id: 1,
                                    value: 'Создание профиля',
                                },
                                {
                                    id: 2,
                                    value: 'Авторизация',
                                },
                                {
                                    id: 3,
                                    value: 'Подключение услуги',
                                },
                            ]}
                        />
                        <Select
                            name={`enters.${index}.exit`}
                            label="Выход*"
                            options={[
                                {
                                    id: 0,
                                    value: 'Нет выхода',
                                },
                                {
                                    id: 1,
                                    value: 'Создание профиля',
                                },
                                {
                                    id: 2,
                                    value: 'Авторизация',
                                },
                                {
                                    id: 3,
                                    value: 'Подключение услуги',
                                },
                            ]}
                        />
                    </S.FieldsContainer>
                </div>
            ))}
        </div>
    );
};
