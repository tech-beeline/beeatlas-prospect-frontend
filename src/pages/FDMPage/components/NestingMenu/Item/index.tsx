import React, { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PivotArrow } from 'components/other';

import { useFDMStore } from 'pages/FDMPage/store';

import { getItemIcon } from '../../utils';

import { IItem } from './types';
import * as S from './units';

export const Item: FC<IItem> = ({ item }) => {
    const [, setParams] = useSearchParams();
    const isTypeDMN = item.alias?.split('.')[0] === 'DMN';

    const { getEntitiesByDomain, activeItem, activeItemPath } = useFDMStore();

    const [isOpen, setOpen] = useState(false);
    const [isShownArrow] = useState((!!item.children && item.children.length > 0) || isTypeDMN);

    const showChildHandler = async (e: Event) => {
        e.stopPropagation();

        setOpen(!isOpen);

        if (isTypeDMN && !isOpen) {
            getEntitiesByDomain(item.id);
        }
    };

    const setActiveItemAndGetChildren = async () => {
        if (isTypeDMN) {
            await getEntitiesByDomain(item.id);
        }
        let itemDomain = {};
        if (item.domain_ref) {
            itemDomain = { domainId: String(item.domain_ref.id) };
        }
        if (isTypeDMN) {
            itemDomain = { domainId: String(item.id) };
        }
        setParams(
            new URLSearchParams({
                ...itemDomain,
                level: String(item.level),
                id: String(item.id),
            }),
        );
    };

    return (
        <>
            <S.Wrapper
                isActive={activeItem?.id === item.id && activeItem?.level === item.level}
                onClick={setActiveItemAndGetChildren}
                data-testid="Item"
            >
                <PivotArrow
                    onClick={showChildHandler}
                    position={isOpen ? '' : 'right'}
                    color={isShownArrow ? 'var(--color-text-inactive)' : 'transparent'}
                    {...{ isOpen }}
                />

                <S.LeftWrapper>
                    {getItemIcon(item)}

                    <S.Name>{item.name}</S.Name>
                </S.LeftWrapper>
            </S.Wrapper>

            <S.ExpandStyled
                {...{ isOpen, setOpen }}
                menuId={item.id}
                treeExpandArray={activeItemPath}
                isAutoHeight
                data-testid="Expand"
            >
                {item.children?.map((child, index) => (
                    <Item key={index} item={child} />
                ))}
            </S.ExpandStyled>
        </>
    );
};
