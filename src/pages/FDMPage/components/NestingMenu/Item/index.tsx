import React, { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PivotArrow } from 'components/other';

import { useFDMStore } from 'pages/FDMPage/store';
import { ItemTypes } from 'pages/FDMPage/store/types';

import { getItemIcon } from '../../utils';

import { IItem } from './types';
import * as S from './units';

export const Item: FC<IItem> = ({ item }) => {
    const [, setParams] = useSearchParams();

    const { getСhildrenСapabilities, activeItem, path } = useFDMStore();

    const [isOpen, setOpen] = useState(false);

    const handleArrowClick = async (e: Event) => {
        e.stopPropagation();

        getСhildrenСapabilities(item.id);

        setOpen(!isOpen);
    };

    const handleItemClick = async () => {
        if (item.type === ItemTypes.BUSINESS) {
            await getСhildrenСapabilities(item.id);
            // getСhildrenСapabilities(item.id);
        }

        setParams(
            new URLSearchParams({
                id: String(item.id),
                type: item.type,
            }),
        );
    };

    if (activeItem?.id === item.id && activeItem.type === item.type) {
        console.log(item);
    }

    return (
        <>
            <S.Wrapper
                isActive={activeItem?.id === item.id && activeItem.type === item.type}
                onClick={handleItemClick}
                data-testid="Item"
            >
                <PivotArrow
                    onClick={handleArrowClick}
                    color={
                        item.type === ItemTypes.BUSINESS
                            ? 'var(--color-text-inactive)'
                            : 'transparent'
                    }
                    position={isOpen ? '' : 'right'}
                />

                <S.LeftWrapper>
                    {getItemIcon(item)}
                    <S.Name>{item.name}</S.Name>
                </S.LeftWrapper>
            </S.Wrapper>

            <S.ExpandStyled
                {...{ isOpen, setOpen }}
                menuId={item.id}
                treeExpandArray={path}
                isAutoHeight
                data-testid="Expand"
            >
                {item.children.map((child, index) => (
                    <Item key={index} item={child} />
                ))}
                {item.type === ItemTypes.BUSINESS && item.children.length === 0 && (
                    <S.SkeletonStyled height={52} radius={12} />
                )}
            </S.ExpandStyled>
        </>
    );
};
