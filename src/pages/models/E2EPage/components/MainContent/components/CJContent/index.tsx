import React, { FC } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';

import * as R from 'router/const';

import { ICJContent } from './types';
import * as S from './units';

export const CJContent: FC<ICJContent> = ({ activeTreeItem }) => {
    return (
        <>
            <S.TitleContainer>
                <Text variant="h4">{activeTreeItem.title}</Text>
                <Text inactive variant="body3">
                    {activeTreeItem.code}
                </Text>
            </S.TitleContainer>
            <div>
                <Text inactive variant="body3">
                    CJ
                </Text>
                <Text variant="body2">
                    <Link url={`${R.CX_PATH}${R.CJ_PATH}${R.VIEW_PATH}?id=${activeTreeItem.id}`} />
                </Text>
            </div>
        </>
    );
};
