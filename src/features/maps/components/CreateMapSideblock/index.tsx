import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Banner, Button, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { SideBlock } from 'components/containers';
import { Select, TextArea, TextField } from 'components/form';

import { useGetPersonalMapTypesQuery } from 'api/queries/maps';

import { mapTypeToNameMap } from './const';
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
        reset(values);
    }, [values]);

    const description = watch('description');

    const onSubmit = handleSubmit(async (values) => {
        try {
            await onSave(values);
            onClose();
        } catch (error) {}
    });

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={handleCloseClick}>
            <S.Container>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
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

                            <TextField label="Название карты*" name="name" />

                            <Select
                                name="type"
                                label="Тип карты*"
                                data-tooltip-id="select"
                                disabled={typeDisabled || isLoadingTypes}
                                options={(typesData ?? []).map((type) => ({
                                    id: type.id,
                                    value: mapTypeToNameMap[type.name] ?? type.name,
                                }))}
                            />
                            {typeDisabled && (
                                <S.TooltipContainer id="select" offset={8} place="bottom" noArrow>
                                    Редактирование недоступно. Чтобы изменить тип карты, удалите все
                                    элементы
                                </S.TooltipContainer>
                            )}

                            <TextArea
                                label="Описание"
                                name="description"
                                maxLength={300}
                                helperText={`${description?.length ?? 0}/300`}
                            />
                        </S.TextFieldContainer>

                        <S.ButtonContainer>
                            <Button type="button" onClick={handleCloseClick}>
                                Отменить
                            </Button>

                            <Button type="submit" variant="contained">
                                {values ? 'Сохранить' : 'Создать'}
                            </Button>
                        </S.ButtonContainer>
                    </form>
                </FormProvider>
            </S.Container>
        </SideBlock>
    );
};
