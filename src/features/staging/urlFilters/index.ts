import { useSearchParams } from 'react-router-dom';

import { defaultFilters } from './const';
import { StagingFilterScope, StagingURLFilters } from './types';
import { buildStagingUrl, readFilters, writeFilters } from './utils';

export const useStagingURLFilters = (scope: StagingFilterScope) => {
    const [params, setParams] = useSearchParams();
    const filters = readFilters(params, scope);
    const setFilters = (values: Partial<StagingURLFilters>) => {
        setParams(
            writeFilters(params, scope, {
                ...readFilters(params, scope),
                page: 1,
                ...values,
            }),
            { replace: true },
        );
    };
    const resetFilters = () => setFilters({ ...defaultFilters, pageSize: filters.pageSize });
    return { filters, setFilters, resetFilters };
};

export const useStagingUrl = () => {
    const [params] = useSearchParams();
    return (pathname: string, scopes: StagingFilterScope[], identifiers?: Record<string, string>) =>
        buildStagingUrl(pathname, params, scopes, identifiers);
};
