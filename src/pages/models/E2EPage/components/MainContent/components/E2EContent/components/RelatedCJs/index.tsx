import React, { FC } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { Skeleton } from 'components/ui';

import { useGetStagingSequenceBiStepByCodeQuery } from 'api/queries/staging-sequence';
import * as R from 'router/const';

import { IRelatedCJs } from './types';
import * as S from './units';

export const RelatedCJs: FC<IRelatedCJs> = ({ biStepCode }) => {
    const { data, isLoading } = useGetStagingSequenceBiStepByCodeQuery(biStepCode);

    return (
        <S.Container>
            {isLoading && <Skeleton radius={12} height={100} />}
            {data &&
                data.cj.map((cj) => (
                    <S.LinkContainer key={cj.id}>
                        <Link
                            title={cj.name}
                            url={`${R.CX_PATH}${R.CJ_PATH}${R.VIEW_PATH}?id=${cj.id}`}
                        />
                        <Text variant="body3" inactive>
                            {cj.uid}
                        </Text>
                    </S.LinkContainer>
                ))}
            {(!biStepCode || (data && data.cj.length === 0)) && (
                <Text inactive variant="body3">
                    Нет связанных CJ
                </Text>
            )}
        </S.Container>
    );
};
