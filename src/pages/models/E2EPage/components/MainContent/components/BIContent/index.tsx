import React, { FC } from 'react';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { Link } from 'components/other';

import * as R from 'router/const';

import { E2ETreeItemType, IE2EBiItem } from '../../../../types';

import { IBIContent } from './types';
import * as S from './units';

export const BIContent: FC<IBIContent> = ({ activeItem }) => {
    return (
        <>
            <S.TitleContainer>
                <S.BreadcrumbsContainer>
                    <Link
                        outer={false}
                        title={(activeItem as IE2EBiItem).cjData.cjName}
                        url={`${R.MODELS_PATH}${R.E2E_PATH}?type=${E2ETreeItemType.CJ}&id=${
                            (activeItem as IE2EBiItem).cjData.cjCode
                        }`}
                    />
                    <Icon iconName={Icons.NavArrowRight} size="small" />
                </S.BreadcrumbsContainer>
                <Text variant="h4">{activeItem.title}</Text>
                <Text inactive variant="body3">
                    {activeItem.code}
                </Text>
            </S.TitleContainer>
            <div>
                <Text inactive variant="body3">
                    BI
                </Text>
                <Text variant="body2">
                    <Link url={`${R.CX_PATH}${R.BI_PATH}${R.VIEW_PATH}?id=${activeItem.id}`} />
                </Text>
            </div>
        </>
    );
};
