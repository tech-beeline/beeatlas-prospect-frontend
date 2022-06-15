import { Dispatch, RefObject, SetStateAction } from 'react';

export interface IInput {
    value: string | number;
    label?: string;
    placeholder?: string;
    isValid?: boolean;
    // error text
    // validationError?: string;
    disabled?: boolean;
    name?: string;
    // TODO: добавить password
    type?: 'password' | 'phone' | 'text';
    autoFocus?: boolean;
    isFocused?: boolean;
    maxWidth?: number;
    className?: string;
    ref: RefObject<HTMLInputElement>;

    onBlur?: (e?: React.FormEvent) => void;
    onFocus?: () => void;
    onChange: (value: string, name: string) => void;
    onClick?: () => void;
    setValid?: Dispatch<SetStateAction<boolean>>;
}
