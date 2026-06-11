import type { AllStatuses, ColorTypes } from '../types';

export const DEFAULT_AVATAR_COLOR: ColorTypes = 'grey';
export const STATUS_TO_COLOR_MAP: Record<AllStatuses, ColorTypes> = {
    default: 'grey',
    error: 'red',
    warning: 'orange',
    success: 'green',
    info: 'blue',
    purple: 'purple',
    magenta: 'magenta',
    teal: 'teal',
};
