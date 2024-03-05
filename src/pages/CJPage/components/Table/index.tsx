import React, { FC, useState } from 'react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { Nullable } from 'types/common';

import { IBIData } from 'api/bi/types';
import { useModal } from 'hooks';

import { StepForm } from '../StepForm';

import { ColumnMenu, Row } from './components';
import { COLORS, rowsData } from './const';
import { useHiddenRowsStore } from './store';
import { ITable } from './types';
import * as S from './units';

export const Table: FC<ITable> = ({ productId, cjId, tableData, draft }) => {
    const [hiddenRows, showHiddenRows, setShowHiddenRows] = useHiddenRowsStore((state) => [
        state.hiddenRows,
        state.showHiddenRows,
        state.setShowHiddenRows,
    ]);

    const [selectedStep, setSelectedStep] = useState<Nullable<number>>(null);

    const {
        modalOpened: stepFormOpened,
        openModal: openStepFrom,
        closeModal: closeStepForm,
    } = useModal();

    const allBIs = tableData.reduce(
        (acc, step) => [...acc, ...(step.bi.length > 0 ? step.bi : [])],
        [] as IBIData[],
    );

    const handleAddRowButtonClick = (biIndex: number) => {
        setSelectedStep(biIndex);
        openStepFrom();
    };

    return (
        <S.PageWrapper>
            <S.TableWrapper>
                <S.Table>
                    <S.Thead>
                        <S.Row>
                            <S.LabelTh>Шаги</S.LabelTh>

                            {tableData.map((step, stepIndex) => (
                                <S.Th
                                    colSpan={step.bi.length ?? 1}
                                    key={stepIndex}
                                    backgroundColor={COLORS[stepIndex % COLORS.length]}
                                >
                                    <S.FlexWrapper>
                                        <p data-testid={`${stepIndex}Step`}>{step.name}</p>

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
                        {(showHiddenRows
                            ? rowsData
                            : rowsData.filter((rowData) => !hiddenRows.includes(rowData.rowId))
                        ).map((rowData, i) => (
                            <Row
                                key={rowData.rowId}
                                draft={draft}
                                firstRow={i === 0}
                                rowId={rowData.rowId}
                                label={rowData.label}
                                onAddButtonClick={handleAddRowButtonClick}
                                formatData={rowData.formatData}
                                parseData={rowData.parseData}
                                steps={tableData}
                            />
                        ))}

                        <S.Row>
                            <S.LabelTd>
                                <S.HideOrShowButton
                                    onClick={() => setShowHiddenRows(!showHiddenRows)}
                                >
                                    {showHiddenRows ? 'Скрыть' : 'Показать скрытые'}

                                    <S.IconStyled
                                        size="large"
                                        iconName={showHiddenRows ? Icons.EyeOff : Icons.Eye}
                                    />
                                </S.HideOrShowButton>
                            </S.LabelTd>

                            {allBIs.length !== 0 && <S.Td colSpan={allBIs.length}></S.Td>}
                        </S.Row>
                    </S.Tbody>
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
