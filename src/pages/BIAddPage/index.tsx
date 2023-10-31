import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { FloatingNavigation } from 'components/interaction';

// import { useGetBIByIdQuery } from 'api/queries/bi';
// import { useCreateBIMutation, useUpdateBIMutation } from 'api/queries/bi';
import { BIForm } from 'pages/CJPage/components/BIForm';
import { FormValues } from 'pages/CJPage/components/BIForm/form';
import { BI, useMockBIStore } from 'pages/CJPage/mocks';

import * as S from './units';

export const BIAddPage = () => {
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { getBiById, updateBi, createBi } = useMockBIStore();

    // const { data } = useGetBIByIdQuery(paramId);
    // const { mutateAsync: createBi, isLoading: creatingBi } = useCreateBIMutation();
    // const { mutateAsync: updateBi, isLoading: updatingBi } = useUpdateBIMutation();

    // const isLoading = creatingBi || updatingBi;

    const [bi, setBi] = useState<BI | null>(null);

    useEffect(() => {
        if (paramId) {
            const bi = getBiById(Number(paramId));
            if (bi) {
                setBi(bi);
            }
        }
    }, [paramId, getBiById]);

    const navigate = useNavigate();

    const handleSaveClick = () => {
        submitButtonRef.current?.click();
    };

    const handleFormSave = (values: FormValues) => {
        if (paramId) {
            updateBi(Number(paramId), values);
        } else {
            createBi(values);
        }
    };

    return (
        <S.PageWrapper>
            <S.Header>
                <S.FlexSideContainer>
                    <Icon
                        iconName={Icons.ArrowLeft}
                        onClick={() => navigate(-1)}
                        style={{ cursor: 'pointer' }}
                    />

                    <S.Title>{paramId ? 'Редактирование BI' : 'Создание BI'}</S.Title>
                </S.FlexSideContainer>

                <S.FlexSideContainer>
                    <Button onClick={handleSaveClick} variant="contained">
                        Сохранить
                    </Button>
                </S.FlexSideContainer>
            </S.Header>
            <S.Content>
                <S.FormContainer>
                    <BIForm
                        ref={submitButtonRef}
                        onClose={() => navigate(-1)}
                        onSave={handleFormSave}
                        defaultValues={bi ?? undefined}
                        showButtons={false}
                        fullscreen={true}
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
                            { id: 'documentation', label: 'Документация' },
                            { id: 'mockup', label: 'Макет' },
                        ]}
                    />
                </S.Navigation>
            </S.Content>
        </S.PageWrapper>
    );
};
