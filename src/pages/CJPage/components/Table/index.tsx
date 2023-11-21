import React, { FC, useState } from 'react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { Nullable } from 'types/common';

import { IBIData, IBILink } from 'api/bi/types';
import { useModal } from 'hooks';
import { formatNullableString } from 'utils/formatters';

import {
    formatCommunal,
    formatFeeling,
    formatLinkFromString,
    formatParticipants,
    formatStatus,
    formatType,
    // getChannel,
} from '../../utils/formatters';
import { StepForm } from '../StepForm';

import { ColumnMenu, Row } from './components';
import { COLORS } from './const';
import { ITable } from './types';
import * as S from './units';

export const Table: FC<ITable> = ({ cjId, tableData }) => {
    const [hiddenRows, setHiddenRows] = useState<string[]>([]);
    const [isHiddenRowsVisible, setHiddenRowsVisible] = useState(false);
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

                                        <ColumnMenu
                                            cjId={cjId}
                                            stepId={step.id}
                                            stepName={step.name}
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
                            parseData={(bi) => bi.uniqueIdent}
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
                            parseData={(bi) => bi.statusId}
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
                        {/* <Row
                            rowId="flowLink"
                            label="Ссылка на флоу"
                            hiddenRows={hiddenRows}
                            onAddButtonClick={handleAddRowButtonClick}
                            setHiddenRows={setHiddenRows}
                            isHiddenRowsVisible={isHiddenRowsVisible}
                            formatData={formatLinkFromString}
                            parseData={(bi) => bi.flowLink}
                            steps={tableData}
                        /> */}
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
                            formatData={(channels: { name: string }[]) =>
                                formatNullableString(
                                    channels.map((channel) => channel.name).join(', '),
                                )
                            }
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
                            formatData={(documents: IBILink[]) => (
                                <>
                                    {documents.map((document, index) => (
                                        <>
                                            {formatLinkFromString(document.url)}
                                            {index < documents.length - 1 && ', '}
                                        </>
                                    ))}
                                </>
                            )}
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
                            formatData={(mockups: IBILink[]) => (
                                <>
                                    {mockups.map((mockup, index) => (
                                        <>
                                            {formatLinkFromString(mockup.url)}
                                            {index < mockups.length - 1 && ', '}
                                        </>
                                    ))}
                                </>
                            )}
                            parseData={(bi) => bi.mockupLink}
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

            {tableData[selectedStep ?? 0] && (
                <StepForm
                    cjId={cjId}
                    step={tableData[selectedStep ?? 0]}
                    isOpen={stepFormOpened}
                    onClose={closeStepForm}
                />
            )}
        </S.PageWrapper>
    );
};
