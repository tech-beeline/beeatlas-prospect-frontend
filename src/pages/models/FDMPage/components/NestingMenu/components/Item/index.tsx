import React, { FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PivotArrow } from 'components/other';

import { useFDMStore } from 'pages/models/FDMPage/store';
import { ItemTypes } from 'pages/models/FDMPage/store/types';

import { getItemIcon } from '../../../utils';

import { IItem } from './types';
import * as S from './units';

export const Item: FC<IItem> = ({ item, itemToScroll, setItemToScroll }) => {
    const [, setParams] = useSearchParams();

    const { getСhildrenСapabilities, activeItem, path } = useFDMStore();

    const [isOpen, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleArrowClick = async (e: Event) => {
        e.stopPropagation();

        getСhildrenСapabilities(item.id);

        setOpen(!isOpen);
    };

    const handleItemClick = async () => {
        if (item.type === ItemTypes.BUSINESS) {
            await getСhildrenСapabilities(item.id);
        }

        setParams(
            new URLSearchParams({
                id: String(item.id),
                type: item.type,
            }),
        );
    };

    useEffect(() => {
        if (!item.hasChildren) {
            setOpen(false);
        }
    }, [item.hasChildren]);

    useEffect(() => {
        if (itemToScroll && itemToScroll.id === item.id && itemToScroll.type === item.type) {
            setTimeout(() => {
                containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setItemToScroll(null);
            }, 500);
        }
    }, [itemToScroll, item, setItemToScroll]);

    return (
        <>
            <S.Wrapper
                ref={containerRef}
                isActive={activeItem?.id === item.id && activeItem.type === item.type}
                onClick={handleItemClick}
                data-testid="Item"
            >
                <S.ArrowContainer>
                    {item.hasChildren && (
                        <PivotArrow onClick={handleArrowClick} position={isOpen ? '' : 'right'} />
                    )}
                </S.ArrowContainer>

                {getItemIcon(item)}

                <S.Name>{item.name}</S.Name>
            </S.Wrapper>

            <S.ExpandStyled
                {...{ isOpen, setOpen }}
                menuId={item.id}
                treeExpandArray={path}
                isAutoHeight
                data-testid="Expand"
            >
                {item.children.map((child) => (
                    <Item
                        key={`${child.type}-${child.id}`}
                        item={child}
                        itemToScroll={itemToScroll}
                        setItemToScroll={setItemToScroll}
                    />
                ))}
                {item.type === ItemTypes.BUSINESS &&
                    item.children.length === 0 &&
                    item.hasChildren && <S.SkeletonStyled height={52} radius={12} />}
            </S.ExpandStyled>
        </>
    );
};
