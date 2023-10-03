import React, { FC, useState } from 'react';

import { PivotArrow } from 'components/other';

import { useFDMStore } from 'pages/FDMPage/store';

import { getItemIcon } from '../../utils';

import { IItem } from './types';
import * as S from './units';

export const Item: FC<IItem> = ({ item }) => {
    const isTypeDMN = item.alias?.split('.')[0] === 'DMN';

    const { getEntitiesByDomain, activeItem, activeItemPath, setActiveItem } = useFDMStore();

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
        const aliasType = item.alias?.split('.')[0];
        if (aliasType === 'DMN') {
            await getEntitiesByDomain(item.id);
        }
        setActiveItem(item.id, item.level);
    };

    return (
        <>
            <S.Wrapper
                isActive={activeItem?.id === item.id && activeItem?.level === item.level}
                onClick={setActiveItemAndGetChildren}
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
            >
                {item.children?.map((child, index) => (
                    <Item key={index} item={child} />
                ))}
            </S.ExpandStyled>
        </>
    );
};
