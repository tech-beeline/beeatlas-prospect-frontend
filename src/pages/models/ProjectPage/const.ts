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
    {
        id: 2,
        name: 'Use Case',
        description:
            'Разбирает диаграмму PlantUML на шаги сценария, определяет системы-участники и сопоставляет вызовы с интерфейсами ландшафта, оставляя архитектору решения только по нераспознанным частям',
        type: 'internal',
    },
];
