import React, { FC } from 'react';

import { IOuterLink } from './types';
import * as S from './units';

export const OuterLink: FC<IOuterLink> = ({ path, ...props }) => {
    return (
        <S.OuterLink rel="noopener noreferrer" href={path} target="_blank" {...props}>
            {props.children}
        </S.OuterLink>
    );
};
