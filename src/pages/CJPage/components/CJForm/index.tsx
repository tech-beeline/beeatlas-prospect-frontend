import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextField } from 'components/form';

// import { useUpdateCJMutation } from 'api/queries/cj';
import { SideBlock } from '../SideBlock';

import { FormValues, validationSchema } from './form';
import { IStepForm } from './types';
import * as S from './units';

export const CJForm: FC<IStepForm> = ({ values, isOpen, updateCJ, onClose }) => {
    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    // const { mutateAsync: update, isLoading: updatingCJ } = useUpdateCJMutation();

    const { handleSubmit, reset } = form;

    const onSubmit = handleSubmit(async (values) => {
        // update({ id: '1', data: { name: values.name, user_portrait: values.userPortrait } });
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
