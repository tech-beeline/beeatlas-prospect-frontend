import React, { FC, useState } from 'react';

import { IconBadge, Text } from 'components/core';
import { FloatingNavigation } from 'components/interaction';
import {
    Banner,
    Chip,
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
                                    <TableHeaderData alignRight>Строка</TableHeaderData>
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
                                                <IconBadge
                                                    icon={
                                                        participantFilter === 'recognized'
                                                            ? Icons.Check
                                                            : Icons.WarningCircled
                                                    }
                                                    semantic={
                                                        participantFilter === 'recognized'
                                                            ? 'success'
                                                            : 'warning'
                                                    }
                                                />
                                                <div>
                                                    <Text variant="body3">
                                                        {participant.name ?? participant.alias}
                                                    </Text>
                                                    {participant.alias && (
                                                        <Text inactive variant="caption">
                                                            {participant.alias}
                                                        </Text>
                                                    )}
                                                </div>
                                            </S.EntityName>
                                        </TableData>
                                        <TableData>
                                            {participant.kind
                                                ? kindNames[participant.kind] ?? participant.kind
                                                : 'Не распознано'}
                                        </TableData>
                                        <TableData alignRight>{participant.line}</TableData>
                                    </TableRow>
                                ))}
                                {participantFilter === 'recognized' &&
                                    result.recognizedParticipants.length === 0 && (
                                        <TableRow>
                                            <S.TableDataFullWidth colSpan={3}>
                                                <S.NoDataContainer>
                                                    <Text variant="subtitle2">Нет элементов</Text>
                                                </S.NoDataContainer>
                                            </S.TableDataFullWidth>
                                        </TableRow>
                                    )}
                                {participantFilter === 'unrecognized' &&
                                    result.unrecognizedParticipants.length === 0 && (
                                        <TableRow>
                                            <S.TableDataFullWidth colSpan={3}>
                                                <S.NoDataContainer>
                                                    <Text variant="subtitle2">Нет элементов</Text>
                                                </S.NoDataContainer>
                                            </S.TableDataFullWidth>
                                        </TableRow>
                                    )}
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
                                    <TableHeaderData alignRight>Строка</TableHeaderData>
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
                                                    {`${call.httpMethod} ${call.path}`}
                                                </S.CallValue>
                                            </TableData>
                                            <TableData alignRight>{call.line}</TableData>
                                        </TableRow>
                                    ))}
                                {callFilter === 'recognized' &&
                                    result.recognizedCalls.length === 0 && (
                                        <TableRow>
                                            <S.TableDataFullWidth colSpan={4}>
                                                <S.NoDataContainer>
                                                    <Text variant="subtitle2">Нет элементов</Text>
                                                </S.NoDataContainer>
                                            </S.TableDataFullWidth>
                                        </TableRow>
                                    )}
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
                                {callFilter === 'unrecognized' &&
                                    result.unrecognizedCalls.length === 0 && (
                                        <TableRow>
                                            <S.TableDataFullWidth colSpan={4}>
                                                <S.NoDataContainer>
                                                    <Text variant="subtitle2">Нет элементов</Text>
                                                </S.NoDataContainer>
                                            </S.TableDataFullWidth>
                                        </TableRow>
                                    )}
                            </TableBody>
                        </S.Table>
                    </S.ResultSection>

                    <S.ResultSection id="notices">
                        <Text variant="subtitle1">Замечания</Text>
                        <S.Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>Контекст</TableHeaderData>
                                    <TableHeaderData alignRight>Строки</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {result.notices.map((notice, i) => (
                                    <TableRow key={`${notice.code}-${notice.lineFrom}-${i}`}>
                                        <TableData>
                                            <S.NoticeItem>
                                                <IconBadge
                                                    icon={Icons.InfoCircled}
                                                    semantic={
                                                        noticeSemantics[notice.level] ?? 'neutral'
                                                    }
                                                />
                                                <div>{notice.message}</div>
                                            </S.NoticeItem>
                                        </TableData>
                                        <TableData alignRight>
                                            {notice.lineFrom} - {notice.lineTo}
                                        </TableData>
                                    </TableRow>
                                ))}
                                {result.notices.length === 0 && (
                                    <TableRow>
                                        <S.TableDataFullWidth colSpan={2}>
                                            <S.NoDataContainer>
                                                <Text variant="subtitle2">Нет элементов</Text>
                                            </S.NoDataContainer>
                                        </S.TableDataFullWidth>
                                    </TableRow>
                                )}
                            </TableBody>
                        </S.Table>
                    </S.ResultSection>
                </S.Content>

                <S.Navigation>
                    <FloatingNavigation
                        items={[
                            { id: 'participants', label: 'Участники' },
                            { id: 'calls', label: 'Вызовы' },
                            { id: 'notices', label: 'Замечания' },
                        ]}
                    />
                </S.Navigation>
            </S.Layout>
        </S.ScrollArea>
    );
};
