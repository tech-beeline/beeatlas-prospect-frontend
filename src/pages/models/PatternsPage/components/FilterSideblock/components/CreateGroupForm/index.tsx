import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { Text } from 'components/core';
import { Autocomplete, TextField } from 'components/form';

import { SideblockView } from '../../const';

import { FormValues, validationSchema } from './form';
import { ICreateGroupForm } from './types';
import * as S from './units';

export const CreateGroupForm: FC<ICreateGroupForm> = ({ setSideblockView, onClose }) => {
    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit } = form;

    const onSubmit = handleSubmit(() => {
        1;
    });

    return (
        <FormProvider {...form}>
            <form onSubmit={onSubmit}>
                <S.Container>
                    <S.MainContent>
                        <S.TitleContainer>
                            <Text variant="h5">Создать группировку</Text>
                            <IconButton onClick={onClose} iconName={Icons.Close} size="large" />
                        </S.TitleContainer>
                        <TextField name="name" label="Название группировки*" />
                        <Autocomplete
                            name="group"
                            label="Родительская группировка"
                            options={[]}
                            onInputChange={() => {
                                1;
                            }}
                        />
                    </S.MainContent>
                    <S.ButtonContainer>
                        <Button
                            fullWidth
                            size="medium"
                            onClick={() => setSideblockView(SideblockView.FILTER)}
                        >
                            Назад
                        </Button>
                        <Button fullWidth type="submit" size="medium" variant="contained">
                            Создать
                        </Button>
                    </S.ButtonContainer>
                </S.Container>
            </form>
        </FormProvider>
    );
};
