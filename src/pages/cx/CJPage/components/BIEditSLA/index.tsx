import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { SideBlock } from 'components/containers';
import { TextField } from 'components/form';

import { FormValues, validationSchema } from './form';
import { IBIEditSLA } from './types';
import * as S from './units';

export const BIEditSLA: FC<IBIEditSLA> = ({ isOpen, onClose }) => {
    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });
    return (
        <SideBlock isOpen={isOpen} onClose={onClose} large>
            <S.Container>
                <FormProvider {...form}>
                    <S.Content hasButtons>
                        <S.FlexWrapper>
                            <S.SideBlockTitle>Редактирование SLA</S.SideBlockTitle>

                            <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                        </S.FlexWrapper>
                        <S.TextFieldContainer>
                            <TextField id="rps" label="RPS" name="rps" />
                            <TextField id="latency" label="Latency, ms" name="latency" />
                            <TextField id="errorRate" label="Error Rate, %" name="errorRate" />
                        </S.TextFieldContainer>
                    </S.Content>

                    <S.ButtonContainer>
                        <Button type="button" onClick={onClose}>
                            Отменить
                        </Button>

                        <Button disabled={true} type="submit" variant="contained">
                            Сохранить
                        </Button>
                    </S.ButtonContainer>
                </FormProvider>
            </S.Container>
        </SideBlock>
    );
};
