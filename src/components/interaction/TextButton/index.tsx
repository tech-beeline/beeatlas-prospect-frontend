import React, { FC } from 'react';

import { ITextButton } from './types';
import * as S from './units';

export const TextButton: FC<ITextButton> = (props) => {
    return (
        <S.TextButton className="TextButton" {...props}>
            {props.children}
        </S.TextButton>
    );
};
