import React, { forwardRef, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Banner, Button } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { Checkbox, FeelingPicker, RadioGroup, Select, TextArea, TextField } from 'components/form';

import { ParticiapntsFieldArray } from './components';
import { FormValues, validationSchema } from './form';
import { IBIForm } from './types';
import * as S from './units';

export const BIForm = forwardRef<HTMLButtonElement, IBIForm>(
    ({ onClose, onSave, defaultValues, showButtons = true }, buttonRef) => {
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
                            <TextField id="name" name="name" label="Название*" maxLength={255} />

                            <Checkbox name="communal" label="Коммунальный" />

                            <Banner
                                iconName={Icons.InfoCircled}
                                color="default"
                                title="Коммунальный BI будет доступен всем командам в компании. Вы не сможете вносить правки, если другие команды добавят его в свой CJ"
                            />

                            <TextArea name="descr" label="Описание*" />

                            <S.SubTitle id="characteristics">Характеристики</S.SubTitle>

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

                            <S.SubTitle id="feelings">Чувства и эмоции</S.SubTitle>

                            <FeelingPicker name="feelings" />

                            {/* <EntersFieldArray /> */}

                            <S.SubTitle id="scenarios">Сценарии</S.SubTitle>

                            <TextArea name="clientScenario" label="Клиентский сценарий" />

                            <TextField name="flowLink" label="Ссылка на флоу" />

                            <TextArea name="ucsReaction" label="Описание реакции ЕКП" />

                            <S.SubTitle id="channels">Каналы</S.SubTitle>

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

                            <S.SubTitle id="documentation">Документация</S.SubTitle>

                            <TextField name="document" label="Ссылка" />

                            <S.SubTitle id="mockup">Макет</S.SubTitle>

                            <TextField name="mockup" label="Ссылка" />
                        </S.TextFieldContainer>

                        <S.ButtonContainer style={{ display: showButtons ? 'flex' : 'none' }}>
                            <Button type="button" size="medium" onClick={onClose}>
                                Отменить
                            </Button>
                            <Button type="submit" size="medium" variant="contained" ref={buttonRef}>
                                Сохранить
                            </Button>
                        </S.ButtonContainer>
                    </form>
                </FormProvider>
            </>
        );
    },
);
