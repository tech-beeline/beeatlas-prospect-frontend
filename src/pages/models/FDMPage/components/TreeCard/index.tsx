import React, { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Icon, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Link, PivotArrow } from 'components/other';

import { useGetTechCapabilityProductsQuery } from 'api/queries/fdm';
import {
    useCreateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useGetSubscribedBusinessCapabilitiesIdsQuery,
    useGetSubscribedTechCapabilitiesIdsQuery,
} from 'api/queries/subscriptions';
import { SubscriptionEntityVariants } from 'api/subscriptions/types';
import { useModal } from 'hooks';
import {
    getItemClassification,
    itemToNameMap,
    itemToSubscriptionMessageMap,
} from 'pages/models/FDMPage/helpers';
import { useFDMStore } from 'pages/models/FDMPage/store';
import { Item, ItemTypes } from 'pages/models/FDMPage/store/types';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { getItemIcon } from '../utils';

import { ITreeCard } from './types';
import * as S from './units';

export const TreeCard: FC<ITreeCard> = ({ isFullWidthCard, item }) => {
    const [isOpen, setOpen] = useState(false);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { modalOpened, openModal, closeModal } = useModal();

    const [, setParams] = useSearchParams();

    const { getСhildrenСapabilities } = useFDMStore();

    const { data: products, isLoading: isLoadingProducts } = useGetTechCapabilityProductsQuery(
        item.code,
        item.type === ItemTypes.TECH,
    );

    const { mutateAsync: createSubscription } = useCreateSubscriptionMutation();
    const { mutateAsync: deleteSubscrition } = useDeleteSubscriptionMutation();

    const { data: subscribedBusinessCapabilitiyIds } =
        useGetSubscribedBusinessCapabilitiesIdsQuery();
    const { data: subscribedTechCapabilitiyIds } = useGetSubscribedTechCapabilitiesIdsQuery();

    const isSubscribed = Boolean(
        item.type === ItemTypes.BUSINESS
            ? subscribedBusinessCapabilitiyIds?.includes(item.id)
            : subscribedTechCapabilitiyIds?.includes(item.id),
    );

    const handleTitleClick = async (clickedItem: Item) => {
        if (item.type === ItemTypes.BUSINESS) {
            await getСhildrenСapabilities(item.id);
        }

        setParams(
            new URLSearchParams({
                id: String(clickedItem.id),
                type: clickedItem.type,
            }),
        );
    };

    const handleRelatedCapabilitiesClick = async () => {
        if (!isOpen) {
            await getСhildrenСapabilities(item.id);
        }
        setOpen(!isOpen);
    };

    const handleSubscribeButtonClick = async () => {
        if (!isSubscribed) {
            await createSubscription({
                entityType:
                    item.type === ItemTypes.BUSINESS
                        ? SubscriptionEntityVariants.BUSINESS_CAPABILITY
                        : SubscriptionEntityVariants.TECH_CAPABILITY,
                id: item.id,
                subChildren: item.type === ItemTypes.BUSINESS ? true : undefined,
            });
            showSnackbar({
                message: itemToSubscriptionMessageMap[getItemClassification(item)],
            });
        } else {
            openModal();
        }
    };

    const handleModalConfirm = async () => {
        await deleteSubscrition({
            entityType:
                item.type === ItemTypes.BUSINESS
                    ? SubscriptionEntityVariants.BUSINESS_CAPABILITY
                    : SubscriptionEntityVariants.TECH_CAPABILITY,
            id: item.id,
        });
        closeModal();
        showSnackbar({
            message: `Вы отписаны от уведомлений`,
        });
    };

    return (
        <S.Wrapper data-testid="TreeCard" isFullWidthCard={isFullWidthCard}>
            <S.InnerFlex>
                <div>
                    <S.TitleContainer
                        onClick={() => handleTitleClick(item)}
                        data-testid="TreeCardTitleContainer"
                    >
                        {getItemIcon(item)}

                        <div>
                            <S.Title data-testid="TreeCardTitle">{item.name}</S.Title>

                            <S.TitleSecond>{item.code}</S.TitleSecond>
                        </div>
                    </S.TitleContainer>

                    <S.Text
                        dangerouslySetInnerHTML={{ __html: item.description }}
                        data-testid="TreeCardDescription"
                    />

                    {item.domainData && (
                        <S.MarginContainer>
                            <S.TitleSecond>Домен</S.TitleSecond>
                            <Link
                                title={item.domainData.name}
                                url={`/models/fdm?id=${item.domainData.id}&type=BUSINESS`}
                            />
                        </S.MarginContainer>
                    )}

                    {item.type === ItemTypes.TECH && (
                        <S.MarginContainer>
                            <S.TitleSecond>ТС Реализована в продукте</S.TitleSecond>
                            <S.ChipsContainer>
                                {isLoadingProducts && (
                                    <Skeleton height={32} radius={30} width={123} />
                                )}
                                {products &&
                                    products.length > 0 &&
                                    products.map((product) => (
                                        <S.ChipStyled key={product.eaGuid} label={product.name} />
                                    ))}
                                {products && products.length === 0 && (
                                    <S.ChipStyled label="Нет продуктов" />
                                )}
                            </S.ChipsContainer>
                        </S.MarginContainer>
                    )}

                    {item.author && (
                        <S.MarginContainer>
                            <S.TitleSecond>Владелец</S.TitleSecond>
                            <S.Text>{item.author}</S.Text>
                        </S.MarginContainer>
                    )}
                </div>

                {item.type === ItemTypes.BUSINESS && (
                    <S.ChildrenExpandTitle
                        onClick={handleRelatedCapabilitiesClick}
                        data-testid="TreeCardChildrenExpandTitle"
                    >
                        Связанные возможности
                        <PivotArrow position={isOpen && 'top'} />
                    </S.ChildrenExpandTitle>
                )}
            </S.InnerFlex>

            <S.ExpandStyled isOpen={isOpen} isAutoHeight>
                {item.children?.map((item: Item, index: number) => (
                    <S.ChildrenLinkTitle
                        key={index}
                        onClick={() => handleTitleClick(item)}
                        data-testid="TreeCardChildrenLinkTitle"
                    >
                        {item.name}
                    </S.ChildrenLinkTitle>
                ))}
                {item.children.length === 0 && <S.TextInactive>Возможностей нет</S.TextInactive>}
            </S.ExpandStyled>

            <S.SubscribeButtonContainer>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={handleSubscribeButtonClick}
                    startIcon={
                        <Icon
                            iconName={isSubscribed ? Icons.NotificationOff : Icons.Notification}
                        />
                    }
                >
                    {isSubscribed ? 'Отписаться' : 'Подписаться'}
                </Button>
            </S.SubscribeButtonContainer>

            <Dialog
                opened={modalOpened}
                onClose={closeModal}
                onConfirm={handleModalConfirm}
                title={`Отписаться от ${itemToNameMap[getItemClassification(item)]}?`}
            >
                Вы отписываетесь от <S.BoldSpan>{item.name}</S.BoldSpan>
            </Dialog>
        </S.Wrapper>
    );
};
