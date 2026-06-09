import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { BusinessOwnerField, getFilledTechOwners, TechOwnerFields } from 'features/cx';

import { PageFormContainer } from 'components/containers';
import { Text } from 'components/core';
import { Autocomplete, TextField } from 'components/form';
import { IconButton } from 'components/ui';
import { Banner, FileUploader } from 'components/ui';
import { Typography } from 'components/ui/Typography';

import {
    useCreateCJByBPMN,
    useCreateCJWithEmptyStepMutation,
    useUploadBPMNFile,
} from 'api/queries/cj';
import { useGetAllProductsQuery, useGetUserProductsQuery } from 'api/queries/product';
import { useGetUserInfoQuery, usePostUsersInfoMutation } from 'api/queries/profile';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatSize } from 'utils/formatters';
import { useSnackbarStore } from 'widgets/Snackbar';

import { downloadBpmnFile } from '../CJPage/utils/formatters';

import { FormValues, validationSchema } from './form';
import * as S from './units';

export const CJAddPage = () => {
    const [searchTextProduct, setSearchTextProduct] = useState('');

    const [bpmnFile, setBpmnFile] = useState<File | null>(null);
    const [bpmnFileText, setBpmnFileText] = useState<string | null>(null);
    const [, setIsProcessingBPMN] = useState(false);
    const { data: userInfo } = useGetUserInfoQuery();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const isAdministrator = userInfo?.roles?.includes('ADMINISTRATOR');
    const userProductIds = userInfo?.productsIds || [];
    const { mutateAsync: createCJ, isPending: creatingCJ } = useCreateCJWithEmptyStepMutation();
    const { data: allProducts, isLoading: isLoadingProducts } = useGetAllProductsQuery();
    const { mutateAsync: createCJByBPMN } = useCreateCJByBPMN();
    const { mutateAsync: uploadBPMN } = useUploadBPMNFile();
    const { data: userProducts } = useGetUserProductsQuery(userProductIds);
    const { mutateAsync: postUsersInfo } = usePostUsersInfoMutation();

    const products = isAdministrator ? allProducts : userProducts;

    const productsFiltered = (products ?? []).filter((product) =>
        product.name.toLowerCase().includes(searchTextProduct.toLowerCase()),
    );
    const productsOptions = productsFiltered.map((product) => ({
        id: Number(product.id),
        value: product.name,
    }));

    const navigate = useNavigate();

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset, setError } = form;

    useEffect(() => {
        if (products) {
            reset({ product: Number.isInteger(products[0]?.id) ? Number(products[0].id) : 1 });
        }
    }, [products]);

    const onSubmit = handleSubmit(async (values) => {
        const isNewBusinessOwner = values.businessOwner.id === null;
        let businessOwnerId = values.businessOwner.id;
        if (isNewBusinessOwner) {
            const createData = await postUsersInfo([
                {
                    email: values.businessOwner.email,
                    fullName: values.businessOwner.fullname,
                    idExt: values.businessOwner.employeeNumber,
                    login: values.businessOwner.login,
                },
            ]);
            businessOwnerId = createData[0].id;
        }

        const filledTechOwners = getFilledTechOwners(values.techOwner);
        const newTechOwners = filledTechOwners.filter((owner) => owner.id === null);
        let techOwnerIds = filledTechOwners.map((owner) => owner.id);

        if (newTechOwners.length > 0) {
            const createData = await postUsersInfo(
                newTechOwners.map((owner) => ({
                    email: owner.email,
                    fullName: owner.fullname,
                    idExt: owner.employeeNumber,
                    login: owner.login,
                })),
            );
            techOwnerIds = [
                ...techOwnerIds.filter((id) => id !== null),
                ...createData.map((owner) => owner.id),
            ];
        }

        try {
            if (bpmnFile) {
                setIsProcessingBPMN(true);
                const { cjId } = await createCJ({
                    data: {
                        draft: true,
                        name: values.name,
                        user_portrait: values.userPortrait,
                        businessOwner: businessOwnerId ?? 0,
                        techOwners: techOwnerIds.filter((id) => id !== null) as number[],
                        productId: String(values.product),
                    },
                    productId: values.product,
                    bpmn: false,
                });

                try {
                    await uploadBPMN({
                        file: bpmnFile,
                        cjId,
                    });

                    await createCJByBPMN(cjId);
                    setBpmnFile(null);
                    navigate({
                        pathname: `${R.CX_PATH}${R.CJ_PATH}${R.VIEW_PATH}`,
                        search: createSearchParams({ id: cjId }).toString(),
                    });
                } catch (bpmnError) {
                    setError('root', {
                        message:
                            'Ошибка при обработке BPMN файла. Проверьте формат файла и попробуйте снова.',
                    });
                    setIsProcessingBPMN(false);
                    setBpmnFile(null);
                    showSnackbar({ message: `Ошибка валидации файла`, showCloseButton: true });
                    navigate({
                        pathname: `${R.CX_PATH}${R.CJ_PATH}${R.VIEW_PATH}`,
                        search: createSearchParams({ id: cjId }).toString(),
                    });
                    return;
                }
            } else {
                const { cjId } = await createCJ({
                    data: {
                        draft: true,
                        name: values.name,
                        user_portrait: values.userPortrait,
                        businessOwner: businessOwnerId ?? 0,
                        techOwners: techOwnerIds.filter((id) => id !== null) as number[],
                        productId: String(values.product),
                    },
                    productId: values.product,
                    bpmn: false,
                });
                setBpmnFile(null);

                navigate({
                    pathname: `${R.CX_PATH}${R.CJ_PATH}${R.VIEW_PATH}`,
                    search: createSearchParams({ id: cjId }).toString(),
                });
            }
        } catch (error) {
            if ((error as AxiosError).response?.status === 422) {
                setError('name', { message: 'Название CJ должно быть уникальным' });
            } else {
                setError('root', {
                    message: 'Произошла ошибка при создании CJ. Попробуйте снова.',
                });
            }
            setIsProcessingBPMN(false);
            setBpmnFile(null);
        }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setBpmnFile(file);

            const reader = new FileReader();
            reader.onload = () => {
                setBpmnFileText(typeof reader.result === 'string' ? reader.result : null);
            };
            reader.onerror = () => setBpmnFileText(null);
            reader.readAsText(file);
        }
        event.target.value = '';
    };

    const getFileName = (key?: string): string => {
        if (!key) return 'diagram.bpmn';

        const filePart = key.split('/').pop() || '';
        const withoutExt = filePart.replace('.bpmn', '');
        const base = withoutExt.split('_')[0];

        return `${decodeURI(base)}.bpmn`;
    };

    const handleDownload = () => {
        if (!bpmnFileText || !bpmnFile) return;
        downloadBpmnFile(getFileName(bpmnFile.name), bpmnFileText);
    };

    const handleRemoveFile = () => {
        setBpmnFile(null);
    };

    const handleCancelClick = () => {
        navigate(`${R.CX_PATH}${R.CJ_PATH}`);
    };
    return (
        <PageFormContainer
            footer
            cancelButtonClick={handleCancelClick}
            confirmButtonClick={onSubmit}
            disableConfirmButton={creatingCJ || isLoadingProducts}
        >
            <FormProvider {...form}>
                <form onSubmit={onSubmit}>
                    <S.Content>
                        <S.TitleContainer>
                            <S.FlexWrapper>
                                <Text variant="h4">Создать CJ</Text>
                            </S.FlexWrapper>

                            <Banner
                                iconName={Icons.InfoCircled}
                                title="Нельзя менять структуру CJ добавленного с помощью нотации BPMN, можно менять только распознанные атрибуты BI и этапов. Нельзя импортировать CJ из BPMN в ранее собранный CJ в формате Beetlas"
                            />
                        </S.TitleContainer>

                        <S.TextFieldContainer>
                            <S.FileAddingContainer>
                                <Typography variant="subtitle1">
                                    Добавить CJ в bpmn формате{' '}
                                </Typography>

                                <FileUploader
                                    hideFileList
                                    accept=".bpmn"
                                    subTitle="bpmn до 200 кб"
                                    onChange={handleFileChange}
                                />
                                {bpmnFile && (
                                    <S.FileNameContainer>
                                        <S.FileDataContainer>
                                            <S.FileUploaderListItemStyled name="" />
                                            <S.FileMetadataContainer>
                                                <Text variant="body2">{bpmnFile.name}</Text>
                                                <Text inactive variant="caption">
                                                    {formatSize(bpmnFile.size)}{' '}
                                                    {dayjs(bpmnFile.lastModified)
                                                        .local()
                                                        .format('DD.MM.YYYY, HH:mm')}
                                                </Text>
                                            </S.FileMetadataContainer>
                                        </S.FileDataContainer>
                                        <S.FileDataContainer>
                                            <IconButton
                                                iconName={Icons.Download}
                                                size="medium"
                                                onClick={handleDownload}
                                            />
                                            <IconButton
                                                iconName={Icons.Delete}
                                                size="medium"
                                                onClick={handleRemoveFile}
                                            />
                                        </S.FileDataContainer>
                                    </S.FileNameContainer>
                                )}
                            </S.FileAddingContainer>
                            <S.RowContainer>
                                <TextField label="Название CJ*" name="name" fullWidth />
                                <TextField
                                    label="Портрет пользователя"
                                    name="userPortrait"
                                    fullWidth
                                />
                            </S.RowContainer>

                            <S.RowContainer>
                                <BusinessOwnerField />
                                <Autocomplete
                                    fullWidth
                                    disabled={isLoadingProducts}
                                    label="Приложение*"
                                    name="product"
                                    options={productsOptions}
                                    onInputChange={(v) => setSearchTextProduct(v)}
                                />
                            </S.RowContainer>

                            <S.TechnicalContainer>
                                <TechOwnerFields />
                            </S.TechnicalContainer>
                        </S.TextFieldContainer>
                    </S.Content>
                </form>
            </FormProvider>
        </PageFormContainer>
    );
};
