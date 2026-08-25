import { PipelineStatuses } from 'api/staging-service/types';

export interface IStagingFilterValues {
    dateRange: string[];
    status: PipelineStatuses | null;
    type: string | null;
    source: string | null;
    search: string;
}
