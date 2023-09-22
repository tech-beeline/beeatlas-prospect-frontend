import React, { useState } from 'react';
import { Label } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { Nullable } from 'types/common';

import { FeelingTypes, IconFeeling } from 'components/other';

import { useModal, useMountEffect } from 'hooks';
import { BI, Enter, Participant, Step, tableInitialData } from 'pages/CJPage/mocks';
import { formatNullableString, formatYesNo } from 'utils/formatters';

import { StepForm } from '../StepForm';

import { Row } from './components/Row';
import { ColumnMenu } from './components';
import { formatLinkFromString } from './formatters';
import * as S from './units';

const colors = [
    'var(--color-accent-lemon-background)',
    'var(--color-status-success-background)',
    'var(--color-accent-magenta-background)',
    'var(--color-accent-teal-background)',
];

export const Table = () => {
    const [tableData, setTableData] = useState<Step[]>([]);

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

    useMountEffect(() => {
        addColors(tableInitialData, colors);
    });

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
            // bis: tableInitialData[1].bis,
            bis: [],
            color: availableСolors[Math.floor(Math.random() * availableСolors.length)],
            columnName: 'Название шага',
        };

        const copyOfData = [...tableData];

        copyOfData.splice(index, 0, newColumn);
        // if (index === 0) {
        //     copyOfData.unshift(newColumn);
        // } else if (index === tableData.length - 1) {
        //     copyOfData.push(newColumn);
        // } else {
        //     copyOfData.splice(index, 0, newColumn);
        // }

        setTableData(copyOfData);
    };

    const renameColumn = (name: string) => {
        setTableData(
            tableData.map((item, index) =>
                index === selectedStep ? { ...item, columnName: name } : item,
            ),
        );
    };

    // const updateColumn = (data: BI) => {
    //     setTableData(
    //         tableData.map((item, i) => (selectedStep === i ? { ...item, ...data } : item)),
    //     );
    // };

    const addBI = (data: BI) => {
        setTableData(
            tableData.map((item, i) =>
                selectedStep === i ? { ...item, bis: [...item.bis, data] } : item,
            ),
        );
    };

    const allBIs = tableData.reduce(
        (acc, step) => [...acc, ...(step.bis.length > 0 ? step.bis : [])],
        [] as BI[],
    );

    const handleAddRowButtonClick = (biIndex: number) => {
        console.log(biIndex);
        setSelectedStep(biIndex);
        openStepFrom();
    };

    return (
        <S.PageWrapper>
            <S.TableWrapper>
                <S.Table>
                    <S.Thead>
                        <S.Row>
                            <S.Th />

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
                            // rowData={allBIs.map((td) => td?.name ?? null)}
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
                            // rowData={allBIs.map((td) => td?.communal ?? null)}
                            formatData={formatYesNo}
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
                            // rowData={allBIs.map((td) => td?.descr ?? null)}
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
                            // rowData={allBIs.map((td) => td?.type ?? null)}
                            formatData={(type) => (
                                <Label
                                    title={type === 0 ? 'Целевой' : 'Фактический'}
                                    type={type === 0 ? 'magenta' : 'teal'}
                                />
                            )}
                            parseData={(bi) => bi.type}
                            steps={tableData}
                        />
                        <Row
                            rowId="status"
                            label="Стадия ЖЦ"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            // rowData={allBIs.map((td) => td?.status ?? null)}
                            formatData={() => (
                                <Label
                                    title="Передано в эксплуатацию"
                                    type="success"
                                    variant="contained"
                                />
                            )}
                            parseData={(bi) => bi.status}
                            steps={tableData}
                        />
                        <Row<Participant[]>
                            rowId="participants"
                            label="Участники"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            // rowData={allBIs.map((td) => td?.participants ?? null)}
                            formatData={(participants) => (
                                <ul>
                                    {participants?.map((participant, i) => (
                                        <li key={i}>
                                            <div>Участник: {participant.participant}</div>
                                            <div>Описание: {participant.descr}</div>
                                            <div>Ценностный результат: {participant.value}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}
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
                            // rowData={allBIs.map((td) => td?.feelings ?? null)}
                            formatData={() => (
                                <S.FlexContainer>
                                    <IconFeeling type={FeelingTypes.EXCITED} />
                                </S.FlexContainer>
                            )}
                            parseData={(bi) => bi.feelings}
                            steps={tableData}
                        />
                        <Row<Enter[]>
                            rowId="enters"
                            label="Входы и выходы"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            // rowData={allBIs.map((td) => td?.enters ?? null)}
                            formatData={(enters) => (
                                <ul>
                                    {enters?.map((enter, i) => (
                                        <li key={i}>
                                            <div>Вход: {enter.enter}</div>
                                            <div>Выход: {enter.exit}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}
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
                            // rowData={allBIs.map((td) => td?.clientScenario ?? null)}
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
                            // rowData={allBIs.map((td) => td?.flowLink ?? null)}
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
                            // rowData={allBIs.map((td) => td?.ucsReaction ?? null)}
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
                            // rowData={allBIs.map((td) => td?.channel ?? null)}
                            formatData={() => 'Website'}
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
                            // rowData={allBIs.map((td) => td?.document ?? null)}
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
                            // rowData={allBIs.map((td) => td?.mockup ?? null)}
                            formatData={formatLinkFromString}
                            parseData={(bi) => bi.mockup}
                            steps={tableData}
                        />

                        <S.Row>
                            <S.Td>
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
                            </S.Td>

                            {allBIs.length !== 0 && <S.Td colSpan={allBIs.length}></S.Td>}
                        </S.Row>
                    </S.Tbody>
                </S.Table>
            </S.TableWrapper>

            <StepForm
                isOpen={stepFormOpened}
                onClose={closeStepForm}
                renameColumn={renameColumn}
                defaultName={tableData[selectedStep ?? 0]?.columnName ?? ''}
                addBI={addBI}
                stepBIs={tableData[selectedStep ?? 0]?.bis ?? []}
            />

            {/* <BIForm
                isOpen={biFormOpened}
                onClose={closeBiForm}
                onSave={updateColumn}
                defaultValues={
                    typeof selectedStep === 'number' ? tableData[selectedStep].bis[0] : undefined
                }
            /> */}
        </S.PageWrapper>
    );
};
