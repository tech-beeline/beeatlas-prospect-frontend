import React, { forwardRef, Fragment, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Checkbox as DSCheckbox } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { Checkbox, FeelingPicker, RadioGroup, Select, TextArea, TextField } from 'components/form';

import { useGetBIStatusesQuery } from 'api/queries/bi-library';
import { useModal } from 'hooks';
import { Dialog } from 'widgets/Dialog';

import { ChannelsFieldArray } from './components/ChannelsFieldArray';
import { ParticiapntsFieldArray, TextFieldArray } from './components';
import { FormValues, validationSchema } from './form';
import { IBIForm } from './types';
import * as S from './units';

export const BIForm = forwardRef<HTMLButtonElement, IBIForm>(
    ({ onClose, onSave, defaultValues, showButtons = true, fullscreen = false }, buttonRef) => {
        const { modalOpened, openModal, closeModal } = useModal();

        const { data } = useGetBIStatusesQuery();

        const form = useForm<FormValues>({
            resolver: yupResolver(validationSchema),
            mode: 'onChange',
        });

        const { handleSubmit, reset, watch, setValue } = form;

        useEffect(() => {
            if (defaultValues) {
                reset(defaultValues);
            } else {
                reset({
                    participants: [{ participant: 1, value: '', descr: '' }],
                    channels: [{ value: 1 }],
                    document: [{ value: '' }],
                    mockup: [{ value: '' }],
                });
            }
        }, [defaultValues]);

        const onSubmit = handleSubmit(async (values) => {
            onSave(values);
            onClose();
            reset();
        });

        const communal = watch('communal');

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
                                    {fullscreen && !communal ? (
                                        <DSCheckbox
                                            label="Коммунальный"
                                            checked={false}
                                            onClick={openModal}
                                        />
                                    ) : (
                                        <Checkbox name="communal" label="Коммунальный" />
                                    )}
                                </S.CheckboxContainer>
                            </NameContainer>

                            {!fullscreen && (
                                <S.BannerStyled
                                    iconName={Icons.InfoCircled}
                                    color="warning"
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
                                        options={
                                            data?.map((option) => ({
                                                id: option.id,
                                                value: option.name,
                                            })) ?? []
                                        }
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

                            <S.SubTitle id="scenarios">Сценарии</S.SubTitle>

                            <TextArea name="clientScenario" label="Клиентский сценарий*" />

                            <TextField name="flowLink" label="Ссылка на флоу" />

                            <TextArea name="ucsReaction" label="Описание реакции ЕКП*" />

                            <ChannelsFieldArray fullscreen={fullscreen} />

                            <TextFieldArray
                                fullscreen={fullscreen}
                                fieldName="document"
                                itemLabel="Ссылка"
                                title="Документация"
                            />

                            <TextFieldArray
                                fullscreen={fullscreen}
                                fieldName="mockup"
                                itemLabel="Ссылка"
                                title="Макет"
                            />

                            {/* <S.SubTitle id="mockup">Макет</S.SubTitle>

                            <TextField name="mockup" label="Ссылка" /> */}
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
                <Dialog
                    opened={modalOpened}
                    title="Сделать BI коммунальным?"
                    onClose={closeModal}
                    onDecline={closeModal}
                    onConfirm={() => {
                        setValue('communal', true);
                        closeModal();
                    }}
                >
                    {`Коммунальный BI будет доступен для использования всем\nкомандам в компании. Вы не сможете вносить правки, если другие\nкоманды добавят его в свой CJ`}
                </Dialog>
            </>
        );
    },
);
