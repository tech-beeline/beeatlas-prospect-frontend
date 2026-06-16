import React, { forwardRef } from 'react';

import { DividerProps } from './types';
import * as S from './units';

export const Divider = forwardRef<HTMLHRElement | HTMLDivElement, DividerProps>(
    ({ className, type = 'horizontal', isDecorative, ...props }, ref) => {
        const resolvedClassName = ['dsb_divider', `dsb_divider--${type}`, className]
            .filter(Boolean)
            .join(' ');

        if (isDecorative) {
            return (
                <S.StyledDecorativeDivider
                    ref={ref as React.Ref<HTMLDivElement>}
                    data-testid="Divider"
                    aria-hidden="true"
                    className={resolvedClassName}
                    $type={type}
                    {...props}
                />
            );
        }

        return (
            <S.StyledDivider
                ref={ref as React.Ref<HTMLHRElement>}
                data-testid="Divider"
                role="separator"
                className={resolvedClassName}
                $type={type}
                {...props}
            />
        );
    },
);

Divider.displayName = 'Divider';
