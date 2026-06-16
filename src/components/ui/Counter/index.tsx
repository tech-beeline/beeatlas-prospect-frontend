import React, { forwardRef, useMemo } from 'react';

import { CounterProps } from './types';
import * as S from './units';
import { formatNumber, isNumber } from './utils';

export const Counter = forwardRef<HTMLDivElement, CounterProps>(
    (
        {
            children,
            className,
            count,
            warning = false,
            hideBadgeContent = false,
            error = false,
            size = 'small',
            tooltipTitle = '',
            dataTestId = 'Counter',
            ...props
        },
        ref,
    ) => {
        const badgeContent = useMemo(() => formatNumber(count), [count]);
        const showBadge = isNumber(count) || warning;
        const standalone = !children;

        const counterBody = (
            <S.Root
                ref={ref}
                data-testid={dataTestId}
                className={['dsb-counter-root', className].filter(Boolean).join(' ')}
                title={tooltipTitle || undefined}
                {...props}
            >
                {children}
                {showBadge &&
                    (warning ? (
                        <S.BadgeExclamation
                            data-testid="BadgeContent"
                            className={[
                                'dsb_typography',
                                'dsb_badge',
                                `dsb_badge--${size}`,
                                error && 'dsb_badge--error',
                                'dsb_badge--exclamation',
                                standalone && 'dsb_badge--standalone',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            $size={size}
                            $error={error}
                            $standalone={standalone}
                        >
                            {!hideBadgeContent && '!'}
                        </S.BadgeExclamation>
                    ) : (
                        <S.Badge
                            data-testid="BadgeContent"
                            className={[
                                'dsb_typography',
                                'dsb_badge',
                                `dsb_badge--${size}`,
                                error && 'dsb_badge--error',
                                standalone && 'dsb_badge--standalone',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            $size={size}
                            $error={error}
                            $standalone={standalone}
                        >
                            {!hideBadgeContent && badgeContent}
                        </S.Badge>
                    ))}
            </S.Root>
        );

        return counterBody;
    },
);

Counter.displayName = 'Counter';
