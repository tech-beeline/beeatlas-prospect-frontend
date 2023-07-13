import React, { FC } from 'react';

import * as T from './types';
import * as S from './units';

export const PermissionItem: FC<T.IPermissionItem> = (props) => {
    return (
        <S.Wrapper>
            <S.CheckboxStyled label={props.children} />
        </S.Wrapper>
    );
};
