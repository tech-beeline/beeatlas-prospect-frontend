import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'components/ui';

import * as R from 'router/const';

import * as S from './units';

export const CapabilitiesPage = () => {
    const navigate = useNavigate();

    return (
        <S.PageWrapper>
            <S.TitleContainer>
                <S.Title>Управление возможностями</S.Title>
            </S.TitleContainer>
            <Button
                onClick={() => navigate(`${R.ADMIN_PATH}${R.CAPABILITIES_PATH}${R.ADD_PATH}`)}
                size="small"
                variant="contained"
            >
                Создать бизнес-возможность
            </Button>
        </S.PageWrapper>
    );
};
