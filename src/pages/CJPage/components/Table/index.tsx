import React, { FC, useEffect, useState } from 'react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { Nullable } from 'types/common';

import { useModal } from 'hooks';
import { BI, Step, tableInitialData } from 'pages/CJPage/mocks';
import { formatNullableString } from 'utils/formatters';

import {
    formatCommunal,
    formatEnters,
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

export const Table: FC<ITable> = ({ tableData, setTableData }) => {
    // const [tableData, setTableData] = useState<Step[]>([]);

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
            const colorIndex = index % (colorCount + 1);
            const color = colors[colorIndex];

            return {
                ...item,
                color: color,
            };
        });

        setTableData(newData as any);
    };

    useEffect(() => {
        if (tableData.length === 0) {
            addColors(tableInitialData, colors);
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
    };

    const removeColumn = (indexForRemove: number) => {
        setTableData(tableData.filter((_, index) => index !== indexForRemove));
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
    };

    const updateStep = (name: string, bis: BI[]) => {
        setTableData(
            tableData.map((item, index) =>
                index === selectedStep ? { ...item, columnName: name, bis } : item,
            ),
        );
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
                            <S.Th>Шаги</S.Th>

                            {tableData.map((row, rowIndex) => (
                                <S.Th
                                    colSpan={row.bis.length ?? 1}
                                    key={rowIndex}
                                    backgroundColor={row.color}
                                >
                                    <S.FlexWrapper>
                                        <p>{row.columnName}</p>

                                        <ColumnMenu
                                            addNewColumn={addNewColumn}
                                            changePositionOfColumn={changePositionOfColumn}
                                            removeColumn={removeColumn}
                                            rowIndex={rowIndex}
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
                            label="Название"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatNullableString}
                            parseData={(bi) => bi.name}
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
                            rowId="type"
                            label="Тип"
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
                            label="Стадия ЖЦ"
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
                            label="Участники"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatParticipants}
                            parseData={(bi) => bi.participants}
                            steps={tableData}
                        />
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
                            rowId="enters"
                            label="Входы и выходы"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatEnters}
                            parseData={(bi) => bi.enters}
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
