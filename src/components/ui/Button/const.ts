import { ResolvedButtonVariant } from './types';

export const BUTTON_ICON_SIZE = 'small';

export const VARIANT_ALIAS_MAP: Partial<Record<string, ResolvedButtonVariant>> = {
    primary: 'contained',
    secondary: 'outlined',
    ghost: 'plain',
    inverse: 'overlay',
};
