import { IStagingSequenceCallsData } from 'api/staging-sequence/types';

export const getUnmatchedMethods = (data: IStagingSequenceCallsData | undefined): string[] =>
    Array.from(
        new Set(
            (data?.discoveredOperations ?? [])
                .filter(({ operation }) => !operation)
                .map(({ type, name }) => [type, name].filter(Boolean).join(' ')),
        ),
    );
