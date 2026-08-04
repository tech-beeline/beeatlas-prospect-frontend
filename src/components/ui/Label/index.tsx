import React, { forwardRef } from 'react';

import type { LabelProps } from './types';
import * as S from './units';
import { normalizeLabelVariant } from './utils';

export const Label = forwardRef<HTMLDivElement, LabelProps>(
    (
        {
            type = 'default',
            variant,
            assign,
            title,
            iconName,
            className,
            dataTestId = 'Label',
            ...props
        },
        ref,
    ) => {
        const resolvedVariant = normalizeLabelVariant({ variant, assign });
        const hasIcon = Boolean(iconName);
        const hasTitle = Boolean(title);

        return (
            <S.StyledLabel
                ref={ref}
                data-testid={dataTestId}
                className={[
                    'dsb_label',
                    `dsb_label__${resolvedVariant}`,
                    `dsb_label__${type}`,
                    hasIcon && 'dsb_label__with-icon',
                    !hasTitle && 'dsb_label__without-title',
                    className,
                ]
                    .filter(Boolean)
                    .join(' ')}
                $type={type}
                $variant={resolvedVariant}
                $hasIcon={hasIcon}
                $hasTitle={hasTitle}
                {...props}
            >
                {hasIcon && iconName && (
                    <S.IconGlyph
                        className="dsb_label-icon beeline-icons dsb_icon dsb_icon--medium"
                        aria-hidden="true"
                        translate="no"
                    >
                        {iconName}
                    </S.IconGlyph>
                )}
                {resolvedVariant !== 'icon' && title && (
                    <S.Title className="dsb_label-title">{title}</S.Title>
                )}
            </S.StyledLabel>
        );
    },
);

Label.displayName = 'Label';
