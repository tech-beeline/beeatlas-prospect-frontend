import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useMountEffect } from 'hooks';

import { useFDMStore } from '../../store';

import { Item } from './Item';
import * as S from './units';

export const NestingMenu = () => {
    const {
        menuItems,
        activeItem,
        setActiveItem,
        clearActiveItem,
        getGroupsAndDomains,
        getEntitiesByDomain,
    } = useFDMStore();

    const [params, setParams] = useSearchParams();
    const activeId = Number(params.get('id'));
    const domainId = Number(params.get('domainId'));
    const level = Number(params.get('level'));

    useMountEffect(() => {
        (async () => {
            await getGroupsAndDomains();
            if (domainId) {
                await getEntitiesByDomain(domainId);
            }
            if (activeId && level) {
                setActiveItem(activeId, level);
            }
        })();

        return () => clearActiveItem();
    });

    useEffect(() => {
        if (activeItem) {
            let domain = {};
            if (activeItem.domain_ref) {
                domain = { domainId: String(activeItem.domain_ref.id) };
            }
            if (activeItem.alias?.split('.')[0] === 'DMN') {
                domain = { domainId: String(activeItem.id) };
            }
            setParams(
                new URLSearchParams({
                    id: String(activeItem.id),
                    level: String(activeItem.level),
                    ...domain,
                }),
            );
        }
    }, [activeItem]);

    return (
        <S.Wrapper>
            <S.ResizableStyled
                defaultSize={{
                    width: 410,
                    height: '100vh',
                }}
                minWidth={300}
                maxWidth={640}
            >
                <S.RightSide>
                    {(menuItems[0]?.children ?? []).map((item) => (
                        <Item key={item.id} item={item} />
                    ))}
                </S.RightSide>
            </S.ResizableStyled>
        </S.Wrapper>
    );
};
