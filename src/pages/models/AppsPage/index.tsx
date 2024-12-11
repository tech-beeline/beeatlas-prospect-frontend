import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import * as S from './units';

export const AppsPage: FC = () => {
    const [params] = useSearchParams();
    const alias = params.get('alias');

    return (
        <S.IFrameStyled
            src={`https://dashboard-prod-eafdmmart.apps.yd-m3-k21.vimpelcom.ru/systems${
                alias ? '/' + alias : ''
            }`}
        />
    );
};
