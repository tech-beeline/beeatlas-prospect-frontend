import React, { FC } from 'react';

import { Text } from 'components/core';
import { Skeleton } from 'components/ui';

import { useGetProjectUsecaseOperationsTreeQuery } from 'api/queries/usecase';

import { CallCard } from '../CallCard';
import { ReadOnlyNote } from '../ReadOnlyNote';

import { IUseCaseCalls } from './types';
import * as S from './units';
import { getUseCaseCallFields, getUseCasePageUrl } from './utils';

export const UseCaseCalls: FC<IUseCaseCalls> = ({ useCase }) => {
    const {
        data: operations,
        isLoading,
        isError,
    } = useGetProjectUsecaseOperationsTreeQuery(useCase.projectId, useCase.id);

    return (
        <S.Container>
            <ReadOnlyNote
                linkTitle={useCase.name || useCase.code}
                url={getUseCasePageUrl(useCase.id)}
            />
            <Text variant="subtitle2">Вызовы</Text>
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
            {Boolean(operations?.length) && (
                <S.CallsList>
                    {operations?.map((operation, index) => (
                        <CallCard
                            key={`${operation.discoveredOperationId}-${index}`}
                            title={
                                operation.discoveredOperation.description ||
                                operation.discoveredOperation.operation?.techCapability?.name ||
                                operation.discoveredOperation.name ||
                                `Вызов ${index + 1}`
                            }
                            fields={getUseCaseCallFields(operation)}
                        />
                    ))}
                </S.CallsList>
            )}
        </S.Container>
    );
};
