import React, { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { Text } from 'components/core';
import { Autocomplete, DatePicker, Select, TextField } from 'components/form';
import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Button, Icon } from 'components/ui';

import { useGetProductsQuery } from 'hooks';
// import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { BCField } from './components';
import { FormValues, validationSchema } from './form';
import * as S from './units';

export const TCAddPage = () => {
    const [showCharacteristics, setShowCharacteristics] = useState(false);
    const navigate = useNavigate();

    const handleBackIconClick = () => {
        navigate(`${R.PROFILE_PATH}${R.APPLICATIONS_PATH}${R.VIEW_PATH}`);
    };

    const [productSearchText, setProductSearchText] = useState('');
    const { data: productsData, isLoading: isLoadingProducts } = useGetProductsQuery();
    const productOptions = (productsData ?? [])
        .filter((product) => product.name.toLowerCase().includes(productSearchText.toLowerCase()))
        .map((product) => ({
            id: Number(product.id),
            value: product.name,
        }));

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, control, reset, watch } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'bc',
    });

    useEffect(() => {
        reset({ bc: [{}] });
    }, []);

    const onSubmit = handleSubmit(async () => {
        try {
        } catch (error) {}
    });

    const productId = watch('product');

    return (
        <FormProvider {...form}>
            <form onSubmit={onSubmit}>
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
                            <Text variant="h4">Редактирование технической возможности</Text>
                            <Autocomplete
                                fullWidth
                                name="product"
                                loading={isLoadingProducts}
                                loadingText="Загрузка..."
                                noOptionsText={
                                    productSearchText === ''
                                        ? 'Начните вводить название продукта'
                                        : 'Нет совпадений'
                                }
                                label="Продукт*"
                                options={productOptions}
                                onInputChange={setProductSearchText}
                            />
                            {/* <NotFoundBlock */}
                            {/*     imageVariant={ImageVariants.DIALOG_BOX} */}
                            {/*     title="Для этого продукта доступно создание в structurizr" */}
                            {/*     text={ */}
                            {/*         <> */}
                            {/*             Всю необходимую информацию можно найти на{' '} */}
                            {/*             <Link */}
                            {/*                 title="BeeWorks Docs" */}
                            {/*                 url="https://docs.bw.vimpelcom.ru/techpolicy/" */}
                            {/*             /> */}
                            {/*         </> */}
                            {/*     } */}
                            {/* /> */}
                            <S.RelativeContainer>
                                <TextField
                                    name="name"
                                    label="Название*"
                                    helperPosition="block"
                                    disabled={!productId}
                                />
                                <S.IconContainer data-tooltip-id="name-icon">
                                    <Icon iconName={Icons.InfoCircled} size="medium" />
                                </S.IconContainer>
                                <TooltipContainer
                                    largePadding
                                    displayFlex
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
                                </TooltipContainer>
                            </S.RelativeContainer>
                            <S.RelativeContainer>
                                <S.TextAreaStyled
                                    name="description"
                                    label="Определение*"
                                    disabled={!productId}
                                />
                                <S.IconContainer data-tooltip-id="description-icon">
                                    <Icon iconName={Icons.InfoCircled} size="medium" />
                                </S.IconContainer>
                                <TooltipContainer
                                    largePadding
                                    displayFlex
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
                                </TooltipContainer>
                            </S.RelativeContainer>
                            {fields.map((field, index) => (
                                <BCField
                                    key={field.id}
                                    index={index}
                                    disabled={!productId}
                                    append={append}
                                    remove={remove}
                                />
                            ))}
                            <S.CharacteristicsTitleContainer>
                                <Text variant="subtitle1">Характеристики</Text>
                                <IconButton
                                    onClick={() => setShowCharacteristics(!showCharacteristics)}
                                    iconName={
                                        showCharacteristics ? Icons.NavArrowUp : Icons.NavArrowDown
                                    }
                                    size="large"
                                />
                            </S.CharacteristicsTitleContainer>
                            {showCharacteristics && (
                                <>
                                    <S.CharacteristicsContainer>
                                        <S.RelativeContainer>
                                            <Select
                                                name="status"
                                                label="Статус*"
                                                options={[
                                                    { id: 1, value: 'Предложена' },
                                                    {
                                                        id: 2,
                                                        value: 'В разработке',
                                                    },
                                                    { id: 3, value: 'В эксплуатации' },
                                                ]}
                                                disabled={!productId}
                                            />
                                            <S.IconContainer data-tooltip-id="status-icon">
                                                <Icon iconName={Icons.InfoCircled} size="medium" />
                                            </S.IconContainer>
                                            <TooltipContainer
                                                largePadding
                                                displayFlex
                                                offset={0}
                                                id="status-icon"
                                                place="bottom"
                                                noArrow
                                            >
                                                <Text variant="caption">
                                                    Предложена - ТС только в плане, разработка еще
                                                    не начиналась (Proposed)
                                                </Text>
                                                <Text variant="caption">&nbsp;</Text>
                                                <Text variant="caption">
                                                    В разработке - ТС не на продуктиве, в активной
                                                    разработке (Development)
                                                </Text>
                                                <Text variant="caption">&nbsp;</Text>
                                                <Text variant="caption">
                                                    В эксплуатации - ТС на продуктиве готова к
                                                    потреблению (Implemented)
                                                </Text>
                                            </TooltipContainer>
                                        </S.RelativeContainer>
                                    </S.CharacteristicsContainer>
                                    <S.CharacteristicsContainer>
                                        <TextField
                                            name="version"
                                            label="Версия"
                                            helperPosition="block"
                                            disabled={!productId}
                                        />
                                        <DatePicker
                                            fullWidth
                                            name="dateFrom"
                                            label="Валидна с"
                                            disabled={!productId}
                                        />
                                        <DatePicker
                                            fullWidth
                                            name="dateTo"
                                            label="Валидна до"
                                            disabled={!productId}
                                        />
                                    </S.CharacteristicsContainer>
                                </>
                            )}
                            {/* @TODO: Scroll issue */}
                            <S.EmptyDiv />
                        </S.ContentContainer>
                    </S.Content>
                    <S.Footer>
                        <S.ButtonContainer>
                            <Button size="medium" variant="contained" type="submit">
                                Сохранить изменения
                            </Button>
                        </S.ButtonContainer>
                    </S.Footer>
                </S.PageWrapper>
            </form>
        </FormProvider>
    );
};
