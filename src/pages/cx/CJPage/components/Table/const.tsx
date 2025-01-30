import React from 'react';

import { Link } from 'components/other';

import { IBIData, IBILink } from 'api/bi/types';
import { formatCommunal, formatStatus, formatTarget } from 'pages/cx/CJPage/utils/formatters';
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
        rowId: RowIds.CLIENT_SCENARIO,
        label: 'Сценарий',
        formatData: formatNullableString,
        parseData: (bi: IBIData) => bi.clientScenario,
    },
    {
        rowId: RowIds.CHANNEL,
        label: 'Каналы',
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
        rowId: RowIds.METRICS,
        label: 'Метрики',
        formatData: formatNullableString,
        parseData: (bi: IBIData) => bi.metrics,
    },
];
