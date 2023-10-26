import React, { FC } from 'react';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Stage } from 'pages/CJPage/components/StepForm/types';

import * as S from '../../../../units';
import { BiMenu } from '../BiMenu';

import { IBiItem } from './types';

export const BiItem: FC<IBiItem> = ({
    bi,
    index,
    totalLength,
    setSelectedBiId,
    setStage,
    removeBi,
    moveBi,
}) => {
    return (
        <S.BIFlexWrapper>
            <S.TitleFlexWrapper>
                <BiMenu
                    bi={bi}
                    index={index}
                    totalLength={totalLength}
                    removeBi={removeBi}
                    moveBi={moveBi}
                />
                <div>
                    <S.Body2>{bi.name}</S.Body2>
                    <S.Body3>{bi.identificator}</S.Body3>
                </div>
            </S.TitleFlexWrapper>
            <IconButton
                iconName={Icons.NavArrowRight}
                size="large"
                onClick={() => {
                    setSelectedBiId(bi.id);
                    setStage(Stage.SELECTEDBIVIEW);
                }}
            />
        </S.BIFlexWrapper>
    );
};
