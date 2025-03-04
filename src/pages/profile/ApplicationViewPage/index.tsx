import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Label } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import * as R from 'router/const';

import * as S from './units';

export const ApplicationViewPage = () => {
    const navigate = useNavigate();

    const handleBackIconClick = () => {
        navigate(`${R.PROFILE_PATH}${R.APPLICATIONS_PATH}`);
    };

    const handleEditButtonClick = () => {
        navigate(`${R.PROFILE_PATH}${R.APPLICATIONS_PATH}${R.ADD_PATH}`);
    };

    return (
        <S.PageWrapper>
            <S.Header>
                <IconButton onClick={handleBackIconClick} iconName={Icons.ArrowLeft} size="large" />
                <Text variant="body2">Назад</Text>
            </S.Header>
            <S.Content>
                <S.ContentContainer>
                    <S.TitleContainer>
                        <Text variant="h4">Создание бизнес-возможность</Text>
                        <Label title="На доработке" variant="contained" type="warning" />
                    </S.TitleContainer>
                    <S.MetadataContainer>
                        <div>
                            <Text inactive variant="body3">
                                Дата создания
                            </Text>
                            <Text variant="body2">12.08.24 в 13:43</Text>
                        </div>
                        <div>
                            <Text inactive variant="body3">
                                Дата изменения
                            </Text>
                            <Text variant="body2">12.08.24 в 13:43</Text>
                        </div>
                        <div>
                            <Text inactive variant="body3">
                                Номер заявки
                            </Text>
                            <Text variant="body2">1109056</Text>
                        </div>
                    </S.MetadataContainer>
                    <Text variant="subtitle1">Атрибуты</Text>
                    <div>
                        <Text inactive variant="body3">
                            Название
                        </Text>
                        <Text variant="body2">Бизнес возможность</Text>
                    </div>
                    <div>
                        <Text inactive variant="body3">
                            Определение
                        </Text>
                        <Text variant="body2">
                            Проверка возможности работы менеджером продаж с клиентом B2B, чтобы
                            существенно ускорить ручные проверки и сэкономить деньги Компании Данная
                            возможность позволяет сэкономить 620 тыс. часов в год, что равносильно
                            работе 330 новых сотрудников
                        </Text>
                    </div>
                    <div>
                        <Text inactive variant="body3">
                            Домен
                        </Text>
                        <Text variant="body2">Название домен</Text>
                    </div>
                    <div>
                        <Text inactive variant="body3">
                            Владелец возможности
                        </Text>
                        <Text variant="body2">Константинопольский Константин Константинович</Text>
                    </div>
                    <Text variant="subtitle1">Исполнитель</Text>
                    <Text variant="body2">Кононов Юрий Андреевич</Text>
                    <Text variant="subtitle1">Комментарии к заявке</Text>
                    <S.CommentsContainer>
                        <div>
                            <Text inactive variant="body3">
                                Хрестовоздвиженский Константин Константинович, добавил комментарий
                                19.09.2024
                            </Text>
                            <Text variant="body2">Возможность нужна как можно скорее</Text>
                        </div>
                        <div>
                            <Text inactive variant="body3">
                                Кононов Юрий Андреевич, добавил комментарий 22.09.2024
                            </Text>
                            <Text variant="body2">
                                Пожалуйста, пришлите корректное описание бизнес-возможности, следуя
                                единым стандартам
                            </Text>
                        </div>
                        <div>
                            <Text inactive variant="body3">
                                Хрестовоздвиженский Константин Константинович, добавил комментарий
                                25.09.2024
                            </Text>
                            <Text variant="body2">Все правки внес</Text>
                        </div>
                        <div>
                            <Text inactive variant="body3">
                                Хрестовоздвиженский Константин Константинович, добавил комментарий
                                25.09.2024
                            </Text>
                            <Text variant="body2">Все правки внес</Text>
                        </div>
                        <div>
                            <Text inactive variant="body3">
                                Хрестовоздвиженский Константин Константинович, добавил комментарий
                                25.09.2024
                            </Text>
                            <Text variant="body2">Все правки внес</Text>
                        </div>
                        <div>
                            <Text inactive variant="body3">
                                Хрестовоздвиженский Константин Константинович, добавил комментарий
                                25.09.2024
                            </Text>
                            <Text variant="body2">Все правки внес</Text>
                        </div>
                        <div>
                            <Text inactive variant="body3">
                                Хрестовоздвиженский Константин Константинович, добавил комментарий
                                25.09.2024
                            </Text>
                            <Text variant="body2">Все правки внес</Text>
                        </div>
                    </S.CommentsContainer>
                    {/* @TODO: Scroll issue */}
                    <S.EmptyDiv />
                </S.ContentContainer>
            </S.Content>
            <S.Footer>
                <S.ButtonContainer>
                    <Button size="medium">Снять назначение</Button>
                    <Button size="medium">Вернуть на доработку</Button>
                    <Button size="medium" variant="contained" onClick={handleEditButtonClick}>
                        Редактировать
                    </Button>
                </S.ButtonContainer>
            </S.Footer>
        </S.PageWrapper>
    );
};
