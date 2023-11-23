import React from 'react';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { IBIData } from 'api/bi/types';
import { capitalizeFirstLetter } from 'utils/helpers';

import { useHiddenRowsStore } from '../../store';

import { IRow } from './types';
import * as S from './units';

export const Row = <T,>({
    rowId,
    label,
    formatData,
    onAddButtonClick,
    firstRow = false,
    steps = [],
    parseData,
}: IRow<T>) => {
    const [hiddenRows, setHiddenRows, showHiddenRows] = useHiddenRowsStore((state) => [
        state.hiddenRows,
        state.setHiddenRows,
        state.showHiddenRows,
    ]);

    const isHidden = hiddenRows.includes(rowId);

    const allBIs = steps.reduce(
        (acc, step, stepIndex) => [...acc, ...(step.bi.length > 0 ? step.bi : [{ stepIndex }])],
        [] as (IBIData | { stepIndex: number })[],
    );

    return (
        <>
            {(!isHidden || showHiddenRows) && (
                <>
                    <S.Row isHidden={isHidden}>
                        <S.LabelTd
                            onClick={() =>
                                isHidden
                                    ? setHiddenRows(hiddenRows.filter((item) => item !== rowId))
                                    : setHiddenRows([...hiddenRows, rowId])
                            }
                            isClickable
                        >
                            <S.AlignItemsCenterWrapper>
                                {label}
                                <S.IconContainer>
                                    <S.IconStyled iconName={isHidden ? Icons.Eye : Icons.EyeOff} />
                                </S.IconContainer>
                            </S.AlignItemsCenterWrapper>
                        </S.LabelTd>
                        {allBIs.map((bi, i) => (
                            <>
                                {'stepIndex' in bi && firstRow && (
                                    <S.OnlyTd rowSpan={20}>
                                        <S.ButtonContainer>
                                            <div>Добавьте BI в шаг</div>
                                            <Button
                                                onClick={() => onAddButtonClick(bi.stepIndex)}
                                                variant="outlined"
                                                size="medium"
                                                startIcon={<Icon iconName={Icons.Add} />}
                                            />
                                        </S.ButtonContainer>
                                    </S.OnlyTd>
                                )}
                                {!('stepIndex' in bi) && (
                                    <S.Td
                                        key={i}
                                        data-testid={`${i}${capitalizeFirstLetter(rowId)}`}
                                    >
                                        {formatData(parseData(bi))}
                                    </S.Td>
                                )}
                            </>
                        ))}
                    </S.Row>
                </>
            )}
        </>
    );
};
