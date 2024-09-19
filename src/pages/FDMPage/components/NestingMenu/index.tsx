import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useMountEffect } from 'hooks';
import { ItemTypes } from 'pages/FDMPage/store/types';

import { useFDMStore } from '../../store';

import { Item } from './Item';
import * as S from './units';

export const NestingMenu = () => {
    const {
        items,
        loading,
        setActiveItem,
        getCoreCababilities,
        getParentCapabilities,
        clearActiveItem,
    } = useFDMStore();

    const [params] = useSearchParams();
    const id = Number(params.get('id'));
    const type = String(params.get('type'));

    useMountEffect(() => {
        (async () => {
            await getCoreCababilities();
            if (id && type) {
                await getParentCapabilities(id, type as ItemTypes);
                setActiveItem(id, type as ItemTypes);
            }
        })();

        return () => clearActiveItem();
    });

    useEffect(() => {
        if (id) {
            setActiveItem(id, type as ItemTypes);
        } else {
            clearActiveItem();
        }
    }, [params]);

    return (
        <S.Wrapper>
            <S.ResizableStyled
                enable={{ right: true }}
                defaultSize={{
                    width: 410,
                    height: 'calc(100vh - 64px)',
                }}
                minWidth={300}
                maxWidth={640}
            >
                <S.RightSide data-testid="Tree">
                    {loading
                        ? Array.from({ length: 3 }).map((_, i) => (
                              <S.SkeletonStyled key={i} height={52} radius={12} />
                          ))
                        : items.map((item) => <Item key={item.id} item={item} />)}
                </S.RightSide>
            </S.ResizableStyled>
        </S.Wrapper>
    );
};
