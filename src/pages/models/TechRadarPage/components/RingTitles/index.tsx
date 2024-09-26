import React, { FC } from 'react';

import * as T from './types';
import * as S from './units';

export const RingTitles: FC<T.IRingTitles> = (props) => {
    return (
        <>
            {!!props.type ? (
                <S.RingTitle
                    top={0}
                    left={50}
                    type={props.type}
                    onClick={() => props.handleRing(props.type!)}
                >
                    {props.type}
                </S.RingTitle>
            ) : (
                typeof props.leftTitlesPosition === 'number' &&
                !!props.topTitlesPosition && (
                    <>
                        <S.RingTitle
                            top={props.topTitlesPosition.hold}
                            left={props.leftTitlesPosition}
                            type="hold"
                            onClick={() => props.handleRing('hold')}
                        >
                            hold
                        </S.RingTitle>

                        <S.RingTitle
                            top={props.topTitlesPosition.assess}
                            left={props.leftTitlesPosition}
                            type="assess"
                            onClick={() => props.handleRing('assess')}
                        >
                            assess
                        </S.RingTitle>

                        <S.RingTitle
                            top={props.topTitlesPosition.trial}
                            left={props.leftTitlesPosition}
                            type="trial"
                            onClick={() => props.handleRing('trial')}
                        >
                            trial
                        </S.RingTitle>

                        <S.RingTitle
                            top={props.topTitlesPosition.adopt}
                            left={props.leftTitlesPosition}
                            type="adopt"
                            onClick={() => props.handleRing('adopt')}
                        >
                            adopt
                        </S.RingTitle>
                    </>
                )
            )}
        </>
    );
};
