import type { TextAreaSize } from './types';

export const DEFAULT_TEXT_AREA_SIZE: TextAreaSize = 'medium';

export const DEFAULT_DATA_TEST_ID = 'TextArea';

export const DEFAULT_HELPER_POSITION = 'block' as const;

export const TEXTAREA_MARGIN = {
    medium: 34,
    mediumLabel: 38,
    small: 34,
    smallLabel: 34,
} as const;

export const TEXTAREA_STANDARD_HEIGHT = {
    medium: 104,
    small: 92,
} as const;
