import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createSearchParams, useNavigate } from 'react-router-dom';
import {
    Banner,
    FileUploader,
    IconButton,
    TextField,
    Typography,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

import { PageFormContainer } from 'components/containers';
import { Text } from 'components/core';
import { Autocomplete, AutocompleteArray } from 'components/form';

import {
    useCreateCJByBPMN,
    useCreateCJWithEmptyStepMutation,
    useUploadBPMNFile,
} from 'api/queries/cj';
import { useGetAllProductsQuery, useGetUserProductsQuery } from 'api/queries/product';
import { useGetEmployee, useGetUserInfoQuery } from 'api/queries/profile';
import * as ROUTER from 'router/const';
import { formatSize } from 'utils/formatters';
import { useSnackbarStore } from 'widgets/Snackbar';

import { downloadBpmnFile } from '../CJPage/utils/formatters';

import { FormValues, validationSchema } from './form';
import * as S from './units';

export const CJAddPage = () => {
    const [searchTextProduct, setSearchTextProduct] = useState('');
    const [searchEmployee, setSearchEmployee] = useState('');

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
    const { data: employeeData, isLoading: isLoadingEmployee } = useGetEmployee(searchEmployee);

    const products = isAdministrator ? allProducts : userProducts;

    const productsFiltered = (products ?? []).filter((product) =>
        product.name.toLowerCase().includes(searchTextProduct.toLowerCase()),
    );
    const productsOptions = productsFiltered.map((product) => ({
        id: Number(product.id),
        value: product.name,
    }));

    const employeeOptions = (employeeData ?? []).map((employee) => ({
        id: employee.id,
        value: employee.fullName,
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
        try {
            if (bpmnFile) {
                setIsProcessingBPMN(true);
                const { cjId } = await createCJ({
                    data: {
                        draft: true,
                        name: values.name,
                        user_portrait: values.userPortrait,
                        businessOwner: values.businessOwner,
                        techOwner: values.techOwner,
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
                        pathname: `${ROUTER.CX_PATH}${ROUTER.CJ_PATH}${ROUTER.ADD_PATH}`,
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
                        pathname: `${ROUTER.CX_PATH}${ROUTER.CJ_PATH}${ROUTER.ADD_PATH}`,
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
                        businessOwner: values.businessOwner,
                        techOwner: values.techOwner,
                        productId: String(values.product),
                    },
                    productId: values.product,
                    bpmn: false,
                });
                setBpmnFile(null);

                navigate({
                    pathname: `${ROUTER.CX_PATH}${ROUTER.CJ_PATH}${ROUTER.ADD_PATH}`,
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

    const handleCanselClick = () => {
        navigate(`${ROUTER.CX_PATH}${ROUTER.CJ_PATH}`);
    };
    return (
        <PageFormContainer
            footer
            canselButtonClick={handleCanselClick}
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
                                        <S.FileUploaderListItemStyled name="" />
                                        <S.FileMetadataContainer>
                                            <Typography variant="body2">{bpmnFile.name}</Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {formatSize(bpmnFile.size)}{' '}
                                                {dayjs(bpmnFile.lastModified)
                                                    .local()
                                                    .format('DD.MM.YYYY, HH:mm')}
                                            </Typography>
                                        </S.FileMetadataContainer>
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
                                <Autocomplete
                                    fullWidth
                                    disabled={isLoadingEmployee}
                                    name="businessOwner"
                                    label="Владелец сценария*"
                                    options={employeeOptions}
                                    onInputChange={(v) => setSearchEmployee(v)}
                                />
                                <Autocomplete
                                    fullWidth
                                    disabled={isLoadingProducts}
                                    label="Приложение*"
                                    name="product"
                                    options={productsOptions}
                                    onInputChange={(v) => setSearchTextProduct(v)}
                                />
                            </S.RowContainer>

                            <TextField label="Теги" name="tags" fullWidth />

                            <S.TechnicalContainer>
                                <AutocompleteArray
                                    label="ФИО"
                                    name="techOwner"
                                    options={employeeOptions}
                                    title="Технический ответственный"
                                    disabled={isLoadingEmployee}
                                    useExternalAddButton
                                />
                            </S.TechnicalContainer>
                        </S.TextFieldContainer>
                    </S.Content>
                </form>
            </FormProvider>
        </PageFormContainer>
    );
};
