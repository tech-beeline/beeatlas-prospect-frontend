import React, { FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Avatar, ColorTypes } from 'components/ui';

import { useShowTooltip } from 'hooks';
import { E2ETreeItemType } from 'pages/models/E2EPage/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { itemTypeToColorMap, itemTypeToLettersMap } from './const';
import { ITreeItem } from './types';
import * as S from './units';

export const TreeItem: FC<ITreeItem> = ({
    item,
    level,
    activeTreeItem,
    itemToScroll,
    setItemToScroll,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isExpanded, setIsExpanded] = useState(false);
    const children = 'children' in item ? item.children : [];
    const hasChildren = children.length > 0;

    const titleRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const showTitleTooltip = useShowTooltip(titleRef);

    const handleItemClick = () => {
        const params = new URLSearchParams(searchParams);
        params.set('id', String(item.code));
        params.set('type', item.type);
        setSearchParams(params);
    };

    useEffect(() => {
        if (itemToScroll && itemToScroll.code === item.code) {
            containerRef.current?.scrollIntoView({ behavior: 'smooth' });
            setItemToScroll(null);
        }
    }, [itemToScroll, item, setItemToScroll]);

    useEffect(() => {
        if (
            (activeTreeItem &&
                'cjData' in activeTreeItem &&
                activeTreeItem.cjData.cjId === item.id) ||
            (activeTreeItem && 'biData' in activeTreeItem && activeTreeItem.biData.biId === item.id)
        ) {
            setIsExpanded(true);
        }
    }, [activeTreeItem]);

    return (
        <>
            <S.Container
                isBiStep={item.type === E2ETreeItemType.BI_STEP}
                id={`tree-item-${item.code}`}
                level={level}
                selected={activeTreeItem?.code === item.code}
                onClick={handleItemClick}
                ref={containerRef}
            >
                {item.type !== E2ETreeItemType.BI_STEP && (
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
                )}
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
                            activeTreeItem={activeTreeItem}
                            itemToScroll={itemToScroll}
                            setItemToScroll={setItemToScroll}
                        />
                    ))}
                </>
            )}
        </>
    );
};
