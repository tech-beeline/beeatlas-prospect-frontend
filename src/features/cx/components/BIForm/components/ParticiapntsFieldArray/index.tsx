import React, { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { IconButton } from 'components/ui';

import { useGetBIParticipantsQuery } from 'api/queries/bi-library';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { FormValues } from '../../form';
import * as S from '../units';

import { ParticipantFields } from './components';
import { IParticipantsFieldArray } from './types';

export const ParticiapntsFieldArray: FC<IParticipantsFieldArray> = ({ fullscreen = false }) => {
    const { data } = useGetBIParticipantsQuery();

    const { control, watch } = useFormContext<FormValues>();

    const {
        fields: participantFields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: 'participants',
    });

    const participants = watch('participants');

    const alreadySelectedParticiapnts =
        participants?.map((participant) => participant.participant) ?? [];

    const nextParticipant =
        (data ?? []).find((option) => !alreadySelectedParticiapnts.includes(option.id))?.id ?? 0;

    const handleAddClick = () => {
        append({ descr: '', participant: nextParticipant, value: '' }, { shouldFocus: false });
    };

    return (
        <div>
            <S.FlexContainer>
                <S.SubTitle id="participants">Участники взаимодействия</S.SubTitle>
                {data && participantFields.length < data.length && !fullscreen && (
                    <IconButton iconName={Icons.Add} size="large" onClick={handleAddClick} />
                )}
            </S.FlexContainer>
            {participantFields.map((field, index) => (
                <div key={field.id}>
                    <ParticipantFields
                        fullscreen={fullscreen}
                        options={data ?? []}
                        index={index}
                        fieldsLength={participantFields.length}
                        add={handleAddClick}
                        remove={remove}
                        alreadySelected={alreadySelectedParticiapnts}
                    />
                </div>
            ))}
        </div>
    );
};
