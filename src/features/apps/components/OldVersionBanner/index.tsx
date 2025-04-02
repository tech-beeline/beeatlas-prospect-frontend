import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import * as R from 'router/const';

import * as S from './units';

export const OldVersionBanner = () => {
    const navigate = useNavigate();

    return (
        <S.Container>
            <S.TextContainer>
                <Icon iconName={Icons.InfoCircled} size="medium" color="blue" />
                <Text variant="body3">
                    Мы обновили дизайн, сделав его более удобным и понятным, и при этом сохранили
                    возможность вернуться к старой версии интерфейса
                </Text>
            </S.TextContainer>
            <Button onClick={() => navigate(`${R.MODELS_PATH}${R.APPS_OLD_PATH}`)}>
                К старой версии
            </Button>
        </S.Container>
    );
};
