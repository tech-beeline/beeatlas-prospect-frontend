import React from 'react';
import VKITAuth from '@beeline/lk-auth';
import { observer } from 'mobx-react';

import { useRootStore } from 'stores/initStore';

import { Logo } from '..';

import * as S from './units';

export const Header = observer(() => {
    const {
        generalStore: { toggleTheme },
    } = useRootStore();

    const auth = new VKITAuth();

    const handleAuthTest = () => {
        // auth.hasNecessaryParams();
        // auth.clean();
        auth.startAuth();

        // console.log('getAccessToken', auth.getAccessToken());
        // console.log('getCodeParam', auth.getCodeParam());
        // console.log('getProviderParam', auth.getProviderParam()); // adfs
        // console.log('getProviderToken', auth.getProviderToken()); // adfs
        // console.log('getStateParam', auth.getStateParam());

        // const act = auth.getAccessToken();
    };

    // const handleEmail = () => {
    // const Mailto = ({ email, subject = '', body = '', children }: any) => {
    //     let params = subject || body ? '?' : '';
    //     if (subject) params += `subject=${encodeURIComponent(subject)}`;
    //     if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

    //     return <a href={`mailto:${email}${params}`}>{children}</a>;
    // };

    return (
        <>
            <S.Container>
                <S.Title>корп. архитектура</S.Title>
                <Logo />
                <S.ControlPanel>
                    <S.SearchStyled
                        onClear={() => console.log('clear')}
                        // onSearch={() => console.log('search')}
                        placeholder="Поиск"
                        size="small"
                    />

                    <S.ThemeIcon onClick={toggleTheme} />

                    <S.NotificationIcon
                        onClick={() =>
                            console.log('getClaims', auth.getClaims(auth.getAccessToken()))
                        }
                    />

                    <S.DashboardIcon
                        onClick={() =>
                            window.open(`mailto:email@example.com?subject=Subject&body=test`)
                        }
                    />

                    <S.ProfileIcon onClick={handleAuthTest} />
                </S.ControlPanel>
                {/* <Mailto
                    email="foo@bar.baz"
                    subject="Hello & Welcome"
                    body='&lt;div style="color: red"&gt;TEST&lt;/div&gt;'
                >
                    Mail me!
                </Mailto> */}
                ,
            </S.Container>
        </>
    );
});
