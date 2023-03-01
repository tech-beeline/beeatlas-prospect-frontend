import React, { FC } from 'react';

import { IBreadCrumbsItem } from './types';
import * as S from './units';

export const BreadCrumbsItem: FC<IBreadCrumbsItem> = (props) => {
    const { id, name } = props.item;

    return (
        <S.Wrapper
            className="BreadCrumbsItem"
            onClick={() => props.setActiveFDMItem(props.item)}
            isActive={props.activeFDMItem.id === id}
        >
            {name}
        </S.Wrapper>
    );
};
