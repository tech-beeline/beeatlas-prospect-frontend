import { HTMLInputTypeAttribute, ReactNode } from 'react';

import type { HelperPositionType } from 'components/ui';

export interface ITextField {
    name: string;
    label: string;
    id?: string;
    maxLength?: number;
    disabled?: boolean;
    fullWidth?: boolean;
    helperPosition?: HelperPositionType;
    autoFocus?: boolean;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    type?: HTMLInputTypeAttribute;
    endIcon?: ReactNode;
    helperText?: string;
}
