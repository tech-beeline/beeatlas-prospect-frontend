import React, { FC, useState } from 'react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { Nullable } from 'types/common';

import { useModal } from 'hooks';

import { StepForm } from '../StepForm';

import { ColumnMenu, Row } from './components';
import { COLORS, rowsData } from './const';
import { useHiddenRowsStore } from './store';
import { ITable, RowIds } from './types';
import * as S from './units';

export const Table: FC<ITable> = ({ productId, cjId, tableData, draft }) => {
    const [hiddenRows, showHiddenRows, setHiddenRows, setShowHiddenRows] = useHiddenRowsStore(
        (state) => [
            state.hiddenRows,
            state.showHiddenRows,
            state.setHiddenRows,
            state.setShowHiddenRows,
        ],
    );

    const [collapsedStepIds, setCollapsedStepIds] = useState<number[]>([]);

    const handleCollapseStepButtonClick = (stepId: number) => {
        if (collapsedStepIds.includes(stepId)) {
            setCollapsedStepIds(collapsedStepIds.filter((id) => id !== stepId));
        } else {
            setCollapsedStepIds([...collapsedStepIds, stepId]);
            setHiddenRows(hiddenRows.filter((row) => row !== RowIds.NAME));
        }
    };

    const handleCollapseAllButtonClick = () => {
        if (collapsedStepIds.length > 0) {
            setCollapsedStepIds([]);
        } else {
            setCollapsedStepIds(tableData.map((step) => step.id));
            setHiddenRows(hiddenRows.filter((row) => row !== RowIds.NAME));
        }
    };

    const [selectedStep, setSelectedStep] = useState<Nullable<number>>(null);

    const {
        modalOpened: stepFormOpened,
        openModal: openStepFrom,
        closeModal: closeStepForm,
    } = useModal();

    const handleAddRowButtonClick = (biIndex: number) => {
        setSelectedStep(biIndex);
        openStepFrom();
    };

    const rowsFiltered =
        collapsedStepIds.length === tableData.length
            ? rowsData.filter((rowData) => rowData.rowId === RowIds.NAME)
            : showHiddenRows
            ? rowsData
            : rowsData.filter((rowData) => !hiddenRows.includes(rowData.rowId));

    return (
        <S.PageWrapper>
            <S.TableWrapper>
                <S.Table>
                    <S.Thead>
                        <S.Row>
                            <S.LabelTh>Шаги</S.LabelTh>

                            {tableData.map((step, stepIndex) => (
                                <S.Th
                                    colSpan={
                                        collapsedStepIds.includes(step.id) ? 1 : step.bi?.length
                                    }
                                    key={stepIndex}
                                    backgroundColor={COLORS[stepIndex % COLORS.length]}
                                >
                                    <S.FlexWrapper>
                                        <S.TitleWrapper>
                                            <S.CollapseIcon
                                                iconName={
                                                    collapsedStepIds.includes(step.id)
                                                        ? Icons.ArrowSeparateVertical
                                                        : Icons.ArrowUnionVertical
                                                }
                                                onClick={() =>
                                                    handleCollapseStepButtonClick(step.id)
                                                }
                                                data-tooltip-id={`collapse-${step.id}`}
                                            />
                                            <S.TooltipStyled
                                                id={`collapse-${step.id}`}
                                                place="bottom"
                                                noArrow
                                            >
                                                {collapsedStepIds.includes(step.id)
                                                    ? 'Развернуть'
                                                    : 'Свернуть'}{' '}
                                                шаг
                                            </S.TooltipStyled>
                                            <p data-testid={`${stepIndex}Step`}>{step.name}</p>
                                        </S.TitleWrapper>

                                        {draft && (
                                            <ColumnMenu
                                                cjId={cjId}
                                                stepId={step.id}
                                                stepName={step.name}
                                                stepIndex={stepIndex}
                                                setOpenSideBlockName={openStepFrom}
                                                setRenameIndex={setSelectedStep}
                                                tableDataLength={tableData.length}
                                            />
                                        )}
                                    </S.FlexWrapper>
                                </S.Th>
                            ))}
                        </S.Row>
                    </S.Thead>

                    <S.Tbody>
                        {rowsFiltered.map((rowData, i) => (
                            <Row
                                key={rowData.rowId}
                                draft={draft}
                                firstRow={i === 0}
                                lastRow={i === rowsFiltered.length - 1}
                                rowId={rowData.rowId}
                                label={rowData.label}
                                onAddButtonClick={handleAddRowButtonClick}
                                formatData={rowData.formatData}
                                parseData={rowData.parseData}
                                steps={tableData}
                                collapsedStedIds={collapsedStepIds}
                            />
                        ))}
                    </S.Tbody>

                    {collapsedStepIds.length !== tableData.length && (
                        <S.TableActionButton onClick={() => setShowHiddenRows(!showHiddenRows)}>
                            {showHiddenRows ? 'Скрыть' : 'Показать скрытые'}

                            <S.IconStyled
                                size="large"
                                iconName={showHiddenRows ? Icons.EyeOff : Icons.Eye}
                            />
                        </S.TableActionButton>
                    )}

                    <S.TableActionButton onClick={handleCollapseAllButtonClick}>
                        {collapsedStepIds.length > 0 ? 'Развернуть CJ' : 'Свернуть CJ'}

                        <S.IconStyled
                            size="large"
                            iconName={
                                collapsedStepIds.length > 0
                                    ? Icons.ArrowSeparateVertical
                                    : Icons.ArrowUnionVertical
                            }
                        />
                    </S.TableActionButton>
                </S.Table>
            </S.TableWrapper>

            {tableData[selectedStep ?? 0] && (
                <StepForm
                    productId={productId}
                    cjId={cjId}
                    step={tableData[selectedStep ?? 0]}
                    isOpen={stepFormOpened}
                    onClose={closeStepForm}
                />
            )}
        </S.PageWrapper>
    );
};
