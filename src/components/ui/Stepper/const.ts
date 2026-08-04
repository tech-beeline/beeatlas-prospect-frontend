import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import type { ColorTypes } from '../types';

import type { StepStateType } from './types';

export type StepIconState = Extract<StepStateType, 'success' | 'error' | 'disabled'>;
type IconState = StepIconState;
type OrderState = Extract<StepStateType, 'active' | 'visited' | 'non-visited'>;

export const ICON_STATE_MAP: Record<IconState, boolean> = {
    success: true,
    error: true,
    disabled: true,
};

export const ORDER_STATE_MAP: Record<OrderState, boolean> = {
    active: true,
    visited: true,
    'non-visited': true,
};

export const STEP_ICON_MAP: Record<IconState, Icons> = {
    success: Icons.CheckCircled,
    error: Icons.InfoCircled,
    disabled: Icons.Lock,
};

export const STEP_ICON_COLOR_MAP: Record<IconState, ColorTypes> = {
    success: 'green',
    error: 'red',
    disabled: 'grey',
};
