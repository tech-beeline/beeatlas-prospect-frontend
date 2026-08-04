import React, { FC, useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Button, Chip, FileUploader, InlineAlert, TextArea } from 'components/ui';

import { usePutFitnessFunctionMutation } from 'api/queries/fitness-functions';
import { StepVariants } from 'pages/admin/FitnessFunctionAddPage/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatSize } from 'utils/formatters';
import { useSnackbarStore } from 'widgets/Snackbar';

import { CHIPS, ChipVariants } from './const';
import { IScriptForm } from './types';
import * as S from './units';

export const ScriptForm: FC<IScriptForm> = ({ setStepVariant, savedData, setSavedData }) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const [selectedChip, setSelectedChip] = useState<ChipVariants>(ChipVariants.INPUT);
    const [scriptCode, setScriptCode] = useState<string>('');

    const [scriptFile, setScriptFile] = useState<File | null>(null);
    const [scriptFileText, setScriptFileText] = useState<string | null>(null);
    const readerRef = useRef(new FileReader());

    const {
        mutateAsync: putFitnessFunction,
        error: putFitnessFunctionError,
        isPending: isUpdatingFitnessFunction,
    } = usePutFitnessFunctionMutation();

    const errorMessage = (putFitnessFunctionError as AxiosError<{ errorMessage?: string }>)
        ?.response?.data?.errorMessage;

    useEffect(() => {
        if (savedData.scriptFile) {
            setScriptFile(savedData.scriptFile);
        }
        if (savedData.scriptCode) {
            setScriptCode(savedData.scriptCode);
        }
    }, [savedData]);

    useEffect(() => {
        readerRef.current.onload = () =>
            setScriptFileText(
                typeof readerRef.current.result === 'string' ? readerRef.current.result : null,
            );
    }, [readerRef]);

    useEffect(() => {
        if (scriptFile) {
            readerRef.current.readAsText(scriptFile);
        }
    }, [scriptFile]);

    const handleSubmit = async () => {
        await putFitnessFunction({
            code: savedData.code ?? '',
            data: {
                description: savedData.name ?? '',
                applicability: savedData.applicability?.length
                    ? savedData.applicability?.join(', ')
                    : undefined,
                auxiliary_check: String(savedData.isTrigger ?? false),
                script: scriptFile ? undefined : scriptCode,
                script_file: scriptFile ?? undefined,
            },
        });
        showSnackbar({ message: 'Фитнес-функция сохранена в статусе Test' });
        setSavedData({
            ...savedData,
            scriptFile: scriptFile ?? undefined,
            scriptCode: scriptCode,
        });
        setStepVariant(StepVariants.TEST);
    };

    return (
        <S.Container>
            <S.MainContainer>
                <S.ChipsContainer>
                    {CHIPS.map((chip) => (
                        <Chip
                            key={chip.value}
                            label={chip.label}
                            value={chip.value}
                            active={selectedChip === chip.value}
                            onClick={() => setSelectedChip(chip.value)}
                        />
                    ))}
                </S.ChipsContainer>
                <S.InputContainer>
                    <Text variant="subtitle3">Тип script</Text>
                    {selectedChip === ChipVariants.FILE && (
                        <>
                            <FileUploader
                                hideFileList
                                accept=".py"
                                subTitle="py до 100 мб"
                                onChange={(event) => {
                                    setScriptFile(Array.from(event.target.files ?? [])[0]);
                                    event.target.value = '';
                                }}
                            />
                            {scriptFile && scriptFileText && (
                                <>
                                    <S.CodeTextContainer>{scriptFileText}</S.CodeTextContainer>

                                    <S.FileNameContainer>
                                        <S.FileMetadataContainer>
                                            <Text variant="body3">{scriptFile.name}</Text>
                                            <Text inactive variant="caption">
                                                {formatSize(scriptFile.size)}{' '}
                                                {dayjs(scriptFile.lastModified)
                                                    .local()
                                                    .format('DD.MM.YYYY, HH:mm')}
                                            </Text>
                                        </S.FileMetadataContainer>
                                        <IconButton
                                            iconName={Icons.Delete}
                                            size="medium"
                                            onClick={() => {
                                                setScriptFile(null);
                                                setScriptFileText(null);
                                            }}
                                        />
                                    </S.FileNameContainer>
                                </>
                            )}
                        </>
                    )}
                    {selectedChip === ChipVariants.INPUT && (
                        <TextArea
                            fullWidth
                            label="Редактор кода"
                            helperText="Напишите python скрипт который выполняет логику нужной вам проверки"
                            helperPosition="block"
                            value={scriptCode}
                            error={!!errorMessage}
                            onChange={(event) => setScriptCode(event.target.value)}
                        />
                    )}
                </S.InputContainer>
                {errorMessage && <InlineAlert type="error">{errorMessage}</InlineAlert>}
            </S.MainContainer>
            <S.ButtonsContainer>
                <Button
                    variant="outlined"
                    size="medium"
                    type="button"
                    onClick={() => setStepVariant(StepVariants.GENERAL_INFO)}
                >
                    Назад
                </Button>
                <S.ProgressButtonStyled
                    variant="contained"
                    size="medium"
                    type="button"
                    onClick={handleSubmit}
                    disabled={!scriptCode && !scriptFile}
                    state={isUpdatingFitnessFunction ? 'loading' : 'default'}
                    showProgress={isUpdatingFitnessFunction}
                >
                    Далее
                </S.ProgressButtonStyled>
            </S.ButtonsContainer>
        </S.Container>
    );
};
