import React, { FC } from 'react';
import { Skeleton } from '@beeline/lk-ui';

import { IResultCard } from './types';
import * as S from './units';

export const ResultCard: FC<IResultCard> = (props) => {
    return (
        <S.Wrapper>
            {props.data ? (
                <>
                    <S.Title>{props.data.name}</S.Title>

                    <S.Text>{props.data.descr}</S.Text>

                    <S.TitleSecond>Домен</S.TitleSecond>
                    <S.DomenText>{props.data.domainRef.name}</S.DomenText>

                    <S.FlexBlock>
                        <div>
                            <S.TitleSecond>Владелец</S.TitleSecond>
                            <S.Text>{props.data.author}</S.Text>
                        </div>

                        <div>
                            <S.TitleSecond>Дата последнего изменения</S.TitleSecond>
                            <S.Text>{props.data.lastModified}</S.Text>
                        </div>
                    </S.FlexBlock>
                </>
            ) : (
                <>
                    <Skeleton height={16} width={290} margin={{ bottom: 16 }} />
                    <Skeleton height={37} width={663} margin={{ bottom: 16 }} />

                    <Skeleton height={16} width={290} margin={{ bottom: 16 }} />
                    <Skeleton height={37} width={663} margin={{ bottom: 16 }} />

                    <S.FlexBlock>
                        <div>
                            <Skeleton height={16} width={290} margin={{ bottom: 16 }} />
                            <Skeleton height={37} width={323} />
                        </div>

                        <div>
                            <Skeleton height={16} width={290} margin={{ bottom: 16 }} />
                            <Skeleton height={37} width={323} />
                        </div>
                    </S.FlexBlock>
                </>
            )}
        </S.Wrapper>
    );
};
