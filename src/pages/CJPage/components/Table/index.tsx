import React, { FC, useEffect, useState } from 'react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { Nullable } from 'types/common';

import { useModal } from 'hooks';
import { useMockCJtore } from 'pages/CJLibraryPage/mocks';
import { BI, Step } from 'pages/CJPage/mocks';
import { formatNullableString } from 'utils/formatters';
import { useSnackbarStore } from 'widgets/Snackbar';

import {
    formatCommunal,
    formatFeeling,
    formatLinkFromString,
    formatParticipants,
    formatStatus,
    formatType,
    getChannel,
} from '../../utils/formatters';
import { StepForm } from '../StepForm';

import { Row } from './components/Row';
import { ColumnMenu } from './components';
import { ITable } from './types';
import * as S from './units';

const colors = [
    'var(--color-accent-lemon-background)',
    'var(--color-status-success-background)',
    'var(--color-accent-magenta-background)',
    'var(--color-accent-teal-background)',
];

export const Table: FC<ITable> = ({ cjId, tableData, setTableData }) => {
    // const [tableData, setTableData] = useState<Step[]>([]);

    const { updateCj } = useMockCJtore();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const [hiddenRows, setHiddenRows] = useState<string[]>([]);
    const [isHiddenRowsVisible, setHiddenRowsVisible] = useState(false);
    const [selectedStep, setSelectedStep] = useState<Nullable<number>>(null);

    const {
        modalOpened: stepFormOpened,
        openModal: openStepFrom,
        closeModal: closeStepForm,
    } = useModal();

    const addColors = (data: any[], colors: any[]) => {
        const colorCount = colors.length;

        const newData = data.map((item, index) => {
            const colorIndex = index % colorCount;
            const color = colors[colorIndex];

            return {
                color: color,
                ...item,
            };
        });

        setTableData(newData as any);
    };

    useEffect(() => {
        if (tableData.some((step) => !step.color)) {
            addColors(tableData, colors);
        }
    }, [tableData]);

    const changePositionOfColumn = (index: number, isRight?: boolean) => {
        const copyOfData = [...tableData];
        const temp = copyOfData[index];

        if (isRight) {
            copyOfData[index] = copyOfData[index + 1];
            copyOfData[index + 1] = temp;
        } else {
            copyOfData[index] = copyOfData[index - 1];
            copyOfData[index - 1] = temp;
        }

        setTableData(copyOfData);
        updateCj(cjId, { steps: copyOfData });
        showSnackbar({ message: 'Шаг перемещён' });
    };

    const removeColumn = (indexForRemove: number) => {
        const data = tableData.filter((_, index) => index !== indexForRemove);
        setTableData(data);
        updateCj(cjId, { steps: data });
        showSnackbar({ message: 'Шаг удалён' });
    };

    const addNewColumn = (index: number) => {
        let excludedСolors: any = [];

        if (index === 0 && tableData.length > 1) {
            excludedСolors = [tableData[index].color, tableData[index + 1].color];
        } else if (index === tableData.length && tableData.length > 1) {
            excludedСolors = [tableData[index - 2].color, tableData[index - 1].color];
        } else if (tableData.length > 1) {
            excludedСolors = [tableData[index].color, tableData[index - 1].color];
        } else {
            excludedСolors = [tableData[0].color];
        }

        const availableСolors = colors.filter((color) => !excludedСolors.includes(color));

        const newColumn: Step = {
            bis: [],
            color: availableСolors[Math.floor(Math.random() * availableСolors.length)],
            columnName: 'Название шага',
        };

        const copyOfData = [...tableData];

        copyOfData.splice(index, 0, newColumn);

        setTableData(copyOfData);
        updateCj(cjId, { steps: copyOfData });
        showSnackbar({ message: 'Шаг добавлен' });
    };

    const updateStep = (name: string, bis: BI[]) => {
        const data = tableData.map((item, index) =>
            index === selectedStep ? { ...item, columnName: name, bis } : item,
        );
        setTableData(data);
        updateCj(cjId, { steps: data });
        showSnackbar({ message: 'Изменения сохранены' });
    };

    const allBIs = tableData.reduce(
        (acc, step) => [...acc, ...(step.bis.length > 0 ? step.bis : [])],
        [] as BI[],
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
                                    colSpan={step.bis.length ?? 1}
                                    key={stepIndex}
                                    backgroundColor={step.color}
                                >
                                    <S.FlexWrapper>
                                        <p data-testid={`${stepIndex}Step`}>{step.columnName}</p>

                                        <ColumnMenu
                                            addStep={addNewColumn}
                                            changePositionOfStep={changePositionOfColumn}
                                            deleteStep={removeColumn}
                                            stepIndex={stepIndex}
                                            setOpenSideBlockName={openStepFrom}
                                            setRenameIndex={setSelectedStep}
                                            tableDataLength={tableData.length}
                                        />
                                    </S.FlexWrapper>
                                </S.Th>
                            ))}
                        </S.Row>
                    </S.Thead>

                    <S.Tbody>
                        <Row
                            firstRow
                            rowId="name"
                            label="Наименование BI"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatNullableString}
                            parseData={(bi) => bi.name}
                            steps={tableData}
                        />
                        <Row
                            rowId="identificator"
                            label="Идентификатор BI"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatNullableString}
                            parseData={(bi) => bi.identificator}
                            steps={tableData}
                        />
                        <Row
                            rowId="descr"
                            label="Описание"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatNullableString}
                            parseData={(bi) => bi.descr}
                            steps={tableData}
                        />
                        <Row
                            rowId="communal"
                            label="Коммунальный"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatCommunal}
                            parseData={(bi) => bi.communal}
                            steps={tableData}
                        />
                        <Row
                            rowId="type"
                            label="Характеристики"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatType}
                            parseData={(bi) => bi.type}
                            steps={tableData}
                        />
                        <Row<number>
                            rowId="status"
                            label="Статус стадии ЖЦ"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatStatus}
                            parseData={(bi) => bi.status}
                            steps={tableData}
                        />
                        <Row
                            rowId="participants"
                            label="Участники взаимодействия"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatParticipants}
                            parseData={(bi) => bi.participants}
                            steps={tableData}
                        />
                        {/* <Row
                            rowId="enters"
                            label="Входы/выходы"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatEnters}
                            parseData={(bi) => bi.enters}
                            steps={tableData}
                        /> */}
                        <Row
                            rowId="feelings"
                            label="Чувства и эмоции клиента"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatFeeling}
                            parseData={(bi) => bi.feelings}
                            steps={tableData}
                        />

                        <Row
                            rowId="clientScenario"
                            label="Клиентский сценарий"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatNullableString}
                            parseData={(bi) => bi.clientScenario}
                            steps={tableData}
                        />
                        <Row
                            rowId="flowLink"
                            label="Ссылка на флоу"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatLinkFromString}
                            parseData={(bi) => bi.flowLink}
                            steps={tableData}
                        />
                        <Row
                            rowId="ucsReaction"
                            label="Описание реакции ЕКП"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatNullableString}
                            parseData={(bi) => bi.ucsReaction}
                            steps={tableData}
                        />

                        <Row
                            rowId="channel"
                            label="Канал"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={getChannel}
                            parseData={(bi) => bi.channel}
                            steps={tableData}
                        />
                        <Row
                            rowId="document"
                            label="Документация"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatLinkFromString}
                            parseData={(bi) => bi.document}
                            steps={tableData}
                        />
                        <Row
                            rowId="mockup"
                            label="Макет"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatLinkFromString}
                            parseData={(bi) => bi.mockup}
                            steps={tableData}
                        />

                        <S.Row>
                            <S.LabelTd>
                                <S.HideOrShowButton
                                    onClick={() => setHiddenRowsVisible(!isHiddenRowsVisible)}
                                >
                                    {isHiddenRowsVisible ? 'Скрыть' : 'Показать скрытые'}

                                    {isHiddenRowsVisible ? (
                                        <S.IconStyled iconName={Icons.EyeOff} />
                                    ) : (
                                        <S.IconStyled iconName={Icons.Eye} />
                                    )}
                                </S.HideOrShowButton>
                            </S.LabelTd>

                            {allBIs.length !== 0 && <S.Td colSpan={allBIs.length}></S.Td>}
                        </S.Row>
                    </S.Tbody>
                </S.Table>
            </S.TableWrapper>

            <StepForm
                isOpen={stepFormOpened}
                onClose={closeStepForm}
                updateStep={updateStep}
                defaultName={tableData[selectedStep ?? 0]?.columnName ?? ''}
                initialBIs={tableData[selectedStep ?? 0]?.bis ?? []}
            />
        </S.PageWrapper>
    );
};
