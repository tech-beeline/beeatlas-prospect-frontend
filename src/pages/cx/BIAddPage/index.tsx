import React, { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BIForm, BIFormValues, dataToFormValues, formValuesToData } from 'features/cx';
import { BIFormRef } from 'features/cx/components/BIForm/types';

import { FloatingNavigation } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Button, Icon } from 'components/ui';

import {
    useCreateBIMutation,
    useGetBIByIdQuery,
    useGetBIEditabilityByIdQuery,
    useUpdateBIMutation,
} from 'api/queries/bi';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import * as S from './units';

export const BIAddPage = () => {
    const draft = useRef(false);
    const formRef = useRef<BIFormRef>(null);
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { data, isLoading: isLoadingBI } = useGetBIByIdQuery(paramId);
    const { data: editabilityData } = useGetBIEditabilityByIdQuery(paramId);
    const { mutateAsync: createBi, isPending: creatingBi } = useCreateBIMutation();
    const { mutateAsync: updateBi, isPending: updatingBi } = useUpdateBIMutation();

    const isLoading = creatingBi || updatingBi;

    const navigate = useNavigate();

    const navigateToBiLibrary = () => {
        navigate(`${R.CX_PATH}${R.BI_PATH}`);
    };

    const handleSaveAsDraftClick = () => {
        draft.current = true;
        formRef.current?.onSubmit();
    };

    const handlePublishClick = () => {
        draft.current = false;
        formRef.current?.onSubmit();
    };

    const handleFormSave = async (values: BIFormValues) => {
        if (paramId) {
            await updateBi({
                id: paramId,
                data: { ...formValuesToData(values), draft: draft.current },
            });
        } else {
            await createBi({ ...formValuesToData(values), draft: draft.current });
        }
    };

    const notFound = Boolean(paramId) && !isLoadingBI && !data;

    const isBiUneditable = !notFound && editabilityData && !editabilityData.editability;

    return (
        <S.PageWrapper>
            {isBiUneditable ? (
                <S.UneditableContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.UNEDITABLE}
                        title="Редактирование недоступно"
                        text={
                            isBiUneditable
                                ? 'BI используется в других опубликованных CJ, редактирование недоступно'
                                : ''
                        }
                        buttonText="Вернуться в библиотеку BI"
                        buttonProps={{
                            onClick: navigateToBiLibrary,
                        }}
                    />
                </S.UneditableContainer>
            ) : (
                <>
                    <S.Header>
                        <S.FlexSideContainer>
                            <Icon
                                iconName={Icons.ArrowLeft}
                                onClick={navigateToBiLibrary}
                                style={{ cursor: 'pointer' }}
                            />

                            <S.Title>{paramId ? 'Редактирование BI' : 'Создание BI'}</S.Title>
                        </S.FlexSideContainer>

                        <S.FlexSideContainer>
                            <Button
                                onClick={handleSaveAsDraftClick}
                                disabled={isLoading || notFound}
                                variant="outlined"
                            >
                                Сохранить как черновик
                            </Button>
                            <Button
                                onClick={handlePublishClick}
                                disabled={isLoading || notFound}
                                variant="contained"
                            >
                                Опубликовать
                            </Button>
                        </S.FlexSideContainer>
                    </S.Header>
                    <S.Content>
                        {!notFound && (
                            <>
                                <S.FormContainer>
                                    <BIForm
                                        fullscreen
                                        ref={formRef}
                                        onClose={() => navigate(-1)}
                                        onSave={handleFormSave}
                                        defaultValues={data ? dataToFormValues(data) : undefined}
                                        showButtons={false}
                                    />
                                </S.FormContainer>
                                <S.Navigation>
                                    <FloatingNavigation
                                        items={[
                                            { id: 'top', label: 'Создание BI' },
                                            { id: 'characteristics', label: 'Характеристики' },
                                            { id: 'scenarios', label: 'Сценарий' },
                                            { id: 'channels', label: 'Каналы' },
                                            { id: 'document', label: 'Документация' },
                                            { id: 'metrics', label: 'Метрики' },
                                        ]}
                                    />
                                </S.Navigation>
                            </>
                        )}
                        {notFound && (
                            <S.NotFoundContainer>
                                <NotFoundBlock />
                            </S.NotFoundContainer>
                        )}
                    </S.Content>
                </>
            )}
        </S.PageWrapper>
    );
};
