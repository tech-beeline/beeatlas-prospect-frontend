import React, { FC } from 'react';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import * as R from 'router/const';

import { IOldVersionBanner } from './types';
import * as S from './units';

export const OldVersionBanner: FC<IOldVersionBanner> = ({ cmdb }) => {
    return (
        <S.Container>
            <S.TextContainer>
                <Icon iconName={Icons.InfoCircled} size="medium" color="blue" />
                <Text variant="body3">
                    Мы обновили дизайн, сделав его более удобным и понятным, и при этом сохранили
                    возможность вернуться к старой версии интерфейса
                </Text>
            </S.TextContainer>
            <Button
                onClick={() =>
                    window.open(`${R.MODELS_PATH}${R.APPS_OLD_PATH}${cmdb ? '?alias=' + cmdb : ''}`)
                }
            >
                К старой версии
            </Button>
        </S.Container>
    );
};
