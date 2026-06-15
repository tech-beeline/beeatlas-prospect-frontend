import React, { forwardRef } from 'react';

import { Icon } from '../Icon';

import type { IconButtonProps } from './types';
import * as S from './units';
import { buildIconButtonClassName } from './utils';

export const IconButton = forwardRef<HTMLElement, IconButtonProps>(
    (
        {
            size = 'small',
            iconName,
            className,
            type = 'button',
            dataTestId = 'IconButton',
            variant = 'plain',
            disabled,
            'aria-label': ariaLabel,
            'aria-hidden': ariaHidden,
            href,
            fullWidth,
            ...props
        },
        ref,
    ) => {
        const styledProps = {
            className: buildIconButtonClassName({ size, variant, className }),
            $size: size,
            $variant: variant,
            disabled,
            'aria-label': ariaLabel,
            'data-testid': dataTestId,
            ...(fullWidth && { style: { width: '100%' } }),
            ...props,
        };

        const icon = (
            <Icon
                className="dsb_icon-button-start-icon"
                size={size}
                aria-hidden={ariaHidden ?? true}
                iconName={iconName}
            />
        );

        if (href) {
            return (
                <S.StyledIconAnchor
                    {...styledProps}
                    href={disabled ? undefined : href}
                    ref={ref as React.ForwardedRef<HTMLAnchorElement>}
                    role="button"
                    aria-disabled={disabled || undefined}
                >
                    {icon}
                </S.StyledIconAnchor>
            );
        }

        return (
            <S.StyledIconButton
                {...styledProps}
                type={type}
                ref={ref as React.ForwardedRef<HTMLButtonElement>}
            >
                {icon}
            </S.StyledIconButton>
        );
    },
);

IconButton.displayName = 'IconButton';
