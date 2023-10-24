import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { BIForm } from 'pages/CJPage/components/BIForm';
import { FormValues } from 'pages/CJPage/components/BIForm/form';
import { BI, useMockBItore } from 'pages/CJPage/mocks';

import * as S from './units';

export const BIAddPage = () => {
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { getBiById, updateBi, createBi } = useMockBItore();

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
                <BIForm
                    ref={submitButtonRef}
                    onClose={() => navigate(-1)}
                    onSave={handleFormSave}
                    defaultValues={bi ?? undefined}
                    showButtons={false}
                />
            </S.Content>
        </S.PageWrapper>
    );
};
