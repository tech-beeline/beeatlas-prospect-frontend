import React, { forwardRef } from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import type { InlineAlertProps } from './types';
import * as S from './units';

export const InlineAlert = forwardRef<HTMLDivElement, InlineAlertProps>(
    ({ type = 'neutral', iconName = Icons.WarningCircled, children, className, ...props }, ref) => {
        return (
            <S.StyledInlineAlert
                ref={ref}
                data-testid="InlineAlert"
                role="alert"
                aria-live={type === 'warning' ? 'assertive' : 'polite'}
                aria-atomic
                className={['dsb_alert', `dsb_alert__${type}`, className].filter(Boolean).join(' ')}
                $type={type}
                {...props}
            >
                <S.AlertIcon
                    className="dsb_alert-icon beeline-icons dsb_icon dsb_icon--medium"
                    translate="no"
                    aria-hidden="true"
                >
                    {iconName}
                </S.AlertIcon>
                {typeof children === 'string' ? (
                    <S.AlertContent className="dsb_alert-content">{children}</S.AlertContent>
                ) : (
                    <S.CustomContent className="dsb_alert-custom-content">
                        {children}
                    </S.CustomContent>
                )}
            </S.StyledInlineAlert>
        );
    },
);

InlineAlert.displayName = 'InlineAlert';
