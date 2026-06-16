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
                        fitnessFunction.countSuccess === 0 &&
                        fitnessFunction.countAll === 0 &&
                        fitnessFunction.isCheck === false
                            ? 'error'
                            : fitnessFunction.countSuccess === fitnessFunction.countAll
                            ? 'success'
                            : fitnessFunction.countSuccess === 0
                            ? 'error'
                            : 'warning'
                    }
                    iconName={
                        fitnessFunction.countSuccess === 0 &&
                        fitnessFunction.countAll === 0 &&
                        fitnessFunction.isCheck === false
                            ? Icons.Close
                            : fitnessFunction.countSuccess === fitnessFunction.countAll
                            ? Icons.Check
                            : fitnessFunction.countSuccess === 0
                            ? Icons.Close
                            : Icons.Info
                    }
                />
            </S.CellVisual>
            <S.CellText>{formatCellText(fitnessFunction)}</S.CellText>
        </>
    );
};
