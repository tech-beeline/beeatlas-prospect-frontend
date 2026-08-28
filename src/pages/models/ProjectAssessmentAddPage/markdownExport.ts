import { IStructureRequirement, StructureRequirementType } from 'api/projects';

import { IAssessmentTechnicalCapability } from './types';

const escapeTableCell = (value: string | number | undefined) =>
    String(value ?? '—')
        .replace(/\\/g, '\\\\')
        .replace(/\|/g, '\\|')
        .replace(/\r?\n/g, '<br>');

const buildTable = (headers: string[], rows: (string | number | undefined)[][]) =>
    [
        `| ${headers.map(escapeTableCell).join(' | ')} |`,
        `| ${headers.map(() => '---').join(' | ')} |`,
        ...rows.map((row) => `| ${row.map(escapeTableCell).join(' | ')} |`),
    ].join('\n');

const requirementSection = (
    title: string,
    requirements: IStructureRequirement[],
    type: StructureRequirementType,
) => {
    const items = requirements.filter((requirement) => requirement.type === type);

    if (type === StructureRequirementType.OQ) {
        return [
            `## ${title}`,
            buildTable(
                ['Код', 'Вопрос'],
                items.map((requirement) => [requirement.id, requirement.title]),
            ),
        ].join('\n\n');
    }

    return [
        `## ${title}`,
        buildTable(
            ['Код', 'Название', 'Описание'],
            items.map((requirement) => [
                requirement.id,
                requirement.title,
                requirement.description,
            ]),
        ),
    ].join('\n\n');
};

export const buildRequirementsMarkdown = (requirements: IStructureRequirement[]) =>
    [
        '# Требования проекта',
        requirementSection('Функциональные требования', requirements, StructureRequirementType.FR),
        requirementSection(
            'Нефункциональные требования',
            requirements,
            StructureRequirementType.NFR,
        ),
        requirementSection('Вопросы для уточнения', requirements, StructureRequirementType.OQ),
    ].join('\n\n');

const decisionLabels: Record<IAssessmentTechnicalCapability['decision'], string> = {
    pending: 'Не обработана',
    reused: 'Переиспользование',
    new: 'Новая',
    excluded: 'Исключена',
};

const getSelectedCapabilities = (candidate: IAssessmentTechnicalCapability) =>
    candidate.selectedCapabilities?.length
        ? candidate.selectedCapabilities
        : candidate.selectedCapability
        ? [candidate.selectedCapability]
        : [];

const formatSelectedCapability = (
    capability: NonNullable<IAssessmentTechnicalCapability['selectedCapability']>,
) => {
    const system = capability.system
        ? `${capability.system.code} — ${capability.system.name}`
        : capability.systems.join(', ');
    const parentBc = capability.parentBc
        ? `${capability.parentBc.code} — ${capability.parentBc.name}`
        : '';

    return [
        `${capability.code} — ${capability.name}`,
        system ? `Система: ${system}` : '',
        parentBc ? `BC: ${parentBc}` : '',
    ]
        .filter(Boolean)
        .join('<br>');
};

export const buildTechnicalCapabilitiesMarkdown = (candidates: IAssessmentTechnicalCapability[]) =>
    [
        '# Кандидаты Technical Capability',
        buildTable(
            ['Кандидат TC', 'Описание', 'Решение', 'Сопоставленная TC'],
            candidates.map((candidate) => [
                candidate.name,
                candidate.description,
                decisionLabels[candidate.decision],
                getSelectedCapabilities(candidate).map(formatSelectedCapability).join('<br>'),
            ]),
        ),
    ].join('\n\n');

export const downloadMarkdown = (content: string, fileName: string) => {
    const file = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
};
