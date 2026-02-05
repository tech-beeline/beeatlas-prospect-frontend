import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { ILink } from './types';
import * as S from './units';

export const Link: FC<ILink> = ({
    title = 'Ссылка',
    url,
    showOuterIcon = false,
    showIconPermanently = false,
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
                        <span>{title}</span>
                        {showOuterIcon && (
                            <S.IconOuter
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
