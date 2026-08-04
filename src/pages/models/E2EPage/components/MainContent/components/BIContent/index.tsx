import React, { FC } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { Icon } from 'components/ui';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { E2ETreeItemType, IE2EBiItem } from '../../../../types';

import { IBIContent } from './types';
import * as S from './units';

export const BIContent: FC<IBIContent> = ({ activeTreeItem }) => {
    return (
        <>
            <S.TitleContainer>
                <S.BreadcrumbsContainer>
                    <Link
                        outer={false}
                        title={(activeTreeItem as IE2EBiItem).cjData.cjName}
                        url={`${R.MODELS_PATH}${R.E2E_PATH}?type=${E2ETreeItemType.CJ}&id=${
                            (activeTreeItem as IE2EBiItem).cjData.cjCode
                        }`}
                    />
                    <Icon iconName={Icons.NavArrowRight} size="small" />
                </S.BreadcrumbsContainer>
                <Text variant="h4">{activeTreeItem.title}</Text>
                <Text inactive variant="body3">
                    {activeTreeItem.code}
                </Text>
            </S.TitleContainer>
            <div>
                <Text inactive variant="body3">
                    BI
                </Text>
                <Text variant="body2">
                    <Link url={`${R.CX_PATH}${R.BI_PATH}${R.VIEW_PATH}?id=${activeTreeItem.id}`} />
                </Text>
            </div>
        </>
    );
};
