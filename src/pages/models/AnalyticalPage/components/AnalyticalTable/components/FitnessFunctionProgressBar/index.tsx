import React, { FC } from 'react';
import { useThemeStore } from 'features/theme';

import { ProgressBarColors } from 'components/ui';

import { IFitnessFunctionProgressBar } from './types';
import * as S from './units';

export const FitnessFunctionProgressBar: FC<IFitnessFunctionProgressBar> = ({
    products,
    fitnessFunction,
    isExpanded,
}) => {
    const productsWithFF = products.filter((product) =>
        product.fitnessFunctions.find((ff) => ff.ff_id === fitnessFunction.id),
    );

    const themeIsDark = useThemeStore((store) => store.themeIsDark);

    const checkedProducts = productsWithFF.filter((product) => {
        const productFF = product.fitnessFunctions.find((ff) => ff.ff_id === fitnessFunction.id);
        return productFF && productFF.is_check;
    });

    const percent = (checkedProducts.length / products.length) * 100;

    return (
        <>
            <S.CellVisual>
                <S.ProgressBarStyled
                    isExpanded={isExpanded}
                    themeIsDark={themeIsDark}
                    type="DonutChart"
                    width={40}
                    height={40}
                    innerRadius={13}
                    maxValue={100.01}
                    values={[
                        {
                            value: percent,
                            color:
                                percent === 100
                                    ? ProgressBarColors.green
                                    : ProgressBarColors.orange,
                        },
                    ]}
                />
            </S.CellVisual>
            <S.CellText>{percent.toFixed()}%</S.CellText>
        </>
    );
};
