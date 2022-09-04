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

    const handleAuthTest = () => {
        const auth = new VKITAuth();

        auth.startAuth();
    };

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

                    <S.NotificationIcon />

                    <S.DashboardIcon />

                    <S.ProfileIcon onClick={handleAuthTest} />
                </S.ControlPanel>
            </S.Container>
        </>
    );
});
