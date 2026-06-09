import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { ILink } from './types';
import * as S from './units';

export const Link: FC<ILink> = ({
    title = 'Ссылка',
    url,
    showOuterIcon = false,
    showIconPermanently = false,
    iconLeft = false,
    outer = true,
    light = false,
    visited = false,
}) => {
    const navigate = useNavigate();
    return (
        <>
            {outer ? (
                url && Boolean(url) ? (
                    <S.Link
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noreferrer"
                        href={url}
                        light={light}
                        visited={visited}
                    >
                        {showOuterIcon && iconLeft && (
                            <S.IconOuter
                                iconLeft={iconLeft}
                                id="icon"
                                showIconPermanently={showIconPermanently}
                                iconName={Icons.OpenInBrowser}
                            />
                        )}
                        <span id="title">{title}</span>
                        {showOuterIcon && !iconLeft && (
                            <S.IconOuter
                                iconLeft={iconLeft}
                                id="icon"
                                showIconPermanently={showIconPermanently}
                                iconName={Icons.OpenInBrowser}
                            />
                        )}
                    </S.Link>
                ) : (
                    '—'
                )
            ) : (
                <S.Link visited={visited} onClick={() => navigate(url ?? '')}>
                    <span>{title}</span>
                </S.Link>
            )}
        </>
    );
};
