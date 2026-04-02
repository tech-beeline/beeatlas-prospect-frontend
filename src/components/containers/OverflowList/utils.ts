import {
    AVAILABLE_WIDTH_SAFETY_PX,
    ITEM_GAP_PX,
    OVERFLOW_LABEL_WIDTH_EXTRA_PX,
    OVERFLOW_LIST_MEASURE_ITEM_SELECTOR,
} from './const';

export function measureOverflowListItemWidths(
    measureRoot: HTMLElement | null,
    overflowLabelEl: HTMLElement | null,
    expectedItemCount: number,
    commaMeasureEl?: HTMLElement | null,
): { widths: number[]; overflowLabelWidth: number; commaWidth: number } | null {
    if (!measureRoot || !overflowLabelEl) {
        return null;
    }

    const chipNodes = measureRoot.querySelectorAll<HTMLElement>(
        OVERFLOW_LIST_MEASURE_ITEM_SELECTOR,
    );
    const widths = Array.from(chipNodes).map((node) =>
        Math.ceil(node.getBoundingClientRect().width),
    );
    const overflowLabelWidth =
        Math.ceil(overflowLabelEl.getBoundingClientRect().width) + OVERFLOW_LABEL_WIDTH_EXTRA_PX;

    const commaWidth =
        commaMeasureEl != null ? Math.ceil(commaMeasureEl.getBoundingClientRect().width) : 0;

    if (widths.length !== expectedItemCount || widths.some((w) => w < 1)) {
        return null;
    }

    return { widths, overflowLabelWidth, commaWidth };
}

export function computeVisibleItemCount(
    itemWidths: number[],
    maxWidth: number,
    overflowLabelWidth: number,
    gapPx: number = ITEM_GAP_PX,
    commaWidthPx = 0,
): number {
    const n = itemWidths.length;
    if (n === 0 || maxWidth <= 0) {
        return n;
    }

    let used = 0;
    let count = 0;

    for (let i = 0; i < n; i++) {
        const w = itemWidths[i];
        const hiddenAfter = n - i - 1;
        const needOverflowLabel = hiddenAfter > 0;
        const overflowReserve = needOverflowLabel ? gapPx + overflowLabelWidth : 0;
        const sepBefore = count > 0 ? commaWidthPx + gapPx : 0;
        const rowWidth = used + sepBefore + w + overflowReserve;

        if (rowWidth <= maxWidth) {
            used += sepBefore + w;
            count++;
        } else {
            break;
        }
    }

    return count;
}

export function readOverflowListContainerWidth(innerEl: HTMLElement | null): number {
    if (!innerEl) {
        return 0;
    }
    let tdContent = 0;
    const td = innerEl.closest('td');
    if (td) {
        const style = getComputedStyle(td);
        const pl = parseFloat(style.paddingLeft) || 0;
        const pr = parseFloat(style.paddingRight) || 0;
        const inner = Math.max(0, td.clientWidth - pl - pr);
        const fromRect = Math.max(0, Math.ceil(td.getBoundingClientRect().width) - pl - pr);
        tdContent = Math.max(inner, fromRect);
    }
    const innerW = innerEl.clientWidth;
    const w = Math.max(innerW, tdContent);

    return w > 0 ? w : Math.ceil(innerEl.getBoundingClientRect().width);
}

export function resolveOverflowListMaxWidth(container: HTMLElement | null): number | null {
    if (!container) {
        return null;
    }
    const maxW = Math.max(0, readOverflowListContainerWidth(container) - AVAILABLE_WIDTH_SAFETY_PX);
    return maxW > 0 ? maxW : null;
}
