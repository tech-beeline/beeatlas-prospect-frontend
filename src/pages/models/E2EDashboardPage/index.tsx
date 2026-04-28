import React, { FC } from 'react';

import { IE2EDashboardPage } from './types';
import * as S from './units';

export const E2EDashboardPage: FC<IE2EDashboardPage> = ({ isProd }) => {
    return (
        <S.IFrameStyled
            src={
                isProd
                    ? 'https://dashboard-prod-eafdmmart.apps.yd-m3-k21.vimpelcom.ru/e2e'
                    : 'https://dashboard-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/e2e'
            }
        />
    );
};
