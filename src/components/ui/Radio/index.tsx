import React, { forwardRef } from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import type { RadioProps } from './types';
import * as S from './units';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
    (
        {
            checked,
            label,
            disabled,
            error = false,
            className,
            name,
            dataTestId = 'Radio',
            ...props
        },
        ref,
    ) => (
        <S.StyledRadio
            data-testid={dataTestId}
            className={[
                'dsb_radio',
                disabled && 'dsb_radio__disabled',
                error && 'dsb_radio__error',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            <S.RadioRoot className="dsb_radio-root">
                <S.RadioInput
                    ref={ref}
                    type="radio"
                    checked={checked}
                    disabled={disabled}
                    name={name}
                    aria-invalid={error}
                    className="dsb_radio-input"
                    {...props}
                />
                <S.RadioIcon
                    className="dsb_radio-icon beeline-icons dsb_icon dsb_icon--large"
                    translate="no"
                    aria-hidden="true"
                >
                    {Icons.Dot}
                </S.RadioIcon>
            </S.RadioRoot>
            {label &&
                (typeof label === 'string' ? (
                    <S.RadioLabel className="dsb_radio-label">{label}</S.RadioLabel>
                ) : (
                    label
                ))}
        </S.StyledRadio>
    ),
);

Radio.displayName = 'Radio';
