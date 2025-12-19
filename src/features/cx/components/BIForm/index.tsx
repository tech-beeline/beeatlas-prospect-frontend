import React, { forwardRef, Fragment, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@beeline/design-system-react';
import { yupResolver } from '@hookform/resolvers/yup';

import { MultiSelect, RadioGroup, Select, TextArea, TextField } from 'components/form';

import { useGetBIChannelsQuery, useGetBIStatusesQuery } from 'api/queries/bi-library';
import { useGetProductsQuery } from 'hooks';

import { LinksFieldArray } from './components';
import { FormValues, validationSchema } from './form';
import { IBIForm } from './types';
import * as S from './units';

export const BIForm = forwardRef<HTMLButtonElement, IBIForm>(
    ({ onClose, onSave, defaultValues, showButtons = true, fullscreen = false }, buttonRef) => {
        const { data: statuses } = useGetBIStatusesQuery();

        const { data: products, isLoading: isLoadingProducts } = useGetProductsQuery();

        const form = useForm<FormValues>({
            resolver: yupResolver(validationSchema),
            mode: 'onChange',
        });

        const { handleSubmit, reset } = form;

        const { data: channel, isLoading: channelLoading } = useGetBIChannelsQuery();

        const channelOptions = (channel ?? []).map((channel) => ({
            id: channel.id,
            value: channel.name,
        }));

        useEffect(() => {
            if (defaultValues) {
                reset(defaultValues);
            } else if (products) {
                reset({
                    product: products[0] && String(products[0].id) ? Number(products[0].id) : 1,
                    channels: [],
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
                                    label="Приложение"
                                    options={
                                        products?.map((product) => ({
                                            id: Number(product.id),
                                            value: product.name,
                                        })) ?? []
                                    }
                                />
                            )}

                            <NameContainer>
                                <TextField id="name" name="name" label="Название" maxLength={255} />
                            </NameContainer>

                            <TextArea name="descr" label="Описание" />

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
                                        label="Стадия ЖЦ"
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

                            <TextArea name="clientScenario" label="Клиентский сценарий" />

                            <S.FieldsContainer>
                                <S.SubTitle id="channels">Каналы</S.SubTitle>

                                <MultiSelect
                                    fullWidth
                                    name="group"
                                    label="Канал"
                                    options={channelOptions}
                                    disabled={channelLoading}
                                />
                            </S.FieldsContainer>

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
                                Сохранить как черновик
                            </Button>
                            <Button type="submit" size="medium" variant="contained" ref={buttonRef}>
                                Опубликовать
                            </Button>
                        </S.ButtonContainer>
                    </form>
                </FormProvider>
            </>
        );
    },
);
