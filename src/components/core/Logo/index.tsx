import React, { FC } from 'react';

import logoBeeline from './images/logo-beeline.png';

import { ILogo } from './types';
import * as S from './units';

// TODO: Вероятно, могут быть разные версии логотипа - добавить src
export const Logo: FC<ILogo> = (props) => {
    return <S.Logo src={logoBeeline} {...props} />;
};
