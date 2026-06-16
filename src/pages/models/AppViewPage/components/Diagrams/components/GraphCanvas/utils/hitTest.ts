export type RectLike = {
    x: number;
    y: number;
    width: number;
    height: number;
};

/**
 * Hit-test for rectangle-like items. Iterates from the end so last items win
 * (useful when items are painted in array order).
 */
export function hitTestRectLast<T extends RectLike>(
    items: readonly T[],
    x: number,
    y: number,
): T | null {
    for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i]!;
        if (x < it.x || x > it.x + it.width || y < it.y || y > it.y + it.height) continue;
        return it;
    }
    return null;
}
