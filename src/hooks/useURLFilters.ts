import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useDebounce } from 'hooks';

type Parser<T> = (value: string) => T;

type Config<T extends object> = {
    defaults: T;
    debounceKeys?: (keyof T)[];
    nonFilterKeys?: (keyof T)[];
    parsers?: {
        [K in keyof T]?: Parser<T[K]>;
    };
};

const isEqual = <T>(a: T, b: T): boolean => {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        return a.every((v, i) => Object.is(v, b[i]));
    }
    return Object.is(a, b);
};

const parseValue = <T extends object, K extends keyof T>(
    key: K,
    raw: string | null,
    defaults: T,
    parsers?: Config<T>['parsers'],
): T[K] => {
    if (raw === null) return defaults[key];
    const parser = parsers?.[key];
    if (parser) {
        return parser(raw);
    }
    return raw as unknown as T[K];
};

const serializeValue = (value: unknown): string | null => {
    if (value === undefined || value === null) return null;
    if (Array.isArray(value) && value.length === 0) return null;
    if (value === '') return null;
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    return String(value);
};

export const useURLFilters = <T extends object>({
    defaults,
    debounceKeys = [],
    parsers,
    nonFilterKeys = [],
}: Config<T>) => {
    const stableDefaults = useRef(defaults).current;
    const keys = useRef(Object.keys(stableDefaults) as (keyof T)[]).current;
    const [searchParams, setSearchParams] = useSearchParams();

    const [localState, setLocalState] = useState<T>(() => {
        const state: T = { ...stableDefaults };
        keys.forEach((key) => {
            const raw = searchParams.get(String(key));
            state[key] = parseValue(key, raw, stableDefaults, parsers);
        });
        return state;
    });

    const debouncedState = useDebounce(localState);

    useEffect(() => {
        const params = new URLSearchParams();

        keys.forEach((key) => {
            const value = debounceKeys.includes(key) ? debouncedState[key] : localState[key];
            const serialized = serializeValue(value);

            if (serialized !== null && !isEqual(value, stableDefaults[key])) {
                params.set(String(key), serialized);
            }
        });

        const current = searchParams.toString();
        const next = params.toString();

        if (current !== next) {
            setSearchParams(params, { replace: true });
        }
    }, [
        localState,
        debouncedState,
        debounceKeys,
        keys,
        setSearchParams,
        stableDefaults,
        searchParams,
    ]);

    const activeFiltersCount = keys
        .filter((key) => !nonFilterKeys.includes(key))
        .reduce((count, key) => {
            return !isEqual(localState[key], stableDefaults[key]) ? count + 1 : count;
        }, 0);

    const hasActiveFilters = activeFiltersCount > 0;

    const setFilters = (newValues: Partial<T>) => {
        setLocalState((prev) => ({ ...prev, ...newValues }));
    };

    const resetFilters = () => {
        setLocalState((prev) => {
            const next = { ...stableDefaults };
            nonFilterKeys.forEach((key) => {
                next[key] = prev[key];
            });
            return next;
        });
    };

    return {
        filters: localState,
        setFilters,
        resetFilters,
        hasActiveFilters,
        activeFiltersCount,
    };
};

export const createEnumParser = <E extends Record<string, string>>(
    enumObject: E,
    defaultValue?: E[keyof E],
) => {
    const values = Object.values(enumObject) as E[keyof E][];
    return (value: string): E[keyof E] => {
        if (values.includes(value as E[keyof E])) {
            return value as E[keyof E];
        }
        return defaultValue ?? values[0];
    };
};

export const createNumberOrEnumParser = <E extends Record<string, string>>(
    enumObject: E,
    defaultValue?: number | E[keyof E],
) => {
    const values = Object.values(enumObject) as E[keyof E][];
    return (value: string): number | E[keyof E] => {
        if (values.includes(value as E[keyof E])) {
            return value as E[keyof E];
        }
        const num = Number(value);
        if (!isNaN(num)) {
            return num;
        }
        return defaultValue ?? values[0];
    };
};

export const createNumberArrayParser =
    () =>
    (value: string): number[] =>
        value.split(',').filter(Boolean).map(Number);

export const createBooleanParser =
    () =>
    (value: string): boolean =>
        value === 'true';
