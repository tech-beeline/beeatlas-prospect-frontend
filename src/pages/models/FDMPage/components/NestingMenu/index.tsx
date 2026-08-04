import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from 'components/ui';

import { useMountEffect } from 'hooks';
import { ItemTypes } from 'pages/models/FDMPage/store/types';
import * as R from 'router/const';

import { useFDMStore } from '../../store';

import { ItemToScroll } from './components/Item/types';
import { ExportButton, Item } from './components';
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

    const navigate = useNavigate();

    const [params] = useSearchParams();
    const id = Number(params.get('id'));
    const type = String(params.get('type'));
    const [itemToScroll, setItemToScroll] = useState<ItemToScroll>(null);

    useMountEffect(() => {
        (async () => {
            await getCoreCababilities();
            if (id && type) {
                await getParentCapabilities(id, type as ItemTypes);
                setActiveItem(id, type as ItemTypes);
                setItemToScroll({ id, type: type as ItemTypes });
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
                <S.ButtonContainer>
                    <ExportButton />
                    <Button
                        onClick={() =>
                            navigate(
                                id && type
                                    ? `${R.MODELS_PATH}${R.FDM_PATH}${R.ADD_PATH}?from=${id},${type}`
                                    : `${R.MODELS_PATH}${R.FDM_PATH}${R.ADD_PATH}`,
                            )
                        }
                    >
                        Создать BC
                    </Button>
                </S.ButtonContainer>
                <S.MenuScroll>
                    <S.RightSide data-testid="Tree">
                        {loading
                            ? Array.from({ length: 3 }).map((_, i) => (
                                  <S.SkeletonStyled key={i} height={52} radius={12} />
                              ))
                            : items.map((item) => (
                                  <Item
                                      key={item.id}
                                      item={item}
                                      itemToScroll={itemToScroll}
                                      setItemToScroll={setItemToScroll}
                                  />
                              ))}
                    </S.RightSide>
                </S.MenuScroll>
            </S.ResizableStyled>
        </S.Wrapper>
    );
};
