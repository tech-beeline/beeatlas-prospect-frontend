import type { BadgeSemantic } from 'components/ui';

import { ArtifactStatuses, NoticeLevels, PipelineStatuses } from 'api/staging-service/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

export const initialStagingFilterValues = {
    dateRange: [],
    status: null,
    type: null,
    source: null,
    search: '',
};

export const pipelineStatusToNameMap: Record<PipelineStatuses, string> = {
    [PipelineStatuses.PENDING]: 'Ожидание',
    [PipelineStatuses.LOADING]: 'Загрузка',
    [PipelineStatuses.VALIDATING]: 'Валидация',
    [PipelineStatuses.TRANSFORMING]: 'Трансформация',
    [PipelineStatuses.SAVING]: 'Сохранение',
    [PipelineStatuses.PUBLISHING]: 'Публикация',
    [PipelineStatuses.COMPLETED]: 'Завершён',
    [PipelineStatuses.FAILED]: 'Ошибка',
};

export const pipelineStatusToSemanticMap: Record<PipelineStatuses, BadgeSemantic> = {
    [PipelineStatuses.PENDING]: 'neutral',
    [PipelineStatuses.LOADING]: 'info',
    [PipelineStatuses.VALIDATING]: 'info',
    [PipelineStatuses.TRANSFORMING]: 'info',
    [PipelineStatuses.SAVING]: 'info',
    [PipelineStatuses.PUBLISHING]: 'info',
    [PipelineStatuses.COMPLETED]: 'success',
    [PipelineStatuses.FAILED]: 'danger',
};

export const pipelineStatusToIconMap: Record<PipelineStatuses, Icons> = {
    [PipelineStatuses.PENDING]: Icons.Clock,
    [PipelineStatuses.LOADING]: Icons.RefreshDouble,
    [PipelineStatuses.VALIDATING]: Icons.RefreshDouble,
    [PipelineStatuses.TRANSFORMING]: Icons.RefreshDouble,
    [PipelineStatuses.SAVING]: Icons.RefreshDouble,
    [PipelineStatuses.PUBLISHING]: Icons.RefreshDouble,
    [PipelineStatuses.COMPLETED]: Icons.Check,
    [PipelineStatuses.FAILED]: Icons.WarningCircled,
};

export enum PipelineStepStatus {
    COMPLETED = 'COMPLETED',
    ERROR = 'ERROR',
    IN_PROGRESS = 'IN_PROGRESS',
    SKIPPED = 'SKIPPED',
}

export interface IPipelineChronologyStep {
    id: string;
    name: string;
    subtitle: string;
    status: PipelineStepStatus;
    durationMs: number;
}

export const pipelineStepStatusToSemanticMap: Record<PipelineStepStatus, BadgeSemantic> = {
    [PipelineStepStatus.COMPLETED]: 'success',
    [PipelineStepStatus.ERROR]: 'danger',
    [PipelineStepStatus.IN_PROGRESS]: 'info',
    [PipelineStepStatus.SKIPPED]: 'neutral',
};

export const pipelineStepStatusToIconMap: Record<PipelineStepStatus, Icons> = {
    [PipelineStepStatus.COMPLETED]: Icons.Check,
    [PipelineStepStatus.ERROR]: Icons.WarningCircled,
    [PipelineStepStatus.IN_PROGRESS]: Icons.RefreshDouble,
    [PipelineStepStatus.SKIPPED]: Icons.Remove,
};

export const pipelineStepStatusToNameMap: Record<PipelineStepStatus, string> = {
    [PipelineStepStatus.COMPLETED]: 'Завершён',
    [PipelineStepStatus.ERROR]: 'Ошибка',
    [PipelineStepStatus.IN_PROGRESS]: 'В процессе',
    [PipelineStepStatus.SKIPPED]: 'Пропущен',
};

export interface IPipelineStageDetail {
    id: string;
    name: string;
    module: string;
    status: PipelineStepStatus;
    errorMessage: string | null;
    durationMs: number;
    input: Record<string, unknown> | null;
    output: Record<string, unknown> | null;
}

export const initialChildPipelineFilterValues = {
    status: null,
    type: null,
    source: null,
    search: '',
};

export const pipelineStatusOptions = Object.values(PipelineStatuses).map((status) => ({
    id: status,
    value: pipelineStatusToNameMap[status],
}));

export const artifactStatusToNameMap: Record<ArtifactStatuses, string> = {
    [ArtifactStatuses.ACTIVE]: 'Активен',
    [ArtifactStatuses.INACTIVE]: 'Неактивен',
    [ArtifactStatuses.DELETED]: 'Удален',
};

export const artifactStatusToSemanticMap: Record<ArtifactStatuses, BadgeSemantic> = {
    [ArtifactStatuses.ACTIVE]: 'success',
    [ArtifactStatuses.INACTIVE]: 'neutral',
    [ArtifactStatuses.DELETED]: 'danger',
};

export const artifactStatusToIconMap: Record<ArtifactStatuses, Icons> = {
    [ArtifactStatuses.ACTIVE]: Icons.Check,
    [ArtifactStatuses.INACTIVE]: Icons.InfoCircled,
    [ArtifactStatuses.DELETED]: Icons.WarningCircled,
};

export const noticeLevelToNameMap: Record<NoticeLevels, string> = {
    [NoticeLevels.INFO]: 'Инфо',
    [NoticeLevels.ERROR]: 'Ошибка',
    [NoticeLevels.WARNING]: 'Предупреждение',
};

export const noticeLevelToSemanticMap: Record<NoticeLevels, BadgeSemantic> = {
    [NoticeLevels.INFO]: 'info',
    [NoticeLevels.ERROR]: 'danger',
    [NoticeLevels.WARNING]: 'warning',
};
