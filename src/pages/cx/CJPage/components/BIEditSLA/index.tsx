import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SideBlock } from 'components/containers';
import { TextField } from 'components/form';
import { IconButton } from 'components/ui';
import { Button } from 'components/ui';

import { useUpdateBISLA } from 'api/queries/bi';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { FormValues, validationSchema } from './form';
import { IBIEditSLA } from './types';
import * as S from './units';

export const BIEditSLA: FC<IBIEditSLA> = ({ isOpen, onClose, slaId, data }) => {
    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });
    const { handleSubmit, reset } = form;
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const { mutateAsync: updateSLA } = useUpdateBISLA();

    useEffect(() => {
        if (isOpen && data) {
            reset({
                errorRate: data.errorRate !== null ? String(data.errorRate) : '',
                latency: data.latency !== null ? String(data.latency) : '',
                rps: data.rps !== null ? String(data.rps) : '',
            });
        }
    }, [isOpen, data, reset]);

    const onSubmit = async (values: FormValues) => {
        const payload = {
            latency: values.latency !== '' ? Number(values.latency) : null,
            rps: values.rps !== '' ? Number(values.rps) : null,
            errorRate: values.errorRate !== '' ? Number(values.errorRate) : null,
        };

        await updateSLA({
            id: String(slaId),
            data: payload,
        });

        showSnackbar({ message: 'Изменения сохранены' });
        onClose();
    };
    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={onClose} large>
            <S.Container>
                <FormProvider {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <S.Content hasButtons>
                            <S.FlexWrapper>
                                <S.SideBlockTitle>Редактирование SLA</S.SideBlockTitle>

                                <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                            </S.FlexWrapper>
                            <S.TextFieldContainer>
                                <TextField id="rps" label="RPS" name="rps" type="number" />
                                <TextField
                                    id="latency"
                                    label="Latency, ms"
                                    name="latency"
                                    type="number"
                                />
                                <TextField
                                    id="errorRate"
                                    label="Error Rate, %"
                                    name="errorRate"
                                    type="number"
                                />
                            </S.TextFieldContainer>
                        </S.Content>

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
            </S.Container>
        </SideBlock>
    );
};
