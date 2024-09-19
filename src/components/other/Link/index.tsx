import React, { FC } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { ILink } from './types';
import * as S from './units';

export const Link: FC<ILink> = ({ title = 'Ссылка', url, showOuterIcon, outer = true }) => {
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
                <ReactRouterLink to={url ?? ''}>
                    <S.Link onClick={(e) => e.stopPropagation()}>
                        <span>{title}</span>
                    </S.Link>
                </ReactRouterLink>
            )}
        </>
    );
};
