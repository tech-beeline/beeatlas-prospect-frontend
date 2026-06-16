import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { FitnessFunctionRunResultsTable, FitnessFunctionStatus } from 'features/fitness-functions';

import { Text } from 'components/core';
import { Autocomplete } from 'components/ui';
import { Button, Checkbox } from 'components/ui';

import {
    usePostFitnessFunctionStatusMutation,
    useRunFitnessFunctionMutation,
} from 'api/queries/fitness-functions';
import { useGetAllProductsQuery } from 'api/queries/product';
import { StepVariants } from 'pages/admin/FitnessFunctionAddPage/const';
import * as R from 'router/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import { IProductOption, ISyncMethodForm } from './types';
import * as S from './units';

export const SyncMethodForm: FC<ISyncMethodForm> = ({ setStepVariant, savedData }) => {
    const [selectedProduct, setSelectedProduct] = useState<IProductOption | null>(null);
    const [productSearch, setProductSearch] = useState('');
    const [useStructurizr, setUseStructurizr] = useState(false);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const navigate = useNavigate();

    const { data: products, isLoading: isLoadingProducts } = useGetAllProductsQuery();

    const {
        mutateAsync: runFitnessFunction,
        data: runFitnessFunctionResult,
        isPending: isRunningFitnessFunctionMutation,
        error: runFitnessFunctionError,
    } = useRunFitnessFunctionMutation();
    const errorMessage = (runFitnessFunctionError as AxiosError<{ errorMessage?: string }>)
        ?.response?.data?.errorMessage;

    const { mutateAsync: postFitnessFunctionStatus, isPending: isStatusChanging } =
        usePostFitnessFunctionStatusMutation();

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
            <S.SubtitleContainer>
                <Text variant="subtitle3">Синхронный метод</Text>
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
                        error={!!errorMessage}
                        helperText={errorMessage}
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
