import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Counter, Divider, Icon, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { NotificationCard } from 'features/notifications';

import { useOutsideClick } from 'hooks/useOutsideClick';
import * as ROUTER from 'router/const';

import * as S from './units';

const isLoading = false;
const isEmpty = false;
const isError = false;

export const NotificationsPopup: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    const iconRef = useRef<HTMLButtonElement>(null);

    useOutsideClick(dropdownRef, isOpen, setIsOpen, iconRef);

    const handleNavigateButtonClick = () => {
        navigate(ROUTER.NOTIFICATIONS_PATH);
        setIsOpen(false);
    };

    return (
        <S.Container>
            <Counter count={5}>
                <IconButton
                    size="large"
                    ref={iconRef}
                    iconName={Icons.Notification}
                    onClick={() => setIsOpen(true)}
                    data-tooltip-id="notificationsIcon"
                />
            </Counter>

            <S.TooltipStyled id="notificationsIcon" place="bottom" noArrow>
                Уведомления
            </S.TooltipStyled>

            {isOpen && (
                <>
                    <S.Backdrop />
                    <S.Dropdown ref={dropdownRef}>
                        <S.Header>
                            <S.TitleContainer>
                                <S.Title>Уведомления</S.Title>
                                <Counter count={5} />
                            </S.TitleContainer>
                            <IconButton
                                iconName={Icons.Close}
                                size="large"
                                onClick={() => setIsOpen(false)}
                            />
                        </S.Header>
                        <Divider />
                        <S.Content>
                            {!isLoading && !isEmpty && !isError && (
                                <>
                                    <NotificationCard type="capability" unread />
                                    <NotificationCard type="tech" unread />
                                    <NotificationCard type="capability" />
                                    <NotificationCard type="tech" />
                                </>
                            )}
                            {isLoading && (
                                <>
                                    <NotificationCard loading type="capability" />
                                    <NotificationCard loading type="capability" />
                                    <NotificationCard loading type="capability" />
                                </>
                            )}
                            {isEmpty && (
                                <S.EmptyContainer>
                                    <Icon contained iconName={Icons.PageEmpty} />
                                    <S.Subtitle3>Список уведомлений пуст</S.Subtitle3>
                                    <S.Body3>
                                        Здесь будет отображаться список ваших уведомлений
                                    </S.Body3>
                                </S.EmptyContainer>
                            )}
                            {isError && (
                                <S.EmptyContainer>
                                    <Icon contained iconName={Icons.InfoCircled} color="red" />
                                    <S.Subtitle3>
                                        Не удалось загрузить список уведомлений
                                    </S.Subtitle3>
                                    <S.ButtonContainer>
                                        <Button
                                            variant="plain"
                                            startIcon={<Icon iconName={Icons.RefreshDouble} />}
                                        >
                                            Обновить
                                        </Button>
                                    </S.ButtonContainer>
                                </S.EmptyContainer>
                            )}
                        </S.Content>

                        {!isLoading && !isEmpty && !isError && (
                            <>
                                <Divider />
                                <S.Footer>
                                    <S.ButtonsContainer>
                                        <Button variant="plain" disabled>
                                            Прочитать все
                                        </Button>
                                        <Button variant="plain" onClick={handleNavigateButtonClick}>
                                            Все уведомления
                                        </Button>
                                    </S.ButtonsContainer>
                                </S.Footer>
                            </>
                        )}
                    </S.Dropdown>
                </>
            )}
        </S.Container>
    );
};
