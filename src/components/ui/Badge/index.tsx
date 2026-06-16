import React, { forwardRef } from 'react';

import { BadgeProps } from './types';
import * as S from './units';
import { getBadgeSemanticClass } from './utils';

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            children,
            type = 'secondary',
            semantic = 'info',
            icon,
            dot = false,
            className,
            dataTestId = 'Badge',
            ...props
        },
        ref,
    ) => {
        const showIcon = !dot && Boolean(icon);
        const semanticClass = getBadgeSemanticClass(semantic);

        return (
            <S.StyledBadge
                ref={ref}
                data-testid={dataTestId}
                className={[
                    'dsb_badge',
                    `dsb_badge__${type}`,
                    `dsb_badge__${semanticClass}`,
                    dot && 'dsb_badge__has-dot',
                    showIcon && 'dsb_badge__has-icon',
                    className,
                ]
                    .filter(Boolean)
                    .join(' ')}
                $type={type}
                $semantic={semantic}
                $hasDot={dot}
                $hasIcon={showIcon}
                {...props}
            >
                {dot && (
                    <S.Dot
                        className="dsb_badge__dot"
                        aria-hidden="true"
                        $type={type}
                        $semantic={semantic}
                    />
                )}
                {showIcon && icon && (
                    <S.IconWrapper className="dsb_badge__icon" aria-hidden="true">
                        <S.IconGlyph
                            className="beeline-icons dsb_icon dsb_icon--small"
                            translate="no"
                        >
                            {icon}
                        </S.IconGlyph>
                    </S.IconWrapper>
                )}
                <S.Text className="dsb_badge__text">{children}</S.Text>
            </S.StyledBadge>
        );
    },
);

Badge.displayName = 'Badge';
