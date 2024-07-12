import React from 'react';

import { Link } from 'components/other';

import { IBIData, IBILink } from 'api/bi/types';
import {
    formatCommunal,
    formatFeeling,
    formatParticipants,
    formatStatus,
    formatTarget,
} from 'pages/CJPage/utils/formatters';
import { formatNullableString } from 'utils/formatters';

import { RowIds } from './types';

export const COLORS = [
    'var(--color-accent-lemon-background)',
    'var(--color-status-success-background)',
    'var(--color-accent-teal-background)',
    'var(--color-accent-magenta-background)',
];

export interface RowData<T> {
    rowId: RowIds;
    label: string;

    formatData: (data: T) => JSX.Element | string;
    parseData: (bi: IBIData) => T;
}

export const rowsData: RowData<any>[] = [
    {
        rowId: RowIds.NAME,
        label: 'Наименование BI',
        formatData: formatNullableString,
        parseData: (bi: IBIData) => bi.name,
    },
    {
        rowId: RowIds.IDENTIFICATOR,
        label: 'Идентификатор BI',
        formatData: formatNullableString,
        parseData: (bi: IBIData) => bi.uniqueIdent,
    },
    {
        rowId: RowIds.DESCRIPTION,
        label: 'Описание',
        formatData: formatNullableString,
        parseData: (bi: IBIData) => bi.descr,
    },
    {
        rowId: RowIds.COMMUNAL,
        label: 'Коммунальный',
        formatData: formatCommunal,
        parseData: (bi: IBIData) => bi.communal,
    },
    {
        rowId: RowIds.TYPE,
        label: 'Характеристики',
        formatData: formatTarget,
        parseData: (bi: IBIData) => bi.target,
    },
    {
        rowId: RowIds.STATUS,
        label: 'Статус стадии ЖЦ',
        formatData: formatStatus,
        parseData: (bi: IBIData) => bi.status,
    },
    {
        rowId: RowIds.PARTICIPANTS,
        label: 'Участники взаимодействия',
        formatData: formatParticipants,
        parseData: (bi: IBIData) => bi.participants,
    },
    {
        rowId: RowIds.FEELING,
        label: 'Чувства и эмоции клиента',
        formatData: formatFeeling,
        parseData: (bi: IBIData) => bi.feelings.id,
    },
    {
        rowId: RowIds.CLIENT_SCENARIO,
        label: 'Клиентский сценарий',
        formatData: formatNullableString,
        parseData: (bi: IBIData) => bi.clientScenario,
    },
    {
        rowId: RowIds.FLOW_LINK,
        label: 'Ссылка на флоу',
        formatData: (flowLinks: IBILink[]) => (
            <>
                {flowLinks.map((flowLink, index) => (
                    <>
                        <Link url={flowLink.url} />
                        {index < flowLinks.length - 1 && ', '}
                    </>
                ))}
                {flowLinks.length === 0 && formatNullableString(null)}
            </>
        ),
        parseData: (bi: IBIData) => bi.flowLink,
    },
    {
        rowId: RowIds.UCS_REACTION,
        label: 'Описание реакции ЕКП',
        formatData: formatNullableString,
        parseData: (bi: IBIData) => bi.ucsReaction,
    },
    {
        rowId: RowIds.CHANNEL,
        label: 'Канал',
        formatData: (channels: { name: string }[]) =>
            formatNullableString(channels.map((channel) => channel.name).join(', ')),
        parseData: (bi: IBIData) => bi.channel,
    },
    {
        rowId: RowIds.DOCUMENT,
        label: 'Документация',
        formatData: (documents: IBILink[]) => (
            <>
                {documents.map((document, index) => (
                    <>
                        <Link url={document.url} />
                        {index < documents.length - 1 && ', '}
                    </>
                ))}
                {documents.length === 0 && formatNullableString(null)}
            </>
        ),
        parseData: (bi: IBIData) => bi.document,
    },
    {
        rowId: RowIds.MOCKUP,
        label: 'Макет',
        formatData: (mockups: IBILink[]) => (
            <>
                {mockups.map((mockup, index) => (
                    <>
                        <Link url={mockup.url} />
                        {index < mockups.length - 1 && ', '}
                    </>
                ))}
                {mockups.length === 0 && formatNullableString(null)}
            </>
        ),
        parseData: (bi: IBIData) => bi.mockupLink,
    },
];
