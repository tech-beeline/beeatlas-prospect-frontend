import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { FormValues } from '../../form';
import * as S from '../units';

import { ParticipantFields } from './components';
import { OPTIONS } from './const';

export const ParticiapntsFieldArray = () => {
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
        OPTIONS.find((option) => !alreadySelectedParticiapnts.includes(option.id))?.id ?? 0;

    return (
        <div>
            <S.FlexContainer>
                <S.SubTitle id="participants">Участники взаимодействия</S.SubTitle>
                {participantFields.length < 3 && (
                    <IconButton
                        iconName={Icons.Add}
                        size="large"
                        onClick={() =>
                            append({ descr: '', participant: nextParticipant, value: '' })
                        }
                    />
                )}
            </S.FlexContainer>
            {participantFields.map((field, index) => (
                <div key={field.id}>
                    <ParticipantFields
                        index={index}
                        fieldsLength={participantFields.length}
                        remove={remove}
                        alreadySelected={alreadySelectedParticiapnts}
                    />
                </div>
            ))}
        </div>
    );
};
