import React, { FC } from 'react';

import { IconButton } from 'components/ui';

import { Stage } from 'pages/cx/CJPage/components/StepForm/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

import * as S from '../../../../units';
import { BiMenu } from '../BiMenu';

import { IBiItem } from './types';

export const BiItem: FC<IBiItem> = ({
    bi,
    stepId,
    // newBi,
    index,
    totalLength,
    setSelectedBiId,
    setStage,
    // removeBi,
    // moveBi,
}) => {
    return (
        <S.BIFlexWrapper>
            <S.TitleFlexWrapper>
                <BiMenu
                    stepId={stepId}
                    biId={bi.id}
                    index={index}
                    totalLength={totalLength}
                    // removeBi={removeBi}
                    // moveBi={moveBi}
                />
                <div>
                    <S.Body2>{bi.name}</S.Body2>
                    <S.Body3>{bi.uniqueIdent}</S.Body3>
                    {/* <S.Body2>{newBi.name}</S.Body2>
                    <S.Body3>{newBi.uniqueIdent}</S.Body3> */}
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
            {/* <IconButton
                iconName={Icons.NavArrowRight}
                size="large"
                onClick={() => {
                    setSelectedBiId(newBi.id);
                    setStage(Stage.SELECTEDBIVIEW);
                }}
            /> */}
        </S.BIFlexWrapper>
    );
};
