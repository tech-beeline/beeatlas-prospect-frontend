import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Icon } from 'components/ui';

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
