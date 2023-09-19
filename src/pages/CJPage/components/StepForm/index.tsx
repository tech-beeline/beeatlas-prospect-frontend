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

export const StepForm: FC<IStepForm> = ({ defaultName, isOpen, renameColumn, onClose }) => {
    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset } = form;

    const onSubmit = handleSubmit(({ name }) => {
        renameColumn(name);
        onClose();
        reset();
    });

    useEffect(() => reset({ name: defaultName }), [defaultName]);

    return (
        <SideBlock isOpen={isOpen} setOpen={onClose}>
            <FormProvider {...form}>
                <form onSubmit={onSubmit}>
                    <S.FlexWrapper>
                        <S.SideBlockTitle>Название шага</S.SideBlockTitle>

                        <Icon
                            iconName={Icons.Close}
                            onClick={onClose}
                            style={{ cursor: 'pointer' }}
                        />
                    </S.FlexWrapper>

                    <S.TextFieldContainer>
                        <TextField name="name" label="Название" />
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
