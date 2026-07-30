import React, { FC, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { TooltipContainer } from 'components/interaction';

import { useShowTooltip } from 'hooks';
import { E2ETreeItemType } from 'pages/models/E2EPage/types';

import { IListItem } from './types';
import * as S from './units';

export const ListItem: FC<IListItem> = ({ item, activeBiStep, itemToScroll, setItemToScroll }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const titleRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const showTitleTooltip = useShowTooltip(titleRef);

    const handleItemClick = () => {
        const params = new URLSearchParams(searchParams);
        params.set('id', String(item.uid));
        params.set('type', E2ETreeItemType.BI_STEP);
        setSearchParams(params);
    };

    useEffect(() => {
        if (itemToScroll && itemToScroll.uid === item.uid) {
            containerRef.current?.scrollIntoView({ behavior: 'smooth' });
            setItemToScroll(null);
        }
    }, [itemToScroll, setItemToScroll]);

    return (
        <>
            <S.Container
                selected={activeBiStep?.uid === item.uid}
                onClick={handleItemClick}
                ref={containerRef}
            >
                <S.TreeItemTitle ref={titleRef} data-tooltip-id={`title-${item.uid}`}>
                    {item.name}
                </S.TreeItemTitle>

                {showTitleTooltip && (
                    <TooltipContainer
                        largePadding
                        id={`title-${item.uid}`}
                        offset={8}
                        place="bottom"
                        noArrow
                    >
                        {item.name}
                    </TooltipContainer>
                )}
            </S.Container>
        </>
    );
};
