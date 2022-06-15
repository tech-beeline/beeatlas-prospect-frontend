import React, { FC } from 'react';

import { ITitle } from './types';
import * as S from './units';

export const Title: FC<ITitle> = (props) => {
    return <S.Title>{props.children}</S.Title>;
};
