import React, { FC } from 'react';

import { IE2EDashboardPage } from './types';
import * as S from './units';

export const E2EDashboardPage: FC<IE2EDashboardPage> = ({ isProd }) => {
    return <S.IFrameStyled src={`${window.FEATURE_FLAGS.FLAG_DASHBOARD_URL}/e2e`} />;
};
