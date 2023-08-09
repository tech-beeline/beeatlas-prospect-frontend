import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VKITAuth from '@beeline/lk-auth';
import { observer } from 'mobx-react';

import { getPermissionsOfProfile, postSession } from 'api/sessions';
import { useMountEffect } from 'hooks';
import { MAIN_PAGE_PATH } from 'router/const';
import { useRootStore } from 'stores/initStore';
import { getStorage, persistStorage } from 'stores/utils';

import { BaseIcon, Logo, Tab, Tabs } from '..';

import { ProfileIcon } from './ProfileIcon';
import * as S from './units';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

export const Header = observer(({ isPersonalArea }: { isPersonalArea: boolean }) => {
    const {
        generalStore: {
            isAuth,
            setAuth,
            clearAuth,
            userInfo,
            setUserInfo,
            toggleTheme,
            themeIsDark,
        },
    } = useRootStore();

    const [authObject, setAuthObject] = useState<{ code: string | null; state: string | null }>({
        code: '',
        state: '',
    });

    const isProd = process.env.NODE_ENV !== 'development';

    const navigate = useNavigate();

    const auth = new VKITAuth(!isProd ? 'http://localhost:3000' : '');

    // tabs
    const tabs = [
        { name: 'Модели', url: 'models' },
        { name: 'База знаний', url: 'data-base' },
        { name: 'Продукты', url: 'products' },
    ];

    // TODO: использовать getAccessToken вместо storage
    // есть requestTokenRefresh

    useMountEffect(() => {
        (async () => {
            setAuthObject({ code: auth.getCodeParam(), state: auth.getStateParam() });

            if (auth.hasNecessaryParams()) {
                const res = await auth.exchangeCode();

                console.log('res', res);

                persistStorage('token', res.access_token);
                persistStorage('rtoken', res.refresh_token);

                setAuth(true);

                setUserInfo(auth.getClaims(res.access_token));

                // console.log('auth.getClaims(access_token)', auth.getClaims(access_token));
            }
        })();
    });

    useEffect(() => {
        (async () => {
            if (Object.keys(userInfo).length > 0 && getStorage('isAuthorized') === 'false') {
                const res = await postSession({
                    login_time: userInfo.iat,
                    // id_profile: 0,
                    // она вернется потом (спросить у бэка)
                    // session: '',
                    atoken: getStorage('token') || '',
                    rtoken: getStorage('rtoken') || '',
                    code: authObject.code || '',
                    state: authObject.state || '',
                    auth_code: '',
                    login: userInfo.winaccountname,
                });

                if (res.status === 200) {
                    await getPermissionsOfProfile(userInfo.winaccountname);

                    persistStorage('isAuthorized', 'true');
                }

                // console.log('postSession', res.status);
            }
        })();
    }, [userInfo, authObject]);

    return (
        <>
            <S.Container className="HeaderContainer">
                <S.FlexContainer
                    className="HeaderFlexContainer"
                    onClick={() => navigate(MAIN_PAGE_PATH)}
                >
                    <S.Title className="HeaderTitle">
                        {!isPersonalArea ? 'витрина ФДМ' : 'витрина ФДМ/админка'}
                    </S.Title>

                    <Logo />
                </S.FlexContainer>

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
                    {/* TODO: Пока убрана */}
                    {/* <S.SearchStyled
                        onClear={() => console.log(isAuth)}
                        // onSearch={() => console.log('search')}
                        placeholder="Поиск"
                        size="small"
                    /> */}

                    <BaseIcon
                        iconName={!themeIsDark ? Icons.HalfMoon : Icons.Sun}
                        onClick={toggleTheme}
                    />

                    <BaseIcon
                        iconName={Icons.NotificationNew}
                        onClick={() => {
                            console.log('getClaims', auth.getClaims(auth.getAccessToken()));
                            // console.log('auth.getAccessToken()', auth.getAccessToken());
                        }}
                    />

                    <BaseIcon
                        iconName={Icons.Grid}
                        // onClick={() =>
                        //     window.open(`mailto:email@example.com?subject=Subject&body=test`)
                        // }
                    />

                    {isAuth ? (
                        <ProfileIcon
                            // initials={'KO'}
                            initials={userInfo?.family_name[0] + userInfo?.given_name[0]}
                            clearAuth={() => {
                                auth.clean();

                                clearAuth();
                            }}
                            {...{ isPersonalArea }}
                        />
                    ) : (
                        <BaseIcon
                            iconName={Icons.User}
                            type="default"
                            onClick={() => auth.startAuth()}
                        />
                    )}
                </S.ControlPanel>
                {/* <Mailto
                    email="foo@bar.baz"
                    subject="Hello & Welcome"
                    body='&lt;div style="color: red"&gt;TEST&lt;/div&gt;'
                >
                    Mail me!
                </Mailto> */}
            </S.Container>
        </>
    );
});
