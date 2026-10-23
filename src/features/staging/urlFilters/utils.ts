import dayjs from 'dayjs';

import { PipelineStatuses } from 'api/staging-service/types';

import { defaultFilters, pageSizes } from './const';
import { StagingFilterScope, StagingURLFilters } from './types';

export const readFilters = (
    params: URLSearchParams,
    scope: StagingFilterScope,
): StagingURLFilters => {
    const get = (key: keyof StagingURLFilters) => params.get(`${scope}.${key}`);
    const status = get('status');
    const page = Number(get('page') ?? 1);
    const pageSize = Number(get('pageSize') ?? 10);
    const dates = get('dateRange')?.split(',') ?? [];
    const dateRange =
        dates.length <= 2 &&
        dates.every(
            (date) => /^\d{4}-\d{2}-\d{2}$/.test(date) && dayjs(date).format('YYYY-MM-DD') === date,
        ) &&
        (dates.length < 2 || dates[0] <= dates[1])
            ? dates
            : [];

    return {
        search: get('search') ?? '',
        status: Object.values(PipelineStatuses).find((value) => value === status) ?? null,
        type: get('type'),
        source: get('source'),
        dateRange,
        page: Number.isSafeInteger(page) && page > 0 ? page : 1,
        pageSize: pageSizes.includes(pageSize) ? pageSize : 10,
        depth: pageSizes.some((value) => String(value) === get('depth'))
            ? String(get('depth'))
            : '10',
    };
};

export const writeFilters = (
    params: URLSearchParams,
    scope: StagingFilterScope,
    filters: StagingURLFilters,
) => {
    const next = new URLSearchParams(params);
    (Object.keys(defaultFilters) as (keyof StagingURLFilters)[]).forEach((key) => {
        const value =
            key === 'dateRange'
                ? filters.dateRange
                      .filter((date) => dayjs(date).isValid())
                      .map((date) => dayjs(date).format('YYYY-MM-DD'))
                      .join(',')
                : String(filters[key] ?? '');
        const name = `${scope}.${key}`;
        if (!value || value === String(defaultFilters[key] ?? '')) {
            next.delete(name);
        } else {
            next.set(name, value);
        }
    });
    return next;
};

export const buildStagingUrl = (
    pathname: string,
    current: URLSearchParams,
    scopes: StagingFilterScope[],
    identifiers: Record<string, string> = {},
) => {
    const params = new URLSearchParams();
    current.forEach((value, key) => {
        if (scopes.some((scope) => key.startsWith(`${scope}.`))) params.set(key, value);
    });
    Object.entries(identifiers).forEach(([key, value]) => params.set(key, value));
    const search = params.toString();
    return search ? `${pathname}?${search}` : pathname;
};
