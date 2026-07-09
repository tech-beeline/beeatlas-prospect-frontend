import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { BusinessOwnerField, getFilledTechOwners, TechOwnerFields } from 'features/cx';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { Autocomplete, TextField } from 'components/form';
import { IconButton } from 'components/ui';
import { Button } from 'components/ui';

import { useUpdateCJMutation } from 'api/queries/cj';
import { usePostUsersInfoMutation } from 'api/queries/profile';
import { useGetProductsQuery } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { FormValues, getValidationSchema } from './form';
import { ICJUpdateForm } from './types';
import * as S from './units';

export const CJUpdateForm: FC<ICJUpdateForm> = ({ values, cjId, isOpen, onClose }) => {
    const [searchTextProduct, setSearchTextProduct] = useState('');

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const { mutateAsync: updateCJ, isPending: updatingCj } = useUpdateCJMutation();
    const { mutateAsync: postUsersInfo } = usePostUsersInfoMutation();
    const { data: products, isLoading: isLoadingProducts } = useGetProductsQuery();

    const productsFiltered = (products ?? []).filter((product) =>
        product.name.toLowerCase().includes(searchTextProduct.toLowerCase()),
    );
    const productsOptions = productsFiltered.map((product) => ({
        id: Number(product.id),
        value: product.name,
    }));

    const form = useForm<FormValues>({
        resolver: yupResolver(getValidationSchema()),
    });

    const { handleSubmit, reset, setError } = form;

    useEffect(() => reset(values), [values]);

    const onSubmit = handleSubmit(async (values) => {
        const isNewBusinessOwner = values.businessOwner.id === null;
        let businessOwnerId = values.businessOwner.id;
        if (isNewBusinessOwner && window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND === false) {
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

        if (newTechOwners.length > 0 && window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND === false) {
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
            await updateCJ({
                id: String(cjId),
                data: {
                    name: values.name,
                    user_portrait: values.userPortrait,
                    businessOwner:
                        window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND === false
                            ? businessOwnerId ?? 0
                            : null,
                    techOwners: techOwnerIds.filter((id) => id !== null) as number[],
                    productId: String(values.product),
                },
            });
            showSnackbar({ message: 'Изменения сохранены' });
            onClose();
            reset();
        } catch (error) {
            if ((error as AxiosError).response?.status === 422) {
                setError('name', { message: 'Название CJ должно быть уникальным' });
            }
        }
    });

    return (
        <SideBlock isOpen={isOpen} onClose={onClose} large={true} hasBackdrop>
            <S.Container>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <S.Content hasButtons>
                            <S.FlexWrapper>
                                <Text variant="h5">Редактирование данных CJ</Text>

                                <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                            </S.FlexWrapper>

                            <S.TextFieldContainer>
                                <TextField label="Название" name="name" />

                                <TextField label="Портрет пользователя" name="userPortrait" />

                                {window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND === false && (
                                    <BusinessOwnerField />
                                )}

                                <Autocomplete
                                    label="Приложение"
                                    fullWidth
                                    name="product"
                                    options={productsOptions}
                                    disabled={isLoadingProducts}
                                    onInputChange={(v) => setSearchTextProduct(v)}
                                />

                                {window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND === false && (
                                    <TechOwnerFields smallButton />
                                )}
                            </S.TextFieldContainer>
                        </S.Content>

                        <S.ButtonContainer>
                            <Button type="button" onClick={onClose}>
                                Отменить
                            </Button>

                            <Button disabled={updatingCj} type="submit" variant="contained">
                                Сохранить
                            </Button>
                        </S.ButtonContainer>
                    </form>
                </FormProvider>
            </S.Container>
        </SideBlock>
    );
};

export type { FormValues } from './form';
