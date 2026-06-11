import React, { forwardRef } from 'react';

import { FABProps } from './types';
import * as S from './units';

export const FAB = forwardRef<HTMLButtonElement, FABProps>(
    ({ type = 'standard', iconName, className, children, dataTestId = 'FAB', ...props }, ref) => (
        <S.StyledFAB
            ref={ref}
            type="button"
            data-testid={dataTestId}
            className={['inverseTheme', 'dsb_fab-button', `dsb_fab-button__${type}`, className]
                .filter(Boolean)
                .join(' ')}
            $type={type}
            {...props}
        >
            <S.IconWrapper className="dsb_fab-button__icon" aria-hidden="true">
                <S.IconGlyph className="beeline-icons dsb_icon dsb_icon--large" translate="no">
                    {iconName}
                </S.IconGlyph>
            </S.IconWrapper>
            {type === 'extended' && children && <S.Label>{children}</S.Label>}
        </S.StyledFAB>
    ),
);

FAB.displayName = 'FAB';
