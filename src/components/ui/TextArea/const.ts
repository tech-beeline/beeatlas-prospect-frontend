import { textarea } from '@beeline/design-tokens/js/tokens';

import type { TextAreaSize } from './types';

export const DEFAULT_TEXT_AREA_SIZE: TextAreaSize = 'medium';

export const DEFAULT_DATA_TEST_ID = 'TextArea';

export const DEFAULT_HELPER_POSITION = 'block' as const;

const marginToNumber = (margin: string) => Number.parseInt(margin, 10);

const marginBottom = marginToNumber(textarea.textareaTextMarginBottom);

export const TEXTAREA_MARGIN = {
    medium: marginToNumber(textarea.textareaMediumWithoutLabelTextMarginTop) + marginBottom,
    mediumLabel: marginToNumber(textarea.textareaMediumLabelMarginTop) + marginBottom,
    small: marginToNumber(textarea.textareaSmallWithoutLabelTextMarginTop) + marginBottom,
    smallLabel: marginToNumber(textarea.textareaSmallLabelMarginTop) + marginBottom,
} as const;

export const TEXTAREA_STANDARD_HEIGHT = {
    medium: marginToNumber(textarea.textareaMediumHeight),
    small: marginToNumber(textarea.textareaSmallHeight),
} as const;
