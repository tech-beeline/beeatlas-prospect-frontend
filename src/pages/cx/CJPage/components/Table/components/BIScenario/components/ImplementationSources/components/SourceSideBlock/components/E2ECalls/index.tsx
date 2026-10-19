import React, { FC, useMemo } from 'react';
import { formatRootCalls } from 'features/e2e';

import { Text } from 'components/core';
import { Skeleton } from 'components/ui';

import { useGetSequenceCallsByIdQuery } from 'api/queries/staging-sequence';

import { E2ECall } from '../E2ECall';
import { ReadOnlyNote } from '../ReadOnlyNote';

import { IE2ECalls } from './types';
import * as S from './units';
import { getE2EPageUrl } from './utils';

export const E2ECalls: FC<IE2ECalls> = ({ e2e, biStepCode }) => {
    const { data, isLoading, isError } = useGetSequenceCallsByIdQuery(e2e.code);

    const calls = useMemo(() => formatRootCalls(data), [data]);

    return (
        <S.Container>
            <ReadOnlyNote
                linkTitle={e2e.name || e2e.code}
                url={getE2EPageUrl(biStepCode, e2e.code)}
            />
            <Text variant="subtitle2">Вызовы</Text>
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
            {calls.length > 0 && (
                <S.CallsList>
                    {calls.map((call, index) => (
                        <E2ECall key={call.id} call={call} index={index} />
                    ))}
                </S.CallsList>
            )}
        </S.Container>
    );
};
