import React, { FC } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';

import { IReadOnlyNote } from './types';
import * as S from './units';

export const ReadOnlyNote: FC<IReadOnlyNote> = ({ linkTitle, url }) => (
    <S.Note>
        <Text variant="body3">Только чтение — изменить можно в источнике</Text>
        <Link title={linkTitle} url={url} />
    </S.Note>
);
