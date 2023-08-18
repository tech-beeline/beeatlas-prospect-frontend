import React, { useEffect } from 'react';
import { Skeleton } from '@beeline/design-system-react';
import { observer } from 'mobx-react';
import { NumberParam, useQueryParam } from 'use-query-params';

import { useMountEffect } from 'hooks';
import { useRootStore } from 'stores/initStore';

import { Item } from './Item';
import * as S from './units';

export const NestingMenu = observer(() => {
    const {
        fdmStore: {
            activeFDMItem,
            setActiveFDMItem,
            treeExpandArray,
            getItemChildren,
            itemChildren,
            setMenuTreeItems,
            menuTreeItems,
            isItemChildren,
            getGeneralMenuItems,
            isLoadingMenuItems,
            findElementById,
        },
    } = useRootStore();

    const [activeId, setActiveId] = useQueryParam('id', NumberParam);
    const [activeParentId, setActiveParentId] = useQueryParam('parentId', NumberParam);

    useMountEffect(() => {
        (async () => {
            await getGeneralMenuItems();

            if (activeId) {
                findElementById(activeId, activeParentId as number);
            }
        })();
    });

    useEffect(() => {
        activeFDMItem.id && setActiveId(activeFDMItem.id);
        activeFDMItem.parent && setActiveParentId(activeFDMItem.parent);
    }, [activeFDMItem]);

    return (
        <S.Wrapper className="NestingMenuWrapper">
            <S.ResizableStyled
                defaultSize={{
                    width: 410,
                    height: '100vh',
                }}
                minWidth={300}
                maxWidth={640}
            >
                <S.RightSide className="NestingMenuRightSide">
                    {isLoadingMenuItems ? (
                        <>
                            <Skeleton height={32} margin={{ bottom: 8 }} />
                            <Skeleton height={32} margin={{ bottom: 8 }} />
                            <Skeleton height={32} margin={{ bottom: 8 }} />
                            <Skeleton height={32} margin={{ bottom: 8 }} />
                            <Skeleton height={32} margin={{ bottom: 8 }} />
                            <Skeleton height={32} margin={{ bottom: 8 }} />
                            <Skeleton height={32} margin={{ bottom: 8 }} />
                        </>
                    ) : (
                        menuTreeItems.map((item, index) => (
                            <Item
                                key={index}
                                {...{
                                    activeFDMItem,
                                    setActiveFDMItem,
                                    treeExpandArray,
                                    getItemChildren,
                                    itemChildren,
                                    setMenuTreeItems,
                                    menuTreeItems,
                                    isItemChildren,
                                }}
                                {...item}
                            />
                        ))
                    )}
                </S.RightSide>
            </S.ResizableStyled>
        </S.Wrapper>
    );
});
