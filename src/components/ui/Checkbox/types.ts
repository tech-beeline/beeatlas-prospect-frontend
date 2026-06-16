import type { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxType = 'checkbox' | 'indeterminate';

type OmittedInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onCopy' | 'onCopyCapture'>;

export interface CheckboxProps extends OmittedInputProps {
    label?: string | ReactNode;
    checked?: boolean;
    type?: CheckboxType;
    disabled?: boolean;
    error?: boolean;
    className?: string;
    dataTestId?: string;
}
