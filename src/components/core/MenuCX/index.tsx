import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import * as ROUTER from 'router/const';

import * as S from './units';

export const MenuCX = () => {
    return (
        <S.Wrapper>
            <S.LinkStyled
                to={`${ROUTER.CX_PATH}${ROUTER.CJ_PATH}`}
                isActive={location.pathname?.includes(ROUTER.SEARCH_PATH)}
            >
                <S.Tab isActive={location.pathname?.includes(ROUTER.CJ_PATH)}>
                    <Icon iconName={Icons.Map} />
                </S.Tab>
            </S.LinkStyled>

            <Link to={`${ROUTER.CX_PATH}${ROUTER.BI_PATH}`}>
                <S.Tab isActive={location.pathname?.includes(ROUTER.BI_PATH)}>
                    <Icon iconName={Icons.Puzzle} />
                </S.Tab>
            </Link>
        </S.Wrapper>
    );
};
