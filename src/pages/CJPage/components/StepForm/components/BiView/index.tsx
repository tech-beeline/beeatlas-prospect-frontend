import React, { FC } from 'react';
import { Button, IconButton, Label } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { IconFeeling } from 'components/other';

import { useMockBItore } from 'pages/CJPage/mocks';
import {
    formatLinkFromString,
    getChannel,
    getEnter,
    getExit,
    getFeelingType,
    getParticipant,
    getStatus,
} from 'pages/CJPage/utils/formatters';
import { formatNullableString } from 'utils/formatters';

import { Stage } from '../../types';
import * as S from '../../units';

import { IBiView } from './types';

export const BiView: FC<IBiView> = ({
    selectedBiId,
    setStage,
    addBi,
    showButtons = true,
    goBackStage = Stage.BISEARCH,
}) => {
    const { getBiById } = useMockBItore();

    const currentBi = getBiById(selectedBiId);

    console.log(currentBi);

    return (
        <S.FlexContainer>
            <div>
                <S.TitleFlexWrapper>
                    <IconButton
                        iconName={Icons.ArrowLeft}
                        size="large"
                        onClick={() => setStage(goBackStage)}
                    />
                    <S.SideBlockTitle>Атрибуты BI</S.SideBlockTitle>
                </S.TitleFlexWrapper>
                <S.LabelsContainer>
                    <Label
                        title={currentBi?.type === 0 ? 'Целевой' : 'Фактический'}
                        variant="contained"
                        type="teal"
                    />
                    {currentBi?.communal && (
                        <Label title="Коммунальный" variant="contained" type="magenta" />
                    )}
                </S.LabelsContainer>
                <S.AttributesContainer>
                    <div>
                        <S.Body3>Название</S.Body3>
                        <S.Body2>{formatNullableString(currentBi?.name)}</S.Body2>
                    </div>

                    <div>
                        <S.Body3>Описание</S.Body3>
                        <S.Body2>{formatNullableString(currentBi?.descr)}</S.Body2>
                    </div>

                    <div>
                        <S.Body3>Стадия ЖЦ</S.Body3>
                        <S.Body2>{currentBi && getStatus(currentBi.status)}</S.Body2>
                    </div>

                    <div>
                        <S.Subtitle>Участники взаимодействия</S.Subtitle>
                        {currentBi?.participants.length === 0 && (
                            <S.Body2>{formatNullableString(null)}</S.Body2>
                        )}
                        {(currentBi?.participants ?? []).map((participant, index) => (
                            <>
                                <S.Subtitle3>Участник {index + 1}</S.Subtitle3>
                                <S.Body3>Участник</S.Body3>
                                <S.Body2>{getParticipant(participant.participant)}</S.Body2>
                                <S.Body3>Описание участника</S.Body3>
                                <S.Body2>{participant.descr}</S.Body2>
                                <S.Body3>Ценностный результат</S.Body3>
                                <S.Body2>{participant.value}</S.Body2>
                            </>
                        ))}
                    </div>

                    <div>
                        <S.Subtitle>Чувства и эмоции клиента</S.Subtitle>
                        <S.IconContainer>
                            {typeof currentBi?.feelings === 'number' && (
                                <IconFeeling type={getFeelingType(currentBi.feelings)} />
                            )}
                        </S.IconContainer>
                    </div>

                    <div>
                        <S.Subtitle>Входы и выходы</S.Subtitle>
                        {currentBi?.enters.length === 0 && (
                            <S.Body2>{formatNullableString(null)}</S.Body2>
                        )}
                        {(currentBi?.enters ?? []).map((enter, index) => (
                            <>
                                <S.Subtitle3>Вход и выход {index + 1}</S.Subtitle3>
                                <S.Body3>Вход</S.Body3>
                                <S.Body2>{getEnter(enter.enter)}</S.Body2>
                                <S.Body3>Выход</S.Body3>
                                <S.Body2>{getExit(enter.exit)}</S.Body2>
                            </>
                        ))}
                    </div>

                    <div>
                        <S.Body3>Клиентский сценарий</S.Body3>
                        <S.Body2>{formatNullableString(currentBi?.clientScenario)}</S.Body2>
                    </div>

                    <div>
                        <S.Body3>Ссылка на флоу</S.Body3>
                        <S.Body2>{formatLinkFromString(currentBi?.flowLink)}</S.Body2>
                    </div>

                    <div>
                        <S.Body3>Описание реакции ЕКП</S.Body3>
                        <S.Body2>{formatNullableString(currentBi?.ucsReaction)}</S.Body2>
                    </div>

                    <div>
                        <S.Body3>Канал</S.Body3>
                        <S.Body2>{currentBi && getChannel(currentBi?.channel)}</S.Body2>
                    </div>

                    <div>
                        <S.Body3>Документация</S.Body3>
                        <S.Body2>{formatLinkFromString(currentBi?.document)}</S.Body2>
                    </div>

                    <div>
                        <S.Body3>Макет</S.Body3>
                        <S.Body2>{formatLinkFromString(currentBi?.mockup)}</S.Body2>
                    </div>
                </S.AttributesContainer>
            </div>
            {showButtons && (
                <S.ButtonsContainer>
                    {!currentBi?.communal && (
                        <Button onClick={() => setStage(Stage.BIEDIT)}>Редактировать</Button>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={() => {
                            currentBi && addBi && addBi(currentBi);
                            setStage(Stage.SETTINGS);
                        }}
                    >
                        Выбрать
                    </Button>
                </S.ButtonsContainer>
            )}
        </S.FlexContainer>
    );
};
