import React, { FC, useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { Button, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { SideBlock } from 'components/containers';

import { useUpdateBIStepRelations } from 'api/queries/bi';
import { useSnackbarStore } from 'widgets/Snackbar';

import { StepFields } from './components';
import { FormValues, validationSchema } from './form';
import { IBIEditScenario } from './types';
import * as S from './units';

export const BIEditScenario: FC<IBIEditScenario> = ({ isOpen, onClose, stepId, relationsData }) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, control, reset } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'steps',
    });

    useEffect(() => {
        reset({
            steps:
                relationsData.length === 0
                    ? [{ description: '' }]
                    : relationsData.map((relation) => ({
                          id: relation.id,
                          product: relation.productId,
                          tc: relation.tcId,
                          iface: relation.interfaceId,
                          operation: relation.operationId,
                          description: relation.description,
                      })),
        });
    }, [relationsData]);

    const { mutateAsync } = useUpdateBIStepRelations();

    const onSubmit = handleSubmit(async (values: FormValues) => {
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
        showSnackbar({ message: 'Изменения сохранены' });
        onClose();
    });

    const handleAddClick = () => {
        append({ description: '' });
    };

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={onClose} large>
            <S.Container>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <S.Content hasButtons>
                            <S.FlexWrapper>
                                <S.SideBlockTitle>Редактирование шага сценария BI</S.SideBlockTitle>

                                <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                            </S.FlexWrapper>

                            {fields.map((field, i) => (
                                <StepFields
                                    key={field.id}
                                    index={i}
                                    handleAddClick={handleAddClick}
                                    handleRemoveClick={remove}
                                />
                            ))}
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
