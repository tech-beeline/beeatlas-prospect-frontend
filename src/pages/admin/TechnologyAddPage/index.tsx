import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { MultiSelect, Select, TextArea, TextField } from 'components/form';

import {
    useCreateTechnologyMutation,
    useGetTechFormDataQuery,
    useGetTechnologyCategoriesQuery,
    useUpdateTechnologyMutation,
} from 'api/queries/technologies';
import * as R from 'router/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import { FormValues, getValidationSchema } from './form';
import * as S from './units';

export const TechnologyAddPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { data, isLoading: isLoadingTech } = useGetTechFormDataQuery(paramId);
    const { allTech, techData } = data ?? {};
    const { data: categoriesData, isLoading: isLoadingCategories } =
        useGetTechnologyCategoriesQuery();
    const { mutateAsync: createTechnology } = useCreateTechnologyMutation();
    const { mutateAsync: updateTechnology } = useUpdateTechnologyMutation();

    const invalidNames = (allTech ?? [])
        .filter((tech) => tech.id !== techData?.id)
        .map((tech) => tech.label);

    const form = useForm<FormValues>({
        resolver: yupResolver(getValidationSchema(invalidNames)),
    });

    const { handleSubmit, reset } = form;

    useEffect(() => {
        if (techData) {
            reset({
                name: techData.label,
                categories: techData.category.map((category) => category.id),
                comment: techData.description,
                link: techData.link ?? '',
                ring: techData.ring.id,
                sector: techData.sector.id,
            });
        }
    }, [techData]);

    const navigate = useNavigate();

    const returnToTechnologies = () => {
        navigate(`${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}`);
    };

    const onSubmit = handleSubmit(async (values) => {
        if (paramId) {
            await updateTechnology({
                data: {
                    id: Number(paramId),
                    label: values.name,
                    descr: values.comment,
                    link: values.link,
                    ring_id: values.ring,
                    sector_id: values.sector,
                    categories: values.categories.map((id) => ({ id })),
                },
            });
            returnToTechnologies();
            showSnackbar({ message: 'Изменения сохранены' });
        } else {
            await createTechnology({
                data: {
                    label: values.name,
                    descr: values.comment,
                    link: values.link,
                    ring_id: values.ring,
                    sector_id: values.sector,
                    categories: values.categories.map((id) => ({ id })),
                },
            });
            returnToTechnologies();
            showSnackbar({ message: 'Технология добавлена' });
        }
    });

    const isLoading = isLoadingTech || isLoadingCategories;

    return (
        <S.PageWrapper>
            <S.Content>
                <S.TitleContainer>
                    <IconButton
                        iconName={Icons.ArrowLeft}
                        size="large"
                        onClick={returnToTechnologies}
                    />
                    <S.Title>{paramId ? 'Редактировать' : 'Добавить'} технологию</S.Title>
                </S.TitleContainer>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <S.FormContainer>
                            <S.FormRow>
                                <S.GrowContainer>
                                    <TextField
                                        fullWidth
                                        name="name"
                                        label="Название*"
                                        disabled={isLoading}
                                    />
                                </S.GrowContainer>
                                <S.GrowContainer>
                                    <MultiSelect
                                        fullWidth
                                        name="categories"
                                        label="Группа"
                                        options={
                                            categoriesData?.map((category) => ({
                                                id: category.id,
                                                value: category.name,
                                            })) ?? []
                                        }
                                        disabled={isLoading}
                                    />
                                </S.GrowContainer>
                            </S.FormRow>
                            <S.FormRow>
                                <S.GrowContainer>
                                    <Select
                                        fullWidth
                                        name="sector"
                                        label="Сектор*"
                                        options={[
                                            { id: 1, value: 'Фреймворки и инструменты' },
                                            { id: 2, value: 'Платформа и инфраструктура' },
                                            { id: 3, value: 'Управление данными' },
                                            { id: 4, value: 'Языки' },
                                        ]}
                                        disabled={isLoading}
                                    />
                                </S.GrowContainer>
                                <S.GrowContainer>
                                    <Select
                                        fullWidth
                                        name="ring"
                                        label="Статус*"
                                        options={[
                                            { id: 1, value: 'Adopt' },
                                            { id: 2, value: 'Trial' },
                                            { id: 3, value: 'Assess' },
                                            { id: 4, value: 'Hold' },
                                        ]}
                                        disabled={isLoading}
                                    />
                                </S.GrowContainer>
                            </S.FormRow>
                            <TextField
                                name="link"
                                label="Ссылка на страницу с описанием технологии"
                                disabled={isLoading}
                            />
                            <TextArea
                                name="comment"
                                label="Короткое описание"
                                helperText="Максимальное количество символов 255"
                                maxLength={255}
                                disabled={isLoading}
                            />
                            <S.ButtonsContainer>
                                <Button onClick={returnToTechnologies} size="medium" type="button">
                                    Отменить
                                </Button>
                                <Button size="medium" variant="contained" type="submit">
                                    {paramId ? 'Сохранить изменения' : 'Добавить технологию'}
                                </Button>
                            </S.ButtonsContainer>
                        </S.FormContainer>
                    </form>
                </FormProvider>
            </S.Content>
        </S.PageWrapper>
    );
};
