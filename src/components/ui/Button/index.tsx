import React, { forwardRef } from 'react';

import { ButtonProps } from './types';
import * as S from './units';
import { normalizeButtonIcon, resolveVariant } from './utils';

export const Button = forwardRef<HTMLElement, ButtonProps>(
    (
        {
            className,
            children,
            size = 'small',
            variant = 'secondary',
            disabled,
            startIcon,
            endIcon,
            fullWidth = false,
            href,
            dataTestId = 'Button',
            ...props
        },
        ref,
    ) => {
        const resolvedVariant = resolveVariant(variant);
        const isIconButton = !children;

        const styledProps = {
            className,
            $size: size,
            $variant: resolvedVariant,
            $hasStartIcon: !!startIcon,
            $hasEndIcon: !!endIcon,
            $fullWidth: fullWidth,
            $isIconButton: isIconButton,
            $isLink: !!href,
        };

        const content = (
            <>
                {startIcon && (
                    <S.StartIcon $size={size} $isIconButton={isIconButton}>
                        {normalizeButtonIcon(startIcon)}
                    </S.StartIcon>
                )}
                {children}
                {endIcon && (
                    <S.EndIcon $size={size} $isIconButton={isIconButton}>
                        {normalizeButtonIcon(endIcon)}
                    </S.EndIcon>
                )}
            </>
        );

        if (href) {
            return (
                <S.StyledAnchor
                    {...styledProps}
                    {...props}
                    href={href}
                    ref={ref as React.ForwardedRef<HTMLAnchorElement>}
                    role="button"
                    data-testid={dataTestId}
                >
                    {content}
                </S.StyledAnchor>
            );
        }

        return (
            <S.StyledButton
                {...styledProps}
                {...props}
                disabled={disabled}
                ref={ref as React.ForwardedRef<HTMLButtonElement>}
                data-testid={dataTestId}
            >
                {content}
            </S.StyledButton>
        );
    },
);

Button.displayName = 'Button';
