import React, { FC, useMemo } from 'react';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Skeleton } from 'components/ui';

import { useGetSequenceCallsByIdQuery } from 'api/queries/staging-sequence';
import { formatNullableString } from 'utils/formatters';

import { CallsWorkspace } from '../CallsWorkspace';
import { ImplementationChips } from '../ImplementationChips';

import { ICallsContent } from './types';
import * as S from './units';
import { buildE2ECalls } from './utils';

export const CallsContent: FC<ICallsContent> = ({ e2eCodes, selectedId, onSelect }) => {
    const selectedCode =
        selectedId && e2eCodes.includes(selectedId) ? selectedId : e2eCodes[0] ?? null;
    const { data, isLoading } = useGetSequenceCallsByIdQuery(selectedCode);
    const calls = useMemo(() => buildE2ECalls(data), [data]);
    const implementations = useMemo(
        () => e2eCodes.map((code) => ({ id: code, label: code })),
        [e2eCodes],
    );

    if (e2eCodes.length === 0) {
        return (
            <NotFoundBlock
                imageVariant={ImageVariants.EMPTY_BOX}
                title="Нет E2E-сценариев"
                text="Шаг BI не реализован ни в одном E2E-сценарии"
            />
        );
    }

    return (
        <S.Content>
            <ImplementationChips
                implementations={implementations}
                selectedId={selectedCode}
                onSelect={onSelect}
            />
            {data && (
                <S.Source>
                    <S.SourceItem>
                        <Text inactive variant="body2">
                            Источник:
                        </Text>
                        <Text variant="body2">{formatNullableString(data.e2e.name)}</Text>
                    </S.SourceItem>
                    <S.SourceItem>
                        <Text inactive variant="body2">
                            Загрузка:
                        </Text>
                        <Text variant="body2">{formatNullableString(data.e2e.source)}</Text>
                    </S.SourceItem>
                </S.Source>
            )}
            {isLoading && <Skeleton radius={12} height={100} />}
            {data && calls.length === 0 && (
                <Text inactive variant="body2">
                    Нет данных
                </Text>
            )}
            {calls.length > 0 && <CallsWorkspace calls={calls} />}
        </S.Content>
    );
};
