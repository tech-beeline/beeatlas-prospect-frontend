import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';
import { useAuthStore } from 'features/auth';
import { useThemeStore } from 'features/theme';

import { MAIN_PAGE_PATH } from 'router/const';

import { BaseIcon, Logo, Tab, Tabs } from '..';

import { NotificationsPopup, ProfileIcon } from './components';
import { IHeader } from './types';
import * as S from './units';

export const Header: FC<IHeader> = ({ isAdminPanel, isAdmin }) => {
    const [isAuth, userInfo] = useAuthStore((state) => [state.isAuth, state.userInfo]);

    const { themeIsDark, toggleTheme } = useThemeStore();

    const navigate = useNavigate();

    const tabs = [
        { name: 'Модели', url: 'models' },
        { name: 'База знаний', url: 'data-base' },
        { name: 'Поддержка Cx', url: 'cx' },
    ];

    return (
        <>
            <S.Container className="HeaderContainer">
                <S.FlexContainer
                    className="HeaderFlexContainer"
                    onClick={() => navigate(MAIN_PAGE_PATH)}
                >
                    <S.Title className="HeaderTitle">витрина ФДМ</S.Title>

                    <Logo />
                </S.FlexContainer>

                {isAdminPanel && isAdmin && <S.LabelStyled title="Консоль администратора" />}

                {!isAdminPanel && (
                    <Tabs>
                        {tabs.map((tab, index) => (
                            <Tab
                                isActive={location.pathname?.includes(tab.url)}
                                key={index}
                                onClick={() => navigate(tab.url)}
                            >
                                {tab.name}
                            </Tab>
                        ))}
                    </Tabs>
                )}

                <S.ControlPanel className="HeaderControlPanel">
                    <IconButton
                        size="large"
                        iconName={!themeIsDark ? Icons.HalfMoon : Icons.Sun}
                        onClick={toggleTheme}
                    />

                    <NotificationsPopup />

                    {isAuth ? (
                        <ProfileIcon
                            initials={userInfo?.family_name[0] + userInfo?.given_name[0]}
                            isAdmin={isAdmin}
                            isAdminPanel={isAdminPanel}
                        />
                    ) : (
                        <BaseIcon iconName={Icons.User} type="default" />
                    )}
                </S.ControlPanel>
            </S.Container>
        </>
    );
};
