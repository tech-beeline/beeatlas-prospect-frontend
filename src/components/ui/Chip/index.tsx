import React, { cloneElement, forwardRef, isValidElement } from 'react';

import { ChipProps } from './types';
import * as S from './units';

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
    (
        {
            label,
            active = false,
            disabled = false,
            dragged = false,
            onClick,
            className,
            startAdornment,
            endAdornment,
            dataTestId = 'Chip',
            ...props
        },
        ref,
    ) => {
        const clickable = Boolean(onClick) && !disabled;

        return (
            <S.StyledChip
                ref={ref}
                type="button"
                data-testid={dataTestId}
                tabIndex={onClick ? 0 : -1}
                aria-pressed={!!onClick}
                onClick={disabled ? undefined : onClick}
                disabled={disabled}
                className={[
                    'dsb_chip',
                    active && 'dsb_chip--active',
                    disabled && 'dsb_chip--disabled',
                    startAdornment && 'dsb_chip--start-icon',
                    endAdornment && 'dsb_chip--end-icon',
                    onClick && 'dsb_chip--clickable',
                    dragged && 'dsb_chip--dragged',
                    className,
                ]
                    .filter(Boolean)
                    .join(' ')}
                $active={active}
                $disabled={disabled}
                $dragged={dragged}
                $clickable={clickable}
                $hasStartAdornment={Boolean(startAdornment)}
                $hasEndAdornment={Boolean(endAdornment)}
                {...props}
            >
                {startAdornment && (
                    <S.Adornment className="dsb_chip__adornment dsb_chip__start-icon">
                        {isValidElement(startAdornment)
                            ? cloneElement(startAdornment, { size: 'small' } as never)
                            : startAdornment}
                    </S.Adornment>
                )}
                <S.TitleWrapper className="ellipsis">
                    <S.Title className="dsb_chip__title">{label}</S.Title>
                </S.TitleWrapper>
                {endAdornment && (
                    <S.Adornment className="dsb_chip__adornment dsb_chip__end-icon">
                        {isValidElement(endAdornment)
                            ? cloneElement(endAdornment, { size: 'small' } as never)
                            : endAdornment}
                    </S.Adornment>
                )}
            </S.StyledChip>
        );
    },
);

Chip.displayName = 'Chip';
