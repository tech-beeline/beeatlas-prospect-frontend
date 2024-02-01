import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';

import { SideBlock } from 'components/containers';
import { Select, TextField } from 'components/form';

import { useCreateCJWithEmptyStepMutation } from 'api/queries/cj';
import { useGetUserProductsQuery } from 'api/queries/product';
import * as ROUTER from 'router/const';

import { FormValues, validationSchema } from './form';
import { ICJCreateForm } from './types';
import * as S from './units';

export const CJCreateForm: FC<ICJCreateForm> = ({ isOpen, onClose }) => {
    const { mutateAsync: createCJ, isLoading: creatingCJ } = useCreateCJWithEmptyStepMutation();
    const { data: products, isLoading: isLoadingProducts } = useGetUserProductsQuery();

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
            reset({ product: products[0]?.id ? Number(products[0].id) : 1 });
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

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={handleCloseClick}>
            <S.Container>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <S.FlexWrapper>
                            <S.SideBlockTitle>Создать CJ</S.SideBlockTitle>

                            <IconButton
                                iconName={Icons.Close}
                                onClick={handleCloseClick}
                                size="large"
                            />
                        </S.FlexWrapper>

                        <S.TextFieldContainer>
                            <Select
                                disabled={isLoadingProducts}
                                name="product"
                                label="Продукт*"
                                options={
                                    products?.map((product) => ({
                                        id: Number(product.id),
                                        value: product.name,
                                    })) ?? []
                                }
                            />

                            <TextField label="Название CJ*" name="name" />

                            <TextField label="Портрет пользователя*" name="userPortrait" />
                        </S.TextFieldContainer>

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
