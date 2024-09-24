import React, { FC } from 'react';

import { IText } from './types';
import * as S from './units';

export const Text: FC<IText> = ({ variant, children, inactive = false }) => (
    <S.TypographyStyled variant={variant} inactive={inactive}>
        {children}
    </S.TypographyStyled>
);
