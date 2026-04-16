import React, { FC } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';

import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { ILifeSituations } from './types';
import * as S from './units';

export const LifeSituations: FC<ILifeSituations> = ({ chapters }) => {
    return (
        <S.Container>
            {chapters.map((chapter) => (
                <div key={chapter.id}>
                    <Link
                        title={chapter.name}
                        url={`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}?chapterId=${chapter.id}`}
                    />
                    <Text inactive variant="body3">
                        {formatNullableString(chapter.code)}
                    </Text>
                </div>
            ))}
        </S.Container>
    );
};
