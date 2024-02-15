import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useFDMStore } from '../../store';

import { IBreadCrumbsItem } from './types';
import * as S from './units';

export const BreadCrumbsItem: FC<IBreadCrumbsItem> = ({ id, domainId, level, name }) => {
    const [, setParams] = useSearchParams();

    const activeItem = useFDMStore((state) => state.activeItem);

    const handleItemClick = () => {
        let itemDomain = {};
        if (domainId) {
            itemDomain = { domainId: String(domainId) };
        }
        setParams(
            new URLSearchParams({
                ...itemDomain,
                level: String(level),
                id: String(id),
            }),
        );
    };

    return (
        <S.Wrapper onClick={handleItemClick} isActive={activeItem?.id === id}>
            {name}
        </S.Wrapper>
    );
};
