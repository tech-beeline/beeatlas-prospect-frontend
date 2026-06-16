import React from 'react';

import * as S from './units';
import { useOverflowCountPadding, useOverflowText } from './useOverflowText';
import { createHiddenValueNodes } from './utils';

export const OverflowCount = ({
    inputRef,
    values,
    hiddenRef,
    countRef,
    className,
}: {
    inputRef: React.RefObject<HTMLInputElement | null>;
    values: unknown[];
    hiddenRef: React.RefObject<HTMLParagraphElement | null>;
    countRef: React.RefObject<HTMLParagraphElement | null>;
    className?: string;
}) => {
    useOverflowCountPadding({ inputRef, hiddenRef, countRef, values });

    const hiddenChildren = createHiddenValueNodes(values);

    return (
        <>
            <S.HiddenOverflowText
                className={['dsb__overflow__hidden', 'dsb__overflow__text', className]
                    .filter(Boolean)
                    .join(' ')}
                ref={hiddenRef as React.Ref<HTMLParagraphElement>}
            >
                {hiddenChildren.map((text, index) => (
                    <span key={`${index}-${text}`}>{text}</span>
                ))}
            </S.HiddenOverflowText>
            <canvas className="dsb__overflow__hidden" aria-hidden="true" />
        </>
    );
};

export const OverflowCounter = ({
    count,
    className,
    countRef,
}: {
    count: number;
    className: string;
    countRef: React.RefObject<HTMLParagraphElement | null>;
}) => (
    <S.OverflowCounter ref={countRef as React.Ref<HTMLParagraphElement>} className={className}>
        (+{count})
    </S.OverflowCounter>
);

export const useSelectOverflowCounter = ({
    inputRef,
    values,
    isShowCountOfValues,
}: {
    inputRef: React.RefObject<HTMLInputElement | null>;
    values: unknown[];
    isShowCountOfValues?: boolean;
}) => {
    const hiddenRef = React.useRef<HTMLParagraphElement>(null);
    const countRef = React.useRef<HTMLParagraphElement>(null);
    const { count, className } = useOverflowText({
        hiddenRef,
        inputRef,
        values: isShowCountOfValues ? values : [],
    });

    return {
        hiddenRef,
        countRef,
        count,
        className,
        counter:
            count > 0 ? (
                <OverflowCounter count={count} className={className} countRef={countRef} />
            ) : null,
    };
};
