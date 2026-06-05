import React, { FC } from 'react';

import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import { Skeleton } from 'components/ui';

import { useGetCJsByTechCapabilityIdQuery } from 'api/queries/cj';
import * as R from 'router/const';

import { ICJList } from './types';
import * as S from './units';

export const CJList: FC<ICJList> = ({ tcId }) => {
    const { data, isLoading } = useGetCJsByTechCapabilityIdQuery(tcId);

    return (
        <>
            {data && data.length !== 0 && (
                <S.Container>
                    {data.map((cj) => (
                        <Link
                            key={cj.id}
                            title={cj.name}
                            url={`${R.CX_PATH}${R.CJ_PATH}${R.VIEW_PATH}?id=${cj.id}`}
                        />
                    ))}
                </S.Container>
            )}
            {data && data.length === 0 && (
                <S.NotFoundWrapper>
                    <S.NotFoundContainer>
                        <NotFoundBlock
                            smallImage
                            setMinSize={false}
                            imageVariant={ImageVariants.EMPTY_BOX}
                            title="CJ нет"
                            text="На данный момент для данной технической возможности не добавлена связь с CJ"
                        />
                    </S.NotFoundContainer>
                </S.NotFoundWrapper>
            )}
            {isLoading && <Skeleton radius={12} height={100} />}
        </>
    );
};
