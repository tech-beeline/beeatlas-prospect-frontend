import React, { FC } from 'react';
import { Skeleton } from '@beeline/lk-ui';

import { IResultCard } from './types';
import * as S from './units';

// http://ms-seaapp001/?guid=XXXXXXX

export const ResultCard: FC<IResultCard> = (props) => {
    const NewlineText = ({ str }: any) => {
        return str
            .split('\\r\\n' || '\\n' || '\\r' || '\n')
            .map((st: any, index: number) => <p key={index}>{st}</p>);
    };

    return (
        <S.Wrapper>
            {props.data ? (
                <>
                    <a
                        href={`https://ms-seaapp001.bee.vimpelcom.ru/?guid=${props.data.guid}`}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <S.Title>{props.data.name}</S.Title>
                    </a>

                    <S.Text>
                        <NewlineText str={props.data.descr} />
                        {/* {props.data.descr} */}
                    </S.Text>

                    <S.TitleSecond>Домен</S.TitleSecond>
                    <a
                        href={`https://ms-seaapp001.bee.vimpelcom.ru/?guid=${props.data.domainRef.guid}`}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <S.DomenText>{props.data.domainRef.name}</S.DomenText>
                    </a>

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
