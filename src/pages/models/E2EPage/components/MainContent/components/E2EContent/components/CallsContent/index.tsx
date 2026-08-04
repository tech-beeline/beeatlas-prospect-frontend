import React, { FC } from 'react';

import { Text } from 'components/core';
import { Skeleton } from 'components/ui';

import { CallTreeItem } from './components';
import { ICallsContent } from './types';
import * as S from './units';
import { formatCallsTreeData } from './utils';

export const CallsContent: FC<ICallsContent> = ({ data, isLoading }) => {
    const callsTree = formatCallsTreeData(data);

    return (
        <>
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
