import React, { forwardRef, Fragment, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { Checkbox, FeelingPicker, RadioGroup, Select, TextArea, TextField } from 'components/form';

import { ParticiapntsFieldArray } from './components';
import { FormValues, validationSchema } from './form';
import { IBIForm } from './types';
import * as S from './units';

export const BIForm = forwardRef<HTMLButtonElement, IBIForm>(
    ({ onClose, onSave, defaultValues, showButtons = true, fullscreen = false }, buttonRef) => {
        const form = useForm<FormValues>({
            resolver: yupResolver(validationSchema),
        });

        const { handleSubmit, reset } = form;

        useEffect(() => {
            if (defaultValues) {
                reset(defaultValues);
            } else {
                reset({ participants: [{ participant: 0, value: '', descr: '' }] });
            }
        }, [defaultValues]);

        const onSubmit = handleSubmit(async (values) => {
            onSave(values);
            onClose();
            reset();
        });

        const NameContainer = fullscreen ? S.NameFlexContainer : Fragment;

        return (
            <>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <S.TextFieldContainer>
                            <NameContainer>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Название*"
                                    maxLength={255}
                                />

                                <S.CheckboxContainer marginTop={fullscreen}>
                                    <Checkbox name="communal" label="Коммунальный" />
                                </S.CheckboxContainer>
                            </NameContainer>

                            {!fullscreen && (
                                <S.BannerStyled
                                    iconName={Icons.InfoCircled}
                                    color="default"
                                    title={`Коммунальный BI будет\nдоступен всем командам\nв компании. Вы не\nсможете вносить правки,\nесли другие команды\nдобавят его в свой CJ`}
                                />
                            )}

                            <TextArea name="descr" label="Описание*" />

                            <S.SubTitle id="characteristics">Характеристики</S.SubTitle>

                            <S.FlexContainer>
                                <RadioGroup name="type" labels={['Целевой', 'Фактический']} />
                            </S.FlexContainer>

                            <S.FlexContainer>
                                <S.GrowContainer>
                                    <Select
                                        name="status"
                                        label="Стадия ЖЦ*"
                                        options={[
                                            // {
                                            //     id: 0,
                                            //     value: 'Передан в эксплуатацию',
                                            // },
                                            // {
                                            //     id: 1,
                                            //     value: 'Не передан',
                                            // },
                                            // {
                                            //     id: 2,
                                            //     value: 'Неизвестно',
                                            // },
                                            {
                                                id: 2,
                                                value: 'Черновик',
                                            },
                                            {
                                                id: 3,
                                                value: 'Опубликован',
                                            },
                                        ]}
                                    />
                                </S.GrowContainer>
                                {fullscreen && (
                                    <>
                                        <S.GrowContainer />
                                        <S.MockButton />
                                    </>
                                )}
                            </S.FlexContainer>

                            <ParticiapntsFieldArray fullscreen={fullscreen} />

                            <S.SubTitle id="feelings">Чувства и эмоции</S.SubTitle>

                            <FeelingPicker name="feelings" />

                            {/* <EntersFieldArray /> */}

                            <S.SubTitle id="scenarios">Сценарии</S.SubTitle>

                            <TextArea name="clientScenario" label="Клиентский сценарий*" />

                            <TextField name="flowLink" label="Ссылка на флоу" />

                            <TextArea name="ucsReaction" label="Описание реакции ЕКП*" />

                            <S.SubTitle id="channels">Каналы</S.SubTitle>

                            <Select
                                name="channel"
                                label="Канал*"
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
                                    {
                                        id: 4,
                                        value: 'Партнерские витрины',
                                    },
                                    {
                                        id: 5,
                                        value: 'Собственные офисы продаж',
                                    },
                                    {
                                        id: 6,
                                        value: 'Офисы продаж (мультибренд)',
                                    },
                                    {
                                        id: 7,
                                        value: 'Офисы продаж (франшиза)',
                                    },
                                    {
                                        id: 8,
                                        value: 'Персональная поддержка',
                                    },
                                    {
                                        id: 9,
                                        value: 'Поддержка',
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
