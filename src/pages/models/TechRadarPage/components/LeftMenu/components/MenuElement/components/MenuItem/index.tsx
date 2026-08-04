import React, { FC, useState } from 'react';

import { TooltipContainer } from 'components/interaction';

import {
    useCreateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useGetSubscribedTechnologiesIdsQuery,
} from 'api/queries/subscriptions';
import { SubscriptionEntityVariants } from 'api/subscriptions/types';
import { useModal } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import * as T from './types';
import * as S from './units';

export const MenuItem: FC<T.IMenuItem> = ({
    item,
    selectedTech,
    onClick,
    hoveredTechId,
    setHoveredTechId,
}) => {
    const [isNotificationIconHovered, setIsNotificationIconHovered] = useState(false);

    const { modalOpened, openModal, closeModal } = useModal();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { data: subscribedTechnologiesIds } = useGetSubscribedTechnologiesIdsQuery();

    const { mutateAsync: createSubscription } = useCreateSubscriptionMutation();
    const { mutateAsync: deleteSubscrition } = useDeleteSubscriptionMutation();

    const isSubscribed = Boolean(subscribedTechnologiesIds?.includes(item.id));

    const handleUnsubscribe = async () => {
        await deleteSubscrition({ entityType: SubscriptionEntityVariants.TECH, id: item.id });
        closeModal();
        showSnackbar({
            message: 'Вы отписаны от уведомлений',
        });
    };

    const handleNotificationButtonClick = async (e: MouseEvent) => {
        e.stopPropagation();
        if (isSubscribed) {
            openModal();
        } else {
            await createSubscription({
                entityType: SubscriptionEntityVariants.TECH,
                id: item.id,
            });
            showSnackbar({
                message:
                    'Ваша подписка на уведомления об изменениях технологии оформлена. Все оповещения будут поступать в beeatlas',
            });
        }
    };

    return (
        <>
            <S.Item
                onClick={onClick}
                onMouseEnter={() => setHoveredTechId(item.id)}
                onMouseLeave={() => setHoveredTechId(null)}
                isActive={selectedTech?.id === item.id || item.id === hoveredTechId || modalOpened}
                id={`menu-item-${item.id}`}
            >
                <p id="menuItem" className="menuItem">
                    {item.label}
                </p>

                <S.IconsContainer hidden={!!selectedTech}>
                    <S.IconButtonStyled
                        visible={isSubscribed}
                        iconName={
                            isSubscribed && item.id === hoveredTechId
                                ? Icons.NotificationOff
                                : Icons.Notification
                        }
                        size="large"
                        onClick={(e) => handleNotificationButtonClick(e as any)}
                        onMouseEnter={() => setIsNotificationIconHovered(true)}
                        onMouseLeave={() => setIsNotificationIconHovered(false)}
                        data-tooltip-id={`notification-${item.id}`}
                    />
                </S.IconsContainer>
            </S.Item>
            <TooltipContainer
                id={`notification-${item.id}`}
                offset={8}
                place="top"
                noArrow
                isOpen={isNotificationIconHovered}
            >
                {isSubscribed ? 'Отписаться от технологии' : 'Подписаться на технологию'}
            </TooltipContainer>
            <Dialog
                opened={modalOpened}
                onClose={closeModal}
                onConfirm={handleUnsubscribe}
                title="Отписаться от технологии?"
            >
                Вы отписываетесь от <S.BoldSpan>{item.label}</S.BoldSpan>
            </Dialog>
        </>
    );
};
