import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import { Text } from 'components/core';
import { IconButton, Stepper } from 'components/ui';

import {
    useUploadE2EPlantUmlMutation,
    useValidateE2EPlantUmlMutation,
} from 'api/queries/staging-service';
import { IE2EPlantUmlValidationResult } from 'api/staging-service/types';
import { E2EContentOptions, E2ETreeItemType } from 'pages/models/E2EPage/types';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { safeNavigateBack } from 'utils/helpers';

import { ImportDataForm, ValidationResultForm } from './components';
import * as S from './units';

enum StepVariants {
    DATA = 'DATA',
    RESULT = 'RESULT',
}

const STEPS = [
    { id: StepVariants.DATA, label: 'Данные решения' },
    { id: StepVariants.RESULT, label: 'Результат' },
];

interface IRequestError {
    errorMessage?: string;
    message?: string;
}

export const E2EImportPlantUmlPage = () => {
    const [searchParams] = useSearchParams();
    const targetId = searchParams.get('id');
    const targetCode = searchParams.get('code');
    const [file, setFile] = useState<File | null>(null);
    const [plantUmlText, setPlantUmlText] = useState('');
    const [validationResult, setValidationResult] = useState<IE2EPlantUmlValidationResult | null>(
        null,
    );

    const navigate = useNavigate();
    const { mutateAsync: uploadPlantUml, isPending: isUploading } = useUploadE2EPlantUmlMutation();
    const { mutateAsync: validatePlantUml, isPending: isValidating } =
        useValidateE2EPlantUmlMutation();

    const e2ePath = `${R.MODELS_PATH}${R.E2E_PATH}`;
    const targetSearch = targetCode
        ? new URLSearchParams({
              tab: E2EContentOptions.E2E,
              id: targetCode,
              type: E2ETreeItemType.BI_STEP,
          }).toString()
        : '';

    const closePage = () => {
        safeNavigateBack(navigate, `${e2ePath}${targetSearch ? `?${targetSearch}` : ''}`);
    };

    const handleValidate = async (file: File) => {
        if (!targetId) {
            return 'Не удалось определить E2E для импорта';
        }

        try {
            const { docId } = await uploadPlantUml({ file, targetId });
            const result = await validatePlantUml(docId);

            if (!result.valid) {
                const validationError = result.notices.find((notice) => notice.level === 'error');

                return (
                    validationError?.message ??
                    'PlantUML не прошёл валидацию. Исправьте ошибки и попробуйте снова.'
                );
            }

            setValidationResult(result);

            return null;
        } catch (error) {
            const requestError = error as AxiosError<IRequestError>;
            const message =
                requestError.response?.data?.errorMessage ??
                requestError.response?.data?.message ??
                'Не удалось загрузить и проверить PlantUML. Попробуйте снова.';

            return message;
        }
    };

    const handleSave = async () => {
        navigate({
            pathname: e2ePath,
            search: targetSearch,
        });
    };

    const activeStep = validationResult ? StepVariants.RESULT : StepVariants.DATA;

    return (
        <S.PageWrapper>
            <S.Header>
                <Text variant="subtitle2">Импортирование PlantUml</Text>
                <IconButton
                    size="large"
                    iconName={Icons.Close}
                    onClick={closePage}
                    aria-label="Закрыть импорт"
                />
            </S.Header>
            <S.Subheader>
                <Stepper
                    direction="horizontal"
                    activeStepId={activeStep}
                    steps={STEPS.map((step) => ({
                        ...step,
                        state:
                            step.id === activeStep
                                ? 'active'
                                : step.id === StepVariants.DATA && validationResult
                                ? 'success'
                                : 'non-visited',
                    }))}
                />
            </S.Subheader>

            {!validationResult && (
                <ImportDataForm
                    targetId={targetId}
                    file={file}
                    plantUmlText={plantUmlText}
                    onFileChange={setFile}
                    onPlantUmlTextChange={setPlantUmlText}
                    isSubmitting={isUploading || isValidating}
                    onSubmit={handleValidate}
                />
            )}
            {validationResult && (
                <ValidationResultForm
                    result={validationResult}
                    onBack={() => setValidationResult(null)}
                    onSave={handleSave}
                />
            )}
        </S.PageWrapper>
    );
};
