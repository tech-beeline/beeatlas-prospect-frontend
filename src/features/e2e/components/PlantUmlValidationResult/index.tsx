import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { FloatingNavigation } from 'components/interaction';
import {
    Badge,
    Banner,
    Chip,
    Icon,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { NoticeLevels } from 'api/staging-service/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IPlantUmlValidationResult } from './types';
import * as S from './units';

type ResultFilter = 'recognized' | 'unrecognized';

const kindNames: Record<string, string> = {
    system: 'Система',
    container: 'Контейнер',
    component: 'Компонент',
};

const noticeSemantics = {
    [NoticeLevels.INFO]: 'info',
    [NoticeLevels.WARNING]: 'warning',
    [NoticeLevels.ERROR]: 'danger',
} as const;

export const PlantUmlValidationResult: FC<IPlantUmlValidationResult> = ({ result }) => {
    const [participantFilter, setParticipantFilter] = useState<ResultFilter>('recognized');
    const [callFilter, setCallFilter] = useState<ResultFilter>('recognized');

    const participantsTotal =
        result.recognizedParticipants.length + result.unrecognizedParticipants.length;
    const callsTotal = result.recognizedCalls.length + result.unrecognizedCalls.length;
    const hasNotices = result.notices.length > 0;

    const bannerColor = !result.valid ? 'error' : hasNotices ? 'warning' : 'success';
    const bannerText = !result.valid
        ? 'PlantUML не прошёл валидацию'
        : hasNotices
        ? 'Есть замечания: часть участников или вызовов не распознана в ландшафте BeeAtlas. Версию всё равно можно сохранить'
        : 'PlantUML успешно прошёл проверку';

    return (
        <S.ScrollArea>
            <S.Layout>
                <S.Content id="participants">
                    <Banner
                        color={bannerColor}
                        iconName={result.valid ? Icons.InfoCircled : Icons.WarningCircled}
                        title={bannerText}
                    />

                    <S.Stats>
                        <S.StatCard>
                            <S.StatValue>
                                {result.recognizedParticipants.length} из {participantsTotal}
                            </S.StatValue>
                            <Text inactive variant="body2">
                                Распознанных участников
                            </Text>
                        </S.StatCard>
                        <S.StatCard>
                            <S.StatValue>
                                {result.recognizedCalls.length} из {callsTotal}
                            </S.StatValue>
                            <Text inactive variant="body2">
                                Распознанных вызовов
                            </Text>
                        </S.StatCard>
                    </S.Stats>

                    <S.ResultSection>
                        <Text variant="subtitle1">Участники</Text>
                        <S.Chips>
                            <Chip
                                active={participantFilter === 'recognized'}
                                label={`Распознано (${result.recognizedParticipants.length})`}
                                onClick={() => setParticipantFilter('recognized')}
                            />
                            <Chip
                                active={participantFilter === 'unrecognized'}
                                label={`Не распознано (${result.unrecognizedParticipants.length})`}
                                onClick={() => setParticipantFilter('unrecognized')}
                            />
                        </S.Chips>
                        <S.Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>Название элемента</TableHeaderData>
                                    <TableHeaderData>Тип элемента</TableHeaderData>
                                    <TableHeaderData>Строка</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(participantFilter === 'recognized'
                                    ? result.recognizedParticipants
                                    : result.unrecognizedParticipants
                                ).map((participant) => (
                                    <TableRow key={`${participant.alias}-${participant.line}`}>
                                        <TableData>
                                            <S.EntityName>
                                                <Icon
                                                    iconName={
                                                        participantFilter === 'recognized'
                                                            ? Icons.Check
                                                            : Icons.WarningCircled
                                                    }
                                                    size="small"
                                                    type={
                                                        participantFilter === 'recognized'
                                                            ? 'success'
                                                            : 'warning'
                                                    }
                                                />
                                                <span>
                                                    {participant.name ?? participant.alias}
                                                    {participant.name && (
                                                        <S.Alias>{participant.alias}</S.Alias>
                                                    )}
                                                </span>
                                            </S.EntityName>
                                        </TableData>
                                        <TableData>
                                            {participant.kind
                                                ? kindNames[participant.kind] ?? participant.kind
                                                : 'Не распознано'}
                                        </TableData>
                                        <TableData>{participant.line}</TableData>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </S.Table>
                    </S.ResultSection>

                    <S.ResultSection id="calls">
                        <Text variant="subtitle1">Вызовы</Text>
                        <S.Chips>
                            <Chip
                                active={callFilter === 'recognized'}
                                label={`Распознано (${result.recognizedCalls.length})`}
                                onClick={() => setCallFilter('recognized')}
                            />
                            <Chip
                                active={callFilter === 'unrecognized'}
                                label={`Не распознано (${result.unrecognizedCalls.length})`}
                                onClick={() => setCallFilter('unrecognized')}
                            />
                        </S.Chips>
                        <S.Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>Источник</TableHeaderData>
                                    <TableHeaderData>Назначение</TableHeaderData>
                                    <TableHeaderData>Вызов</TableHeaderData>
                                    <TableHeaderData>Строка</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {callFilter === 'recognized' &&
                                    result.recognizedCalls.map((call) => (
                                        <TableRow
                                            key={`${call.fromAlias}-${call.toAlias}-${call.line}`}
                                        >
                                            <TableData>{call.fromAlias}</TableData>
                                            <TableData>{call.toAlias}</TableData>
                                            <TableData>
                                                <S.CallValue>
                                                    <Badge type="secondary" semantic="info">
                                                        {call.httpMethod}
                                                    </Badge>
                                                    {call.path}
                                                </S.CallValue>
                                            </TableData>
                                            <TableData>{call.line}</TableData>
                                        </TableRow>
                                    ))}
                                {callFilter === 'unrecognized' &&
                                    result.unrecognizedCalls.map((call) => (
                                        <TableRow
                                            key={`${call.fromAlias}-${call.toAlias}-${call.line}`}
                                        >
                                            <TableData>{call.fromAlias}</TableData>
                                            <TableData>{call.toAlias}</TableData>
                                            <TableData>{call.label}</TableData>
                                            <TableData>{call.line}</TableData>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </S.Table>
                    </S.ResultSection>

                    {hasNotices && (
                        <S.ResultSection id="notices">
                            <Text variant="subtitle1">Замечания</Text>
                            <S.NoticeList>
                                {result.notices.map((notice, index) => (
                                    <S.NoticeItem
                                        key={`${notice.code}-${notice.lineFrom}-${index}`}
                                    >
                                        <Badge semantic={noticeSemantics[notice.level]}>
                                            {notice.level}
                                        </Badge>
                                        <S.NoticeText>
                                            {notice.message}
                                            <span>
                                                Строки {notice.lineFrom}–{notice.lineTo}
                                            </span>
                                        </S.NoticeText>
                                    </S.NoticeItem>
                                ))}
                            </S.NoticeList>
                        </S.ResultSection>
                    )}
                </S.Content>

                <S.Navigation>
                    <FloatingNavigation
                        items={[
                            { id: 'participants', label: 'Участники' },
                            { id: 'calls', label: 'Вызовы' },
                            ...(hasNotices ? [{ id: 'notices', label: 'Замечания' }] : []),
                        ]}
                    />
                </S.Navigation>
            </S.Layout>
        </S.ScrollArea>
    );
};
