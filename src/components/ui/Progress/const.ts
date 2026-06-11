import type { ProgressSize } from './types';

export const SIZE_DICTIONARY: Record<'standart' | 'mini', number> = {
    standart: 44,
    mini: 20,
};

export const STROKE_WIDTH_DICTIONARY: Record<'standart' | 'mini', number> = {
    standart: 6,
    mini: 3,
};

export const ANIMATED_PAIRS_AMOUNT = 20;

export const ANIMATED_INITIAL_PAIR_STYLE = {
    animationDelay: 0,
    opacity: 1,
    zIndex: 20,
};

export const ANIMATED_STEP_CHANGES = {
    animationDelay: 5,
    opacity: 1.18,
    zIndex: 1,
};

export const DEFAULT_PROGRESS_SIZE: ProgressSize = 44;
