import React, { FC } from 'react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Icon } from 'components/ui';

import { IViewItemSwitcher } from './types';
import * as S from './units';

export const ViewItemSwitcher: FC<IViewItemSwitcher> = ({ activeElement, setActiveElement }) => {
    return (
        <S.Wrapper>
            <S.Element id={0} {...{ activeElement }} onClick={() => setActiveElement(0)}>
                <Icon iconName={Icons.Grid} />
            </S.Element>

            <S.Element id={1} {...{ activeElement }} onClick={() => setActiveElement(1)}>
                <Icon iconName={Icons.List} />
            </S.Element>
        </S.Wrapper>
    );
};
