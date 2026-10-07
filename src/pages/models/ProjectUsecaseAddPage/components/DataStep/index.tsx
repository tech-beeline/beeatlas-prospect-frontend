import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import dayjs from 'dayjs';

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

import { IBIData, IStepsScenarion } from 'api/bi/types';
import { IProjectUsecaseSummaryDto, ProjectUsecaseImportMode } from 'api/usecase';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatSize } from 'utils/formatters';

import { UsecaseImportFormValues } from '../../form';
import * as S from '../../units';

interface IDataStepProps {
    form: UseFormReturn<UsecaseImportFormValues>;
    usecases: IProjectUsecaseSummaryDto[];
    businessInteractions: IBIData[];
    isUsecasesLoading: boolean;
    isBusinessInteractionsLoading: boolean;
    isUsecasesError: boolean;
    isBusinessInteractionsError: boolean;
    isFormDisabled: boolean;
    isSubmitting: boolean;
    canSubmit: boolean;
    submitError: { message: string; activeRunId?: number } | null;
    onOpenActiveRun: (runId: number) => void;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}

type BIStepOptionValue = Pick<IStepsScenarion, 'name' | 'uniqueIdent'>;

const matchesSearch = (values: string[], search: string) => {
    const normalizedSearch = search.trim().toLocaleLowerCase('ru');

    return values.some((value) => value.toLocaleLowerCase('ru').includes(normalizedSearch));
};

export const DataStep: FC<IDataStepProps> = ({
    form,
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
                bi.biSteps.map((biStep) => ({
                    id: biStep.uniqueIdent,
                    value: {
                        name: biStep.name,
                        uniqueIdent: biStep.uniqueIdent,
                    },
                })),
            ),
        [businessInteractions],
    );
    const biStepOptions = useMemo(
        () =>
            allBiStepOptions.filter(({ value }) =>
                matchesSearch([value.name, value.uniqueIdent], biStepSearch),
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
                            <S.ChoiceRow role="group" aria-label="Тип Use Case">
                                <Chip
                                    active={mode === ProjectUsecaseImportMode.NEW}
                                    aria-pressed={mode === ProjectUsecaseImportMode.NEW}
                                    disabled={isFormDisabled}
                                    label="Новый Use Case"
                                    onClick={() => setValue('mode', ProjectUsecaseImportMode.NEW)}
                                />
                                <Chip
                                    active={mode === ProjectUsecaseImportMode.EXISTING}
                                    aria-pressed={mode === ProjectUsecaseImportMode.EXISTING}
                                    disabled={isFormDisabled}
                                    label="Существующий Use Case"
                                    onClick={() =>
                                        setValue('mode', ProjectUsecaseImportMode.EXISTING)
                                    }
                                />
                            </S.ChoiceRow>
                            <S.FieldsRow>
                                <S.Field>
                                    {mode === ProjectUsecaseImportMode.NEW ? (
                                        <TextField
                                            disabled={isFormDisabled}
                                            fullWidth
                                            label="Название Use Case*"
                                            name="name"
                                        />
                                    ) : (
                                        <Autocomplete
                                            fullWidth
                                            disabled={isFormDisabled || isUsecasesLoading}
                                            error={Boolean(formState.errors.usecaseId)}
                                            helperText={formState.errors.usecaseId?.message}
                                            label="Название Use Case*"
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
                                        renderValue={(option) => option.value.name}
                                        type="select"
                                        value={selectedBiStep}
                                        makeOption={(option) => (
                                            <div>
                                                <Text variant="body2">{option.value.name}</Text>
                                                <Text inactive variant="body3">
                                                    {option.value.uniqueIdent}
                                                </Text>
                                            </div>
                                        )}
                                        onChange={(option) => {
                                            setBIStepSearch('');
                                            setValue('biStepCode', option.value.uniqueIdent);
                                        }}
                                        onInputChange={(search) => {
                                            setBIStepSearch(search);
                                            setValue('biStepCode', null);
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
                                <TextArea
                                    disabled={Boolean(selectedFile) || isFormDisabled}
                                    fullWidth
                                    label="PlantUML"
                                    name="plantUml"
                                    helperText="Вставьте текст диаграммы последовательности в нотации PlantUML. Используйте названия систем/контейнеров, соответствующие в ландшафте Beeatlas — так части сценария будут сопоставлены автоматически"
                                    helperPosition="block"
                                />
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
