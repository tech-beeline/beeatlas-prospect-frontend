import React, { forwardRef } from 'react';

import { CardProps } from './types';
import * as S from './units';
import { buildCardClassName } from './utils';

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ border, elevation, className, ...props }, ref) => (
        <S.StyledCard
            ref={ref}
            data-testid="Card"
            className={buildCardClassName(border, elevation, className)}
            {...props}
        />
    ),
);

Card.displayName = 'Card';
