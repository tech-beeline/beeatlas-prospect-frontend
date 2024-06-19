import React, { FC, Fragment } from 'react';
import { Button, IconButton, Label, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { CommunalLabel, StatusLabel, TargetLabel } from 'features/cx';

import { IconFeeling, Link } from 'components/other';

import { useGetBIByIdQuery, useGetBIEditabilityByIdQuery } from 'api/queries/bi';
import { useUpdateCJStepBIsMutation } from 'api/queries/cj';
import { getFeelingType } from 'pages/CJPage/utils/formatters';
import { formatNullableString } from 'utils/formatters';
import { useSnackbarStore } from 'widgets/Snackbar';

import { Stage } from '../../types';
import * as S from '../../units';

import { IBiView } from './types';

export const BiView: FC<IBiView> = ({
    selectedBiId,
    stepId,
    stepBisLength,
    setStage,
    onClose,
    biSelected = false,
    previousStage = Stage.BISEARCH,
}) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const { data: bi, isLoading: isLoadingData } = useGetBIByIdQuery(String(selectedBiId));
    const { data: editabilityData, isLoading: isLoadingEditability } = useGetBIEditabilityByIdQuery(
        String(selectedBiId),
    );
    const { mutateAsync: updateStepBis, isLoading: updatingStep } = useUpdateCJStepBIsMutation();

    const isLoading = isLoadingData || isLoadingEditability;

    const isBiUneditable = editabilityData && !editabilityData.editability;

    const isBiCommunalAndPublished = bi && bi.communal && !bi.draft;

    const handleSelectClick = async () => {
        await updateStepBis({
            stepId: String(stepId),
            data: { id_bi: selectedBiId, order: stepBisLength },
        });
        showSnackbar({ message: 'BI добавлен в шаг' });
        setStage(Stage.SETTINGS);
    };

    return (
        <S.FlexContainer>
            <S.Content hasButtons>
                <S.FlexWrapper>
                    <S.TitleFlexWrapper>
                        <IconButton
                            iconName={Icons.ArrowLeft}
                            size="large"
                            onClick={() => setStage(previousStage)}
                        />
                        <S.SideBlockTitle>Атрибуты BI</S.SideBlockTitle>
                    </S.TitleFlexWrapper>
                    <IconButton iconName={Icons.Close} size="large" onClick={onClose} />
                </S.FlexWrapper>
                {isBiUneditable && (
                    <S.BannerStyled
                        color="default"
                        iconName={Icons.InfoCircled}
                        title="BI используется в других опубликованных CJ, редактирование недоступно"
                    />
                )}
                {isBiCommunalAndPublished && (
                    <S.BannerStyled
                        color="default"
                        iconName={Icons.InfoCircled}
                        title="В коммунальный опубликованный BI нельзя вносить правки и удалять его."
                    />
                )}
                <S.LabelsContainer>
                    {isLoading && <Skeleton height={24} />}
                    {bi && (
                        <>
                            <TargetLabel target={bi.target} />
                            {bi.communal && <CommunalLabel />}
                            <StatusLabel status={bi.status} />
                            <Label
                                variant="contained"
                                title={bi.draft ? 'Черновик' : 'Опубликован'}
                                type={bi.draft ? 'default' : 'success'}
                            />
                        </>
                    )}
                </S.LabelsContainer>
                <S.AttributesContainer>
                    {bi && (
                        <>
                            <div>
                                <S.Body3>Название</S.Body3>
                                <S.Body2>{formatNullableString(bi.name)}</S.Body2>
                            </div>

                            <div>
                                <S.Body3>Описание</S.Body3>
                                <S.Body2>{formatNullableString(bi.descr)}</S.Body2>
                            </div>

                            <div>
                                <S.Subtitle>Участники взаимодействия</S.Subtitle>

                                {bi.participants.map((participant, index) => (
                                    <Fragment key={index}>
                                        <S.Body3 marginTop>Участник {index + 1}</S.Body3>
                                        <S.Body2>{participant.participant.name}</S.Body2>
                                        <S.Body3 marginTop>Описание участника {index + 1}</S.Body3>
                                        <S.Body2>{participant.descr}</S.Body2>
                                        <S.Body3 marginTop>
                                            Ценностный результат для участника {index + 1}
                                        </S.Body3>
                                        <S.Body2>{participant.value}</S.Body2>
                                    </Fragment>
                                ))}
                            </div>

                            <div>
                                <S.Subtitle>Чувства и эмоции клиента</S.Subtitle>
                                <S.IconContainer>
                                    <IconFeeling type={getFeelingType(bi.feelings.id)} />
                                </S.IconContainer>
                            </div>

                            <div>
                                <S.Subtitle>Сценарии</S.Subtitle>
                                <S.Body3>Клиентский сценарий</S.Body3>
                                <S.Body2>{formatNullableString(bi.clientScenario)}</S.Body2>
                            </div>

                            <div>
                                <S.Body3>Ссылка на флоу</S.Body3>
                                <S.Body2>
                                    <Link url={bi.flowLink[0]?.url} />
                                </S.Body2>
                            </div>

                            <div>
                                <S.Body3>Описание реакции ЕКП</S.Body3>
                                <S.Body2>{formatNullableString(bi.ucsReaction)}</S.Body2>
                            </div>

                            <div>
                                <S.Subtitle>Канал</S.Subtitle>
                                <S.Body2>
                                    {formatNullableString(
                                        bi.channel.map((channel) => channel.name).join(', '),
                                    )}
                                </S.Body2>
                            </div>

                            <div>
                                <S.Subtitle>Документация</S.Subtitle>
                                <S.Body2>
                                    {bi.document.map((document, index) => (
                                        <>
                                            <Link url={document.url} />
                                            <S.Body3 marginTop>Описание</S.Body3>
                                            <S.Body2
                                                marginBottom={index + 1 !== bi.document.length}
                                            >
                                                {formatNullableString(document.descr)}
                                            </S.Body2>
                                        </>
                                    ))}
                                    {bi.document.length === 0 && formatNullableString(null)}
                                </S.Body2>
                            </div>

                            <div>
                                <S.Subtitle>Макет</S.Subtitle>
                                <S.Body2>
                                    {bi.mockupLink.map((mockup, index) => (
                                        <>
                                            <Link url={mockup.url} />
                                            <S.Body3 marginTop>Описание</S.Body3>
                                            <S.Body2
                                                marginBottom={index + 1 !== bi.mockupLink.length}
                                            >
                                                {formatNullableString(mockup.descr)}
                                            </S.Body2>
                                        </>
                                    ))}
                                    {bi.mockupLink.length === 0 && formatNullableString(null)}
                                </S.Body2>
                            </div>
                        </>
                    )}
                    {isLoading &&
                        Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height={40} />)}
                </S.AttributesContainer>
            </S.Content>
            <S.ButtonsContainer>
                <Button
                    variant={biSelected ? 'contained' : 'outlined'}
                    disabled={isLoading || isBiUneditable || isBiCommunalAndPublished}
                    onClick={() => setStage(biSelected ? Stage.SELECTEDBIEDIT : Stage.BIEDIT)}
                >
                    Редактировать
                </Button>
                {!biSelected && (
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={updatingStep}
                        onClick={handleSelectClick}
                    >
                        Выбрать
                    </Button>
                )}
            </S.ButtonsContainer>
        </S.FlexContainer>
    );
};
