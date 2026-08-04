import React, { FC } from 'react';

import { Text } from 'components/core';
import { Skeleton } from 'components/ui';

import { useGetSequenceCallsByIdQuery } from 'api/queries/staging-sequence';

import { CallTreeItem } from './components';
import { ICallsContent } from './types';
import * as S from './units';
import { formatCallsTreeData } from './utils';

export const CallsContent: FC<ICallsContent> = ({ code }) => {
    const { data, isLoading } = useGetSequenceCallsByIdQuery(code);
    const callsTree = formatCallsTreeData(data);

    return (
        <>
            <Text variant="subtitle3">Последовательность вызовов</Text>
            {isLoading && <Skeleton radius={12} height={100} />}
            {data && data.operationsRelations.length === 0 && (
                <Text inactive variant="body3">
                    Нет данных
                </Text>
            )}
            {data && (
                <S.CallsContainer>
                    {callsTree.map((item) => (
                        <CallTreeItem key={item.id} item={item} level={0} />
                    ))}
                </S.CallsContainer>
            )}
        </>
    );
};
