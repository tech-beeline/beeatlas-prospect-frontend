import { StagingURLFilters } from './types';

export const defaultFilters: StagingURLFilters = {
    search: '',
    status: null,
    type: null,
    source: null,
    dateRange: [],
    page: 1,
    pageSize: 10,
    depth: '10',
};

export const pageSizes = [10, 25, 50, 100];
