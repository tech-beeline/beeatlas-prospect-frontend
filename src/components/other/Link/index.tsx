import React, { FC } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { ILink } from './types';
import * as S from './units';

export const Link: FC<ILink> = ({ title = 'Ссылка', url, outer = true }) => {
    return (
        <>
            {outer ? (
                url && Boolean(url) ? (
                    <S.Link target="_blank" rel="noreferrer" href={url}>
                        {title}
                    </S.Link>
                ) : (
                    '—'
                )
            ) : (
                <ReactRouterLink to={url ?? ''}>
                    <S.Link>{title}</S.Link>
                </ReactRouterLink>
            )}
        </>
    );
};
