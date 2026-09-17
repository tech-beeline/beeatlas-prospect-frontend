import React, { FC, useEffect, useState } from 'react';
import { formatCallsTreeData } from 'features/e2e';

import { Text } from 'components/core';
import { Chip, Skeleton } from 'components/ui';

import { useGetSequenceCallsByIdQuery } from 'api/queries/staging-sequence';

import { CallTreeItem } from './components';
import { ICallsContent } from './types';
import * as S from './units';

export const CallsContent: FC<ICallsContent> = ({ e2eCodes }) => {
    const [selectedCode, setSelectedCode] = useState<null | string>(null);

    useEffect(() => {
        setSelectedCode(e2eCodes[0]);
    }, [e2eCodes]);

    const { data, isLoading } = useGetSequenceCallsByIdQuery(selectedCode);

    const callsTree = formatCallsTreeData(data);

    return (
        <>
            {e2eCodes.length > 1 && (
                <S.ChipsContainer>
                    {e2eCodes.map((code) => (
                        <Chip
                            key={code}
                            label={code}
                            active={selectedCode === code}
                            onClick={() => setSelectedCode(code)}
                        />
                    ))}
                </S.ChipsContainer>
            )}
            <Text variant="subtitle3">
                Последовательность вызовов {data?.e2e.source ? `(${data.e2e.source})` : ''}
            </Text>
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
