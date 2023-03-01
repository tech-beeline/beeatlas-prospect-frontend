import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Icons } from '@beeline/lk-ui';

import * as S from './units';

export const TitleBack = ({ title }: { title: string }) => {
    const navigate = useNavigate();

    return (
        <S.Title className="TitleBack" onClick={() => navigate(-1)}>
            <Icon iconName={Icons.ArrowLeft} /> {title}
        </S.Title>
    );
};
