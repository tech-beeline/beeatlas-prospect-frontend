import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { IAppsPage } from './types';
import * as S from './units';

export const AppsDashboardPage: FC<IAppsPage> = ({ isProd }) => {
    const [params] = useSearchParams();
    const alias = params.get('alias');

    return (
        <S.IFrameStyled
            src={`${
                isProd
                    ? 'https://dashboard-prod-eafdmmart.apps.yd-m3-k21.vimpelcom.ru/systems'
                    : 'https://dashboard-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/systems'
            }${alias ? '/' + alias : ''}`}
        />
    );
};
