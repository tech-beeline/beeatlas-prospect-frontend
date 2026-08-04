import React, { FC } from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IFitnessFunctionLabel } from './types';
import * as S from './units';
import { formatCellText } from './utils';

export const FitnessFunctionLabel: FC<IFitnessFunctionLabel> = ({ fitnessFunction }) => {
    if (!fitnessFunction)
        return (
            <S.CellVisual>
                <S.LabelStyled variant="outline" iconName={Icons.Info} />
            </S.CellVisual>
        );

    return (
        <>
            <S.CellVisual>
                <S.LabelStyled
                    variant="outline"
                    type={
                        fitnessFunction.successDetail === 0 &&
                        fitnessFunction.countDetail === 0 &&
                        fitnessFunction.is_check === false
                            ? 'error'
                            : fitnessFunction.successDetail === fitnessFunction.countDetail
                            ? 'success'
                            : fitnessFunction.successDetail === 0
                            ? 'error'
                            : 'warning'
                    }
                    iconName={
                        fitnessFunction.successDetail === 0 &&
                        fitnessFunction.countDetail === 0 &&
                        fitnessFunction.is_check === false
                            ? Icons.Close
                            : fitnessFunction.successDetail === fitnessFunction.countDetail
                            ? Icons.Check
                            : fitnessFunction.successDetail === 0
                            ? Icons.Close
                            : Icons.Info
                    }
                />
            </S.CellVisual>
            <S.CellText>{formatCellText(fitnessFunction)}</S.CellText>
        </>
    );
};
