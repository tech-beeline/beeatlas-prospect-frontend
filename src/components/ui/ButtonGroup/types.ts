import type { ElementType, ReactNode } from 'react';

import type { ButtonProps } from '../Button/types';

export interface ButtonGroupOption extends Omit<ButtonProps, 'children' | 'variant'> {
    id?: string;
    label?: string;
    value?: string | number;
    disabled?: boolean;
    wrapper?: ElementType;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}

export type ButtonGroupOptionsArray = ButtonGroupOption[];

export interface CommonButtonGroupProps {
    options: ButtonGroupOptionsArray;
    onChange: (option: ButtonGroupOption) => void;
    className?: string;
    activeClassName?: string;
    disabledAll?: boolean;
    size?: 'large' | 'medium' | 'small';
    fullWidth?: boolean;
    type?: 'primary' | 'secondary';
    selectedOption?: ButtonGroupOption;
    customButtonWidth?: number;
    dataTestId?: string;
}

interface ButtonGroupPropsAlwaysSelected extends CommonButtonGroupProps {
    alwaysSelected?: boolean;
    selectedOption: ButtonGroupOption;
}

interface ButtonGroupPropsOptionalSelected extends CommonButtonGroupProps {
    alwaysSelected?: boolean;
    selectedOption?: ButtonGroupOption;
}

export type ButtonGroupProps = ButtonGroupPropsAlwaysSelected | ButtonGroupPropsOptionalSelected;

export type ButtonGroupType = NonNullable<CommonButtonGroupProps['type']>;

export interface StyledButtonGroupProps {
    $type: ButtonGroupType;
}
