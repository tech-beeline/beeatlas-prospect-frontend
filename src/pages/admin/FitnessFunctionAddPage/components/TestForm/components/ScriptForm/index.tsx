import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { FitnessFunctionRunResultsTable, FitnessFunctionStatus } from 'features/fitness-functions';

import { Text } from 'components/core';
import { Autocomplete } from 'components/ui';
import { Banner, Button, Checkbox, InlineAlert, TextArea } from 'components/ui';

import {
    usePostFitnessFunctionStatusMutation,
    usePutFitnessFunctionMutation,
    useRunFitnessFunctionMutation,
} from 'api/queries/fitness-functions';
import { useGetAllProductsQuery } from 'api/queries/product';
import { StepVariants } from 'pages/admin/FitnessFunctionAddPage/const';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { IProductOption, IScriptForm } from './types';
import * as S from './units';

export const ScriptForm: FC<IScriptForm> = ({ setStepVariant, savedData, paramId }) => {
    const [selectedProduct, setSelectedProduct] = useState<IProductOption | null>(null);
    const [productSearch, setProductSearch] = useState('');
    const [scriptCode, setScriptCode] = useState('');
    const [useStructurizr, setUseStructurizr] = useState(false);

    const navigate = useNavigate();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    useEffect(() => {
        if (savedData.scriptCode) {
            setScriptCode(savedData.scriptCode);
        }
    }, [savedData]);

    const { data: products, isLoading: isLoadingProducts } = useGetAllProductsQuery();

    const {
        mutateAsync: runFitnessFunction,
        data: runFitnessFunctionResult,
        isPending: isRunningFitnessFunctionMutation,
        error: runFitnessFunctionError,
    } = useRunFitnessFunctionMutation();
    const runErrorMessage = (runFitnessFunctionError as AxiosError<{ errorMessage?: string }>)
        ?.response?.data?.errorMessage;

    const { mutateAsync: postFitnessFunctionStatus, isPending: isStatusChanging } =
        usePostFitnessFunctionStatusMutation();
    const {
        mutateAsync: putFitnessFunction,
        isPending: isSavingAsTest,
        error: putFitnessFunctionError,
    } = usePutFitnessFunctionMutation();
    const putErrorMessage = (putFitnessFunctionError as AxiosError<{ errorMessage?: string }>)
        ?.response?.data?.errorMessage;

    const productsFiltered = (products ?? []).filter(
        (product) =>
            product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
            product.alias.toLowerCase().includes(productSearch.toLowerCase()),
    );
    const productOptions: IProductOption[] = productsFiltered.map((product) => ({
        id: Number(product.id),
        value: product.name,
        alias: product.alias,
    }));

    const handleCheckClick = async () => {
        if (savedData.code && selectedProduct) {
            await runFitnessFunction({
                code: savedData.code,
                cmdb: selectedProduct.alias,
                useStructurizr: useStructurizr,
            });
        }
    };

    const handleSaveAsTestClick = async () => {
        await putFitnessFunction({
            code: savedData.code ?? '',
            data: {
                description: savedData.name ?? '',
                applicability: savedData.applicability?.length
                    ? savedData.applicability?.join(', ')
                    : undefined,
                auxiliary_check: String(savedData.isTrigger ?? false),
                script: scriptCode,
            },
        });
        showSnackbar({ message: 'Фитнес-функция сохранена в статусе Test' });
    };

    const handleSaveAsTrialClick = async () => {
        if (savedData.code) {
            await postFitnessFunctionStatus({
                code: savedData.code ?? '',
                status: FitnessFunctionStatus.TRIAL,
            });
            showSnackbar({ message: 'Фитнес-функция сохранена в статусе Trial' });
            navigate(`${R.ADMIN_PATH}${R.FITNESS_FUNCTIONS_PATH}`);
        }
    };

    return (
        <S.Container>
            {!paramId && (
                <Banner
                    color="info"
                    iconName={Icons.InfoCircled}
                    title="Любые изменения в редакторе кода на странице тестирования требуют повторного сохранения фитнес-функции в статусе Test независимо от того, пройдена проверка или нет"
                />
            )}

            <S.SubtitleContainer>
                <Text variant="subtitle3">Скрипт</Text>
            </S.SubtitleContainer>

            <Checkbox
                label="Использует данные workspace.json от Structurizr"
                checked={useStructurizr}
                onChange={(e) => setUseStructurizr(e.target.checked)}
            />

            <S.AppContainer>
                <S.GrowContainer>
                    <Autocomplete
                        fullWidth
                        label="Мнемоника приложения"
                        disabled={isLoadingProducts}
                        options={productOptions}
                        value={selectedProduct}
                        onChange={(option) => {
                            setSelectedProduct(option as IProductOption);
                            setProductSearch(option.value);
                        }}
                        renderValue={(v) => v.value}
                        onInputChange={(searchText) => {
                            setSelectedProduct(null);
                            setProductSearch(searchText);
                        }}
                        onInputClear={() => setProductSearch('')}
                        type="select"
                        makeOption={(option) => (
                            <S.OptionContent>
                                <S.OptionText variant="body2">
                                    {(option as IProductOption).alias}
                                </S.OptionText>
                                <S.OptionText inactive variant="caption">
                                    {option.value}
                                </S.OptionText>
                            </S.OptionContent>
                        )}
                        error={!!runErrorMessage}
                        helperText={runErrorMessage}
                    />
                </S.GrowContainer>
                <S.ProgressButtonStyled
                    variant="outlined"
                    size="medium"
                    type="button"
                    disabled={!selectedProduct}
                    onClick={handleCheckClick}
                    state={isRunningFitnessFunctionMutation ? 'loading' : 'default'}
                    showProgress={isRunningFitnessFunctionMutation}
                >
                    Проверить
                </S.ProgressButtonStyled>
            </S.AppContainer>

            {runFitnessFunctionResult && (
                <FitnessFunctionRunResultsTable result={runFitnessFunctionResult} />
            )}

            <TextArea
                fullWidth
                label="Редактор кода"
                value={scriptCode}
                onChange={(e) => setScriptCode(e.target.value)}
                helperText="Напишите python скрипт который выполняет логику нужной вам проверки"
                helperPosition="block"
            />
            {putErrorMessage && <InlineAlert type="error">{putErrorMessage}</InlineAlert>}

            <S.ButtonsContainer>
                <Button
                    variant="outlined"
                    size="medium"
                    type="button"
                    onClick={() => setStepVariant(StepVariants.LOGIC)}
                >
                    Назад
                </Button>
                <Button
                    variant="outlined"
                    size="medium"
                    type="button"
                    onClick={handleSaveAsTestClick}
                    disabled={isSavingAsTest}
                >
                    Сохранить как Test
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    disabled={!runFitnessFunctionResult || isStatusChanging}
                    onClick={handleSaveAsTrialClick}
                >
                    Сохранить как Trial
                </Button>
            </S.ButtonsContainer>
        </S.Container>
    );
};
