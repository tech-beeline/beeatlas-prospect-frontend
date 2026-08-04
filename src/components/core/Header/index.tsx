import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'features/auth';
import { useThemeStore } from 'features/theme';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';

import { MAIN_PAGE_PATH } from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { BaseIcon, Logo, Tab, Tabs } from '..';

import { NotificationsPopup, ProfileIcon } from './components';
import { TABS, TabVariants } from './const';
import { IHeader } from './types';
import * as S from './units';
import { preventDefault } from './utils';

export const Header: FC<IHeader> = ({ isAdminPanel, isAdmin }) => {
    const userInfo = useAuthStore((state) => state.userInfo);

    const { themeIsDark, toggleTheme } = useThemeStore();

    const navigate = useNavigate();

    return (
        <>
            <S.Container className="HeaderContainer">
                <a href="/" onClick={preventDefault}>
                    <S.FlexContainer
                        className="HeaderFlexContainer"
                        onClick={() => navigate(MAIN_PAGE_PATH)}
                    >
                        <S.Title className="HeaderTitle">beeatlas</S.Title>

                        <Logo />
                    </S.FlexContainer>
                </a>

                {isAdminPanel && isAdmin && <S.LabelStyled title="Консоль администратора" />}

                {!isAdminPanel && (
                    <Tabs>
                        {TABS.filter(
                            (t) =>
                                !(
                                    t.id === TabVariants.BASE &&
                                    window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND
                                ),
                        ).map((tab, index) => (
                            <Tab
                                key={index}
                                href={tab.url}
                                isActive={
                                    location.pathname?.includes(tab.url) ||
                                    (tab.id === TabVariants.MODELS && location.pathname === '/')
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(tab.url);
                                }}
                            >
                                {tab.name}
                            </Tab>
                        ))}
                    </Tabs>
                )}

                <S.ControlPanel className="HeaderControlPanel">
                    <S.LinksContainer>
                        <S.Link
                            onClick={() => window.open(window.FEATURE_FLAGS.FLAG_DOC_SERVICE_URL)}
                        >
                            <S.IconStyled size="medium" iconName={Icons.PagesMultiple} />
                            <Text variant="subtitle3">Документация</Text>
                        </S.Link>

                        {window.FEATURE_FLAGS.FLAG_IS_PROD === false && (
                            <S.Link
                                onClick={() => window.open(window.FEATURE_FLAGS.FLAG_WEBIDE_URL)}
                            >
                                <S.IconStyled size="medium" iconName={Icons.Iframe} />
                                <Text variant="subtitle3">WebIDE</Text>
                            </S.Link>
                        )}
                    </S.LinksContainer>

                    <IconButton
                        size="large"
                        iconName={!themeIsDark ? Icons.HalfMoon : Icons.Sun}
                        onClick={toggleTheme}
                    />

                    <NotificationsPopup />

                    {userInfo ? (
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
