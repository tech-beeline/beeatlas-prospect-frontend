import React, { FC, Fragment } from 'react';
import { useFormContext } from 'react-hook-form';

import { Select, TextArea, TextField } from 'components/form';
import { IconButton } from 'components/ui';
import { Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { FormValues } from '../../../../form';
import * as S from '../../../units';

import { IParticipantFields } from './types';

export const ParticipantFields: FC<IParticipantFields> = ({
    index,
    options,
    fieldsLength,
    alreadySelected,
    add,
    remove,
    fullscreen = false,
}) => {
    const { watch } = useFormContext<FormValues>();

    const participant = watch(`participants.${index}`);

    const filteredOptions = options
        .filter(
            (option) =>
                participant.participant === option.id || !alreadySelected.includes(option.id),
        )
        .map((option) => ({ id: option.id, value: option.name }));

    const NameContainer = fullscreen ? S.FieldsFlexContainer : Fragment;

    return (
        <>
            {!fullscreen && (
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
            )}
            <S.FieldsContainer marginTop={fullscreen}>
                <NameContainer>
                    <S.GrowContainer>
                        <Select
                            name={`participants.${index}.participant`}
                            label="Сторона*"
                            options={filteredOptions}
                        />
                    </S.GrowContainer>
                    <S.GrowContainer>
                        <TextField
                            label="Описание участника*"
                            name={`participants.${index}.descr`}
                        />
                    </S.GrowContainer>
                    {fullscreen && index === 0 && (
                        <S.ButtonStyled
                            disabled={fieldsLength >= options.length}
                            onClick={add}
                            type="button"
                        >
                            <Icon iconName={Icons.Add} size="large" />
                        </S.ButtonStyled>
                    )}
                    {fullscreen && index !== 0 && (
                        <S.ButtonStyled onClick={() => remove(index)} type="button">
                            <Icon iconName={Icons.Delete} size="large" />
                        </S.ButtonStyled>
                    )}
                </NameContainer>
                <TextArea label="Ценностный результат*" name={`participants.${index}.value`} />
            </S.FieldsContainer>
            {fullscreen && fieldsLength !== 1 && index + 1 !== fieldsLength && <S.DividerStyled />}
        </>
    );
};
