import React, { FC } from 'react';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';

import { ICapabilityCardCriteriaComment } from './types';
import * as S from './units';

export const CapabilityCardCriteriaComment: FC<ICapabilityCardCriteriaComment> = ({
    id,
    comment,
}) => {
    return (
        <>
            {comment && (
                <S.CommentContainer>
                    <Text variant="body3">Комментарий</Text>
                    <Icon iconName={Icons.Chat} size="large" data-tooltip-id={id} />
                    <TooltipContainer
                        displayFlex
                        largePadding
                        largeWidth
                        id={id}
                        offset={8}
                        // @ts-ignore
                        place="bottom-start"
                        noArrow
                    >
                        <Text variant="h5">Комментарий</Text>
                        <Text variant="caption">{comment}</Text>
                    </TooltipContainer>
                </S.CommentContainer>
            )}
        </>
    );
};
