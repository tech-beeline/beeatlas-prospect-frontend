import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';
import { Button, Divider, Icon, Skeleton } from 'components/ui';

import {
    useGetNFRByIdQuery,
    useGetUserProductsWithNfrsQuery,
    usePostNfrsToProductMutation,
} from 'api/queries/product';
import { useModal } from 'hooks';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';
import { useSnackbarStore } from 'widgets/Snackbar';

import { AssignToProductSideblock, FitnessFunctions, LifeSituations, Patterns } from './components';
import { IRequirementContent, NfrPanelType } from './types';
import * as S from './units';

export const RequirementContent: FC<IRequirementContent> = ({ activeItem, isAdmin }) => {
    const navigate = useNavigate();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const { modalOpened, openModal, closeModal } = useModal();

    const [expandedPanel, setExpandedPanel] = useState<NfrPanelType | null>(null);

    const { data, isLoading } = useGetNFRByIdQuery(activeItem.nfrData.id);
    const { data: userProductsWithNfrs, isLoading: isLoadingProducts } =
        useGetUserProductsWithNfrsQuery();

    const { mutateAsync: postNfrsToProduct } = usePostNfrsToProductMutation();

    const isAssignButtonDisabled =
        isLoadingProducts ||
        !userProductsWithNfrs ||
        userProductsWithNfrs.length === 0 ||
        userProductsWithNfrs.every((product) =>
            product.nfrs.some((nfr) => String(nfr.id) === String(activeItem.nfrData.id)),
        );

    const handleAssignButtonClick = async () => {
        if (!userProductsWithNfrs || userProductsWithNfrs.length === 0) return;

        if (userProductsWithNfrs.length === 1) {
            await postNfrsToProduct({
                productId: userProductsWithNfrs[0].id,
                nfrIds: [Number(activeItem.nfrData.id)],
            });
            showSnackbar({
                message: `Нефункциональное требование назначено на приложение ${userProductsWithNfrs[0].name}`,
            });
        } else {
            openModal();
        }
    };

    const handleCreateVersionButtonClick = () => {
        navigate(
            `${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}${R.NFR_PATH}${R.ADD_PATH}?id=${activeItem.nfrData.id}`,
        );
    };

    return (
        <S.Container>
            <S.BreadcrumbContainer>
                <Link
                    outer={false}
                    title={activeItem.chapterData.name}
                    url={`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}?chapterId=${activeItem.chapterData.id}`}
                />
                <Icon iconName={Icons.NavArrowRight} size="small" />
            </S.BreadcrumbContainer>
            <S.SpaceBetweenContainer>
                <S.TitleContainer>
                    <Text variant="h4">{formatNullableString(activeItem.nfrData.name)}</Text>
                    <Text inactive variant="body3">
                        {formatNullableString(activeItem.nfrData.code)}
                    </Text>
                </S.TitleContainer>
                <S.ButtonContainer>
                    {isAdmin && (
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleCreateVersionButtonClick}
                        >
                            Создать версию
                        </Button>
                    )}
                    <Button
                        data-tooltip-id="assign-button"
                        disabled={isAssignButtonDisabled}
                        size="small"
                        variant="outlined"
                        onClick={handleAssignButtonClick}
                    >
                        Назначить на приложение
                    </Button>
                    {isAssignButtonDisabled && (
                        // @ts-ignore
                        <TooltipContainer noArrow place="bottom-end" offset={8} id="assign-button">
                            Требование уже назначено на приложение
                        </TooltipContainer>
                    )}
                </S.ButtonContainer>
            </S.SpaceBetweenContainer>

            <Text variant="body2">{formatNullableString(activeItem.nfrData.description)}</Text>

            <div>
                <Text inactive variant="body3">
                    Источник
                </Text>
                <Text variant="body2">{formatNullableString(activeItem.nfrData.source)}</Text>
            </div>
            <div>
                <Text inactive variant="body3">
                    Версия
                </Text>
                <Text variant="body2">{formatNullableString(activeItem.nfrData.version)}</Text>
            </div>

            {isLoading && <Skeleton height={100} radius={12} />}
            {data && (
                <S.CardStyled border="default">
                    <S.ExpansionPanelStyled
                        isExpanded={expandedPanel === NfrPanelType.FITNESS_FUNCTIONS}
                        open={expandedPanel === NfrPanelType.FITNESS_FUNCTIONS}
                        onOpen={() => setExpandedPanel(NfrPanelType.FITNESS_FUNCTIONS)}
                        onClose={() => setExpandedPanel(null)}
                        title="Набор фитнес-функций, успешное прохождение которых автоматически назначает НФТ к приложению"
                    >
                        <FitnessFunctions fitnessFunctions={data.fitnessFunctions} />
                    </S.ExpansionPanelStyled>
                    <Divider />
                    <S.ExpansionPanelStyled
                        isExpanded={expandedPanel === NfrPanelType.LIFE_SITUATIONS}
                        open={expandedPanel === NfrPanelType.LIFE_SITUATIONS}
                        onOpen={() => setExpandedPanel(NfrPanelType.LIFE_SITUATIONS)}
                        onClose={() => setExpandedPanel(null)}
                        title="Участие в жизненных ситуациях"
                    >
                        <LifeSituations chapters={data.chapters} />
                    </S.ExpansionPanelStyled>
                    <Divider />
                    <S.ExpansionPanelStyled
                        isExpanded={expandedPanel === NfrPanelType.PATTERNS}
                        open={expandedPanel === NfrPanelType.PATTERNS}
                        onOpen={() => setExpandedPanel(NfrPanelType.PATTERNS)}
                        onClose={() => setExpandedPanel(null)}
                        title="Реализация в паттернах"
                    >
                        <Patterns patterns={data.patterns} />
                    </S.ExpansionPanelStyled>
                </S.CardStyled>
            )}
            {userProductsWithNfrs && (
                <AssignToProductSideblock
                    isOpen={modalOpened}
                    onClose={closeModal}
                    nfrId={Number(activeItem.nfrData.id)}
                    products={userProductsWithNfrs}
                />
            )}
        </S.Container>
    );
};
