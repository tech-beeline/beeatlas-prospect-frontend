import type { RatingItemType } from './types';

export const createItemIndices = (minIndex: number, maxIndex: number): number[] =>
    Array.from({ length: maxIndex - minIndex + 1 }, (_, index) => minIndex + index);

export const isStarItem = (item: RatingItemType): item is 'star' => item === 'star';

export const isNumberItem = (item: RatingItemType): item is 'number' => item === 'number';

export const isStarSelected = (
    index: number,
    value: number | undefined,
    hoverIndex: number | null,
): boolean => (hoverIndex ?? value ?? 0) >= index;
