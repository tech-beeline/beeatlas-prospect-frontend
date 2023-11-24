import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { SideBlock } from 'components/containers';
import { Select, TextField } from 'components/form';

import { useCreateCJWithEmptyStepMutation } from 'api/queries/cj';
import * as ROUTER from 'router/const';

import { FormValues, validationSchema } from './form';
import { ICJCreateForm } from './types';
import * as S from './units';

export const CJCreateForm: FC<ICJCreateForm> = ({ isOpen, onClose }) => {
    const { mutateAsync: createCJ, isLoading: creatingCJ } = useCreateCJWithEmptyStepMutation();

    const navigate = useNavigate();

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit } = form;

    const onSubmit = handleSubmit(async (values) => {
        const id = await createCJ({
            draft: true,
            name: values.name,
            user_portrait: values.userPortrait,
        });
        navigate({
            pathname: `${ROUTER.CX_PATH}${ROUTER.CJ_PATH}${ROUTER.ADD_PATH}`,
            search: createSearchParams({ id: String(id) }).toString(),
        });
    });

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={onClose}>
            <FormProvider {...form}>
                <form onSubmit={onSubmit}>
                    <S.FlexWrapper>
                        <S.SideBlockTitle>Создать CJ</S.SideBlockTitle>

                        <Icon
                            iconName={Icons.Close}
                            onClick={onClose}
                            style={{ cursor: 'pointer' }}
                        />
                    </S.FlexWrapper>

                    <S.TextFieldContainer>
                        <Select
                            disabled
                            name="product"
                            label="Продукт*"
                            options={[{ id: 1, value: 'Продукт пользователя' }]}
                        />

                        <TextField label="Название CJ*" name="name" />

                        <TextField label="Портрет пользователя*" name="userPortrait" />
                    </S.TextFieldContainer>

                    <S.ButtonContainer>
                        <Button type="button" onClick={onClose}>
                            Отменить
                        </Button>

                        <Button disabled={creatingCJ} type="submit" variant="contained">
                            Создать
                        </Button>
                    </S.ButtonContainer>
                </form>
            </FormProvider>
        </SideBlock>
    );
};
