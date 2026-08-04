import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { Text } from 'components/core';
import { AutocompleteArray } from 'components/form';

import {
    useCreatePatternMutation,
    useUpdatePatternMutation,
    useUploadPatternFileMutation,
} from 'api/queries/patterns';
import { useGetNfr, useGetNFRByPatternIdQuery } from 'api/queries/product';
import * as R from 'router/const';
import { isNotNull } from 'utils/helpers';
import { useSnackbarStore } from 'widgets/Snackbar';

import { StepVariants } from '../../const';
import { FormFooter } from '../FormFooter';

import { FormValues, getValidationSchema } from './form';
import { INFRForm } from './types';
import * as S from './units';

export const NFRForm: FC<INFRForm> = ({ setStepVariant, savedData, setSavedData }) => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const paramId = params.get('id');
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const form = useForm<FormValues>({
        resolver: yupResolver(getValidationSchema()),
    });

    const { handleSubmit, reset } = form;
    const { data: nfr, isLoading: isNfrLoading } = useGetNfr();
    const { data: selectedNfr, isLoading: isSelectedNfrLoading } = useGetNFRByPatternIdQuery(
        paramId ?? '',
    );
    const { mutateAsync: createPattern, isPending: pendingCreate } = useCreatePatternMutation();
    const { mutateAsync: updatePattern, isPending: pendingUpdate } = useUpdatePatternMutation();
    const { mutateAsync: uploadPatternFile } = useUploadPatternFileMutation();

    const nfrOptions = (nfr ?? []).map((item) => ({
        id: Number(item.id),
        value: item.name,
        descr: item.code,
    }));

    const onSubmit = handleSubmit(async (values) => {
        const updatedSavedData = {
            ...savedData,
            nfr: values.nfr.map((item) => item.value).filter(isNotNull),
        };
        setSavedData(updatedSavedData);

        if (paramId) {
            await updatePattern({
                id: Number(paramId),
                data: {
                    name: updatedSavedData.name ?? '',
                    isAntiPattern: updatedSavedData.type === 0 ? false : true,
                    description: updatedSavedData.description ?? '',
                    groups: updatedSavedData.group ?? [],
                    relationsTech: updatedSavedData.tech ?? [],
                    rule: updatedSavedData.rule ?? '',
                    dsl: updatedSavedData.dsl ?? '',
                    nfr: values.nfr.map((item) => item.value).filter(isNotNull),
                },
            });
            if (updatedSavedData.documentationFile) {
                await uploadPatternFile({
                    file: updatedSavedData.documentationFile,
                    patternId: Number(paramId),
                });
            }
            showSnackbar({ message: 'Изменения сохранены' });
            navigate(`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.VIEW_PATH}?id=${paramId}`);
            return;
        }

        const { id } = await createPattern({
            name: updatedSavedData.name ?? '',
            isAntiPattern: updatedSavedData.type === 1,
            description: updatedSavedData.description ?? '',
            groups: updatedSavedData.group ?? [],
            relationsTech: updatedSavedData.tech ?? [],
            rule: updatedSavedData.rule ?? '',
            dsl: updatedSavedData.dsl ?? '',
            nfr: values.nfr.map((item) => item.value).filter(isNotNull),
        });
        if (updatedSavedData.documentationFile) {
            await uploadPatternFile({ file: updatedSavedData.documentationFile, patternId: id });
        }
        showSnackbar({ message: 'Паттерн создан' });
        navigate(`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.VIEW_PATH}?id=${id}`);
    });

    const submitButtonText = paramId ? 'Сохранить изменения' : 'Создать';
    const submitButtonDisabled = pendingCreate || pendingUpdate;

    useEffect(() => {
        if (paramId && selectedNfr) {
            const nfrFromPattern = selectedNfr.map((item) => Number(item.id));

            reset({
                nfr: savedData.nfr
                    ? savedData.nfr.map((item) => ({ value: item }))
                    : nfrFromPattern.map((item) => ({ value: item })),
            });

            if (!savedData.nfr) {
                setSavedData({ ...savedData, nfr: nfrFromPattern });
            }
            return;
        }

        reset({
            nfr: savedData.nfr ? savedData.nfr.map((item) => ({ value: item })) : [],
        });
    }, [paramId, selectedNfr, savedData, reset, setSavedData]);

    return (
        <FormProvider {...form}>
            <S.FormStyled onSubmit={onSubmit}>
                <S.Container>
                    <AutocompleteArray
                        name="nfr"
                        options={nfrOptions}
                        label="Нефункциональное требование"
                        isLoading={isNfrLoading || isSelectedNfrLoading}
                        makeOption={(option) => (
                            <div>
                                <Text variant="body2">{option.value}</Text>
                                <Text variant="body3" inactive>
                                    {option.descr}
                                </Text>
                            </div>
                        )}
                    />
                </S.Container>
                <FormFooter
                    onCancelButtonClick={() => setStepVariant(StepVariants.DESCRIPTION)}
                    submitButtonDisabled={submitButtonDisabled}
                    submitButtonText={submitButtonText}
                />
            </S.FormStyled>
        </FormProvider>
    );
};
