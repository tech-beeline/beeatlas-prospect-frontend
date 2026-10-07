import React, { FC, useEffect, useMemo, useState } from 'react';

import { Text } from 'components/core';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import { Skeleton } from 'components/ui';

import {
    useGetProjectUsecaseOperationsTreeQuery,
    useGetProjectUsecaseQuery,
    useGetUsecasesByBiStepCodeQuery,
} from 'api/queries/usecase';

import { CallsWorkspace } from '../CallsWorkspace';
import { ImplementationChips } from '../ImplementationChips';

import { IUsecaseCallsContent } from './types';
import * as S from './units';
import { buildUsecaseCalls, formatUsecaseDate, getUsecaseUrl } from './utils';

export const UsecaseCallsContent: FC<IUsecaseCallsContent> = ({ biStepCode }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { data: usecases = [], isLoading: isUsecasesLoading } =
        useGetUsecasesByBiStepCodeQuery(biStepCode);
    const selected = usecases.find(({ id }) => String(id) === selectedId) ?? null;
    const { data: details } = useGetProjectUsecaseQuery(selected?.id);
    const { data: nodes, isLoading: isTreeLoading } = useGetProjectUsecaseOperationsTreeQuery(
        selected?.projectId,
        selected?.id,
    );
    const calls = useMemo(() => buildUsecaseCalls(nodes ?? []), [nodes]);
    const implementations = useMemo(
        () => usecases.map(({ id, code }) => ({ id: String(id), label: code })),
        [usecases],
    );

    useEffect(() => {
        setSelectedId(usecases[0] ? String(usecases[0].id) : null);
    }, [usecases]);

    if (isUsecasesLoading) {
        return <Skeleton radius={12} height={100} />;
    }

    if (usecases.length === 0) {
        return (
            <NotFoundBlock
                imageVariant={ImageVariants.EMPTY_BOX}
                title="Нет Use Case"
                text="Шаг BI не реализован ни в одном Use Case"
            />
        );
    }

    return (
        <S.Content>
            <ImplementationChips
                implementations={implementations}
                selectedId={selectedId}
                onSelect={setSelectedId}
            />
            {selected && (
                <S.Source>
                    <Link title={selected.name} url={getUsecaseUrl(selected.id)} />
                    {details && (
                        <Text inactive variant="body3">
                            Дата: {formatUsecaseDate(details)}
                        </Text>
                    )}
                </S.Source>
            )}
            {isTreeLoading && <Skeleton radius={12} height={100} />}
            {nodes && calls.length === 0 && (
                <Text inactive variant="body3">
                    В Use Case нет вызовов
                </Text>
            )}
            {calls.length > 0 && <CallsWorkspace calls={calls} />}
        </S.Content>
    );
};
