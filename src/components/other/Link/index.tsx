import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { ILink } from './types';
import * as S from './units';

export const Link: FC<ILink> = ({ title = 'Ссылка', url, showOuterIcon, outer = true }) => {
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
                    >
                        <span>{title}</span>
                        {showOuterIcon && <S.IconOuter iconName={Icons.OpenInBrowser} />}
                    </S.Link>
                ) : (
                    '—'
                )
            ) : (
                <S.Link onClick={() => navigate(url ?? '')}>
                    <span>{title}</span>
                </S.Link>
            )}
        </>
    );
};
