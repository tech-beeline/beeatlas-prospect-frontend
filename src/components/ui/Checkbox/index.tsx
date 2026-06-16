import React, { forwardRef } from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import type { CheckboxProps } from './types';
import * as S from './units';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            checked,
            className,
            type = 'checkbox',
            label,
            disabled,
            error = false,
            dataTestId = 'Checkbox',
            ...props
        },
        ref,
    ) => {
        const iconName = type === 'indeterminate' ? Icons.Remove : Icons.Check;

        return (
            <S.StyledCheckbox
                data-testid={dataTestId}
                className={[
                    'dsb_checkbox',
                    disabled && 'disabled',
                    error && 'dsb_checkbox__error',
                    className,
                ]
                    .filter(Boolean)
                    .join(' ')}
            >
                <S.CheckboxRoot className="dsb_checkbox-root">
                    <S.CheckboxInput
                        ref={ref}
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        aria-invalid={error}
                        className="dsb_checkbox-input"
                        {...props}
                    />
                    <S.CheckboxIcon
                        className="dsb_checkbox-icon beeline-icons dsb_icon dsb_icon--large"
                        translate="no"
                        aria-hidden="true"
                    >
                        {iconName}
                    </S.CheckboxIcon>
                </S.CheckboxRoot>
                {label &&
                    (typeof label === 'string' ? (
                        <S.CheckboxLabel className="dsb_checkbox-label">{label}</S.CheckboxLabel>
                    ) : (
                        label
                    ))}
            </S.StyledCheckbox>
        );
    },
);

Checkbox.displayName = 'Checkbox';
