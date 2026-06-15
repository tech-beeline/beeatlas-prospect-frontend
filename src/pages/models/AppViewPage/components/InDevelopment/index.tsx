import React, { FC } from 'react';

import { Text } from 'components/core';
import { Button } from 'components/ui';

import * as R from 'router/const';

import image from './images/empty_list.png';

import { IInDevelopment } from './types';
import * as S from './units';

export const InDevelopment: FC<IInDevelopment> = ({ cmdb }) => {
    return (
        <S.Container>
            <S.Column>
                <img src={image} />
                <S.TitleContainer>
                    <Text variant="h5">Раздел в разработке</Text>
                </S.TitleContainer>
                <S.SubtitleContainer>
                    <Text inactive variant="body2">
                        Доступ к информации можно получить в старой версии
                    </Text>
                </S.SubtitleContainer>
                {!window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND && (
                    <S.ButtonContainer>
                        <Button
                            size="medium"
                            variant="contained"
                            onClick={() =>
                                window.open(`${R.MODELS_PATH}${R.APPS_OLD_PATH}?alias=${cmdb}`)
                            }
                        >
                            К старой версии страницы
                        </Button>
                    </S.ButtonContainer>
                )}
            </S.Column>
        </S.Container>
    );
};
