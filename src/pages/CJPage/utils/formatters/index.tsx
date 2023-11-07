import React from 'react';
import { Label } from '@beeline/design-system-react';

import { FeelingTypes, IconFeeling } from 'components/other';

import { Enter, Participant } from 'pages/CJPage/mocks';
import { formatNullableString } from 'utils/formatters';

import {
    channelIdToNameMap,
    enterIdToNameMap,
    exitIdToNameMap,
    participantIdToNameMap,
    stageIdToNameMap,
} from './const';
import * as S from './units';

export const formatLinkFromString = (str: string | undefined | null) =>
    str && Boolean(str) ? (
        <S.Link target="_blank" rel="noreferrer" href={str}>
            Ссылка
        </S.Link>
    ) : (
        '—'
    );

export const formatType = (type: number) => (
    <Label title={type === 0 ? 'Целевой' : 'Фактический'} type={type === 0 ? 'magenta' : 'teal'} />
);

export const formatCommunal = (communal: boolean) =>
    communal ? <Label title="Коммунальный" type="magenta" /> : formatNullableString(null);

export const getStatus = (statusId: number) => stageIdToNameMap[String(statusId)];

export const getParticipant = (participantId: number) =>
    participantIdToNameMap[String(participantId)];

export const getEnter = (enterId: number) => enterIdToNameMap[String(enterId)];

export const getExit = (exitId: number) => exitIdToNameMap[String(exitId)];

export const getChannel = (channelId: number) => channelIdToNameMap[String(channelId)];

export const getFeelingType = (feelingId: number) => Object.values(FeelingTypes)[feelingId];

export const formatStatus = (statusId: number) => (
    <Label title={getStatus(statusId)} type="success" variant="contained" />
);

export const formatFeeling = (feeling: number) => (
    <S.FlexContainer>
        <IconFeeling type={getFeelingType(feeling)} />
    </S.FlexContainer>
);

export const formatParticipants = (participants: Participant[]) =>
    participants.length > 0 ? (
        <ul>
            {participants?.map((participant, i) => (
                <li key={i}>
                    <div>Участник: {getParticipant(participant.participant)}</div>
                    <div>Описание: {participant.descr}</div>
                    <div>Ценностный результат: {participant.value}</div>
                </li>
            ))}
        </ul>
    ) : (
        formatNullableString(null)
    );

export const formatEnters = (enters: Enter[]) =>
    enters.length > 0 ? (
        <ul>
            {enters?.map((enter, i) => (
                <li key={i}>
                    <div>Вход: {getEnter(enter.enter)}</div>
                    <div>Выход: {getExit(enter.exit)}</div>
                </li>
            ))}
        </ul>
    ) : (
        formatNullableString(null)
    );
