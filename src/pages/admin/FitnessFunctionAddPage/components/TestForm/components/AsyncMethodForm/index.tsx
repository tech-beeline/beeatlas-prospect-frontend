import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FitnessFunctionRunResultsTable, FitnessFunctionStatus } from 'features/fitness-functions';

import { Text } from 'components/core';
import { Autocomplete } from 'components/ui';
import { Badge, Button, Checkbox, Progress } from 'components/ui';

import {
    useGetCallResultQuery,
    usePostFitnessFunctionStatusMutation,
    useRunFitnessFunctionMutation,
} from 'api/queries/fitness-functions';
import { useGetAllProductsQuery } from 'api/queries/product';
import { StepVariants } from 'pages/admin/FitnessFunctionAddPage/const';
import * as R from 'router/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import { IAsyncMethodForm, IProductOption } from './types';
import * as S from './units';

export const AsyncMethodForm: FC<IAsyncMethodForm> = ({ setStepVariant, savedData }) => {
    const [selectedProduct, setSelectedProduct] = useState<IProductOption | null>(null);
    const [productSearch, setProductSearch] = useState('');
    const [useStructurizr, setUseStructurizr] = useState(false);

    const [refetchCallResult, setRefetchCallResult] = useState(false);

    const { data: products, isLoading: isLoadingProducts } = useGetAllProductsQuery();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const navigate = useNavigate();

    const {
        mutateAsync: runFitnessFunction,
        data: runFitnessFunctionResult,
        isPending: isRunningFitnessFunctionMutation,
    } = useRunFitnessFunctionMutation();

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
            setRefetchCallResult(true);
        }
    };

    const callId = runFitnessFunctionResult?.check_result.callId;

    const { data: callData } = useGetCallResultQuery(callId, refetchCallResult);

    useEffect(() => {
        if (callData && callData.check_result?.details) {
            setRefetchCallResult(false);
        }
    }, [callData]);

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
                <Text variant="subtitle3">Асинхронный метод</Text>
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

            {runFitnessFunctionResult && callId && (
                <S.PendingContainer>
                    <Text variant="subtitle3">Caller ID</Text>
                    <S.PendingData>
                        <Progress cycled shape="circle" size="mini" />
                        <Text variant="body2">{callId}</Text>
                        <Badge semantic="info">В процессе</Badge>
                    </S.PendingData>
                </S.PendingContainer>
            )}
            {callData && callData.check_result && (
                <FitnessFunctionRunResultsTable result={callData} />
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
