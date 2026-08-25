import { PipelineStatuses } from 'api/staging-service/types';

export interface IChildPipelineFilterValues {
    status: PipelineStatuses | null;
    type: null;
    source: null;
    search: string;
}
