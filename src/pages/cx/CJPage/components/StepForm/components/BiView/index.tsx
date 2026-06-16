import React, { FC, useState } from 'react';
import { StatusBadge, TargetBadge } from 'features/cx';

import { Text } from 'components/core';
import { Link, PivotArrow } from 'components/other';
import { IconButton } from 'components/ui';
import { Button, Label, Skeleton } from 'components/ui';

import { useGetBIByIdQuery, useGetBIEditabilityByIdQuery } from 'api/queries/bi';
import { useGetCJCollectionByBIIdQuery, useUpdateCJStepBIsMutation } from 'api/queries/cj';
import { Icons } from 'styles/design-tokens/js/iconfont';
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
    draft,
    bpmn = false,
}) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const [showCjs, setShowCjs] = useState(false);

    const { data: bi, isLoading: isLoadingData } = useGetBIByIdQuery(String(selectedBiId));
    const { data: editabilityData, isLoading: isLoadingEditability } = useGetBIEditabilityByIdQuery(
        String(selectedBiId),
    );
    const {
        data: cjs,
        isLoading: isLoadingCjs,
        refetch,
    } = useGetCJCollectionByBIIdQuery(String(selectedBiId), true);
    const { mutateAsync: updateStepBis, isPending: updatingStep } = useUpdateCJStepBIsMutation();

    const isLoading = isLoadingData || isLoadingEditability || isLoadingCjs;

    const isBiUneditable = editabilityData && !editabilityData.editability;

    const handleSelectClick = async () => {
        await updateStepBis({
            stepId: String(stepId),
            data: { id_bi: selectedBiId, order: stepBisLength },
        });
        showSnackbar({ message: 'BI добавлен в этап' });
        setStage(Stage.SETTINGS);
    };

    const handleArrowClick = async () => {
        if (!showCjs) {
            await refetch();
        }
        setShowCjs(!showCjs);
    };

    return (
        <S.FlexContainer>
            <S.Content hasButtons column>
                <S.FlexWrapper>
                    <S.TitleFlexWrapper>
                        <IconButton
                            iconName={Icons.ArrowLeft}
                            size="large"
                            disabled={bpmn || !draft}
                            onClick={() => setStage(previousStage)}
                        />
                        <S.SideBlockTitle>BI</S.SideBlockTitle>
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
                <S.LabelsContainer>
                    {isLoading && <Skeleton height={24} />}
                    {bi && (
                        <>
                            <TargetBadge target={bi.target} />
                            <StatusBadge status={bi.status} />
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
                                <S.Subtitle>Сценарии</S.Subtitle>
                                <S.Body3>Клиентские сценарии</S.Body3>
                                <S.Body2>{formatNullableString(bi.clientScenario)}</S.Body2>
                            </div>

                            <div>
                                <S.Subtitle>Каналы</S.Subtitle>
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
                                <S.Subtitle>Метрики</S.Subtitle>
                                <S.Body2>{formatNullableString(bi.metrics)}</S.Body2>
                            </div>
                            <div>
                                <S.FlexWrapper>
                                    <S.Subtitle>Связанные CJ {`(${cjs?.length})`}</S.Subtitle>
                                    <PivotArrow
                                        style={{ cursor: 'pointer' }}
                                        position={showCjs && 'top'}
                                        onClick={handleArrowClick}
                                    />
                                </S.FlexWrapper>
                                <S.CJContainer open={showCjs}>
                                    {cjs &&
                                        cjs.map((cj) => (
                                            <div key={cj.id}>
                                                <Link
                                                    url={`/cx/cj/add?id=${cj.id}`}
                                                    title={cj.name}
                                                />
                                                <Text variant="body3" inactive>
                                                    {cj.uniqueIdent}
                                                </Text>
                                            </div>
                                        ))}
                                    {cjs && cjs.length === 0 && (
                                        <Text variant="body2" inactive>
                                            Нет связанных CJ
                                        </Text>
                                    )}
                                </S.CJContainer>
                            </div>
                        </>
                    )}
                    {isLoading &&
                        Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height={40} />)}
                </S.AttributesContainer>
            </S.Content>
            <S.ButtonsContainer column={bi?.draft ? false : true}>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={updatingStep || bpmn || !draft}
                    onClick={handleSelectClick}
                >
                    Выбрать
                </Button>

                <Button
                    variant="outlined"
                    disabled={isLoading || isBiUneditable}
                    onClick={() => setStage(biSelected ? Stage.SELECTEDBIEDIT : Stage.BIEDIT)}
                >
                    {bi?.draft ? 'Редактировать' : 'Сделать черновиком'}
                </Button>
            </S.ButtonsContainer>
        </S.FlexContainer>
    );
};
