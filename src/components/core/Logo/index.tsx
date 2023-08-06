import React, { FC } from 'react';

import { ILogo } from './types';
import * as S from './units';

export const Logo: FC<ILogo> = (props) => {
    return <S.LogoIcon className="LogoIcon" {...props} />;
};
