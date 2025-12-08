import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { Select, TextArea, TextField } from 'components/form';

import { useGetProductInfoByCmdbQuery, useUpdateProductByCmdbMutation } from 'api/queries/product';
import * as R from 'router/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import { CRITICAL_OPTIONS } from './const';
import { FormValues, getValidationSchema } from './form';
import * as S from './units';

export const AppAddPage = () => {
    const [params] = useSearchParams();
    const paramCmdb = params.get('cmdb');

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { data: appData } = useGetProductInfoByCmdbQuery(paramCmdb);

    const { mutateAsync: updateProduct } = useUpdateProductByCmdbMutation();

    const form = useForm<FormValues>({
        resolver: yupResolver(getValidationSchema()),
    });

    const { handleSubmit, watch, reset } = form;

    const description = watch('description');

    useEffect(() => {
        if (appData) {
            reset({
                code: appData.alias,
                name: appData.name,
                description: appData.description ?? '',
                critical: CRITICAL_OPTIONS.find((o) => o.value === appData.critical)?.id,
            });
        }
    }, [appData]);

    const onSubmit = handleSubmit(async (values) => {
        if (paramCmdb) {
            await updateProduct({
                cmdb: paramCmdb,
                data: { name: values.name, alias: values.code },
            });
        } else {
            await updateProduct({
                cmdb: values.code,
                data: { name: values.name, alias: values.code },
            });
        }
        showSnackbar({ message: 'Приложение создано' });
    });

    const navigate = useNavigate();

    const returnToApps = () => {
        navigate(`${R.ADMIN_PATH}${R.APPS_PATH}`);
    };

    return (
        <S.PageWrapper>
            <S.Content>
                <S.TitleContainer>
                    <IconButton iconName={Icons.ArrowLeft} size="large" onClick={returnToApps} />
                    <S.Title>{paramCmdb ? 'Редактирование' : 'Создание'} приложения</S.Title>
                </S.TitleContainer>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <S.FormContainer>
                            <S.FormRow>
                                <S.GrowContainer>
                                    <TextField fullWidth name="name" label="Приложение*" />
                                </S.GrowContainer>
                                <S.GrowContainer>
                                    <TextField fullWidth name="code" label="Код*" />
                                </S.GrowContainer>
                            </S.FormRow>
                            <S.FormRow>
                                <S.GrowContainer>
                                    <Select
                                        fullWidth
                                        name="critical"
                                        label="Критичность*"
                                        options={CRITICAL_OPTIONS}
                                    />
                                </S.GrowContainer>
                            </S.FormRow>
                            <S.FormRow>
                                <S.GrowContainer>
                                    <Select
                                        fullWidth
                                        name="owner"
                                        label="Владелец"
                                        options={[]}
                                        helperText="Если владельца нет в списке — пусть зайдёт в beeatlas, тогда данные сохранятся и можно будет добавить владельца"
                                    />
                                </S.GrowContainer>
                            </S.FormRow>
                            <S.FormRow>
                                <S.GrowContainer>
                                    <TextArea
                                        fullWidth
                                        name="description"
                                        label="Краткое описание"
                                        helperText={`${description?.length ?? 0}/255`}
                                        maxLength={255}
                                    />
                                </S.GrowContainer>
                            </S.FormRow>
                            <S.Unmargin>
                                <S.FormRow>
                                    <S.GrowContainer>
                                        <TextField fullWidth name="gitUrl" label="Ссылка на git" />
                                    </S.GrowContainer>
                                </S.FormRow>
                            </S.Unmargin>
                            <S.ButtonsContainer>
                                <Button onClick={returnToApps} size="medium" type="button">
                                    Отменить
                                </Button>
                                <Button size="medium" variant="contained" type="submit">
                                    {paramCmdb ? 'Сохранить изменения' : 'Сохранить'}
                                </Button>
                            </S.ButtonsContainer>
                        </S.FormContainer>
                    </form>
                </FormProvider>
            </S.Content>
        </S.PageWrapper>
    );
};
