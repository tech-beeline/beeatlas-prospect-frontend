import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import dayjs from 'dayjs';
import { isBIStepCodeSearch, isLinkableBIStep } from 'features/e2e';

import { Text } from 'components/core';
import { TextArea, TextField } from 'components/form';
import {
    type Option,
    Autocomplete,
    Banner,
    Chip,
    FileUploader,
    IconButton,
    ProgressButton,
} from 'components/ui';

import { IProjectUsecaseSummaryDto, ProjectUsecaseImportMode } from 'api/usecase';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatSize } from 'utils/formatters';

import * as S from '../../units';

import { BIStepOptionValue, IDataStepProps } from './types';
import { matchesSearch } from './utils';

export const DataStep: FC<IDataStepProps> = ({
    form,
    isEditing,
    usecases,
    businessInteractions,
    isUsecasesLoading,
    isBusinessInteractionsLoading,
    isUsecasesError,
    isBusinessInteractionsError,
    isFormDisabled,
    isSubmitting,
    canSubmit,
    submitError,
    onOpenActiveRun,
    onSubmit,
}) => {
    const [scenarioSearch, setScenarioSearch] = useState('');
    const [biStepSearch, setBIStepSearch] = useState('');
    const { formState, setValue, watch } = form;
    const mode = watch('mode');
    const selectedFile = watch('file');
    const plantUml = watch('plantUml');
    const selectedUsecaseId = watch('usecaseId');
    const selectedBiStepCode = watch('biStepCode');
    const allScenarioOptions = useMemo<Option<IProjectUsecaseSummaryDto>[]>(
        () => usecases.map((usecase) => ({ id: usecase.id, value: usecase })),
        [usecases],
    );
    const scenarioOptions = useMemo(
        () =>
            allScenarioOptions.filter(({ value }) =>
                matchesSearch([value.name, value.code], scenarioSearch),
            ),
        [allScenarioOptions, scenarioSearch],
    );
    const allBiStepOptions = useMemo<Option<BIStepOptionValue>[]>(
        () =>
            businessInteractions.flatMap((bi) =>
                bi.biSteps.filter(isLinkableBIStep).map((biStep) => ({
                    id: biStep.id,
                    value: {
                        name: biStep.name,
                        uniqueIdent: biStep.uniqueIdent,
                        biName: bi.name,
                    },
                })),
            ),
        [businessInteractions],
    );
    const biStepOptions = useMemo(
        () =>
            allBiStepOptions.filter(({ value }) =>
                matchesSearch([value.name, value.uniqueIdent, value.biName], biStepSearch),
            ),
        [allBiStepOptions, biStepSearch],
    );
    const selectedScenario = allScenarioOptions.find(({ id }) => id === selectedUsecaseId) ?? null;
    const selectedBiStep =
        allBiStepOptions.find(({ value }) => value.uniqueIdent === selectedBiStepCode) ?? null;
    const activeRunId = submitError?.activeRunId;

    const updateFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        event.target.value = '';
        setValue('file', file, { shouldValidate: true });
        if (file) setValue('plantUml', '');
    };

    return (
        <FormProvider {...form}>
            <S.Form onSubmit={onSubmit}>
                <S.ScrollArea>
                    <S.Content>
                        {(isUsecasesError || isBusinessInteractionsError) && (
                            <Banner
                                color="error"
                                iconName={Icons.WarningCircled}
                                title="Не удалось загрузить часть данных для формы"
                            />
                        )}
                        <Banner
                            color="info"
                            iconName={Icons.InfoCircled}
                            title="Для добавления данных доступно два варианта: вставка текста или добавление файла с устройства"
                        />
                        {submitError && (
                            <Banner
                                color="error"
                                iconName={Icons.WarningCircled}
                                title={submitError.message}
                                actions={
                                    activeRunId !== undefined
                                        ? [
                                              {
                                                  label: 'Посмотреть',
                                                  onClick: () => onOpenActiveRun(activeRunId),
                                              },
                                          ]
                                        : undefined
                                }
                            />
                        )}
                        <S.FormFields>
                            {!isEditing && (
                                <S.ChoiceRow role="group" aria-label="Тип Use Case">
                                    <Chip
                                        active={mode === ProjectUsecaseImportMode.NEW}
                                        aria-pressed={mode === ProjectUsecaseImportMode.NEW}
                                        disabled={isFormDisabled}
                                        label="Новый Use Case"
                                        onClick={() =>
                                            setValue('mode', ProjectUsecaseImportMode.NEW)
                                        }
                                    />
                                    <Chip
                                        active={mode === ProjectUsecaseImportMode.EXISTING}
                                        aria-pressed={mode === ProjectUsecaseImportMode.EXISTING}
                                        disabled={isFormDisabled || usecases.length === 0}
                                        label="Существующий Use Case"
                                        onClick={() =>
                                            setValue('mode', ProjectUsecaseImportMode.EXISTING)
                                        }
                                    />
                                </S.ChoiceRow>
                            )}
                            <S.FieldsRow>
                                <S.Field>
                                    {mode === ProjectUsecaseImportMode.NEW ? (
                                        <TextField
                                            disabled={isFormDisabled}
                                            fullWidth
                                            label={
                                                isEditing
                                                    ? 'Название сценария*'
                                                    : 'Название Use Case*'
                                            }
                                            name="name"
                                        />
                                    ) : (
                                        <Autocomplete
                                            fullWidth
                                            disabled={isFormDisabled || isUsecasesLoading}
                                            error={Boolean(formState.errors.usecaseId)}
                                            helperText={formState.errors.usecaseId?.message}
                                            label={
                                                isEditing
                                                    ? 'Название сценария*'
                                                    : 'Название Use Case*'
                                            }
                                            loading={isUsecasesLoading}
                                            noOptionsContents="Use Case проекта не найдены"
                                            options={scenarioOptions}
                                            renderValue={(option) => option.value.name}
                                            type="select"
                                            value={selectedScenario}
                                            makeOption={(option) => (
                                                <div>
                                                    <Text variant="body2">{option.value.name}</Text>
                                                    <Text inactive variant="body3">
                                                        {option.value.code}
                                                    </Text>
                                                </div>
                                            )}
                                            onChange={(option) => {
                                                setScenarioSearch('');
                                                setValue('usecaseId', Number(option.id) || null, {
                                                    shouldValidate: true,
                                                });
                                            }}
                                            onInputChange={(search) => {
                                                setScenarioSearch(search);
                                                setValue('usecaseId', null, {
                                                    shouldValidate: true,
                                                });
                                            }}
                                            onInputClear={() => {
                                                setScenarioSearch('');
                                                setValue('usecaseId', null, {
                                                    shouldValidate: true,
                                                });
                                            }}
                                        />
                                    )}
                                </S.Field>
                                <S.Field>
                                    <Autocomplete
                                        fullWidth
                                        disabled={isFormDisabled || isBusinessInteractionsLoading}
                                        label="BI step для привязки к CJ (опционально)"
                                        loading={isBusinessInteractionsLoading}
                                        noOptionsContents="BI steps не найдены"
                                        options={biStepOptions}
                                        renderValue={(option) =>
                                            `${option.value.uniqueIdent} — ${option.value.name}`
                                        }
                                        type="select"
                                        value={selectedBiStep}
                                        makeOption={(option) => (
                                            <div>
                                                <Text variant="body2">{option.value.name}</Text>
                                                <Text inactive variant="body3">
                                                    {option.value.uniqueIdent} ·{' '}
                                                    {option.value.biName}
                                                </Text>
                                            </div>
                                        )}
                                        onChange={(option) => {
                                            setBIStepSearch('');
                                            setValue('biStepCode', option.value.uniqueIdent);
                                        }}
                                        onInputChange={(search) => {
                                            const pastedBiStep = allBiStepOptions.find(
                                                ({ value }) =>
                                                    isBIStepCodeSearch(value.uniqueIdent, search),
                                            );
                                            setBIStepSearch(pastedBiStep ? '' : search);
                                            setValue(
                                                'biStepCode',
                                                pastedBiStep?.value.uniqueIdent ?? null,
                                            );
                                        }}
                                        onInputClear={() => {
                                            setBIStepSearch('');
                                            setValue('biStepCode', null);
                                        }}
                                    />
                                </S.Field>
                            </S.FieldsRow>
                            <S.Field>
                                <Text variant="subtitle1">Вставить PlantUML текстом</Text>
                                <S.CodeField>
                                    <TextArea
                                        disabled={Boolean(selectedFile) || isFormDisabled}
                                        fullWidth
                                        label="PlantUML"
                                        name="plantUml"
                                        helperText="Вставьте текст диаграммы последовательности в нотации PlantUML. Используйте названия систем/контейнеров, соответствующие в ландшафте Beeatlas — так части сценария будут сопоставлены автоматически"
                                        helperPosition="block"
                                    />
                                </S.CodeField>
                            </S.Field>
                            <S.Field>
                                <Text variant="subtitle1">Добавить файл</Text>
                                <FileUploader
                                    accept=".puml"
                                    disabled={Boolean(plantUml.trim()) || isFormDisabled}
                                    error={Boolean(formState.errors.file)}
                                    helperText={formState.errors.file?.message}
                                    hideFileList
                                    subTitle="puml до 100 МБ"
                                    onChange={updateFile}
                                />
                                {selectedFile && (
                                    <S.FileRow>
                                        <S.FileInfo>
                                            <S.FileUploaderListItemStyled name="" />
                                            <S.FileName>
                                                <Text variant="body2">{selectedFile.name}</Text>
                                                <S.FileMetadata>
                                                    {formatSize(selectedFile.size)} ·{' '}
                                                    {dayjs(selectedFile.lastModified).format(
                                                        'DD.MM.YYYY, HH:mm',
                                                    )}
                                                </S.FileMetadata>
                                            </S.FileName>
                                        </S.FileInfo>
                                        <S.FileActions>
                                            <IconButton
                                                iconName={Icons.Delete}
                                                size="medium"
                                                onClick={() =>
                                                    setValue('file', null, { shouldValidate: true })
                                                }
                                                aria-label="Удалить файл"
                                            />
                                        </S.FileActions>
                                    </S.FileRow>
                                )}
                            </S.Field>
                        </S.FormFields>
                    </S.Content>
                </S.ScrollArea>
                <S.Footer>
                    <S.FooterContent>
                        <ProgressButton
                            disabled={!canSubmit || isFormDisabled || isSubmitting}
                            size="medium"
                            state={isSubmitting ? 'loading' : 'default'}
                            type="submit"
                            variant="contained"
                        >
                            Импорт
                        </ProgressButton>
                    </S.FooterContent>
                </S.Footer>
            </S.Form>
        </FormProvider>
    );
};
