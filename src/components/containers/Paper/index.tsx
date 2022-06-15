import React, { forwardRef } from 'react';

import { IPaper } from './types';
import * as S from './units';

export const Paper = forwardRef<HTMLDivElement, IPaper>(({ isRounded = true, ...props }, ref) => {
    return <S.Paper {...{ ref, isRounded, ...props }}>{props.children}</S.Paper>;
});
