import React, { FC } from 'react';

import { useFDMStore } from '../../store';

import { IBreadCrumbsItem } from './types';
import * as S from './units';

export const BreadCrumbsItem: FC<IBreadCrumbsItem> = ({ id, level, name }) => {
    const [activeItem, setActiveItem] = useFDMStore((state) => [
        state.activeItem,
        state.setActiveItem,
    ]);

    return (
        <S.Wrapper onClick={() => setActiveItem(id, level)} isActive={activeItem?.id === id}>
            {name}
        </S.Wrapper>
    );
};
