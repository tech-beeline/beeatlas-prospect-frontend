import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PlantUmlValidationResult } from 'features/e2e';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { IconButton, Skeleton } from 'components/ui';

import { useValidateE2EPlantUmlQuery } from 'api/queries/staging-service';
import { E2EContentOptions, E2ETreeItemType } from 'pages/models/E2EPage/types';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { safeNavigateBack } from 'utils/helpers';

import * as S from './units';

export const E2EImportPlantUmlVersionPage = () => {
    const [searchParams] = useSearchParams();
    const docId = searchParams.get('docId');
    const e2eCode = searchParams.get('code');
    const navigate = useNavigate();

    const { data, isLoading, isError } = useValidateE2EPlantUmlQuery(docId);

    const e2ePath = `${R.MODELS_PATH}${R.E2E_PATH}`;
    const fallbackSearch = e2eCode
        ? new URLSearchParams({
              tab: E2EContentOptions.E2E,
              id: e2eCode,
              type: E2ETreeItemType.BI_STEP,
          }).toString()
        : '';

    const navigateBack = () => {
        safeNavigateBack(navigate, `${e2ePath}${fallbackSearch ? `?${fallbackSearch}` : ''}`);
    };

    return (
        <S.PageWrapper>
            <S.Header>
                <IconButton
                    size="large"
                    iconName={Icons.ArrowLeft}
                    onClick={navigateBack}
                    aria-label="Вернуться к E2E"
                />
                <Text variant="subtitle2">Результат валидации PlantUml</Text>
            </S.Header>

            {isLoading && (
                <S.StateContainer>
                    <Skeleton height={420} radius={12} />
                </S.StateContainer>
            )}

            {!isLoading && data && <PlantUmlValidationResult result={data} />}

            {!isLoading && (!docId || isError || !data) && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        title="Не удалось получить результат валидации"
                        text="Версия файла не найдена или недоступна"
                        buttonText="Вернуться к E2E"
                        buttonProps={{ onClick: navigateBack }}
                    />
                </S.NotFoundContainer>
            )}
        </S.PageWrapper>
    );
};
