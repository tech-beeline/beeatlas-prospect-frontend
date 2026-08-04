import React, { FC } from 'react';

import { IText } from './types';
import * as S from './units';

export const Text: FC<IText> = ({
    variant,
    children,
    inactive = false,
    link = false,
    pointer = false,
    visited = false,
    ...rest
}) => (
    <S.TypographyStyled
        {...rest}
        variant={variant}
        inactive={inactive}
        link={link}
        pointer={pointer}
        visited={visited}
    >
        {children}
    </S.TypographyStyled>
);
