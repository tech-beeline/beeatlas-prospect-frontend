import React, { FC } from 'react';
import { Icon, Icons } from '@beeline/lk-ui';

import { IViewItemSwitcher } from './types';
import * as S from './units';

export const ViewItemSwitcher: FC<IViewItemSwitcher> = ({ activeElement, setActiveElement }) => {
    return (
        <S.Wrapper className="ViewItemSwitcherWrapper">
            <S.Element
                className="ViewItemSwitcherElement"
                id={0}
                {...{ activeElement }}
                onClick={() => setActiveElement(0)}
            >
                <Icon iconName={Icons.Grid} />
            </S.Element>

            <S.Element
                className="ViewItemSwitcherElement"
                id={1}
                {...{ activeElement }}
                onClick={() => setActiveElement(1)}
            >
                <Icon iconName={Icons.List} />
            </S.Element>
        </S.Wrapper>
    );
};
