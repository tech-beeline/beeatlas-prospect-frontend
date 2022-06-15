import React, { FC } from 'react';

import * as T from './types';
import * as S from './units';

export const Loader: FC<T.ILoader> = ({ size = 50 }) => {
    return <S.Loader {...{ size }} />;
};
