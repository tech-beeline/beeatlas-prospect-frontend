import React, { forwardRef } from 'react';

import type { SwitchProps } from './types';
import * as S from './units';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    ({ label, disabled, error = false, className, dataTestId = 'Switch', ...props }, ref) => (
        <S.StyledSwitch
            data-testid={dataTestId}
            className={[
                'dsb_switch',
                disabled && 'dsb_switch__disabled',
                error && 'dsb_switch__error',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            <S.SwitchInput
                ref={ref}
                type="checkbox"
                disabled={disabled}
                aria-invalid={error}
                className="dsb_switch-input"
                {...props}
            />
            <S.SwitchTrack className="dsb_switch-track">
                <S.SwitchSlider className="dsb_switch-slider round" />
            </S.SwitchTrack>
            {label &&
                (typeof label === 'string' ? (
                    <S.SwitchLabel className="dsb_switch-label">{label}</S.SwitchLabel>
                ) : (
                    label
                ))}
        </S.StyledSwitch>
    ),
);

Switch.displayName = 'Switch';
