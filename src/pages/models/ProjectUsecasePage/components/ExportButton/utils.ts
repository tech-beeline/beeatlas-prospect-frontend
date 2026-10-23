import dayjs from 'dayjs';
import { getProjectUsecaseLatestDate } from 'features/projects';

import { formatDateToUTC } from 'utils/formatters';

import { OPERATION_STATUS_DATA, PARTICIPANT_STATUS_DATA } from '../../const';
import { renderApplication } from '../../utils';

import { ExportButtonProps } from './types';

const markdownCell = (value: string | number | null | undefined) =>
    String(value ?? '—')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\\/g, '&#92;')
        .replace(/\|/g, '&#124;')
        .replace(/([`*_\[\]])/g, '\\$1')
        .replace(/\r\n|[\r\n]/g, '<br>');

const markdownTable = (headers: string[], rows: (string | number | null | undefined)[][]) =>
    [headers, headers.map(() => '---'), ...rows]
        .map((row) => `| ${row.map(markdownCell).join(' | ')} |`)
        .join('\n');

export const exportMarkdown = ({ usecase, data, relations }: ExportButtonProps) => {
    const sections = [
        `# ${markdownCell(usecase.name)}`,
        `Код: ${markdownCell(usecase.code)}`,
        `Проект: ${markdownCell(usecase.projectName)}`,
        `Дата изменения: ${dayjs(formatDateToUTC(getProjectUsecaseLatestDate(usecase)))
            .local()
            .format('DD.MM.YYYY, HH:mm')}`,
    ];
    if (usecase.description) sections.push(`Описание: ${markdownCell(usecase.description)}`);
    if (relations) {
        sections.push(
            '## Связи',
            markdownTable(
                ['Тип', 'Название', 'Код'],
                [
                    ...relations.cj.map((cj) => ['CJ', cj.name, cj.uid]),
                    ['Шаг E2E-сценария', relations.biStep.name, relations.biStep.uid],
                ],
            ),
        );
    }
    sections.push(
        '## Сценарий',
        markdownTable(
            [
                'Шаг',
                'Вызывающий',
                'Вызываемый',
                'Действие',
                'Вызов',
                'TC',
                'Dynamics C4',
                'Статус вызова',
            ],
            (data?.operations ?? []).map((operation) => [
                operation.order,
                renderApplication(operation.caller),
                renderApplication(operation.callee),
                operation.action,
                operation.call,
                [operation.techCapability?.name, operation.techCapability?.code]
                    .filter(Boolean)
                    .join(' — ') || null,
                null,
                OPERATION_STATUS_DATA[operation.status].label,
            ]),
        ),
        '## Список приложений',
        markdownTable(
            ['Мнемоника', 'Название', 'Статус'],
            (data?.participants ?? []).map((participant) => [
                participant.mnemonic,
                participant.name,
                PARTICIPANT_STATUS_DATA[participant.status].label,
            ]),
        ),
    );
    return `${sections.join('\n\n')}\n`;
};
