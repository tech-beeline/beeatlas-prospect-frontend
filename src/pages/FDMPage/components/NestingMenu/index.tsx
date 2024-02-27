import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useMountEffect } from 'hooks';

import { useFDMStore } from '../../store';

import { Item } from './Item';
import * as S from './units';

export const NestingMenu = () => {
    const { menuItems, setActiveItem, clearActiveItem, getGroupsAndDomains, getEntitiesByDomain } =
        useFDMStore();

    const [params] = useSearchParams();
    const id = Number(params.get('id'));
    const domainId = Number(params.get('domainId'));
    const level = Number(params.get('level'));

    useMountEffect(() => {
        (async () => {
            await getGroupsAndDomains();
            if (domainId) {
                await getEntitiesByDomain(domainId);
            }
            if (id) {
                setActiveItem(id, level);
            }
        })();

        return () => clearActiveItem();
    });

    useEffect(() => {
        const id = Number(params.get('id'));
        const level = Number(params.get('level'));
        if (id) {
            setActiveItem(id, level);
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
                    {(menuItems[0]?.children ?? []).map((item) => (
                        <Item key={item.id} item={item} />
                    ))}
                </S.RightSide>
            </S.ResizableStyled>
        </S.Wrapper>
    );
};
