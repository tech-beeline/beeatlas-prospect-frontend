import React, { forwardRef, Fragment, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Checkbox as DSCheckbox } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { Checkbox, RadioGroup, Select, TextArea, TextField } from 'components/form';

import { useGetBIStatusesQuery } from 'api/queries/bi-library';
import { useGetUserProductsQuery } from 'api/queries/product';
import { useModal } from 'hooks';
import { Dialog } from 'widgets/Dialog';

import { ChannelsFieldArray } from './components';
import { LinksFieldArray } from './components';
import { FormValues, validationSchema } from './form';
import { IBIForm } from './types';
import * as S from './units';

export const BIForm = forwardRef<HTMLButtonElement, IBIForm>(
    ({ onClose, onSave, defaultValues, showButtons = true, fullscreen = false }, buttonRef) => {
        const { modalOpened, openModal, closeModal } = useModal();

        const { data: statuses } = useGetBIStatusesQuery();

        const { data: products, isLoading: isLoadingProducts } = useGetUserProductsQuery();

        const form = useForm<FormValues>({
            resolver: yupResolver(validationSchema),
            mode: 'onChange',
        });

        const { handleSubmit, reset, watch, setValue, formState } = form;

        console.log(formState.errors);

        useEffect(() => {
            if (defaultValues) {
                reset(defaultValues);
            } else if (products) {
                reset({
                    product: products[0]?.id ? Number(products[0].id) : 1,
                    channels: [{ value: 1 }],
                    document: [{ value: '' }],
                    mockup: [{ value: '' }],
                });
            }
        }, [defaultValues, products]);

        const onSubmit = handleSubmit(async (values) => {
            await onSave(values);
            onClose();
            reset();
        });

        const communal = watch('communal');

        const NameContainer = fullscreen ? S.NameFlexContainer : Fragment;

        return (
            <>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <div id="top" />
                        <S.TextFieldContainer>
                            {fullscreen && !defaultValues && (
                                <Select
                                    disabled={isLoadingProducts}
                                    name="product"
                                    label="Приложение*"
                                    options={
                                        products?.map((product) => ({
                                            id: Number(product.id),
                                            value: product.name,
                                        })) ?? []
                                    }
                                />
                            )}

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
                                    title={`Коммунальный BI будет\nдоступен всем командам\nв компании. Вы не\nсможете вносить правки и удалять, если другие команды добавят его в свой CJ`}
                                />
                            )}

                            <TextArea name="descr" label="Описание*" />

                            <S.SubTitle id="characteristics">Характеристики</S.SubTitle>

                            <S.FlexContainer>
                                <RadioGroup
                                    name="type"
                                    options={[
                                        { label: 'Целевой', id: 0 },
                                        { label: 'Фактический', id: 1 },
                                    ]}
                                />
                            </S.FlexContainer>

                            <S.FlexContainer>
                                <S.GrowContainer>
                                    <Select
                                        name="status"
                                        label="Стадия ЖЦ*"
                                        options={
                                            statuses?.map((option) => ({
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

                            <S.SubTitle id="scenarios">Сценарий</S.SubTitle>

                            <TextArea name="clientScenario" label="Клиентский сценарий*" />

                            <ChannelsFieldArray fullscreen={fullscreen} />

                            <LinksFieldArray
                                fullscreen={fullscreen}
                                fieldName="document"
                                title="Документация"
                            />

                            <S.SubTitle id="metrics">Метрики</S.SubTitle>

                            <TextArea name="metrics" label="Текстовое описание измеримых метрик" />
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
                    {`Коммунальный BI будет доступен для использования всем\nкомандам в компании. Вы не сможете вносить правки и удалять,\nесли другие команды добавят его в свой CJ`}
                </Dialog>
            </>
        );
    },
);
