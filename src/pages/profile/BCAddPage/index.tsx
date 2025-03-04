import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Banner, Button, Icon, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { Text } from 'components/core';
import { TextArea, TextField } from 'components/form';

import * as R from 'router/const';

import { FormValues, validationSchema } from './form';
import * as S from './units';

export const BCAddPage = () => {
    const [showBanner, setShowBanner] = useState(true);
    const navigate = useNavigate();

    const handleBackIconClick = () => {
        navigate(`${R.PROFILE_PATH}${R.APPLICATIONS_PATH}${R.VIEW_PATH}`);
    };

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit } = form;

    const onSubmit = (draft = false) =>
        handleSubmit(async (values) => {
            try {
                console.log(draft, values);
            } catch (error) {}
        });

    return (
        <FormProvider {...form}>
            <form onSubmit={onSubmit(false)}>
                <S.PageWrapper>
                    <S.Header>
                        <IconButton
                            onClick={handleBackIconClick}
                            iconName={Icons.ArrowLeft}
                            size="large"
                        />
                        <Text variant="body2">Назад</Text>
                    </S.Header>

                    <S.Content>
                        <S.ContentContainer>
                            <Text variant="h4">Создание бизнес-возможность</Text>
                            {showBanner && (
                                <Banner
                                    color="info"
                                    iconName={Icons.InfoCircled}
                                    title="Создание бизнес-возможности проходит этап согласования корпоративным архитектором, по результату рассмотрения заявки вам придет уведомление"
                                    onClose={() => setShowBanner(false)}
                                />
                            )}
                            <S.RelativeContainer>
                                <TextField name="name" label="Название*" helperPosition="block" />
                                <S.IconContainer data-tooltip-id="name-icon">
                                    <Icon iconName={Icons.InfoCircled} size="medium" />
                                </S.IconContainer>
                                <S.TooltipContainer
                                    offset={0}
                                    id="name-icon"
                                    place="bottom"
                                    noArrow
                                >
                                    <Text variant="subtitle3">Формула:</Text>
                                    <Text variant="caption">
                                        {
                                            '<Действие-отглагольное существительное> <Объект действия - существительное> + <Характеристика объекта/уточнение>'
                                        }
                                    </Text>
                                    <Text variant="subtitle3">Пример:</Text>
                                    <Text variant="caption">
                                        Возможность оценивать, анализировать, логировать (действие)
                                        доступность, время отклика, корректность взаимодействия
                                        (объект, характеристики)
                                    </Text>
                                </S.TooltipContainer>
                            </S.RelativeContainer>
                            <S.RelativeContainer>
                                <S.TextAreaStyled name="description" label="Определение*" />
                                <S.IconContainer data-tooltip-id="description-icon">
                                    <Icon iconName={Icons.InfoCircled} size="medium" />
                                </S.IconContainer>
                                <S.TooltipContainer
                                    offset={0}
                                    id="description-icon"
                                    place="bottom"
                                    noArrow
                                >
                                    <Text variant="subtitle3">Формула:</Text>
                                    <Text variant="caption">
                                        {`<Действие-отглагольное существительное> <Объект действия - существительное> + <Характеристика объекта/уточнение> <Ценность> или <Мотивация/конечная цель>`}
                                    </Text>
                                    <Text variant="subtitle3">Пример:</Text>
                                    <Text variant="caption">
                                        Возможность оценивать, анализировать, логировать (действие)
                                        доступность, время отклика, корректность взаимодействия
                                        (объект, характеристики) перед конфигурированием новых
                                        сервисов на VAS-платформе (пояснение) для проверки
                                        правильности настройки оборудования (мотивация/ценность)
                                    </Text>
                                </S.TooltipContainer>
                            </S.RelativeContainer>
                            <TextField name="domain" label="Домен" />
                            <S.FlexContainer>
                                <TextField name="owner" label="Владелец возможности" />
                                <Button type="button" size="medium">
                                    Назначить себя
                                </Button>
                            </S.FlexContainer>
                            <Text variant="subtitle1">Комментарий к заявке</Text>
                            <TextArea name="comment" label="Комментарий к заявке" />
                            {/* @TODO: Scroll issue */}
                            <S.EmptyDiv />
                        </S.ContentContainer>
                    </S.Content>
                    <S.Footer>
                        <S.ButtonContainer>
                            <Button size="medium" type="button" onClick={onSubmit(true)}>
                                Сохранить как черновик
                            </Button>
                            <Button size="medium" variant="contained" type="submit">
                                Отправить заявку
                            </Button>
                        </S.ButtonContainer>
                    </S.Footer>
                </S.PageWrapper>
            </form>
        </FormProvider>
    );
};
