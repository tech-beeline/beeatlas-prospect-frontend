import React, { cloneElement, forwardRef } from 'react';

import { DEFAULT_TYPOGRAPHY_VARIANT, TYPOGRAPHY_TAG_MAP } from './const';
import type { TypographyLinkState, TypographyProps } from './types';
import * as S from './units';
import { buildTypographyClassName, getTypographyRole } from './utils';

export const Typography = forwardRef<HTMLElement, TypographyProps>(
    (
        {
            variant = DEFAULT_TYPOGRAPHY_VARIANT,
            className,
            ellipsis = false,
            inactive = false,
            dataTestId = 'Typography',
            children,
            ...rest
        },
        ref,
    ) => {
        if (variant === 'routedLink' && 'routingComponent' in rest) {
            const { routingComponent, linkState, ...restWithoutExtras } = rest;

            return cloneElement(routingComponent, {
                className: buildTypographyClassName({
                    variant,
                    ellipsis,
                    inactive,
                    linkState,
                    className: [routingComponent.props.className, className]
                        .filter(Boolean)
                        .join(' '),
                }),
                ref,
                role: 'link',
                'aria-label': rest['aria-label'],
                ...restWithoutExtras,
            });
        }

        if (variant === 'contextualLink' && 'onHoverElement' in rest) {
            const { onHoverElement, linkState, ...restWithoutExtras } = rest;

            return cloneElement(onHoverElement, {
                children: (
                    <S.StyledTypography
                        as="span"
                        ref={ref}
                        className={buildTypographyClassName({
                            variant,
                            ellipsis,
                            inactive,
                            linkState,
                            className,
                        })}
                        $variant={variant}
                        $ellipsis={ellipsis}
                        $inactive={inactive}
                        $linkState={linkState}
                        {...restWithoutExtras}
                    />
                ),
            });
        }

        const {
            linkState,
            routingComponent: _routingComponent,
            onHoverElement: _onHoverElement,
            ...domProps
        } = rest as Record<string, unknown>;

        return (
            <S.StyledTypography
                as={TYPOGRAPHY_TAG_MAP[variant] ?? 'span'}
                ref={ref}
                className={buildTypographyClassName({
                    variant,
                    ellipsis,
                    inactive,
                    linkState: linkState as TypographyLinkState | undefined,
                    className,
                })}
                data-testid={dataTestId}
                role={getTypographyRole(variant)}
                $variant={variant}
                $ellipsis={ellipsis}
                $inactive={inactive}
                $linkState={linkState as TypographyLinkState | undefined}
                {...domProps}
            >
                {children}
            </S.StyledTypography>
        );
    },
);

Typography.displayName = 'Typography';
