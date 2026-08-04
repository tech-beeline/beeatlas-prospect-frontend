import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { IAppsPage } from './types';
import * as S from './units';

export const AppsDashboardPage: FC<IAppsPage> = ({ isProd }) => {
    const [params] = useSearchParams();
    const alias = params.get('alias');

    return (
        <S.IFrameStyled
            src={`${window.FEATURE_FLAGS.FLAG_DASHBOARD_URL}/systems${alias ? '/' + alias : ''}`}
        />
    );
};
