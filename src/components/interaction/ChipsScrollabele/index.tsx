import React, { FC, useLayoutEffect, useRef, useState } from 'react';

import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { CHIPS_SCROLL_STEP } from './const';
import { IChipsScrollabeleProps } from './types';
import * as S from './units';

export const ChipsScrollabele: FC<IChipsScrollabeleProps> = ({ children }) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [overflowing, setOverflowing] = useState(false);

    useLayoutEffect(() => {
        const row = rowRef.current;
        const content = contentRef.current;
        if (!row || !content) return;

        const updateOverflow = () => setOverflowing(content.scrollWidth > row.clientWidth);
        updateOverflow();
        const observer = new ResizeObserver(updateOverflow);
        observer.observe(row);
        observer.observe(content);
        return () => observer.disconnect();
    }, [children]);

    const scroll = (direction: number) =>
        viewportRef.current?.scrollBy({
            left: direction * CHIPS_SCROLL_STEP,
            behavior: 'smooth',
        });

    return (
        <S.Row ref={rowRef}>
            {overflowing && (
                <IconButton
                    size="medium"
                    iconName={Icons.NavArrowLeft}
                    aria-label="Прокрутить влево"
                    onClick={() => scroll(-1)}
                />
            )}
            <S.Viewport ref={viewportRef}>
                <S.Content ref={contentRef}>{children}</S.Content>
            </S.Viewport>
            {overflowing && (
                <IconButton
                    size="medium"
                    iconName={Icons.NavArrowRight}
                    aria-label="Прокрутить вправо"
                    onClick={() => scroll(1)}
                />
            )}
        </S.Row>
    );
};
