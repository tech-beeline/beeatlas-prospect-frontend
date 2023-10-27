import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Select, TextField } from 'components/form';

import { FormValues } from 'pages/CJPage/components/BIForm/form';

import * as S from '../../../units';
import { OPTIONS } from '../../const';

import { IParticipantFields } from './types';

export const ParticipantFields: FC<IParticipantFields> = ({
    index,
    fieldsLength,
    alreadySelected,
    remove,
}) => {
    const { watch } = useFormContext<FormValues>();

    const participant = watch(`participants.${index}`);

    const options = OPTIONS.filter(
        (option) => participant.participant === option.id || !alreadySelected.includes(option.id),
    );

    return (
        <>
            <S.FlexContainer>
                <S.SubTitleSmall>Участник {index + 1}</S.SubTitleSmall>
                {fieldsLength > 1 && (
                    <IconButton
                        iconName={Icons.Delete}
                        size="large"
                        onClick={() => remove(index)}
                    />
                )}
            </S.FlexContainer>
            <S.FieldsContainer>
                <Select
                    name={`participants.${index}.participant`}
                    label="Сторона*"
                    options={options}
                />
                <TextField label="Описание участника*" name={`participants.${index}.descr`} />
                <TextField label="Ценностный результат" name={`participants.${index}.value`} />
            </S.FieldsContainer>
        </>
    );
};
