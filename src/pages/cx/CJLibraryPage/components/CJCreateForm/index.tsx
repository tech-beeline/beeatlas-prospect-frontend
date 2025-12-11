import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createSearchParams, useNavigate } from 'react-router-dom';
import {
    Banner,
    Button,
    FileUploader,
    Icon,
    IconButton,
    Typography,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

import { SideBlock } from 'components/containers';
import { Select, TextField } from 'components/form';

import {
    useCreateCJByBPMN,
    useCreateCJWithEmptyStepMutation,
    useUploadBPMNFile,
} from 'api/queries/cj';
import { useGetAllProductsQuery, useGetUserProductsQuery } from 'api/queries/product';
import { useGetUserInfoQuery } from 'api/queries/profile';
import * as ROUTER from 'router/const';
import { formatSize } from 'utils/formatters';

import { FormValues, validationSchema } from './form';
import { ICJCreateForm } from './types';
import * as S from './units';

export const CJCreateForm: FC<ICJCreateForm> = ({ isOpen, onClose }) => {
    const [showBanner, setShowBanner] = useState(true);
    const [bpmnFile, setBpmnFile] = useState<File | null>(null);
    const [, setIsProcessingBPMN] = useState(false);
    const { data: userInfo } = useGetUserInfoQuery();

    const isAdministrator = userInfo?.roles?.includes('ADMINISTRATOR');
    const userProductIds = userInfo?.productsIds || [];
    const { mutateAsync: createCJ, isPending: creatingCJ } = useCreateCJWithEmptyStepMutation();
    const { data: allProducts, isLoading: isLoadingProducts } = useGetAllProductsQuery();
    const { mutateAsync: createCJByBPMN } = useCreateCJByBPMN();
    const { mutateAsync: uploadBPMN } = useUploadBPMNFile();
    const { data: userProducts } = useGetUserProductsQuery(userProductIds);
    const products = isAdministrator ? allProducts : userProducts;
    const navigate = useNavigate();

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset, setError } = form;

    const handleCloseClick = () => {
        reset();
        onClose();
    };

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
                    },
                    productId: values.product,
                    bpmn: Boolean(bpmnFile),
                });

                try {
                    const rest = await uploadBPMN({
                        file: bpmnFile,
                        cjId,
                    });
                    console.log('rest', rest);
                    await createCJByBPMN(cjId);
                    navigate({
                        pathname: `${ROUTER.CX_PATH}${ROUTER.CJ_PATH}${ROUTER.ADD_PATH}`,
                        search: createSearchParams({ id: cjId }).toString(),
                    });
                } catch (bpmnError) {
                    console.error('Ошибка при обработке BPMN файла:', bpmnError);
                    setError('root', {
                        message:
                            'Ошибка при обработке BPMN файла. Проверьте формат файла и попробуйте снова.',
                    });
                    setIsProcessingBPMN(false);
                    return;
                }
            } else {
                console.log(Boolean(bpmnFile));
                const { cjId } = await createCJ({
                    data: {
                        draft: true,
                        name: values.name,
                        user_portrait: values.userPortrait,
                    },
                    productId: values.product,
                    bpmn: Boolean(bpmnFile),
                });

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
        }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setBpmnFile(files[0]);
        }
    };

    const handleRemoveFile = () => {
        setBpmnFile(null);
    };

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={handleCloseClick} large={true}>
            <S.Container>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <S.Content hasButtons>
                            <S.TitleContainer>
                                <S.FlexWrapper>
                                    <S.SideBlockTitle>Создать CJ</S.SideBlockTitle>

                                    <IconButton
                                        iconName={Icons.Close}
                                        onClick={handleCloseClick}
                                        size="large"
                                    />
                                </S.FlexWrapper>
                                {showBanner && (
                                    <Banner
                                        onClose={() => setShowBanner(false)}
                                        iconName={Icons.InfoCircled}
                                        title="Нельзя менять структуру CJ добавленного с помощью нотации BPMN, можно менять только распознанные атрибуты BI и этапов. Нельзя импортировать CJ из BPMN в ранее собранный CJ в формате Beetlas"
                                    />
                                )}
                            </S.TitleContainer>

                            <S.TextFieldContainer>
                                <Select
                                    disabled={isLoadingProducts}
                                    name="product"
                                    label="Приложение*"
                                    options={
                                        products?.map((product) => ({
                                            id: Number(product.id),
                                            value: product.name,
                                        })) ?? []
                                    }
                                />

                                <TextField label="Название CJ*" name="name" />

                                <TextField label="Портрет пользователя" name="userPortrait" />
                            </S.TextFieldContainer>

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
                                        <Icon iconName={Icons.Page} size="large" />
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
                                            onClick={handleRemoveFile}
                                        />
                                        <IconButton
                                            iconName={Icons.Delete}
                                            size="medium"
                                            onClick={handleRemoveFile}
                                        />
                                    </S.FileNameContainer>
                                )}
                            </S.FileAddingContainer>
                        </S.Content>

                        <S.ButtonContainer>
                            <Button type="button" onClick={handleCloseClick}>
                                Отменить
                            </Button>

                            <Button
                                disabled={creatingCJ || isLoadingProducts}
                                type="submit"
                                variant="contained"
                            >
                                Создать
                            </Button>
                        </S.ButtonContainer>
                    </form>
                </FormProvider>
            </S.Container>
        </SideBlock>
    );
};
