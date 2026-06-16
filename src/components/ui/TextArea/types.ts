import type { TextareaHTMLAttributes } from 'react';

import type { HelperPositionType } from '../TextField/types';

export type TextAreaSize = 'small' | 'medium';

export type { HelperPositionType };

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    textareaId?: string;
    textareaClassName?: string;
    size?: TextAreaSize;
    error?: boolean;
    disabled?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    autoHeight?: boolean;
    maxHeight?: number;
    helperPosition?: HelperPositionType;
    dataTestId?: string;
}
