import React, { FC, useState } from 'react';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { sendAnalytics } from 'features/analytics';

import { useModal } from 'hooks';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import * as T from './types';
import * as S from './units';

export const MenuItem: FC<T.IMenuItem> = ({
    item,
    hintText,
    selectedTech,
    onClick,
    onMouseEnter,
    onMouseLeave,
}) => {
    const [isLinkIconHovered, setIsLinkIconHovered] = useState(false);
    const [isNotificationIconHovered, setIsNotificationIconHovered] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const { modalOpened, openModal, closeModal } = useModal();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleUnsubscribe = () => {
        closeModal();
        setIsSubscribed(false);
        showSnackbar({
            message: 'Вы отписаны от уведомлений',
        });
    };

    const handleNotificationButtonClick = (e: MouseEvent) => {
        e.stopPropagation();
        if (isSubscribed) {
            openModal();
        } else {
            setIsSubscribed(true);
            showSnackbar({
                message:
                    'Вы подписались на изменения технологии. Уведомления будут приходить на почту и отображаться на витрине ФДМ',
            });
        }
    };

    return (
        <>
            <S.Item
                onClick={onClick}
                onMouseEnter={() => onMouseEnter(item.label)}
                onMouseLeave={onMouseLeave}
                isActive={selectedTech?.id === item.id || item.label === hintText || modalOpened}
                id="menuItem"
            >
                <p id="menuItem" className="menuItem">
                    {item.label}
                </p>

                <S.IconsContainer hidden={!!selectedTech}>
                    {item.link && (
                        <IconButton
                            iconName={Icons.OpenInBrowser}
                            size="large"
                            onClick={(e) => {
                                e.stopPropagation();
                                sendAnalytics(['techradar', 'link', item.label]);
                                window.open(item.link ?? '', '_blank');
                            }}
                            onMouseEnter={() => setIsLinkIconHovered(true)}
                            onMouseLeave={() => setIsLinkIconHovered(false)}
                            data-tooltip-id={`link-${item.id}`}
                        />
                    )}
                    <S.IconButtonStyled
                        visible={isSubscribed}
                        iconName={
                            isSubscribed && item.label === hintText
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
            <S.TooltipContainer
                id={`link-${item.id}`}
                offset={8}
                place="top"
                noArrow
                isOpen={isLinkIconHovered}
            >
                Перейти на страницу с описанием
            </S.TooltipContainer>
            <S.TooltipContainer
                id={`notification-${item.id}`}
                offset={8}
                place="top"
                noArrow
                isOpen={isNotificationIconHovered}
            >
                {isSubscribed ? 'Отписаться от технологии' : 'Подписаться на технологию'}
            </S.TooltipContainer>
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
