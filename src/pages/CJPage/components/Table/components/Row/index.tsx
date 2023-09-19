import React from 'react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { IRow } from './types';
import * as S from './units';

export const Row = <T,>({
    rowId,
    label,
    hiddenRows,
    setHiddenRows,
    isHiddenRowsVisible,
    rowData,
    formatData,
}: IRow<T>) => {
    const isHidden = hiddenRows.includes(rowId);
    return (
        <>
            {(!isHidden || isHiddenRowsVisible) && (
                <>
                    <S.Row isHidden={isHidden}>
                        <S.Td
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
                        </S.Td>
                        {rowData.map((bi, i) => (
                            <S.Td key={i}>{formatData(bi)}</S.Td>
                        ))}
                    </S.Row>
                </>
            )}
        </>
    );
};
