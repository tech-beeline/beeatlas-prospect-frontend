import type { ProgressButtonSettings } from './types';

export const PROGRESS_BUTTON_STROKE_WIDTH = 2;

export const DEFAULT_SETTINGS: ProgressButtonSettings = {
    width: 24,
    height: 24,
    startPos: (24 - PROGRESS_BUTTON_STROKE_WIDTH) / 2,
    strokeWidth: PROGRESS_BUTTON_STROKE_WIDTH,
    borderRadius: 12,
};

export const DEFAULT_STATUS_DELAY_TIME = 4000;
