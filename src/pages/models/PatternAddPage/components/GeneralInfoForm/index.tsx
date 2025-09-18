import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FileUploader, FileUploaderListItem, InlineAlert } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { Text } from 'components/core';
import { MultiSelect, RadioGroup, TextField } from 'components/form';

import { StepVariants } from '../../const';
import { FormFooter } from '../FormFooter';

import { FormValues, getValidationSchema } from './form';
import { IGeneralInfoForm } from './types';
import * as S from './units';

export const GeneralInfoForm: FC<IGeneralInfoForm> = ({
    setStepVariant,
    savedData,
    setSavedData,
}) => {
    const form = useForm<FormValues>({
        resolver: yupResolver(getValidationSchema()),
    });

    const { handleSubmit, reset } = form;

    const onSubmit = handleSubmit((values) => {
        setSavedData({ ...savedData, ...values });
        setStepVariant(StepVariants.DOCUMENTATION);
    });

    useEffect(() => {
        reset({
            name: savedData.name,
            type: savedData.type,
            group: savedData.group,
            tech: savedData.tech,
        });
    }, [savedData]);

    return (
        <FormProvider {...form}>
            <S.FormStyled onSubmit={onSubmit}>
                <S.Container>
                    <div>
                        <Text variant="subtitle1">Тип паттерна</Text>
                        <S.RadioContainer>
                            <RadioGroup
                                name="type"
                                options={[
                                    { label: 'Паттерн', id: 0 },
                                    { label: 'Антипаттерн', id: 1 },
                                ]}
                            />
                        </S.RadioContainer>
                    </div>
                    <TextField name="name" label="Название паттерна*" />
                    <S.SelectGroup>
                        <S.SelectContainer>
                            <MultiSelect
                                fullWidth
                                name="group"
                                label="Название группировки"
                                options={[{ id: 1, value: 'Data products' }]}
                            />
                        </S.SelectContainer>
                        <S.SelectContainer>
                            <MultiSelect
                                fullWidth
                                name="tech"
                                label="Название технологии"
                                options={[{ id: 1, value: '.NET Core' }]}
                            />
                        </S.SelectContainer>
                    </S.SelectGroup>
                    <S.FileContainer>
                        <Text variant="subtitle1">Вложенное изображение</Text>
                        <InlineAlert type="info" iconName={Icons.InfoCircled}>
                            Загрузите изображение для комфортного просмотра информации, содержащейся
                            на карточке
                        </InlineAlert>
                        {!savedData.imageFile && (
                            <FileUploader
                                accept="image/*"
                                subTitle="jpg до 100 мб"
                                onChange={(event) =>
                                    setSavedData({
                                        ...savedData,
                                        imageFile: Array.from(event.target.files ?? [])[0],
                                    })
                                }
                            />
                        )}
                        {savedData.imageFile && (
                            <>
                                <S.ImageContainer src={URL.createObjectURL(savedData.imageFile)} />
                                <S.FileListContainer>
                                    <FileUploaderListItem
                                        name={savedData.imageFile.name}
                                        type={savedData.imageFile.type}
                                        actions={[
                                            {
                                                icon: Icons.Delete,
                                                onClick: () =>
                                                    setSavedData({
                                                        ...savedData,
                                                        imageFile: undefined,
                                                    }),
                                            },
                                        ]}
                                    />
                                </S.FileListContainer>
                            </>
                        )}
                    </S.FileContainer>
                </S.Container>
                <FormFooter cancelButtonDisabled submitButtonText="Далее" />
            </S.FormStyled>
        </FormProvider>
    );
};
