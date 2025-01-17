import React, { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import {
    useCreateTechnologyMutation,
    useGetTechFormDataQuery,
    useGetTechnologyCategoriesQuery,
    useUpdateTechnologyMutation,
} from 'api/queries/technologies';
import * as R from 'router/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import { TechnologyField } from './components';
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

    const { handleSubmit, reset, control } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'technologies',
    });

    useEffect(() => {
        if (techData) {
            reset({
                technologies: [
                    {
                        name: techData.label,
                        categories: techData.category.map((category) => category.id),
                        comment: techData.description,
                        link: techData.link ?? '',
                        ring: techData.ring.id,
                        sector: techData.sector.id,
                    },
                ],
            });
        } else {
            reset({
                technologies: [{}],
            });
        }
    }, [techData]);

    const navigate = useNavigate();

    const returnToTechnologies = () => {
        navigate(`${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}`);
    };

    const onSubmit = handleSubmit(async (values) => {
        if (paramId) {
            const tech = values.technologies[0];
            if (tech) {
                await updateTechnology({
                    data: {
                        id: Number(paramId),
                        label: tech.name,
                        descr: tech.comment,
                        link: tech.link,
                        ring_id: tech.ring,
                        sector_id: tech.sector,
                        categories: tech.categories.map((id) => ({ id })),
                    },
                });
            }
            returnToTechnologies();
            showSnackbar({ message: 'Изменения сохранены' });
        } else {
            await createTechnology({
                data: values.technologies.map((tech) => ({
                    label: tech.name,
                    descr: tech.comment,
                    link: tech.link,
                    ring_id: tech.ring,
                    sector_id: tech.sector,
                    categories: tech.categories.map((id) => ({ id })),
                })),
            });
            returnToTechnologies();
            showSnackbar({
                message:
                    values.technologies.length === 1
                        ? 'Технология добавлена'
                        : 'Технологии добавлены',
            });
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
                            {fields.map((field, index) => (
                                <TechnologyField
                                    key={field.id}
                                    index={index}
                                    fieldsCount={fields.length}
                                    categoriesData={categoriesData ?? []}
                                    isLoading={isLoading}
                                    showAddButton={!paramId}
                                    append={append}
                                    remove={remove}
                                />
                            ))}
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
