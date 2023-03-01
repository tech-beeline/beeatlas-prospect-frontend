import React, { FC } from 'react';

import { ITab } from './types';
import * as S from './units';

export const Tab: FC<ITab> = ({ isActive = false, ...props }) => {
    return (
        <S.Tab className="Tab" {...{ isActive }} {...props}>
            {props.children}
        </S.Tab>
    );
};
