import React, { forwardRef } from 'react';

import type { IconProps } from './types';
import * as S from './units';
import {
    buildIconClassName,
    getNumericIconSizeStyle,
    isNumericIconSize,
    resolveIconColor,
    resolveNamedIconSize,
} from './utils';

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
    (
        {
            iconName,
            size = 'medium',
            type,
            className,
            contained,
            color,
            dataTestId = 'Icon',
            style,
            ...props
        },
        ref,
    ) => {
        const iconColor = resolveIconColor({ color, type, componentName: 'Icon' });
        const isContained = contained || Boolean(type);

        return (
            <S.StyledIcon
                {...props}
                ref={ref}
                data-testid={dataTestId}
                role="img"
                className={buildIconClassName({
                    className,
                    iconColor,
                    isContained,
                    size,
                })}
                translate="no"
                style={{
                    ...(isNumericIconSize(size) ? getNumericIconSizeStyle(size) : undefined),
                    ...style,
                }}
                $isContained={isContained}
                $color={iconColor}
                $size={resolveNamedIconSize(size)}
            >
                {iconName}
            </S.StyledIcon>
        );
    },
);

Icon.displayName = 'Icon';
