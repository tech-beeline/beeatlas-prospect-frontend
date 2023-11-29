import React, { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { BIForm, BIFormValues, dataToFormValues, formValuesToData } from 'features/cx';

import { FloatingNavigation } from 'components/interaction';

import { useCreateBIMutation, useGetBIByIdQuery, useUpdateBIMutation } from 'api/queries/bi';
import * as ROUTER from 'router/const';

import * as S from './units';

export const BIAddPage = () => {
    const draft = useRef(false);
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { data } = useGetBIByIdQuery(paramId);
    const { mutateAsync: createBi, isLoading: creatingBi } = useCreateBIMutation();
    const { mutateAsync: updateBi, isLoading: updatingBi } = useUpdateBIMutation();

    const isLoading = creatingBi || updatingBi;

    const navigate = useNavigate();

    const handleBackIconClick = () => {
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

    const handleFormSave = (values: BIFormValues) => {
        if (paramId) {
            updateBi({ id: paramId, data: { ...formValuesToData(values), draft: draft.current } });
        } else {
            createBi({ ...formValuesToData(values), draft: draft.current });
        }
    };

    return (
        <S.PageWrapper>
            <S.Header>
                <S.FlexSideContainer>
                    <Icon
                        iconName={Icons.ArrowLeft}
                        onClick={handleBackIconClick}
                        style={{ cursor: 'pointer' }}
                    />

                    <S.Title>{paramId ? 'Редактирование BI' : 'Создание BI'}</S.Title>
                </S.FlexSideContainer>

                <S.FlexSideContainer>
                    <Button
                        onClick={handleSaveAsDraftClick}
                        disabled={isLoading}
                        variant="outlined"
                    >
                        Сохранить как черновик
                    </Button>
                    <Button onClick={handlePublishClick} disabled={isLoading} variant="contained">
                        Опубликовать
                    </Button>
                </S.FlexSideContainer>
            </S.Header>
            <S.Content>
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
                            { id: 'name', label: 'Название' },
                            { id: 'characteristics', label: 'Характеристики' },
                            { id: 'participants', label: 'Участники взаимодействия' },
                            { id: 'feelings', label: 'Чувства и эмоции' },
                            { id: 'scenarios', label: 'Сценарии' },
                            { id: 'channels', label: 'Канал' },
                            { id: 'document', label: 'Документация' },
                            { id: 'mockup', label: 'Макет' },
                        ]}
                    />
                </S.Navigation>
            </S.Content>
        </S.PageWrapper>
    );
};
