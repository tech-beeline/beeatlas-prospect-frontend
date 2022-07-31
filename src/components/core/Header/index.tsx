import React from 'react';

import { Logo } from '..';

import profileSVG from './images/profile.svg';

import * as S from './units';

export const Header = () => {
    return (
        <>
            <S.Container>
                <p style={{ marginRight: '20px' }}>корп. архитектура</p>

                <Logo height={25} />

                <img src={profileSVG} style={{ marginLeft: 'auto' }} />
            </S.Container>
        </>
    );
};
