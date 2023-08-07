import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './units';

export const TitleBack = (props: any) => {
    const navigate = useNavigate();

    return (
        <S.Title className="TitleBack" onClick={() => navigate(-1)} {...props}>
            <Icon iconName={Icons.ArrowLeft} /> {props.title}
        </S.Title>
    );
};
