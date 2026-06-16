import React from 'react';

import { Link } from 'components/other';

import * as R from 'router/const';

import * as S from './units';

export const RelatedBISteps = () => {
    return (
        <S.Container>
            <Link title="Название bi step" url={`${R.E2E_PATH}`} />
            <Link title="Название bi step" url={`${R.E2E_PATH}`} />
            <Link title="Название bi step" url={`${R.E2E_PATH}`} />
        </S.Container>
    );
};
