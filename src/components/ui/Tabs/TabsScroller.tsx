import React, { Fragment, useEffect, useRef, useState } from 'react';

import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import type { TabsScrollerProps } from './types';
import * as S from './units';

export const TabsScroller = ({ className, children, onScroll }: TabsScrollerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const onScrollRef = useRef(onScroll);
    const lastScrollRef = useRef({ scrollLeft: -1, scrollTop: -1 });
    const [scrollEnabled, setScrolling] = useState(false);
    const [scrollLeftAllowed, allowLeftScrolling] = useState(false);
    const [scrollRightAllowed, allowRightScrolling] = useState(false);

    onScrollRef.current = onScroll;

    useEffect(() => {
        let rafId = 0;

        const notifyScroll = (scrollLeft: number, scrollTop: number) => {
            if (
                lastScrollRef.current.scrollLeft === scrollLeft &&
                lastScrollRef.current.scrollTop === scrollTop
            ) {
                return;
            }

            lastScrollRef.current = { scrollLeft, scrollTop };
            onScrollRef.current({ scrollLeft, scrollTop });
        };

        const updateScrollState = () => {
            const containerElement = containerRef.current;
            const contentElement = contentRef.current;

            if (!containerElement || !contentElement) {
                return;
            }

            const containerWidth = containerElement.getBoundingClientRect().width;
            const contentWidth = contentElement.scrollWidth;
            const needScroll = contentWidth > containerWidth;

            setScrolling((prev) => (prev === needScroll ? prev : needScroll));

            const contentScrollLeft = contentElement.scrollLeft;
            const scrollOnStart = contentScrollLeft === 0;
            const scrollOnEnd = Math.round(contentScrollLeft + containerWidth) >= contentWidth;
            const nextLeftAllowed = needScroll && !scrollOnStart;
            const nextRightAllowed = needScroll && !scrollOnEnd;

            allowLeftScrolling((prev) => (prev === nextLeftAllowed ? prev : nextLeftAllowed));
            allowRightScrolling((prev) => (prev === nextRightAllowed ? prev : nextRightAllowed));

            notifyScroll(contentElement.scrollLeft, contentElement.scrollTop);
        };

        const scheduleUpdate = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updateScrollState);
        };

        scheduleUpdate();

        window.addEventListener('resize', scheduleUpdate);

        const contentElement = contentRef.current;
        const containerElement = containerRef.current;

        contentElement?.addEventListener('scroll', scheduleUpdate);

        const resizeObserver =
            typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleUpdate) : undefined;

        if (containerElement) {
            resizeObserver?.observe(containerElement);
        }

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', scheduleUpdate);
            contentElement?.removeEventListener('scroll', scheduleUpdate);
            resizeObserver?.disconnect();
        };
    }, []);

    const scrollClassName = [
        'dsb_tabs-scroller__content',
        scrollEnabled && 'dsb_tabs-scroller__content--enable',
    ]
        .filter(Boolean)
        .join(' ');

    const onRightScrollClick = () => {
        const contentElement = contentRef.current;

        if (!contentElement) {
            return;
        }

        contentElement.scrollLeft = contentElement.scrollLeft + 100;

        onScrollRef.current({
            scrollLeft: contentElement.scrollLeft,
            scrollTop: contentElement.scrollTop,
        });
    };

    const onLeftScrollClick = () => {
        const contentElement = contentRef.current;

        if (!contentElement) {
            return;
        }

        contentElement.scrollLeft = contentElement.scrollLeft - 100;

        onScrollRef.current({
            scrollLeft: contentElement.scrollLeft,
            scrollTop: contentElement.scrollTop,
        });
    };

    const rootClassName = ['dsb_tabs-scroller', className].filter(Boolean).join(' ');

    return (
        <S.ScrollerRoot data-testid="TabsScroller" className={rootClassName} ref={containerRef}>
            <S.ScrollerContent className={scrollClassName} ref={contentRef}>
                {children}
            </S.ScrollerContent>
            {scrollEnabled && (
                <Fragment>
                    {scrollLeftAllowed && (
                        <IconButton
                            className="dsb_tabs-scroller__nav-button dsb_tabs-scroller__nav-button--left-arrow"
                            iconName={Icons.NavArrowLeft}
                            onClick={onLeftScrollClick}
                            size="large"
                        />
                    )}
                    {scrollRightAllowed && (
                        <IconButton
                            className="dsb_tabs-scroller__nav-button dsb_tabs-scroller__nav-button--right-arrow"
                            iconName={Icons.NavArrowRight}
                            onClick={onRightScrollClick}
                            size="large"
                        />
                    )}
                </Fragment>
            )}
        </S.ScrollerRoot>
    );
};
