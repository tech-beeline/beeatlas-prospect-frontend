import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextField } from 'components/form';

import { SideBlock } from '../SideBlock';

import { FormValues, validationSchema } from './form';
import { IStepForm } from './types';
import * as S from './units';

export const CJForm: FC<IStepForm> = ({ values, isOpen, updateCJ, onClose }) => {
    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset } = form;

    const onSubmit = handleSubmit(async (values) => {
        updateCJ(values);
        onClose();
        reset();
    });

    useEffect(() => reset(values), [values]);

    return (
        <SideBlock isOpen={isOpen} setOpen={onClose}>
            <FormProvider {...form}>
                <form onSubmit={onSubmit}>
                    <S.FlexWrapper>
                        <S.SideBlockTitle>Настройка CJ</S.SideBlockTitle>

                        <Icon
                            iconName={Icons.Close}
                            onClick={onClose}
                            style={{ cursor: 'pointer' }}
                        />
                    </S.FlexWrapper>

                    <S.TextFieldContainer>
                        <TextField label="Название" name="name" />

                        <TextField label="Портрет пользователя" name="userPortrait" />
                    </S.TextFieldContainer>

                    <S.ButtonContainer>
                        <Button type="button" onClick={onClose}>
                            Отменить
                        </Button>

                        <Button type="submit" variant="contained">
                            Сохранить
                        </Button>
                    </S.ButtonContainer>
                </form>
            </FormProvider>
        </SideBlock>
    );
};

export type { FormValues } from './form';
