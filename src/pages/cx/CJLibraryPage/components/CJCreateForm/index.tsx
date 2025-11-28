import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Banner, Button, FileUploader, IconButton, Typography } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';

import { SideBlock } from 'components/containers';
import { Select, TextField } from 'components/form';

import { useCreateCJWithEmptyStepMutation } from 'api/queries/cj';
import { useGetAllProductsQuery, useGetUserProductsQuery } from 'api/queries/product';
import { useGetUserInfoQuery } from 'api/queries/profile';
import * as ROUTER from 'router/const';

import { FormValues, validationSchema } from './form';
import { ICJCreateForm } from './types';
import * as S from './units';

export const CJCreateForm: FC<ICJCreateForm> = ({ isOpen, onClose }) => {
    const [showBanner, setShowBanner] = useState(true);
    const { data: userInfo } = useGetUserInfoQuery();

    const isAdministrator = userInfo?.roles?.includes('ADMINISTRATOR');
    const userProductIds = userInfo?.productsIds || [];
    const { mutateAsync: createCJ, isPending: creatingCJ } = useCreateCJWithEmptyStepMutation();
    const { data: allProducts, isLoading: isLoadingProducts } = useGetAllProductsQuery();
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
            const { cjId } = await createCJ({
                data: {
                    draft: true,
                    name: values.name,
                    user_portrait: values.userPortrait,
                },
                productId: values.product,
            });
            navigate({
                pathname: `${ROUTER.CX_PATH}${ROUTER.CJ_PATH}${ROUTER.ADD_PATH}`,
                search: createSearchParams({ id: cjId }).toString(),
            });
        } catch (error) {
            if ((error as AxiosError).response?.status === 422) {
                setError('name', { message: 'Название CJ должно быть уникальным' });
            }
        }
    });

    const handleFileUploader = true;

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={handleCloseClick} large={true}>
            <S.Container>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
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
                                    title="В CJ из BPMN можно изменять существующие BI — новые этапы и BI не добавляются. Нельзя импортировать CJ из BPMN в ранее собранный CJ в формате Beetlas"
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
                            <Typography variant="subtitle1">Добавить CJ в bpmn формате </Typography>

                            <FileUploader
                                hideFileList
                                accept=".md"
                                subTitle="bpmn до 200 кб"
                                onChange={() => handleFileUploader}
                            />
                        </S.FileAddingContainer>

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
