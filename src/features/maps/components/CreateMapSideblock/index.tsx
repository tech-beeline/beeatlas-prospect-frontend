import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { RadioGroup, TextArea, TextField } from 'components/form';
import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Banner, Button } from 'components/ui';

import { useGetPersonalMapTypesQuery } from 'api/queries/maps';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { MapFormValues, validationSchema } from './form';
import { ICreateMapSideblock } from './types';
import * as S from './units';

export const CreateMapSideblock: FC<ICreateMapSideblock> = ({
    isOpen,
    onClose,
    onSave,
    values,
    typeDisabled,
}) => {
    const { data: typesData, isLoading: isLoadingTypes } = useGetPersonalMapTypesQuery();

    const form = useForm<MapFormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, watch, reset } = form;

    const handleCloseClick = () => {
        reset();
        onClose();
    };

    useEffect(() => {
        reset({ ...values, type: values?.type ?? [...(typesData ?? [])].reverse()?.[0]?.id });
    }, [values, typesData]);

    const description = watch('description');

    const onSubmit = handleSubmit(async (values) => {
        try {
            await onSave(values);
            onClose();
        } catch (error) {}
    });

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={handleCloseClick}>
            <FormProvider {...form}>
                <form onSubmit={onSubmit}>
                    <S.FlexContainer>
                        <S.ContentContainer>
                            <S.FlexWrapper>
                                <S.SideBlockTitle>
                                    {values ? 'Настройка карты' : 'Создать карту'}
                                </S.SideBlockTitle>

                                <IconButton
                                    iconName={Icons.Close}
                                    onClick={handleCloseClick}
                                    size="large"
                                />
                            </S.FlexWrapper>

                            <S.TextFieldContainer>
                                <Banner
                                    color="info"
                                    iconName={Icons.InfoCircled}
                                    title="Тип карты — это параметр, который определяет, какие объекты могут
                                быть размещены на ней. Выбирая определённый тип карты, вы
                                автоматически задаёте набор доступных объектов"
                                />

                                <Text variant="subtitle1">Тип карты</Text>

                                <S.RadioGroupContainer data-tooltip-id="type-selection">
                                    <RadioGroup
                                        name="type"
                                        disabled={typeDisabled || isLoadingTypes}
                                        options={[...(typesData ?? [])].reverse().map((type) => ({
                                            label: type.title,
                                            id: type.id,
                                        }))}
                                    />
                                </S.RadioGroupContainer>
                                {typeDisabled && (
                                    <TooltipContainer
                                        largePadding
                                        id="type-selection"
                                        offset={8}
                                        place="bottom"
                                        noArrow
                                    >
                                        Редактирование недоступно. Чтобы изменить тип карты, удалите
                                        все элементы и сохраните карту
                                    </TooltipContainer>
                                )}

                                <TextField label="Название карты*" name="name" />

                                <TextArea
                                    label="Описание"
                                    name="description"
                                    maxLength={250}
                                    helperText={`${description?.length ?? 0}/250`}
                                />
                            </S.TextFieldContainer>
                        </S.ContentContainer>
                        <S.ButtonContainer>
                            <Button type="button" onClick={handleCloseClick}>
                                Отменить
                            </Button>

                            <Button type="submit" variant="contained">
                                {values ? 'Сохранить' : 'Создать'}
                            </Button>
                        </S.ButtonContainer>
                    </S.FlexContainer>
                </form>
            </FormProvider>
        </SideBlock>
    );
};
