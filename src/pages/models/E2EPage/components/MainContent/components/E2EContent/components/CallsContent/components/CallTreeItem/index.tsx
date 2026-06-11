import React, { FC, useState } from 'react';

import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { ICallTreeItem } from './types';
import * as S from './units';

export const CallTreeItem: FC<ICallTreeItem> = ({ level, item }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <S.Container level={level}>
                <S.IconButtonContainer>
                    {item.children.length > 0 && (
                        <IconButton
                            size="medium"
                            iconName={isExpanded ? Icons.NavArrowDown : Icons.NavArrowRight}
                            onClick={() => setIsExpanded(!isExpanded)}
                        />
                    )}
                </S.IconButtonContainer>
                {item.name}
            </S.Container>
            {isExpanded &&
                item.children.map((child) => (
                    <CallTreeItem key={child.name} item={child} level={level + 1} />
                ))}
        </>
    );
};
