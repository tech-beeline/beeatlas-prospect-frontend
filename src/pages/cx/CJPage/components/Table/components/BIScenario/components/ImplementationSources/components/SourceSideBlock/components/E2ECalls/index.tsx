import React, { FC, useMemo } from 'react';
import { formatRootCalls } from 'features/e2e';

import { Text } from 'components/core';
import { Skeleton } from 'components/ui';

import { useGetSequenceCallsByIdQuery } from 'api/queries/staging-sequence';

import { CallCard } from '../CallCard';
import { ReadOnlyNote } from '../ReadOnlyNote';

import { IE2ECalls } from './types';
import * as S from './units';
import { getE2ECallFields, getE2EPageUrl } from './utils';

export const E2ECalls: FC<IE2ECalls> = ({ e2e, biStepCode }) => {
    const { data, isLoading, isError } = useGetSequenceCallsByIdQuery(e2e.code);

    const calls = useMemo(() => formatRootCalls(data), [data]);

    return (
        <S.CallsList>
            <ReadOnlyNote linkTitle="Открыть E2E" url={getE2EPageUrl(biStepCode, e2e.code)} />
            {isLoading && <Skeleton radius={12} height={100} />}
            {isError && (
                <Text variant="body3" inactive>
                    Не удалось загрузить вызовы E2E
                </Text>
            )}
            {data && calls.length === 0 && (
                <Text variant="body3" inactive>
                    В E2E нет вызовов
                </Text>
            )}
            {calls.map((call, index) => (
                <CallCard
                    key={call.id}
                    title={`Вызов ${index + 1}`}
                    fields={getE2ECallFields(call)}
                />
            ))}
        </S.CallsList>
    );
};
