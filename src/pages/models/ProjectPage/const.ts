import { IProjectAgent } from 'api/projects/types';

export enum ProjectTab {
    DATA = 'DATA',
    AGENTS = 'AGENTS',
}

export enum ProjectDataView {
    BUSINESS = 'BUSINESS',
    ASSESSMENT = 'ASSESSMENT',
    USECASE = 'USECASE',
}

export const PROJECT_AGENTS: IProjectAgent[] = [
    {
        id: 1,
        name: 'Оценка',
        description:
            'Оценка объема изменений в приложениях и процессах ландшафта, автоматизированная по бизнес требованиям',
        type: 'internal',
    },
];
