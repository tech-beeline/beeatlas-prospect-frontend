import React, { FC, useState } from 'react';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { sendAnalytics } from 'features/analytics';

import * as T from './types';
import * as S from './units';

export const MenuItem: FC<T.IMenuItem> = ({ item, hintText, onMouseEnter, onMouseLeave }) => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    return (
        <S.Item
            onMouseEnter={() => onMouseEnter(item.label)}
            onMouseLeave={onMouseLeave}
            isActive={item.label === hintText}
        >
            <p className="menuItem">{item.label}</p>
            <S.IconsContainer>
                {item.link && (
                    <>
                        <IconButton
                            iconName={Icons.OpenInBrowser}
                            size="large"
                            onClick={() => {
                                sendAnalytics(['techradar', 'link', item.label]);
                                window.open(item.link ?? '', '_blank');
                            }}
                            onMouseEnter={() => setIsTooltipOpen(true)}
                            onMouseLeave={() => setIsTooltipOpen(false)}
                            data-tooltip-id={`link-${item.id}`}
                        />
                        <S.TooltipContainer
                            id={`link-${item.id}`}
                            offset={8}
                            place="top"
                            noArrow
                            isOpen={isTooltipOpen}
                        >
                            Перейти на страницу с описанием
                        </S.TooltipContainer>
                    </>
                )}
            </S.IconsContainer>
        </S.Item>
    );
};
