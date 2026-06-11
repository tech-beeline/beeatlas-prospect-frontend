import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { NotFoundBlock } from 'components/other';
import { IconButton } from 'components/ui';
import { Button } from 'components/ui';

import {
    useCreateTechnologyMutation,
    useGetTechFormDataQuery,
    useGetTechnologyCategoriesQuery,
    useGetTechnologyFileByIdQuery,
    useUpdateTechnologyMutation,
    useUploadTechFileMutation,
} from 'api/queries/technologies';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { TechnologyField } from './components';
import { FormValues, getValidationSchema } from './form';
import * as S from './units';

export const TechnologyAddPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const [fileList, setFileList] = useState<File[]>([]);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { data, isLoading: isLoadingTech } = useGetTechFormDataQuery(paramId);
    const { allTech, techData } = data ?? {};
    const { data: categoriesData, isLoading: isLoadingCategories } =
        useGetTechnologyCategoriesQuery();
    const { data: fileData, isLoading: isLoadingFileData } = useGetTechnologyFileByIdQuery(paramId);
    const { mutateAsync: createTechnology } = useCreateTechnologyMutation();
    const { mutateAsync: updateTechnology } = useUpdateTechnologyMutation();
    const { mutateAsync: uploadTechFile } = useUploadTechFileMutation();

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
                ring: techData.ring.id,
                sector: techData.sector.id,
                isCritical: techData.isCritical,
            });
        } else {
            reset({});
        }
    }, [techData]);

    useEffect(() => {
        if (fileData) {
            setFileList([new File([fileData.file], fileData.fileName)]);
        }
    }, [fileData]);

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
                    ring_id: values.ring,
                    sector_id: values.sector,
                    categories: values.categories.map((id) => ({ id })),
                    isCritical: values.isCritical,
                },
            });

            let errorDocument = null;
            if (fileList.length !== 0) {
                try {
                    await uploadTechFile({ file: fileList[0], techId: Number(paramId) });
                } catch (e) {
                    errorDocument = e;
                }
            }

            returnToTechnologies();
            showSnackbar({
                message: errorDocument
                    ? 'Изменения сохранены, но документацию привязать не удалось'
                    : 'Изменения сохранены',
            });
        } else {
            const ids = await createTechnology({
                data: [
                    {
                        label: values.name,
                        descr: values.comment,
                        ring_id: values.ring,
                        sector_id: values.sector,
                        categories: values.categories.map((id) => ({ id })),
                        review: true,
                        isCritical: values.isCritical,
                    },
                ],
            });
            const createdTechId = ids[0].id;
            let errorDocument = null;
            if (fileList.length !== 0) {
                try {
                    await uploadTechFile({ file: fileList[0], techId: createdTechId });
                } catch (e) {
                    errorDocument = e;
                }
            }
            returnToTechnologies();
            showSnackbar({
                message: errorDocument
                    ? 'Технология добавлена, но документацию привязать не удалось'
                    : 'Технология добавлена',
            });
        }
    });

    const isLoading = isLoadingTech || isLoadingCategories;

    return (
        <S.PageWrapper>
            {!isLoading && paramId && (techData === undefined || techData.deletedDate) && (
                <S.NotFoundContainer>
                    <NotFoundBlock />
                </S.NotFoundContainer>
            )}
            {(isLoading || !paramId || (techData && !techData.deletedDate)) && (
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
                                <TechnologyField
                                    categoriesData={categoriesData ?? []}
                                    isLoading={isLoading}
                                    isLoadingFileData={isLoadingFileData}
                                    fileList={fileList}
                                    setFileList={setFileList}
                                />

                                <S.ButtonsContainer>
                                    <Button
                                        onClick={returnToTechnologies}
                                        size="medium"
                                        type="button"
                                    >
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
            )}
        </S.PageWrapper>
    );
};
