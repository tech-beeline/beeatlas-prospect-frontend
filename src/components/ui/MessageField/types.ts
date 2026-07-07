import type { TextareaHTMLAttributes } from 'react';

export interface MessageFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    fullWidth?: boolean;
    dataTestId?: string;
}
