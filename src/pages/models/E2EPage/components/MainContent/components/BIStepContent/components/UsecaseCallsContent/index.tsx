import React, { FC, useEffect, useMemo, useState } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { Chip, Skeleton } from 'components/ui';

import {
    useGetProjectUsecaseOperationsTreeQuery,
    useGetUsecasesByBiStepCodeQuery,
} from 'api/queries/usecase';

import { CallDetails, UsecaseCallTreeItem } from './components';
import { IUsecaseCallsContent } from './types';
import * as S from './units';
import { buildUsecaseCallTree, findUsecaseCall, getUsecaseUrl } from './utils';

export const UsecaseCallsContent: FC<IUsecaseCallsContent> = ({ biStepCode }) => {
    const [selectedUsecaseId, setSelectedUsecaseId] = useState<number | null>(null);
    const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
    const { data: usecases = [], isLoading: isUsecasesLoading } =
        useGetUsecasesByBiStepCodeQuery(biStepCode);
    const selectedUsecase = usecases.find(({ id }) => id === selectedUsecaseId) ?? null;
    const { data: nodes, isLoading: isTreeLoading } = useGetProjectUsecaseOperationsTreeQuery(
        selectedUsecase?.projectId,
        selectedUsecase?.id,
    );
    const calls = useMemo(() => buildUsecaseCallTree(nodes ?? []), [nodes]);

    useEffect(() => {
        setSelectedUsecaseId(usecases[0]?.id ?? null);
    }, [usecases]);

    useEffect(() => {
        setSelectedCallId(null);
    }, [selectedUsecaseId]);

    if (isUsecasesLoading) {
        return <Skeleton radius={12} height={100} />;
    }

    if (usecases.length === 0) {
        return (
            <Text inactive variant="body3">
                Шаг BI не реализован ни в одном Use Case
            </Text>
        );
    }

    return (
        <S.Content>
            <Text inactive variant="overline">
                Реализация
            </Text>
            <S.ChipsContainer>
                {usecases.map((usecase) => (
                    <Chip
                        key={usecase.id}
                        label={usecase.name}
                        active={selectedUsecaseId === usecase.id}
                        onClick={() => setSelectedUsecaseId(usecase.id)}
                    />
                ))}
            </S.ChipsContainer>
            {selectedUsecase && (
                <S.UsecaseLink>
                    <Link title={selectedUsecase.name} url={getUsecaseUrl(selectedUsecase.id)} />
                </S.UsecaseLink>
            )}
            {isTreeLoading && <Skeleton radius={12} height={100} />}
            {nodes && calls.length === 0 && (
                <Text inactive variant="body3">
                    В Use Case нет вызовов
                </Text>
            )}
            {calls.length > 0 && (
                <S.Panels>
                    <S.TreePanel>
                        {calls.map((call) => (
                            <UsecaseCallTreeItem
                                key={call.id}
                                call={call}
                                level={0}
                                selectedId={selectedCallId}
                                onSelect={setSelectedCallId}
                            />
                        ))}
                    </S.TreePanel>
                    <CallDetails call={findUsecaseCall(calls, selectedCallId)} />
                </S.Panels>
            )}
        </S.Content>
    );
};
