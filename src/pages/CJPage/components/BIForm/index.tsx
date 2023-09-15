import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { Checkbox, FeelingPicker, RadioGroup, Select, TextArea, TextField } from 'components/form';

import { SideBlock } from '../SideBlock';

import { EntersFieldArray, ParticiapntsFieldArray } from './components';
import { FormValues, validationSchema } from './form';
import { IBIForm } from './types';
import * as S from './units';

export const BIForm: FC<IBIForm> = (props) => {
    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit } = form;

    const onSubmit = handleSubmit(async (values) => {
        console.log(values);
    });

    return (
        // TODO: зафиксировать хэдер и скролить контент
        <SideBlock
            dontCloseOnOutsideClick={true}
            isOpen={props.isOpen}
            setOpen={props.setOpen}
            // @ts-ignore
            style={{ overflow: 'auto' }}
        >
            <S.TitleWrapper>
                <Icon
                    iconName={Icons.ArrowLeft}
                    onClick={() => props.setOpen(false)}
                    style={{ cursor: 'pointer' }}
                />

                <S.SideBlockTitle>Создание BI</S.SideBlockTitle>
            </S.TitleWrapper>

            <FormProvider {...form}>
                <form onSubmit={onSubmit}>
                    <S.TextFieldContainer>
                        <TextField name="name" label="Название*" />

                        <Checkbox name="communal" label="Коммунальный" />

                        <TextArea name="descr" label="Описание*" />

                        <S.SubTitle>Характеристики</S.SubTitle>

                        <S.FlexContainer>
                            <RadioGroup name="type" labels={['Целевой', 'Фактический']} />
                        </S.FlexContainer>

                        <Select
                            name="status"
                            label="Стадия ЖЦ"
                            options={[
                                {
                                    id: 0,
                                    value: 'Передан в эксплуатацию',
                                },
                                {
                                    id: 1,
                                    value: 'Не передан',
                                },
                                {
                                    id: 2,
                                    value: 'Неизвестно',
                                },
                            ]}
                        />

                        <ParticiapntsFieldArray />

                        <S.SubTitle>Чувства и эмоции</S.SubTitle>

                        <FeelingPicker name="feelings" />

                        <EntersFieldArray />

                        <S.SubTitle>Сценарии</S.SubTitle>

                        <TextArea name="clientScenario" label="Клиентский сценарий" />

                        <TextField name="flowLink" label="Ссылка на флоу" />

                        <TextArea name="ucsReaction" label="Описание реакции ЕКП" />

                        <S.SubTitle>Каналы</S.SubTitle>

                        <Select
                            name="channel"
                            label="Канал"
                            options={[
                                {
                                    id: 0,
                                    value: 'Web site',
                                },
                                {
                                    id: 1,
                                    value: 'Интернет магазин',
                                },
                                {
                                    id: 2,
                                    value: 'Мобильное приложение',
                                },
                                {
                                    id: 3,
                                    value: 'Личный кабинет',
                                },
                            ]}
                        />

                        <S.SubTitle>Документация</S.SubTitle>

                        <TextField name="document" label="Ссылка" />

                        <S.SubTitle>Макет</S.SubTitle>

                        <TextField name="mockup" label="Ссылка" />
                    </S.TextFieldContainer>
                    <S.ButtonContainer>
                        <Button type="button" size="medium">
                            Отменить
                        </Button>
                        <Button type="submit" size="medium" variant="contained">
                            Сохранить
                        </Button>
                    </S.ButtonContainer>
                </form>
            </FormProvider>
        </SideBlock>
    );
};
