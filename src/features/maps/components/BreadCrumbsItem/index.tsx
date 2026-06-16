import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { IBreadCrumbsItem } from './types';
import * as S from './units';

export const BreadCrumbsItem: FC<IBreadCrumbsItem> = ({ id, name, index, onClick }) => {
    const [, setParams] = useSearchParams();

    const handleItemClick = () => {
        setParams(new URLSearchParams(index === 0 ? {} : { id: String(id) }));
    };

    return (
        <S.Wrapper isActive={false} onClick={onClick ?? handleItemClick}>
            {name}
        </S.Wrapper>
    );
};
