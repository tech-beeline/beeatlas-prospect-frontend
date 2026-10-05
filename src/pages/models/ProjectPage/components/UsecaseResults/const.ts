import { projectUsecaseSourceToNameMap, projectUsecaseStatusToNameMap } from 'features/projects';

import { ProjectUsecaseSource, ProjectUsecaseStatus } from 'api/usecase';

export const ALL_FILTER_VALUE = 'all';

export const SOURCE_OPTIONS = [
    { id: ALL_FILTER_VALUE, value: 'Все' },
    {
        id: ProjectUsecaseSource.MANUAL_IMPORT,
        value: projectUsecaseSourceToNameMap[ProjectUsecaseSource.MANUAL_IMPORT],
    },
];

export const STATUS_OPTIONS = [
    { id: ALL_FILTER_VALUE, value: 'Все' },
    {
        id: ProjectUsecaseStatus.PUBLISHED,
        value: projectUsecaseStatusToNameMap[ProjectUsecaseStatus.PUBLISHED],
    },
];
