import React from 'react';
import { CommunalLabel, StatusLabel, TargetLabel } from 'features/cx';

import { FeelingTypes, IconFeeling } from 'components/other';

import { IParticipant, IStatus } from 'api/bi/types';
import { formatNullableString } from 'utils/formatters';

import * as S from './units';

export const formatLinkFromString = (str: string | undefined | null, linkName = 'Ссылка') =>
    str && Boolean(str) ? (
        <S.Link target="_blank" rel="noreferrer" href={str}>
            {linkName}
        </S.Link>
    ) : (
        '—'
    );

export const formatCommunal = (communal: boolean) =>
    communal ? <CommunalLabel /> : formatNullableString(null);

export const formatTarget = (target: boolean) => <TargetLabel target={target} />;

export const formatStatus = (status: IStatus) => <StatusLabel status={status} />;

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
