import type { ToolbarItemSize } from './types';

export const getIconSizeClassName = (size: ToolbarItemSize): string =>
    size === 'large' ? 'dsb_icon--large' : 'dsb_icon--medium';
