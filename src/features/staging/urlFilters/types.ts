import { PipelineStatuses } from 'api/staging-service/types';

export type StagingFilterScope = 'runs' | 'children' | 'entities' | 'artifact' | 'annotations';

export interface StagingURLFilters {
    search: string;
    status: PipelineStatuses | null;
    type: string | null;
    source: string | null;
    dateRange: string[];
    page: number;
    pageSize: number;
    depth: string;
}
