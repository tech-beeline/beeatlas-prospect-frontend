import React, { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { BIForm, BIFormValues, dataToFormValues, formValuesToData } from 'features/cx';

import { FloatingNavigation } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';

import {
    useCreateBIMutation,
    useGetBIByIdQuery,
    useGetBIEditabilityByIdQuery,
    useUpdateBIMutation,
} from 'api/queries/bi';
import * as ROUTER from 'router/const';

import * as S from './units';

export const BIAddPage = () => {
    const draft = useRef(false);
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { data, isLoading: isLoadingBI } = useGetBIByIdQuery(paramId);
    const { data: editabilityData } = useGetBIEditabilityByIdQuery(paramId);
    const { mutateAsync: createBi, isPending: creatingBi } = useCreateBIMutation();
    const { mutateAsync: updateBi, isPending: updatingBi } = useUpdateBIMutation();

    const isLoading = creatingBi || updatingBi;

    const navigate = useNavigate();

    const navigateToBiLibrary = () => {
        navigate(`${ROUTER.CX_PATH}${ROUTER.BI_PATH}`);
    };

    const handleSaveAsDraftClick = () => {
        draft.current = true;
        submitButtonRef.current?.click();
    };

    const handlePublishClick = () => {
        draft.current = false;
        submitButtonRef.current?.click();
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

    const isBiCommunalAndPublished = data && data.communal && !data.draft;

    return (
        <S.PageWrapper>
            {isBiUneditable || isBiCommunalAndPublished ? (
                <S.UneditableContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.UNEDITABLE}
                        title="Редактирование недоступно"
                        text={
                            isBiUneditable
                                ? 'BI используется в других опубликованных CJ, редактирование недоступно'
                                : 'Коммунальный опубликованный BI нельзя редактировать'
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
                                        ref={submitButtonRef}
                                        onClose={() => navigate(-1)}
                                        onSave={handleFormSave}
                                        defaultValues={data ? dataToFormValues(data) : undefined}
                                        showButtons={false}
                                    />
                                </S.FormContainer>
                                <S.Navigation>
                                    <FloatingNavigation
                                        items={[
                                            { id: 'top', label: 'Название' },
                                            { id: 'characteristics', label: 'Характеристики' },
                                            {
                                                id: 'participants',
                                                label: 'Участники взаимодействия',
                                            },
                                            { id: 'feelings', label: 'Чувства и эмоции' },
                                            { id: 'scenarios', label: 'Сценарии' },
                                            { id: 'channels', label: 'Канал' },
                                            { id: 'document', label: 'Документация' },
                                            { id: 'mockup', label: 'Макет' },
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
