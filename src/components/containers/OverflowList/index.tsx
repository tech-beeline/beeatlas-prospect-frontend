import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import { TooltipContainer } from 'components/interaction';

import { ITEM_GAP_PX } from './const';
import { IOverflowListItem, IOverflowListProps } from './types';
import * as S from './units';
import {
    computeVisibleItemCount,
    measureOverflowListItemWidths,
    resolveOverflowListMaxWidth,
} from './utils';

export const OverflowList = <T extends IOverflowListItem>({
    items,
    renderItem,
    commaSeparated = false,
    renderOverflowPopover,
}: IOverflowListProps<T>) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const overflowMeasureRef = useRef<HTMLSpanElement>(null);
    const commaMeasureRef = useRef<HTMLSpanElement>(null);

    const overflowTooltipId = `overflow-list-${useId().replace(/:/g, '')}`;
    const [isOverflowTooltipOpen, setIsOverflowTooltipOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(items.length);

    const recompute = useCallback(() => {
        if (!items.length) {
            setVisibleCount(0);
            return;
        }

        const maxW = resolveOverflowListMaxWidth(containerRef.current);
        if (maxW == null) {
            setVisibleCount(items.length);
            return;
        }

        const measured = measureOverflowListItemWidths(
            measureRef.current,
            overflowMeasureRef.current,
            items.length,
            commaSeparated ? commaMeasureRef.current : null,
        );
        if (measured == null) {
            setVisibleCount(items.length);
            return;
        }

        const count = computeVisibleItemCount(
            measured.widths,
            maxW,
            measured.overflowLabelWidth,
            ITEM_GAP_PX,
            commaSeparated ? measured.commaWidth : 0,
        );

        setVisibleCount(count);
    }, [items, commaSeparated]);

    useLayoutEffect(() => {
        const rafId = requestAnimationFrame(recompute);

        const container = containerRef.current;
        const td = container?.closest('td');

        if (typeof ResizeObserver === 'undefined' || (!container && !td)) {
            return () => cancelAnimationFrame(rafId);
        }

        const ro = new ResizeObserver(() => {
            recompute();
        });

        if (container) ro.observe(container);
        if (td) ro.observe(td);

        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
        };
    }, [recompute]);

    const hiddenCount = items.length - visibleCount;
    const showOverflowLabel = hiddenCount > 0;
    const hiddenItems = items.slice(visibleCount);

    useEffect(() => {
        if (!showOverflowLabel) {
            setIsOverflowTooltipOpen(false);
        }
    }, [showOverflowLabel]);

    useEffect(() => {
        if (!isOverflowTooltipOpen || !renderOverflowPopover) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const { target } = event;
            if (!(target instanceof Node)) {
                return;
            }
            if (containerRef.current?.contains(target)) {
                return;
            }
            setIsOverflowTooltipOpen(false);
        };

        document.addEventListener('pointerdown', handlePointerDown, true);
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown, true);
        };
    }, [isOverflowTooltipOpen, renderOverflowPopover]);

    const renderOverflowLabel = (count: number, hidden: T[]) => {
        const label = `+${count}`;
        if (renderOverflowPopover) {
            return (
                <>
                    <S.OverflowTriggerButton
                        type="button"
                        data-tooltip-id={overflowTooltipId}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOverflowTooltipOpen((prev) => !prev);
                        }}
                    >
                        {label}
                    </S.OverflowTriggerButton>
                    <TooltipContainer
                        largePadding
                        infoWidth
                        overflowY
                        hidePaddingRight
                        displayFlex
                        id={overflowTooltipId}
                        place="bottom"
                        noArrow
                        offset={8}
                        events={[]}
                        isOpen={isOverflowTooltipOpen}
                        setIsOpen={setIsOverflowTooltipOpen}
                        afterHide={() => setIsOverflowTooltipOpen(false)}
                    >
                        {renderOverflowPopover(hidden)}
                    </TooltipContainer>
                </>
            );
        }
        return <>{label}</>;
    };

    return (
        <S.Root ref={containerRef}>
            <S.OffscreenMeasure ref={measureRef} aria-hidden>
                {items.map((item) => (
                    <S.MeasureItemWrap key={item.id} data-overflow-list-item>
                        {renderItem(item)}
                    </S.MeasureItemWrap>
                ))}
                {commaSeparated && <S.Comma ref={commaMeasureRef}>, </S.Comma>}
                <S.MeasureOverflowWrap ref={overflowMeasureRef}>
                    <S.OverflowLabel>+{items.length}</S.OverflowLabel>
                </S.MeasureOverflowWrap>
            </S.OffscreenMeasure>
            <S.VisibleRow>
                {visibleCount === 0 && items.length > 0 ? (
                    items.length === 1 ? (
                        renderItem(items[0])
                    ) : (
                        renderOverflowLabel(items.length, items)
                    )
                ) : (
                    <>
                        {items.slice(0, visibleCount).map((item, index) =>
                            commaSeparated ? (
                                <S.ItemGroup key={item.id}>
                                    {renderItem(item)}
                                    {index < visibleCount - 1 && <S.Comma>, </S.Comma>}
                                </S.ItemGroup>
                            ) : (
                                <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
                            ),
                        )}
                        {showOverflowLabel && renderOverflowLabel(hiddenCount, hiddenItems)}
                    </>
                )}
            </S.VisibleRow>
        </S.Root>
    );
};
