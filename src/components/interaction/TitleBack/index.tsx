import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { ITitleBack } from './types';
import * as S from './units';

export const TitleBack: FC<ITitleBack> = ({ title, onClick, ...rest }) => {
    const navigate = useNavigate();

    const navigateBack = () => navigate(-1);

    return (
        <S.Title className="TitleBack" onClick={onClick ? onClick : navigateBack} {...rest}>
            <Icon iconName={Icons.ArrowLeft} /> {title}
        </S.Title>
    );
};
