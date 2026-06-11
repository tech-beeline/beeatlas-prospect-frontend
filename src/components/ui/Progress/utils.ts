import {
    ANIMATED_INITIAL_PAIR_STYLE,
    ANIMATED_PAIRS_AMOUNT,
    ANIMATED_STEP_CHANGES,
    SIZE_DICTIONARY,
    STROKE_WIDTH_DICTIONARY,
} from './const';
import type { AnimatedPairStyle, ProgressSize } from './types';

export const classNames = (
    ...values: Array<string | false | null | undefined | Record<string, boolean>>
): string => {
    const classes: string[] = [];

    values.forEach((value) => {
        if (!value) {
            return;
        }

        if (typeof value === 'string') {
            classes.push(value);
            return;
        }

        Object.entries(value).forEach(([className, isActive]) => {
            if (isActive) {
                classes.push(className);
            }
        });
    });

    return classes.join(' ');
};

export const limitProgressValue = (value: number): number => Math.min(value, 100);

export const getCircleRadius = (size: ProgressSize): number => {
    const key = size in SIZE_DICTIONARY ? (size as 'standart' | 'mini') : 'standart';

    return (SIZE_DICTIONARY[key] - STROKE_WIDTH_DICTIONARY[key]) / 2;
};

export const buildAnimatedPairsData = (): AnimatedPairStyle[] => {
    const pairStyleSettings = { ...ANIMATED_INITIAL_PAIR_STYLE };
    const pairsData: AnimatedPairStyle[] = [];

    for (let pairs = 0; pairs <= ANIMATED_PAIRS_AMOUNT; pairs += 1) {
        pairsData.push({ ...pairStyleSettings });
        pairStyleSettings.animationDelay += ANIMATED_STEP_CHANGES.animationDelay;
        pairStyleSettings.opacity /= ANIMATED_STEP_CHANGES.opacity;
    }

    return pairsData;
};
