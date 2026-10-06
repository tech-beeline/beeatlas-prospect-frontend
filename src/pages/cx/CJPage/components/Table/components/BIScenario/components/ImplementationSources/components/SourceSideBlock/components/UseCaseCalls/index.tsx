import React, { FC } from 'react';

import { Text } from 'components/core';
import { Skeleton } from 'components/ui';

import { useGetProjectUsecaseRootOperationsQuery } from 'api/queries/usecase';

import { CallCard } from '../CallCard';
import { ReadOnlyNote } from '../ReadOnlyNote';

import { IUseCaseCalls } from './types';
import * as S from './units';
import { getUseCaseCallFields, getUseCasePageUrl } from './utils';

export const UseCaseCalls: FC<IUseCaseCalls> = ({ useCase }) => {
    const { data: operations, isLoading, isError } = useGetProjectUsecaseRootOperationsQuery(
        useCase.projectId,
        useCase.id,
    );

    return (
        <S.CallsList>
            {isLoading && <Skeleton radius={12} height={100} />}
            {isError && (
                <Text variant="body3" inactive>
                    Не удалось загрузить вызовы Use Case
                </Text>
            )}
            {operations && operations.length === 0 && (
                <Text variant="body3" inactive>
                    В Use Case нет вызовов
                </Text>
            )}
            {operations?.map((operation, index) => (
                <CallCard
                    key={operation.id}
                    title={`Вызов ${index + 1}`}
                    fields={getUseCaseCallFields(operation)}
                />
            ))}
            <ReadOnlyNote linkTitle="Открыть Use Case" url={getUseCasePageUrl(useCase.id)} />
        </S.CallsList>
    );
};
