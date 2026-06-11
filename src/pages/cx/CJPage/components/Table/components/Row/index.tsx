import React, { useState } from 'react';

import { Button, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { capitalizeFirstLetter } from 'utils/helpers';

import { useHiddenRowsStore } from '../../store/HiddenRowsStore';
import { RowIds } from '../../types';

import { EditableCell } from './components';
import { IReducedTableData, IRow, RowElementType, UNEDITABLE_CELLS } from './types';
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
    bpmn,
    onOpenStepFormByBiId,
    isBiEditable,
    canEditCJ,
}: IRow<T>) => {
    const [hiddenRows, setHiddenRows, showHiddenRows] = useHiddenRowsStore((state) => [
        state.hiddenRows,
        state.setHiddenRows,
        state.showHiddenRows,
    ]);
    const isHidden = hiddenRows.includes(rowId);
    const [activeCell, setActiveCell] = useState<{ rowId: RowIds; elementId: string } | null>(null);

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

    const handleCellClick = (rowId: RowIds, biId: string) => {
        if (UNEDITABLE_CELLS.has(rowId)) {
            return;
        }

        setActiveCell({ rowId, elementId: biId });
    };

    const handleCellEndEdit = () => {
        setActiveCell(null);
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
                                                disabled={!draft || bpmn || !canEditCJ}
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
                                    <>
                                        {(() => {
                                            const biId = String(element.bi.id);
                                            const isActive =
                                                activeCell?.rowId === rowId &&
                                                activeCell?.elementId === biId;
                                            const isGlobalEditable = isBiEditable
                                                ? isBiEditable(Number(biId))
                                                : true;
                                            const isEditable =
                                                !UNEDITABLE_CELLS.has(rowId) && isGlobalEditable;
                                            const content = formatData(
                                                parseData(element.bi),
                                                rowId === RowIds.IDENTIFICATOR
                                                    ? onOpenStepFormByBiId
                                                    : undefined,
                                            );
                                            return (
                                                <S.Td
                                                    key={i}
                                                    borderRight={
                                                        rowId === RowIds.SCENARION_BI ||
                                                        i === reducedStepData.length - 1 ||
                                                        reducedStepData[i + 1].type ===
                                                            RowElementType.COLLAPSED_STEP
                                                    }
                                                    alignTop={rowId === RowIds.SCENARION_BI}
                                                    data-testid={`${i}${capitalizeFirstLetter(
                                                        rowId,
                                                    )}`}
                                                    locked={rowId === RowIds.SCENARION_BI}
                                                    onClick={() => {
                                                        if (isEditable) {
                                                            handleCellClick(rowId, biId);
                                                        }
                                                    }}
                                                    hoverable={isEditable}
                                                    isEditing={isActive}
                                                >
                                                    <EditableCell
                                                        rowId={rowId}
                                                        formatData={content}
                                                        element={element.bi}
                                                        isActive={isActive}
                                                        onEndEdit={handleCellEndEdit}
                                                    />
                                                </S.Td>
                                            );
                                        })()}
                                    </>
                                )}
                            </>
                        ))}
                    </S.Row>
                </>
            )}
        </>
    );
};
