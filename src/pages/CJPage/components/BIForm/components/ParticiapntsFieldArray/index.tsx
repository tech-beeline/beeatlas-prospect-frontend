import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Select, TextField } from 'components/form';

import * as S from '../units';

export const ParticiapntsFieldArray = () => {
    const { control } = useFormContext();

    const {
        fields: participantFields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: 'participants',
    });

    return (
        <div>
            <S.FlexContainer>
                <S.SubTitle>Участники взаимодействия</S.SubTitle>
                <IconButton
                    iconName={Icons.Add}
                    size="large"
                    onClick={() => append({ descr: '', participant: 0, value: '' })}
                />
            </S.FlexContainer>
            {participantFields.map((field, index) => (
                <div key={field.id}>
                    <S.FlexContainer>
                        <S.SubTitleSmall>Участник {index + 1}</S.SubTitleSmall>
                        <IconButton
                            iconName={Icons.Delete}
                            size="large"
                            onClick={() => remove(index)}
                        />
                    </S.FlexContainer>
                    <S.FieldsContainer>
                        <Select
                            name={`participants.${index}.participant`}
                            label="Сторона*"
                            options={[
                                {
                                    id: 0,
                                    value: 'Участник со стороны клиента',
                                },
                                {
                                    id: 1,
                                    value: 'Участник со стороны компании',
                                },
                                {
                                    id: 2,
                                    value: 'Внешние участники',
                                },
                            ]}
                        />
                        <TextField
                            label="Описание участника*"
                            name={`participants.${index}.descr`}
                        />
                        <TextField
                            label="Ценностный результат"
                            name={`participants.${index}.value`}
                        />
                    </S.FieldsContainer>
                </div>
            ))}
        </div>
    );
};
