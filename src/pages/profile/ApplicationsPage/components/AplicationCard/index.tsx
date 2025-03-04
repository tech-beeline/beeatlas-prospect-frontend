import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Label } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import { Text } from 'components/core';

import * as R from 'router/const';

import * as S from './units';

export const ApplicationCard = () => {
    const navigate = useNavigate();

    return (
        <S.Container>
            <S.Content>
                <S.TitleContainer>
                    <Text inactive variant="overline">
                        Создание бизнес-возможности
                    </Text>
                    <Text
                        link
                        pointer
                        variant="subtitle2"
                        onClick={() =>
                            navigate(`${R.PROFILE_PATH}${R.APPLICATIONS_PATH}${R.VIEW_PATH}`)
                        }
                    >
                        Омниканальное Управление Взаимодействиями
                    </Text>
                </S.TitleContainer>
                <div>
                    <Text inactive variant="overline">
                        Домен
                    </Text>
                    <Text variant="body2">Отправка коммуникаций в различне каналы</Text>
                </div>
                <div>
                    <Text inactive variant="overline">
                        Исполнитель
                    </Text>
                    <Text variant="body2">Кононов Юрий Андреевич</Text>
                </div>
                <S.DatesContainer>
                    <div>
                        <Text inactive variant="overline">
                            Создана
                        </Text>
                        <Text variant="body2">12.08.2024</Text>
                    </div>
                    <div>
                        <Text inactive variant="overline">
                            Изменена
                        </Text>
                        <Text variant="body2">15.08.2024</Text>
                    </div>
                </S.DatesContainer>
            </S.Content>
            <S.Metadata>
                <S.NumberContainer>
                    <Text variant="body2">№ 1109056</Text>
                    <Label title="Рассмотрена" variant="contained" type="success" />
                </S.NumberContainer>
                <S.LinkContainer>
                    <Text link variant="body2">
                        Возможность в ФДМ
                    </Text>
                    <S.IconStyled iconName={Icons.Copy} />
                </S.LinkContainer>
                <S.ButtonContainer>
                    <Button size="small">Назначить на себя</Button>
                </S.ButtonContainer>
            </S.Metadata>
        </S.Container>
    );
};
