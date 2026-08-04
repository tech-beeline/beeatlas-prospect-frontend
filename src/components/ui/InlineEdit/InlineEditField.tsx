import React, { forwardRef } from 'react';

import type { InlineEditFieldProps } from './types';
import * as S from './units';
import { classNames } from './utils';

export const InlineEditField = forwardRef<HTMLInputElement, InlineEditFieldProps>(
    (
        {
            error = false,
            helperText,
            helperPosition = 'absolute',
            disabled = false,
            dataTestId = 'TextField',
            className,
            ...props
        },
        ref,
    ) => (
        <S.TextFieldWrapper
            data-testid={dataTestId}
            className={classNames(
                'dsb_text-field-wrapper',
                disabled && 'dsb_text-field-wrapper--disabled',
                className,
            )}
        >
            <div className={classNames('dsb_input-wrapper', error && 'dsb_input-wrapper--error')}>
                <input
                    {...props}
                    ref={ref}
                    disabled={disabled}
                    data-testid={`${dataTestId}-input`}
                    className={classNames(
                        'dsb_input',
                        'dsb_input--small',
                        error && 'dsb_input--error',
                    )}
                    aria-invalid={error}
                />
                {helperPosition === 'absolute' && helperText && (
                    <div className="dsb_input-helper-text-absolute-wrapper">
                        <sup className="dsb_input-helper-text">{helperText}</sup>
                    </div>
                )}
            </div>
        </S.TextFieldWrapper>
    ),
);

InlineEditField.displayName = 'InlineEditField';
