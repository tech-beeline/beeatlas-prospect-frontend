import React from 'react';

import * as S from './units';

export const formatLinkFromString = (str: string | undefined | null) =>
    str && Boolean(str) ? (
        <S.Link target="_blank" rel="noreferrer" href={str}>
            Ссылка
        </S.Link>
    ) : (
        '—'
    );
