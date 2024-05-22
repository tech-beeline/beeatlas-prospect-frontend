import React, { FC, useState } from 'react';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { sendAnalytics } from 'features/analytics';

import { useModal } from 'hooks';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import * as T from './types';
import * as S from './units';

export const MenuItem: FC<T.IMenuItem> = ({ item, hintText, onMouseEnter, onMouseLeave }) => {
    const [isLinkIconHovered, setIsLinkIconHovered] = useState(false);
    const [isNotificationIconHovered, setIsNotificationIconHovered] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const { modalOpened, openModal, closeModal } = useModal();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleUnsubscribe = () => {
        closeModal();
        setIsSubscribed(false);
        showSnackbar({
            message:
                'Вы отписались от изменений технологии. Уведомления больше не будут приходить на почту',
        });
    };

    const handleNotificationButtonClick = () => {
        if (isSubscribed) {
            openModal();
        } else {
            setIsSubscribed(true);
            showSnackbar({
                message:
                    'Вы подписались на изменения технологии. Уведомления будут приходить на почту',
            });
        }
    };

    return (
        <>
            <S.Item
                onMouseEnter={() => onMouseEnter(item.label)}
                onMouseLeave={onMouseLeave}
                isActive={item.label === hintText || modalOpened}
            >
                <p className="menuItem">{item.label}</p>
                <S.IconsContainer>
                    {item.link && (
                        <>
                            <IconButton
                                iconName={Icons.OpenInBrowser}
                                size="large"
                                onClick={() => {
                                    sendAnalytics(['techradar', 'link', item.label]);
                                    window.open(item.link ?? '', '_blank');
                                }}
                                onMouseEnter={() => setIsLinkIconHovered(true)}
                                onMouseLeave={() => setIsLinkIconHovered(false)}
                                data-tooltip-id={`link-${item.id}`}
                            />
                            <S.TooltipContainer
                                id={`link-${item.id}`}
                                offset={8}
                                place="top"
                                noArrow
                                isOpen={isLinkIconHovered}
                            >
                                Перейти на страницу с описанием
                            </S.TooltipContainer>
                        </>
                    )}
                    <S.IconButtonStyled
                        visible={isSubscribed}
                        iconName={
                            isSubscribed && item.label === hintText
                                ? Icons.NotificationOff
                                : Icons.Notification
                        }
                        size="large"
                        onClick={handleNotificationButtonClick}
                        onMouseEnter={() => setIsNotificationIconHovered(true)}
                        onMouseLeave={() => setIsNotificationIconHovered(false)}
                        data-tooltip-id={`notification-${item.id}`}
                    />
                    <S.TooltipContainer
                        id={`notification-${item.id}`}
                        offset={8}
                        place="top"
                        noArrow
                        isOpen={isNotificationIconHovered}
                    >
                        {isSubscribed ? 'Отписаться от технологии' : 'Подписаться на технологию'}
                    </S.TooltipContainer>
                </S.IconsContainer>
            </S.Item>
            <Dialog opened={modalOpened} onClose={closeModal} onConfirm={handleUnsubscribe}>
                Вы уверены, что хотите отписаться от изменений технологии?
            </Dialog>
        </>
    );
};
