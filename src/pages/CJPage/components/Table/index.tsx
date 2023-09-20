import React, { useState } from 'react';
import { Label } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { Nullable } from 'types/common';

import { FeelingTypes, IconFeeling } from 'components/other';

import { useModal, useMountEffect } from 'hooks';
import { formatNullableString, formatYesNo } from 'utils/formatters';

import { BIForm } from '../BIForm';
import { StepForm } from '../StepForm';

import { Row } from './components/Row';
import { ColumnMenu } from './components';
import { formatLinkFromString } from './formatters';
import * as S from './units';
interface BI {
    name: string;
    communal: boolean;
    descr: string;
    type: number;
    status: number;
    feelings: number;
    clientScenario: string;
    flowLink: string;
    ucsReaction: string;
    participants: { participant: number; descr: string; value: string }[];
    enters: { enter: number; exit: number }[];
    document: string;
    mockup: string;
    channel: number;

    color?: string;
    columnName?: string;
}

const data: BI[] = [
    {
        name: 'Авторизация клиента',
        communal: false,
        descr: 'Авторизация Клиента – взаимодействие между Клиентом и Компанией, направленное на предоставление определенному лицу или группе лиц прав на выполнение определенных действий',
        type: 0,
        status: 0,
        feelings: 4,
        clientScenario:
            'Клиент заполняет предложенные поля ввода, нажимает кнопку «Авторизоваться»',
        flowLink: 'https://example.com/',
        ucsReaction: 'Описание реакции ЕКП',
        participants: [
            { participant: 0, descr: 'Описание участника 1', value: 'Ценностный результат 1' },
            { participant: 0, descr: 'Описание участника 1', value: 'Ценностный результат 2' },
        ],
        enters: [{ enter: 0, exit: 0 }],
        document: 'https://example.com/',
        mockup: 'https://example.com/',
        channel: 0,

        columnName: '123',
    },
];

const columns: Partial<Record<keyof BI, string>> = {
    name: 'Название',
    communal: 'Коммунальный',
    descr: 'Описание',
    type: 'Тип',
    status: 'Статус',
    feelings: 'Чувства',
    clientScenario: 'Сценарий',
    flowLink: 'Ссылка на флоу',
    ucsReaction: 'Реакция ЕКП',
    participants: 'Участники',
    enters: 'Входы и выходы',
    document: 'Документ',
    mockup: 'Макет',
    channel: 'Канал',
};

const colors = [
    'var(--color-accent-lemon-background)',
    'var(--color-status-success-background)',
    'var(--color-accent-magenta-background)',
    'var(--color-accent-teal-background)',
];

export const Table = () => {
    const [tableData, setTableData] = useState<BI[]>([]);

    const [hiddenRows, setHiddenRows] = useState<string[]>([]);
    const [isHiddenRowsVisible, setHiddenRowsVisible] = useState(false);
    const [renameIndex, setRenameIndex] = useState<Nullable<number>>(null);

    console.log(renameIndex, renameIndex && tableData[renameIndex]);

    const {
        modalOpened: stepFormOpened,
        openModal: openStepFrom,
        closeModal: closeStepForm,
    } = useModal();

    const {
        modalOpened: biFormOpened,
        openModal: openBiFrom,
        closeModal: closeBiForm,
    } = useModal();

    const addColors = (data: any[], colors: any[]) => {
        const colorCount = colors.length;

        const newData = data.map((item, index) => {
            const colorIndex = index % colorCount;
            const color = colors[colorIndex];

            return {
                ...item,
                color: color,
            };
        });

        setTableData(newData as any);
    };

    useMountEffect(() => {
        addColors(data, colors);
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

        const newColumn: BI = {
            ...data[0],
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
                index === renameIndex ? { ...item, columnName: name } : item,
            ),
        );
    };

    const updateColumn = (data: BI) => {
        setTableData(tableData.map((item, i) => (renameIndex === i ? { ...item, ...data } : item)));
    };

    return (
        <S.PageWrapper>
            <S.TableWrapper>
                <S.Table>
                    <S.Thead>
                        <S.Row>
                            <S.Th />

                            {tableData.map((row: any, rowIndex) => (
                                <S.Th key={rowIndex} backgroundColor={row.color}>
                                    <S.FlexWrapper>
                                        <p>{row.columnName}</p>

                                        <ColumnMenu
                                            addNewColumn={addNewColumn}
                                            changePositionOfColumn={changePositionOfColumn}
                                            removeColumn={removeColumn}
                                            rowIndex={rowIndex}
                                            setOpenSideBlockName={openStepFrom}
                                            setRenameIndex={setRenameIndex}
                                            tableDataLength={tableData.length}
                                            openBiForm={openBiFrom}
                                        />
                                    </S.FlexWrapper>
                                </S.Th>
                            ))}
                        </S.Row>
                    </S.Thead>

                    <S.Tbody>
                        <Row
                            rowId="name"
                            label="Название"
                            hiddenRows={hiddenRows}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            rowData={tableData.map((td) => td.name)}
                            formatData={formatNullableString}
                        />
                        <Row
                            rowId="communal"
                            label="Коммунальный"
                            hiddenRows={hiddenRows}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            rowData={tableData.map((td) => td.communal)}
                            formatData={formatYesNo}
                        />
                        <Row
                            rowId="descr"
                            label="Описание"
                            hiddenRows={hiddenRows}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            rowData={tableData.map((td) => td.descr)}
                            formatData={formatNullableString}
                        />
                        <Row
                            rowId="type"
                            label="Тип"
                            hiddenRows={hiddenRows}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            rowData={tableData.map((td) => td.type)}
                            formatData={(type) => (
                                <Label
                                    title={type === 0 ? 'Целевой' : 'Фактический'}
                                    type={type === 0 ? 'magenta' : 'teal'}
                                />
                            )}
                        />
                        <Row
                            rowId="status"
                            label="Стадия ЖЦ"
                            hiddenRows={hiddenRows}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            rowData={tableData.map((td) => td.status)}
                            formatData={() => (
                                <Label
                                    title="Передано в эксплуатацию"
                                    type="success"
                                    variant="contained"
                                />
                            )}
                        />
                        <Row
                            rowId="participants"
                            label="Участники"
                            hiddenRows={hiddenRows}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            rowData={tableData.map((td) => td.participants)}
                            formatData={(participants) => (
                                <ul>
                                    {participants.map((participant, i) => (
                                        <li key={i}>
                                            <div>Участник: {participant.participant}</div>
                                            <div>Описание: {participant.descr}</div>
                                            <div>Ценностный результат: {participant.value}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        />
                        <Row
                            rowId="feelings"
                            label="Чувства и эмоции клиента"
                            hiddenRows={hiddenRows}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            rowData={tableData.map((td) => td.feelings)}
                            formatData={() => (
                                <S.FlexContainer>
                                    <IconFeeling type={FeelingTypes.EXCITED} />
                                </S.FlexContainer>
                            )}
                        />
                        <Row
                            rowId="enters"
                            label="Входы и выходы"
                            hiddenRows={hiddenRows}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            rowData={tableData.map((td) => td.enters)}
                            formatData={(enters) => (
                                <ul>
                                    {enters.map((enter, i) => (
                                        <li key={i}>
                                            <div>Вход: {enter.enter}</div>
                                            <div>Выход: {enter.exit}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        />
                        <Row
                            rowId="clientScenario"
                            label="Клиентский сценарий"
                            hiddenRows={hiddenRows}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            rowData={tableData.map((td) => td.clientScenario)}
                            formatData={formatNullableString}
                        />
                        <Row
                            rowId="flowLink"
                            label="Ссылка на флоу"
                            hiddenRows={hiddenRows}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            rowData={tableData.map((td) => td.flowLink)}
                            formatData={formatLinkFromString}
                        />
                        <Row
                            rowId="ucsReaction"
                            label="Описание реакции ЕКП"
                            hiddenRows={hiddenRows}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            rowData={tableData.map((td) => td.ucsReaction)}
                            formatData={formatNullableString}
                        />

                        <Row
                            rowId="channel"
                            label="Канал"
                            hiddenRows={hiddenRows}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            rowData={tableData.map((td) => td.channel)}
                            formatData={() => 'Website'}
                        />
                        <Row
                            rowId="document"
                            label="Документация"
                            hiddenRows={hiddenRows}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            rowData={tableData.map((td) => td.document)}
                            formatData={formatLinkFromString}
                        />
                        <Row
                            rowId="mockup"
                            label="Макет"
                            hiddenRows={hiddenRows}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            rowData={tableData.map((td) => td.mockup)}
                            formatData={formatLinkFromString}
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

                            <S.Td colSpan={Object.keys(columns).length - 1}></S.Td>
                        </S.Row>
                    </S.Tbody>
                </S.Table>
            </S.TableWrapper>

            <StepForm
                isOpen={stepFormOpened}
                onClose={closeStepForm}
                renameColumn={renameColumn}
                defaultName={tableData[renameIndex ?? 0]?.columnName ?? ''}
            />

            <BIForm
                isOpen={biFormOpened}
                onClose={closeBiForm}
                onSave={updateColumn}
                defaultValues={typeof renameIndex === 'number' ? tableData[renameIndex] : undefined}
            />
        </S.PageWrapper>
    );
};
