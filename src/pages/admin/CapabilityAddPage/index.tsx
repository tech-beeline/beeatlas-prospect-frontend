import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { Autocomplete, TextArea, TextField } from 'components/form';
import { IconButton } from 'components/ui';
import { Button } from 'components/ui';

import { CapabilitySearchVariant } from 'api/capability/types';
import {
    useCreateBusinessCapabilityMutation,
    useGetCapabilitiesQuery,
} from 'api/queries/capability';
import { useDebounce } from 'hooks';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { FormValues, validationSchema } from './form';
import * as S from './units';

export const CapabilityAddPage = () => {
    const [searchText, setSearchText] = useState('');
    const debouncedSearchText = useDebounce(searchText);

    const { data, isLoading } = useGetCapabilitiesQuery({
        search: debouncedSearchText,
        searchVariant: CapabilitySearchVariant.BUSINESS_CAPABILITY,
    });
    const { mutateAsync: createCapability, isPending: creatingCapability } =
        useCreateBusinessCapabilityMutation();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit } = form;

    const navigate = useNavigate();

    const returnToCapabilities = () => {
        navigate(`${R.ADMIN_PATH}${R.CAPABILITIES_PATH}`);
    };

    const onSubmit = handleSubmit(async (values) => {
        await createCapability({
            ...values,
            parent: String(values.parent),
            author: 'author',
        });
        returnToCapabilities();
        showSnackbar({ message: 'Бизнес-возможность создана' });
    });

    const parentOptions = (data ?? []).map((capability) => ({
        value: capability.name,
        id: capability.code,
    }));

    return (
        <S.PageWrapper>
            <S.Content>
                <S.TitleContainer>
                    <IconButton
                        iconName={Icons.ArrowLeft}
                        size="large"
                        onClick={returnToCapabilities}
                    />
                    <S.Title>Создать бизнес-возможность</S.Title>
                </S.TitleContainer>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <S.FormContainer>
                            <S.Subtitle>Родительская возможность</S.Subtitle>
                            <Autocomplete
                                fullWidth
                                name="parent"
                                loading={isLoading}
                                loadingText="Загрузка..."
                                noOptionsText={
                                    debouncedSearchText === ''
                                        ? 'Начните вводить название родительской возможности'
                                        : 'Нет совпадений'
                                }
                                label="Название родительской возможности (бизнес-возможность, домен, группа)*"
                                options={parentOptions}
                                onInputChange={setSearchText}
                            />

                            <S.Subtitle>Описание</S.Subtitle>
                            <TextField
                                fullWidth
                                name="name"
                                label="Краткое наименование*"
                                maxLength={255}
                            />
                            <TextArea name="description" label="Полное определение" />
                            <TextField
                                fullWidth
                                name="owner"
                                label="ФИО владельца возможности"
                                maxLength={255}
                            />
                            <TextField
                                fullWidth
                                name="link"
                                label="Ссылка на страницу с описанием"
                                maxLength={255}
                            />

                            <S.ButtonsContainer>
                                <Button onClick={returnToCapabilities} size="medium" type="button">
                                    Отменить
                                </Button>
                                <Button
                                    size="medium"
                                    variant="contained"
                                    type="submit"
                                    disabled={creatingCapability}
                                >
                                    Создать бизнес-возможность
                                </Button>
                            </S.ButtonsContainer>
                        </S.FormContainer>
                    </form>
                </FormProvider>
            </S.Content>
        </S.PageWrapper>
    );
};
