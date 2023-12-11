import React, { FC } from 'react';

import { ILink } from './types';
import * as S from './units';

export const Link: FC<ILink> = ({ title = 'Ссылка', url }) => {
    return (
        <>
            {url && Boolean(url) ? (
                <S.Link target="_blank" rel="noreferrer" href={url}>
                    {title}
                </S.Link>
            ) : (
                '—'
            )}
        </>
    );
};
