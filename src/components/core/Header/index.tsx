import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';
import { useAuthStore } from 'features/auth';
import { useThemeStore } from 'features/theme';

import { MAIN_PAGE_PATH } from 'router/const';

import { BaseIcon, Logo, Tab, Tabs } from '..';

import { ProfileIcon } from './ProfileIcon';
import * as S from './units';

export const Header = ({ isPersonalArea }: { isPersonalArea: boolean }) => {
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

                {isPersonalArea && <S.LabelStyled title="Консоль администратора" />}

                {!isPersonalArea && (
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
                    <BaseIcon
                        iconName={!themeIsDark ? Icons.HalfMoon : Icons.Sun}
                        onClick={toggleTheme}
                    />

                    {isAuth ? (
                        <ProfileIcon
                            initials={userInfo?.family_name[0] + userInfo?.given_name[0]}
                            {...{ isPersonalArea }}
                        />
                    ) : (
                        <BaseIcon iconName={Icons.User} type="default" />
                    )}
                </S.ControlPanel>
            </S.Container>
        </>
    );
};
