import React, { FC, useEffect, useRef, useState } from 'react';

import * as T from './types';
import * as S from './units';

/* если children absolute то надо убрать absolute у children
и сделать обёртку с absolute в которую надо поместить Expand с children.
желательно чтоб у children не был задан margin */
export const Expand: FC<T.IExpand> = ({
    transition = 0.4,
    seconds = 5,
    isHeightCalc = true,
    ...props
}) => {
    const [height, setHeight] = useState(0);
    const [isHidden, setHidden] = useState(true);
    const childrenRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const closeTime = seconds && seconds * 1000;

        const hiddenTime = props.isOpen && setTimeout(() => setHidden(false), transition * 1000);

        const timeout =
            props.autoClose && setTimeout(() => !!props.setOpen && props.setOpen(false), closeTime);

        return () => {
            timeout && clearTimeout(timeout);
            setHidden(true);
            hiddenTime && clearTimeout(hiddenTime);
        };
    }, [props.isOpen]);

    useEffect(() => {
        setHeight(childrenRef.current?.clientHeight || 0);
    }, [childrenRef.current?.clientHeight]);

    const handleClick = () => {
        props.isClickable && !!props.setOpen && props.setOpen(false);
    };

    return (
        <S.ExpandWrapper
            isOpen={props.isOpen}
            isClickable={props.isClickable}
            onClick={handleClick}
            {...{ height, isHeightCalc, transition, isHidden }}
        >
            <S.ChildrenContainer ref={childrenRef} {...props}>
                {props.children}
            </S.ChildrenContainer>
        </S.ExpandWrapper>
    );
};
