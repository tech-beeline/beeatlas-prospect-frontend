import React, { FC } from 'react';

import { Text } from 'components/core';
import { Button, Icon } from 'components/ui';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IOldVersionBanner } from './types';
import * as S from './units';

export const OldVersionBanner: FC<IOldVersionBanner> = ({ cmdb, e2e = false }) => {
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
                    window.open(
                        e2e
                            ? `${R.MODELS_PATH}${R.E2E_OLD_PATH}`
                            : `${R.MODELS_PATH}${R.APPS_OLD_PATH}${cmdb ? '?alias=' + cmdb : ''}`,
                    )
                }
            >
                К старой версии
            </Button>
        </S.Container>
    );
};
