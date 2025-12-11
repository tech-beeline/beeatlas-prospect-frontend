import React, { useState } from 'react';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { capitalizeFirstLetter } from 'utils/helpers';

import { useHiddenRowsStore } from '../../store/HiddenRowsStore';
import { RowIds } from '../../types';

import { EditableCell } from './components';
import { IReducedTableData, IRow, RowElementType } from './types';
import * as S from './units';

export const Row = <T,>({
    rowId,
    label,
    formatData,
    onAddButtonClick,
    firstRow = false,
    lastRow = false,
    steps = [],
    parseData,
    collapsedStedIds,
    draft,
    showShadow,
}: IRow<T>) => {
    const [hiddenRows, setHiddenRows, showHiddenRows] = useHiddenRowsStore((state) => [
        state.hiddenRows,
        state.setHiddenRows,
        state.showHiddenRows,
    ]);
    const isHidden = hiddenRows.includes(rowId);
    const [editingCell, setEditingCell] = useState<string | null>(null);

    const isLabelClickable = rowId !== RowIds.NAME || collapsedStedIds.length === 0;

    const reducedStepData: IReducedTableData = steps.reduce(
        (acc, step, stepIndex) => [
            ...acc,
            ...((collapsedStedIds.includes(step.id) && step.bi.length !== 0
                ? [{ type: RowElementType.COLLAPSED_STEP, biNames: step.bi.map((bi) => bi.name) }]
                : step.bi.length > 0
                ? step.bi.map((bi) => ({ type: RowElementType.BI, bi }))
                : [{ type: RowElementType.EMPTY_STEP, stepIndex }]) as IReducedTableData),
        ],
        [] as IReducedTableData,
    );
    const handleLabelClick = () => {
        setHiddenRows(
            isHidden ? hiddenRows.filter((item) => item !== rowId) : [...hiddenRows, rowId],
        );
    };

    return (
        <>
            {(!isHidden || showHiddenRows) && (
                <>
                    <S.Row isHidden={isHidden}>
                        <S.LabelTd
                            showShadow={showShadow}
                            isClickable={isLabelClickable}
                            onClick={handleLabelClick}
                        >
                            <S.AlignItemsCenterWrapper>
                                {label}
                                <S.IconContainer>
                                    <S.IconStyled
                                        size="large"
                                        iconName={isHidden ? Icons.Eye : Icons.EyeOff}
                                    />
                                </S.IconContainer>
                            </S.AlignItemsCenterWrapper>
                        </S.LabelTd>

                        {reducedStepData.map((element, i) => (
                            <>
                                {element.type === RowElementType.EMPTY_STEP && firstRow && (
                                    <S.OnlyTd rowSpan={999}>
                                        <S.ButtonContainer>
                                            <div>Добавьте BI в этап</div>
                                            <Button
                                                onClick={() => onAddButtonClick(element.stepIndex)}
                                                variant="outlined"
                                                size="medium"
                                                disabled={!draft}
                                                startIcon={<Icon iconName={Icons.Add} />}
                                            />
                                        </S.ButtonContainer>
                                    </S.OnlyTd>
                                )}

                                {element.type === RowElementType.COLLAPSED_STEP && (
                                    <S.Td
                                        key={i}
                                        borderRight={
                                            i === reducedStepData.length - 1 ||
                                            reducedStepData[i + 1].type === RowElementType.BI
                                        }
                                        noBottomBorder={!lastRow}
                                    >
                                        {firstRow && (
                                            <S.NamesContainer>
                                                {element.biNames.map((name, i) => (
                                                    <p key={i}>{name}</p>
                                                ))}
                                            </S.NamesContainer>
                                        )}
                                    </S.Td>
                                )}

                                {element.type === RowElementType.BI && (
                                    <S.Td
                                        key={i}
                                        borderRight={
                                            i === reducedStepData.length - 1 ||
                                            reducedStepData[i + 1].type ===
                                                RowElementType.COLLAPSED_STEP
                                        }
                                        alignTop={rowId === RowIds.SCENARION_BI}
                                        data-testid={`${i}${capitalizeFirstLetter(rowId)}`}
                                        locked={rowId === RowIds.SCENARION_BI}
                                        isEditing={editingCell === `${rowId}-${i}`}
                                        // onClick={() => {
                                        //     if (
                                        //         rowId !== RowIds.SCENARION_BI &&
                                        //         rowId !== RowIds.IDENTIFICATOR &&
                                        //         rowId !== RowIds.DOCUMENT
                                        //     ) {
                                        //         setEditingCell(`${rowId}-${i}`);
                                        //     }
                                        // }}
                                        // hoverable={
                                        //     rowId !== RowIds.IDENTIFICATOR &&
                                        //     rowId !== RowIds.DOCUMENT
                                        // }
                                    >
                                        <EditableCell
                                            rowId={rowId}
                                            formatData={formatData(parseData(element.bi))}
                                            element={element.bi}
                                            isEditing={editingCell === `${rowId}-${i}`}
                                            onEndEdit={() => setEditingCell(null)}
                                        />
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
