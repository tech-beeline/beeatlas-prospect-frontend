import React, { FC, useRef, useState } from 'react';
import { useSideSheetStore } from 'features/cx/store';
import { Nullable } from 'types/common';

import { IconButton } from 'components/ui';

import { useBIEditabilityMap } from 'api/queries/bi';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { formatNullableString } from '../../../../../utils/formatters';
import { SideSheetVariants } from '../../const';
import { StepForm } from '../StepForm';
import { Stage } from '../StepForm/types';

import { useHiddenRowsStore } from './store/HiddenRowsStore';
import { ColumnMenu, Row } from './components';
import { COLORS, rowsData } from './const';
import { ITable, RowIds } from './types';
import * as S from './units';

export const Table: FC<ITable> = ({ productId, cjId, tableData, draft, bpmn, canEditCJ }) => {
    const [hiddenRows, showHiddenRows, setHiddenRows, setShowHiddenRows] = useHiddenRowsStore(
        (state) => [
            state.hiddenRows,
            state.showHiddenRows,
            state.setHiddenRows,
            state.setShowHiddenRows,
        ],
    );

    const [showStepDescription, setShowStepDescription] = useState(false);
    const [selectedBiIdForView, setSelectedBiIdForView] = useState<number | null>(null);
    const [collapsedStepIds, setCollapsedStepIds] = useState<number[]>([]);

    const biIds = tableData.flatMap((step) => step.bi?.map((bi) => bi.id) ?? []);

    const { data: biEditabilityMap = {} } = useBIEditabilityMap(biIds);

    const isBiEditable = (biId: number): boolean => {
        return biEditabilityMap[biId] ?? true;
    };

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
    const { openSideSheet, toggleSideSheet, closeSideSheet } = useSideSheetStore();

    const handleAddRowButtonClick = (biIndex: number) => {
        setSelectedStep(biIndex);
        setSelectedBiIdForView(null);
        toggleSideSheet(SideSheetVariants.SIDEBLOCK_BI);
    };

    const rowsFiltered =
        collapsedStepIds.length === tableData.length
            ? rowsData.filter((rowData) => rowData.rowId === RowIds.NAME)
            : showHiddenRows
            ? rowsData
            : rowsData.filter((rowData) => !hiddenRows.includes(rowData.rowId));

    const [showShadow, setShowShadow] = useState<boolean>(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleTableScroll = () => {
        setShowShadow(Boolean(wrapperRef.current && wrapperRef.current.scrollLeft !== 0));
    };

    const openStepFormByBiId = (biId: number) => {
        const stepIndex = tableData.findIndex(
            (step) => step.bi && step.bi.some((bi) => bi.id === biId),
        );

        if (stepIndex === -1) return;

        setSelectedStep(stepIndex);
        setSelectedBiIdForView(biId);
        if (openSideSheet !== SideSheetVariants.SIDEBLOCK_BI) {
            toggleSideSheet(SideSheetVariants.SIDEBLOCK_BI);
        }
    };

    return (
        <S.PageWrapper>
            <S.TableWrapper ref={wrapperRef} onScroll={handleTableScroll}>
                <S.Table>
                    <S.Thead>
                        <S.Row>
                            <S.LabelTh showShadow={showShadow}>
                                <S.FlexWrapper>
                                    <div>Этапы</div>
                                    <IconButton
                                        iconName={
                                            showStepDescription
                                                ? Icons.NavArrowUp
                                                : Icons.NavArrowDown
                                        }
                                        onClick={() => setShowStepDescription(!showStepDescription)}
                                        size="medium"
                                    />
                                </S.FlexWrapper>
                            </S.LabelTh>

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
                                                disabled={!step.bi || step.bi.length === 0}
                                            />
                                            <S.TooltipStyled
                                                id={`collapse-${step.id}`}
                                                place="bottom"
                                                noArrow
                                            >
                                                {collapsedStepIds.includes(step.id)
                                                    ? 'Развернуть'
                                                    : 'Свернуть'}{' '}
                                                этап
                                            </S.TooltipStyled>
                                            <p data-testid={`${stepIndex}Step`}>{step.name}</p>
                                        </S.TitleWrapper>

                                        {draft && !bpmn && canEditCJ && (
                                            <ColumnMenu
                                                cjId={cjId}
                                                stepId={step.id}
                                                stepName={step.name}
                                                stepDescription={step.description ?? ''}
                                                stepIndex={stepIndex}
                                                setOpenSideBlockName={() =>
                                                    toggleSideSheet(SideSheetVariants.SIDEBLOCK_BI)
                                                }
                                                setRenameIndex={setSelectedStep}
                                                collapsedStepIds={collapsedStepIds}
                                                setCollapsedStepIds={setCollapsedStepIds}
                                                tableDataLength={tableData.length}
                                            />
                                        )}
                                    </S.FlexWrapper>
                                </S.Th>
                            ))}
                        </S.Row>
                        {showStepDescription && (
                            <S.Row>
                                <S.Td>Описание этапа</S.Td>
                                {tableData.map((step, stepIndex) => (
                                    <S.Td
                                        colSpan={
                                            collapsedStepIds.includes(step.id) ? 1 : step.bi?.length
                                        }
                                        key={stepIndex}
                                        backgroundColor={COLORS[stepIndex % COLORS.length]}
                                    >
                                        {formatNullableString(step.description)}
                                    </S.Td>
                                ))}
                            </S.Row>
                        )}
                    </S.Thead>

                    <S.Tbody>
                        {rowsFiltered.map((rowData, i) => (
                            <Row
                                key={rowData.rowId}
                                draft={draft}
                                showShadow={showShadow}
                                firstRow={i === 0}
                                lastRow={i === rowsFiltered.length - 1}
                                rowId={rowData.rowId}
                                label={rowData.label}
                                onAddButtonClick={handleAddRowButtonClick}
                                formatData={rowData.formatData}
                                parseData={rowData.parseData}
                                steps={tableData}
                                collapsedStedIds={collapsedStepIds}
                                bpmn={bpmn}
                                onOpenStepFormByBiId={openStepFormByBiId}
                                isBiEditable={isBiEditable}
                                canEditCJ={canEditCJ}
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
                    key={`stepform-${selectedStep}-${selectedBiIdForView}`}
                    productId={productId}
                    cjId={cjId}
                    step={tableData[selectedStep ?? 0]}
                    isOpen={openSideSheet === SideSheetVariants.SIDEBLOCK_BI}
                    draft={draft}
                    bpmn={bpmn}
                    onClose={closeSideSheet}
                    initialBiId={selectedBiIdForView ?? undefined}
                    initialStage={selectedBiIdForView != null ? Stage.BIVIEW : undefined}
                />
            )}
        </S.PageWrapper>
    );
};
