import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { SideBlock } from 'components/containers';
import { TextField } from 'components/form';

import { useUpdateBISLA } from 'api/queries/bi';
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
        reset({
            errorRate: data.errorRate ? String(data.errorRate) : undefined,
            latency: data.latency ? String(data.latency) : undefined,
            rps: data.rps ? String(data.rps) : undefined,
        });
    }, [data]);

    const onSubmit = async (values: FormValues) => {
        const payload = {
            latency: Number(values.latency),
            rps: Number(values.rps),
            errorRate: Number(values.errorRate),
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
