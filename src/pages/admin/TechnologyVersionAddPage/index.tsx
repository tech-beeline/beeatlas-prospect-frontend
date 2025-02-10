import React, { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import {
    useCreateTechnologyVersionMutation,
    useGetTechFormDataQuery,
    useUpdateTechnologyVersionMutation,
} from 'api/queries/technologies';
import * as R from 'router/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import { TechnologyVersionField } from './components';
import { FormValues, getValidationSchema } from './form';
import * as S from './units';

export const TechnologyVersionAddPage = () => {
    const [params] = useSearchParams();
    const paramTechnologyId = params.get('technologyId');
    const paramVersionId = params.get('versionId');

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { data, isLoading: isLoadingTech } = useGetTechFormDataQuery(paramTechnologyId);
    const { techData } = data ?? {};

    const { mutateAsync: createVersion } = useCreateTechnologyVersionMutation();
    const { mutateAsync: updateVersion } = useUpdateTechnologyVersionMutation();

    const form = useForm<FormValues>({
        resolver: yupResolver(getValidationSchema()),
    });

    const { handleSubmit, reset, control } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'versions',
    });

    useEffect(() => {
        if (techData) {
            const version = techData.versions.find((v) => v.id === Number(paramVersionId));
            reset({
                versions: [
                    version
                        ? {
                              versionStart: version.versionStart,
                              versionEnd: version.versionEnd,
                              status: version.ring.id,
                          }
                        : {},
                ],
            });
        } else {
            reset({
                versions: [{}],
            });
        }
    }, [techData]);

    const navigate = useNavigate();

    const returnToTechnologies = () => {
        navigate(`${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}`);
    };

    const onSubmit = handleSubmit(async (values) => {
        if (paramVersionId && paramTechnologyId) {
            const version = values.versions[0];
            if (version) {
                await updateVersion({
                    technologyId: paramTechnologyId,
                    versionId: paramVersionId,
                    data: {
                        ...version,
                        statusId: version.status,
                    },
                });
            }
            returnToTechnologies();
            showSnackbar({ message: 'Изменения сохранены' });
        } else {
            await createVersion({
                technologyId: paramTechnologyId ?? '',
                data: values.versions.map((version) => ({ ...version, statusId: version.status })),
            });
            returnToTechnologies();
            showSnackbar({
                message: values.versions.length === 1 ? 'Версия добавлена' : 'Версии добавлены',
            });
        }
    });

    return (
        <S.PageWrapper>
            <S.Content>
                <S.TitleContainer>
                    <IconButton
                        iconName={Icons.ArrowLeft}
                        size="large"
                        onClick={returnToTechnologies}
                    />
                    <S.Title>{paramVersionId ? 'Редактировать' : 'Создать'} версию</S.Title>
                </S.TitleContainer>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <S.FormContainer>
                            {fields.map((field, index) => (
                                <TechnologyVersionField
                                    key={field.id}
                                    index={index}
                                    fieldsCount={fields.length}
                                    isLoading={isLoadingTech}
                                    showAddButton={!paramVersionId}
                                    techRingId={techData?.ring.id}
                                    resetStatus={!paramVersionId}
                                    append={append}
                                    remove={remove}
                                />
                            ))}
                            <S.ButtonsContainer>
                                <Button onClick={returnToTechnologies} size="medium" type="button">
                                    Отменить
                                </Button>
                                <Button size="medium" variant="contained" type="submit">
                                    {paramVersionId ? 'Сохранить изменения' : 'Сохранить'}
                                </Button>
                            </S.ButtonsContainer>
                        </S.FormContainer>
                    </form>
                </FormProvider>
            </S.Content>
        </S.PageWrapper>
    );
};
