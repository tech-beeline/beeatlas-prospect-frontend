import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Button, ProgressButton } from 'components/ui';

import { useUpdateBIStepRelations } from 'api/queries/bi';
import { useGetCompleteCJDataByIdQuery } from 'api/queries/cj';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { StepFields } from './components';
import { FormValues, validationSchema } from './form';
import { IBIEditScenario } from './types';
import * as S from './units';

export const BIEditScenario: FC<IBIEditScenario> = ({ isOpen, onClose, stepId, relationsData }) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { refetch } = useGetCompleteCJDataByIdQuery(paramId);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, control, reset, formState } = form;
    const { isDirty } = formState;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'steps',
    });

    const { mutateAsync } = useUpdateBIStepRelations();

    const onSubmit = handleSubmit(async (values: FormValues) => {
        setIsSubmitting(true);

        await mutateAsync({
            id: String(stepId),
            data: values.steps.map((step) => ({
                id: step.id ?? undefined,
                description: step.description,
                productId: step.product ?? null,
                tcId: step.tc ?? null,
                interfaceId: step.iface ?? null,
                operationId: step.operation ?? null,
            })),
        });
        await refetch();

        showSnackbar({ message: 'Изменения сохранены' });
        setIsSubmitting(false);
        onClose();
    });

    const handleAddClick = () => {
        append({ product: null, description: '', stepName: `Вызов ${fields.length + 1}` });
    };

    const handleClose = () => {
        if (isDirty) {
            showSnackbar({ message: 'Изменения не сохранены' });
        }
        onClose();
    };

    useEffect(() => {
        if (!isOpen) return;

        reset({
            steps:
                relationsData.length === 0
                    ? [{ description: '', stepName: 'Вызов 1' }]
                    : relationsData.map((relation, i) => ({
                          id: relation.id,
                          product: relation.productId,
                          tc: relation.tcId,
                          iface: relation.interfaceId,
                          operation: relation.operationId,
                          description: relation.description,
                          stepName:
                              relation.tcName ??
                              relation.operation ??
                              relation.interfaceName ??
                              relation.productName ??
                              `Вызов ${i + 1}`,
                      })),
        });
    }, [isOpen, relationsData]);

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={handleClose} large>
            <S.Container>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <S.Content hasButtons>
                            <S.FlexWrapper>
                                <Text variant="h5">Редактирование шага сценария BI</Text>

                                <IconButton
                                    iconName={Icons.Close}
                                    onClick={handleClose}
                                    size="large"
                                />
                            </S.FlexWrapper>

                            {fields.map((field, i) => (
                                <StepFields
                                    key={field.id}
                                    index={i}
                                    isLast={i === fields.length - 1}
                                    totalFields={fields.length}
                                    handleAddClick={handleAddClick}
                                    handleRemoveClick={remove}
                                />
                            ))}
                        </S.Content>

                        <S.ButtonContainer>
                            <Button type="button" onClick={handleClose} disabled={isSubmitting}>
                                Отменить
                            </Button>

                            <ProgressButton
                                type="submit"
                                variant="contained"
                                state={isSubmitting ? 'loading' : 'default'}
                                disabled={isSubmitting}
                            >
                                Сохранить
                            </ProgressButton>
                        </S.ButtonContainer>
                    </form>
                </FormProvider>
            </S.Container>
        </SideBlock>
    );
};
