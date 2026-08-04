import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useFDMStore } from '../../store';

import { IBreadCrumbsItem } from './types';
import * as S from './units';

export const BreadCrumbsItem: FC<IBreadCrumbsItem> = ({ id, type, name }) => {
    const [, setParams] = useSearchParams();

    const activeItem = useFDMStore((state) => state.activeItem);

    const handleItemClick = () => {
        setParams(
            new URLSearchParams({
                id: String(id),
                type,
            }),
        );
    };

    return (
        <S.Wrapper
            onClick={handleItemClick}
            isActive={activeItem?.id === id && activeItem.type === type}
        >
            {name}
        </S.Wrapper>
    );
};
