import React from 'react';
import { StatusBadge, TargetBadge } from 'features/cx';

import { FeelingTypes, IconFeeling } from 'components/other';

import { IParticipant, IStatus, IStepsScenarion } from 'api/bi/types';
import { formatNullableString } from 'utils/formatters';

import { BIScenario } from '../../components/Table/components';

import * as S from './units';

export const formatTarget = (target: boolean) => <TargetBadge target={target} />;

export const formatStatus = (status: IStatus) => <StatusBadge status={status} />;

export const formatScenario = (biSteps: IStepsScenarion[] = []) => {
    return (
        <>
            {biSteps.length === 0 ? (
                <></>
            ) : (
                <S.ScenariosWrapper>
                    {biSteps.map((step, index) => (
                        <BIScenario
                            key={step.id ?? index}
                            biSteps={step}
                            last={index === biSteps.length - 1}
                        />
                    ))}
                </S.ScenariosWrapper>
            )}
        </>
    );
};
export const getFeelingType = (feelingId: number) => Object.values(FeelingTypes)[feelingId];

export const formatFeeling = (feeling: number) => (
    <S.FlexContainer>
        <IconFeeling type={getFeelingType(feeling)} />
    </S.FlexContainer>
);

export const formatParticipants = (participants: IParticipant[]) =>
    participants.length > 0 ? (
        <ul>
            {participants?.map((participant, i) => (
                <li key={i}>
                    <div>Участник: {participant.participant.name}</div>
                    <div>Описание: {participant.descr}</div>
                    <div>Ценностный результат: {participant.value}</div>
                </li>
            ))}
        </ul>
    ) : (
        formatNullableString(null)
    );

export const downloadBpmnFile = (filename: string, bpmnXml: string) => {
    const element = document.createElement('a');
    element.setAttribute(
        'href',
        'data:application/xml;charset=utf-8,' + encodeURIComponent(bpmnXml),
    );
    element.setAttribute('download', filename.endsWith('.bpmn') ? filename : filename + '.bpmn');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};
