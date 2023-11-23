import React from 'react';

import { IBIData, IBILink } from 'api/bi/types';
import {
    formatCommunal,
    formatFeeling,
    formatLinkFromString,
    formatParticipants,
    formatStatus,
    formatType,
} from 'pages/CJPage/utils/formatters';
import { formatNullableString } from 'utils/formatters';

export const COLORS = [
    'var(--color-accent-lemon-background)',
    'var(--color-status-success-background)',
    'var(--color-accent-magenta-background)',
    'var(--color-accent-teal-background)',
];

export interface RowData<T> {
    rowId: string;
    label: string;

    formatData: (data: T) => JSX.Element | string;
    parseData: (bi: IBIData) => T;
}

export const rowsData: RowData<any>[] = [
    {
        rowId: 'name',
        label: 'Наименование BI',
        formatData: formatNullableString,
        parseData: (bi: IBIData) => bi.name,
    },
    {
        rowId: 'identificator',
        label: 'Идентификатор BI',
        formatData: formatNullableString,
        parseData: (bi: IBIData) => bi.uniqueIdent,
    },
    {
        rowId: 'descr',
        label: 'Описание',
        formatData: formatNullableString,
        parseData: (bi: IBIData) => bi.descr,
    },
    {
        rowId: 'communal',
        label: 'Коммунальный',
        formatData: formatCommunal,
        parseData: (bi: IBIData) => bi.communal,
    },
    {
        rowId: 'type',
        label: 'Характеристики',
        formatData: formatType,
        parseData: (bi: IBIData) => bi.type,
    },
    {
        rowId: 'status',
        label: 'Статус стадии ЖЦ',
        formatData: formatStatus,
        parseData: (bi: IBIData) => bi.statusId,
    },
    {
        rowId: 'participants',
        label: 'Участники взаимодействия',
        formatData: formatParticipants,
        parseData: (bi: IBIData) => bi.participants,
    },
    {
        rowId: 'feeling',
        label: 'Чувства и эмоции клиента',
        formatData: formatFeeling,
        parseData: (bi: IBIData) => bi.feelings,
    },
    {
        rowId: 'clientScenario',
        label: 'Клиентский сценарий',
        formatData: formatNullableString,
        parseData: (bi: IBIData) => bi.clientScenario,
    },
    {
        rowId: 'flowLink',
        label: 'Ссылка на флоу',
        formatData: (documents: IBILink[]) => (
            <>
                {documents.map((document, index) => (
                    <>
                        {formatLinkFromString(document.url)}
                        {index < documents.length - 1 && ', '}
                    </>
                ))}
            </>
        ),
        parseData: (bi: IBIData) => bi.document,
    },
    {
        rowId: 'ucsReaction',
        label: 'Описание реакции ЕКП',
        formatData: formatNullableString,
        parseData: (bi: IBIData) => bi.ucsReaction,
    },
    {
        rowId: 'channel',
        label: 'Канал',
        formatData: (channels: { name: string }[]) =>
            formatNullableString(channels.map((channel) => channel.name).join(', ')),
        parseData: (bi: IBIData) => bi.channel,
    },
    {
        rowId: 'document',
        label: 'Документация',
        formatData: (documents: IBILink[]) => (
            <>
                {documents.map((document, index) => (
                    <>
                        {formatLinkFromString(document.url)}
                        {index < documents.length - 1 && ', '}
                    </>
                ))}
            </>
        ),
        parseData: (bi: IBIData) => bi.document,
    },
    {
        rowId: 'mockup',
        label: 'Макет',
        formatData: (mockups: IBILink[]) => (
            <>
                {mockups.map((mockup, index) => (
                    <>
                        {formatLinkFromString(mockup.url)}
                        {index < mockups.length - 1 && ', '}
                    </>
                ))}
            </>
        ),
        parseData: (bi: IBIData) => bi.mockupLink,
    },
];
