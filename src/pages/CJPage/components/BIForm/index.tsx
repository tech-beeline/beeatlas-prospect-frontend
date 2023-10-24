import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@beeline/design-system-react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Checkbox, FeelingPicker, RadioGroup, Select, TextArea, TextField } from 'components/form';

import { EntersFieldArray, ParticiapntsFieldArray } from './components';
import { FormValues, validationSchema } from './form';
import { IBIForm } from './types';
import * as S from './units';

export const BIForm: FC<IBIForm> = ({ onClose, onSave, defaultValues }) => {
    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset } = form;

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues]);

    const onSubmit = handleSubmit(async (values) => {
        onSave(values);
        onClose();
        reset();
    });

    return (
        <>
            <FormProvider {...form}>
                <form onSubmit={onSubmit}>
                    <S.TextFieldContainer>
                        <TextField name="name" label="Название*" maxLength={255} />

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
                        <Button type="button" size="medium" onClick={onClose}>
                            Отменить
                        </Button>
                        <Button type="submit" size="medium" variant="contained">
                            Сохранить
                        </Button>
                    </S.ButtonContainer>
                </form>
            </FormProvider>
        </>
    );
};
