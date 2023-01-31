import React, { FC, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';

import * as STYLE from 'pages/TechRadarPage/units';

import * as T from './types';
import * as S from './units';

export const Hint: FC<T.IHint> = ({ text }) => {
    const [isVisibleHint, setVisibleHint] = useState(false);

    const [content, setContent] = useState<HTMLDivElement | null>(null);
    const [target, setTarget] = useState<HTMLDivElement | null>(null);

    const onHintShow = () => {
        setVisibleHint(true);
    };

    const onHintHide = () => {
        setVisibleHint(false);
    };

    const popper = usePopper(target, content, {
        placement: 'right',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 10],
                },
            },
        ],
    });

    useEffect(() => {
        if (isVisibleHint) {
            popper.update && popper.update();
        }
    }, [isVisibleHint]);

    return (
        <S.HintWrapper onMouseEnter={onHintShow} onMouseLeave={onHintHide}>
            <S.InfoIcon
                style={popper.styles.reference}
                // @ts-ignore
                ref={setTarget}
                isvisiblehint={isVisibleHint ? 'true' : ''}
            />

            {/* popper библиотека для позиционирования хинта */}
            <S.TooltipContainerStyled
                style={popper.styles.popper}
                isVisibleHint={isVisibleHint}
                ref={setContent}
                onClick={(e: any) => e.stopPropagation()}
                {...popper.attributes.popper}
            >
                <STYLE.HintText>{text}</STYLE.HintText>
            </S.TooltipContainerStyled>
        </S.HintWrapper>
    );
};
