import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Button, ProgressButton } from 'components/ui';

import { useUpdateBIStepRelations } from 'api/queries/bi';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { StepFields } from './components';
import { FormValues, validationSchema } from './form';
import { IBIEditScenario } from './types';
import * as S from './units';
import { buildRelationsUpdate, relationToFormValues } from './utils';

export const BIEditScenario: FC<IBIEditScenario> = ({
    isOpen,
    onClose,
    stepId,
    relationsData,
    mode,
    relationId,
}) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: { steps: [] },
    });

    const { handleSubmit, control, reset, formState } = form;
    const { isDirty } = formState;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'steps',
    });

    const { mutateAsync } = useUpdateBIStepRelations();

    const onSubmit = handleSubmit(async (values: FormValues) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            await mutateAsync({
                id: String(stepId),
                data: buildRelationsUpdate(relationsData, values.steps, { mode, relationId }),
            });
            showSnackbar({ message: 'Изменения сохранены' });
            onClose();
        } catch {
            showSnackbar({ message: 'Не удалось сохранить вызов' });
        } finally {
            setIsSubmitting(false);
        }
    });

    const handleAddClick = () => {
        append({ product: null, description: '', stepName: `Вызов ${fields.length + 1}` });
    };

    const handleClose = () => {
        if (isSubmitting) return;
        if (isDirty) {
            showSnackbar({ message: 'Изменения не сохранены' });
        }
        onClose();
    };

    useEffect(() => {
        if (!isOpen) return;

        const selectedRelations =
            mode === 'edit'
                ? relationsData.filter((relation) => relation.id === relationId)
                : mode === 'initial'
                ? relationsData
                : [];
        reset({
            steps:
                selectedRelations.length > 0
                    ? selectedRelations.map(relationToFormValues)
                    : [
                          {
                              product: null,
                              tc: null,
                              iface: null,
                              operation: null,
                              description: '',
                              stepName: 'Вызов 1',
                          },
                      ],
        });
    }, [isOpen, relationsData, mode, relationId, reset]);

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={handleClose} large>
            <S.Container>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <S.Content hasButtons>
                            <S.FlexWrapper>
                                <Text variant="h5">
                                    {mode === 'edit'
                                        ? 'Редактировать вызов'
                                        : mode === 'add'
                                        ? 'Добавить вызов'
                                        : 'Добавить реализацию вручную'}
                                </Text>

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
                                    singleCall={mode === 'edit'}
                                    handleAddClick={handleAddClick}
                                    handleRemoveClick={remove}
                                />
                            ))}
                            {fields.length === 0 && (
                                <S.EmptyCalls>
                                    <Text inactive variant="body3">
                                        Ручных вызовов нет
                                    </Text>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        type="button"
                                        onClick={handleAddClick}
                                    >
                                        Добавить вызов
                                    </Button>
                                </S.EmptyCalls>
                            )}
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
