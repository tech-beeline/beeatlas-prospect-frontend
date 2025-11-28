import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';

import { SideBlock } from 'components/containers';
import { TextField } from 'components/form';

import { useUpdateCJMutation } from 'api/queries/cj';
import { useSnackbarStore } from 'widgets/Snackbar';

import { FormValues, validationSchema } from './form';
import { ICJUpdateForm } from './types';
import * as S from './units';

export const CJUpdateForm: FC<ICJUpdateForm> = ({ values, cjId, isOpen, onClose }) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const { mutateAsync: updateCJ, isPending: updatingCj } = useUpdateCJMutation();

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset, setError } = form;

    useEffect(() => reset(values), [values]);

    const onSubmit = handleSubmit(async (values) => {
        try {
            await updateCJ({
                id: String(cjId),
                data: {
                    name: values.name,
                    user_portrait: values.userPortrait,
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
        <SideBlock isOpen={isOpen} onClose={onClose} large={true}>
            <S.Container>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <S.FlexWrapper>
                            <S.SideBlockTitle>Настройка CJ</S.SideBlockTitle>

                            <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                        </S.FlexWrapper>

                        <S.TextFieldContainer>
                            <TextField label="Название" name="name" />

                            <TextField label="Портрет пользователя" name="userPortrait" />
                        </S.TextFieldContainer>

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
