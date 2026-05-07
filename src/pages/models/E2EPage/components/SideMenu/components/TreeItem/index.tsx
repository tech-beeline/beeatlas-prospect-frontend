import React, { FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Avatar, IconButton } from '@beeline/design-system-react';
import { ColorTypes } from '@beeline/design-system-react/types/types/status';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { TooltipContainer } from 'components/interaction';

import { useShowTooltip } from 'hooks';

import { itemTypeToColorMap, itemTypeToLettersMap } from './const';
import { ITreeItem } from './types';
import * as S from './units';

export const TreeItem: FC<ITreeItem> = ({ item, level, activeItem }) => {
    const [, setParams] = useSearchParams();
    const [isExpanded, setIsExpanded] = useState(false);
    const children = 'children' in item ? item.children : [];
    const hasChildren = children.length > 0;

    const titleRef = useRef<HTMLDivElement>(null);

    const showTitleTooltip = useShowTooltip(titleRef);

    const handleItemClick = () => {
        setParams(
            new URLSearchParams({
                id: String(item.code),
                type: item.type,
            }),
        );
    };

    useEffect(() => {
        if (
            (activeItem && 'cjData' in activeItem && activeItem.cjData.cjId === item.id) ||
            (activeItem && 'biData' in activeItem && activeItem.biData.biId === item.id)
        ) {
            setIsExpanded(true);
        }
    }, [activeItem]);

    return (
        <>
            <S.Container
                level={level}
                selected={activeItem?.code === item.code}
                onClick={handleItemClick}
            >
                <S.IconButtonContainer>
                    {hasChildren && (
                        <IconButton
                            size="medium"
                            iconName={isExpanded ? Icons.NavArrowDown : Icons.NavArrowRight}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                        />
                    )}
                </S.IconButtonContainer>
                <Avatar
                    color={itemTypeToColorMap[item.type] as ColorTypes}
                    letter={itemTypeToLettersMap[item.type]}
                />
                <S.TreeItemTitle ref={titleRef} data-tooltip-id={`title-${item.code}`}>
                    {item.title}
                </S.TreeItemTitle>
                {showTitleTooltip && (
                    <TooltipContainer
                        largePadding
                        id={`title-${item.code}`}
                        offset={8}
                        place="bottom"
                        noArrow
                    >
                        {item.title}
                    </TooltipContainer>
                )}
            </S.Container>
            {hasChildren && isExpanded && (
                <>
                    {children.map((child) => (
                        <TreeItem
                            key={child.code}
                            item={child}
                            level={level + 1}
                            activeItem={activeItem}
                        />
                    ))}
                </>
            )}
        </>
    );
};
