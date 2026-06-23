import React, { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { criticalCodeToNameMap, criticalNameToCodeMap } from 'features/apps';

import { Text } from 'components/core';
import { Autocomplete, Select, TextArea, TextField } from 'components/form';
import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Button, Icon } from 'components/ui';

import { getProductAliasAvailability } from 'api/product';
import { IProductForm } from 'api/product/types';
import {
    useGetProductEmployeesByCmdbQuery,
    useGetProductInfoByCmdbQuery,
    useUpdateProductByCmdbMutation,
} from 'api/queries/product';
import { useGetProfilesQuery } from 'api/queries/profile';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { EmployeeField } from './components';
import { CRITICAL_OPTIONS } from './const';
import { FormValues, getValidationSchema } from './form';
import * as S from './units';

export const AppAddPage = () => {
    const [params] = useSearchParams();
    const paramCmdb = params.get('cmdb');

    const [ownerSearchText, setOwnerSearchText] = useState('');

    const navigate = useNavigate();

    const returnToApps = () => {
        navigate(`${R.ADMIN_PATH}${R.APPS_PATH}`);
    };

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { data: appData, isLoading: isLoadingAppData } = useGetProductInfoByCmdbQuery(paramCmdb);
    const { data: usersData, isLoading: isLoadingUsersData } = useGetProfilesQuery();
    const { data: employeesData, isLoading: isLoadingEmployeesData } =
        useGetProductEmployeesByCmdbQuery({
            cmdb: appData?.alias ?? '',
            enabled: !!appData && !!appData.alias,
        });

    const isLoading = isLoadingAppData || isLoadingUsersData || isLoadingEmployeesData;

    const employeeOptions = (usersData ?? [])
        .filter((p) => p.full_name.toLowerCase().includes(ownerSearchText.toLowerCase()))
        .map((p) => ({
            id: p.id,
            value: p.full_name,
            email: p.email,
        }));

    const { mutateAsync: updateProduct } = useUpdateProductByCmdbMutation();

    const form = useForm<FormValues>({
        resolver: yupResolver(getValidationSchema(!!paramCmdb)),
    });

    const { control, handleSubmit, watch, reset, setError } = form;

    const description = watch('description');
    const employees = watch('employees');
    const owner = watch('owner');

    const { fields, prepend, remove } = useFieldArray({ control, name: 'employees' });

    useEffect(() => {
        if (appData && employeesData && usersData) {
            reset({
                code: appData.alias,
                name: appData.name,
                description: appData.description ?? '',
                critical: CRITICAL_OPTIONS.find(
                    (o) => o.value === criticalCodeToNameMap[appData.critical ?? ''],
                )?.id,
                gitUrl: appData.gitUrl ?? '',
                owner: usersData
                    ? usersData.find((u) => u.email === appData.ownerEmail)?.id ?? undefined
                    : undefined,
                employees:
                    employeesData.length > 0
                        ? employeesData.map((e) => ({ employee: e.id }))
                        : [{ employee: undefined }],
            });
        } else {
            reset({ employees: [{}] });
        }
    }, [appData, employeesData, usersData]);

    const onSubmit = handleSubmit(async (values) => {
        const productData: IProductForm = {
            name: values.name,
            alias: values.code,
            description: values.description,
            gitUrl: values.gitUrl,
            ownerId: values.owner ?? null,
            critical:
                criticalNameToCodeMap[
                    CRITICAL_OPTIONS.find((o) => o.id === values.critical)?.value ?? ''
                ] ?? '',
            employeesIds: values.employees
                .map((e) => e.employee)
                .filter((id) => id !== null && id !== undefined) as number[],
        };
        if (paramCmdb) {
            await updateProduct({
                data: productData,
            });
            showSnackbar({ message: 'Приложение обновлено' });
        } else {
            const { isUniqAlias } = await getProductAliasAvailability(values.code).then(
                (res) => res.data,
            );
            if (isUniqAlias) {
                await updateProduct({
                    data: productData,
                });
            } else {
                setError('code', { message: 'Такой код уже существует' });
                return;
            }
            showSnackbar({ message: 'Приложение создано' });
        }
        returnToApps();
    });

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
                                    <TextField
                                        disabled={isLoading}
                                        fullWidth
                                        name="name"
                                        label="Приложение*"
                                    />
                                </S.GrowContainer>
                                <S.GrowContainer>
                                    <TextField
                                        disabled={!!paramCmdb || isLoading}
                                        fullWidth
                                        name="code"
                                        label="Код*"
                                        endIcon={
                                            <Icon
                                                data-tooltip-id="code"
                                                iconName={Icons.InfoCircled}
                                                size="large"
                                            />
                                        }
                                    />
                                    <TooltipContainer
                                        largePadding
                                        noArrow
                                        place="bottom"
                                        offset={8}
                                        id="code"
                                    >
                                        Код может состоять из заглавных и строчных латинских букв и
                                        цифр. В коде не должно быть любых спец символов
                                    </TooltipContainer>
                                </S.GrowContainer>
                            </S.FormRow>
                            <S.FormRow>
                                <S.GrowContainer>
                                    <Select
                                        disabled={isLoading}
                                        fullWidth
                                        name="critical"
                                        label="Критичность*"
                                        options={CRITICAL_OPTIONS}
                                    />
                                </S.GrowContainer>
                                <S.GrowContainer>
                                    <Autocomplete
                                        fullWidth
                                        disabled={isLoading}
                                        name="owner"
                                        label="Владелец"
                                        options={employeeOptions}
                                        onInputChange={(v) => setOwnerSearchText(v)}
                                        endIcon={
                                            <Icon
                                                data-tooltip-id="owner"
                                                iconName={Icons.InfoCircled}
                                                size="large"
                                            />
                                        }
                                        makeOption={(option) => (
                                            <div>
                                                <Text variant="body2">{option.value}</Text>
                                                <Text inactive variant="body3">
                                                    {option.email}
                                                </Text>
                                            </div>
                                        )}
                                    />
                                    <TooltipContainer
                                        largePadding
                                        noArrow
                                        place="bottom"
                                        offset={8}
                                        id="owner"
                                    >
                                        Если владельца нет в списке — пусть зайдёт в beeatlas, тогда
                                        данные сохранятся и можно будет добавить владельца
                                    </TooltipContainer>
                                </S.GrowContainer>
                            </S.FormRow>
                            <S.FormRow>
                                <S.GrowContainer>
                                    <TextArea
                                        disabled={isLoading}
                                        fullWidth
                                        name="description"
                                        label="Краткое описание"
                                        helperText={`${description?.length ?? 0}/255`}
                                        maxLength={255}
                                    />
                                </S.GrowContainer>
                            </S.FormRow>

                            <S.FormRow>
                                <S.GrowContainer>
                                    <TextField
                                        fullWidth
                                        disabled={isLoading}
                                        name="gitUrl"
                                        label="Ссылка на git"
                                    />
                                </S.GrowContainer>
                            </S.FormRow>

                            <S.SubtitleContainer>
                                <Text variant="subtitle1">Сотрудники</Text>
                                <Button
                                    size="medium"
                                    variant="outlined"
                                    type="button"
                                    onClick={() => prepend({ employee: undefined })}
                                    disabled={isLoading}
                                >
                                    Добавить
                                </Button>
                            </S.SubtitleContainer>

                            <S.EmployeesContainer>
                                {fields.map((field, index) => (
                                    <EmployeeField
                                        key={field.id}
                                        index={index}
                                        usersData={usersData ?? []}
                                        disabled={isLoading}
                                        remove={remove}
                                        length={fields.length}
                                        isOwner={employees?.[index]?.employee === owner}
                                    />
                                ))}
                            </S.EmployeesContainer>
                            <S.ButtonsContainer>
                                <Button
                                    onClick={returnToApps}
                                    size="medium"
                                    type="button"
                                    disabled={isLoading}
                                >
                                    Отменить
                                </Button>
                                <Button
                                    size="medium"
                                    variant="contained"
                                    type="submit"
                                    disabled={isLoading}
                                >
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
