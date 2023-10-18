import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, Label } from '@beeline/design-system-react';

import * as ROUTER from 'router/const';
import * as STYLES from 'styles/units';

import { useMockCJtore } from './mocks';
import * as S from './units';

export const CJLibraryPage = () => {
    const { cjs } = useMockCJtore();

    const navigate = useNavigate();

    const handleRoleClick = (id?: number) => {
        navigate({
            pathname: `${ROUTER.CX_PATH}${ROUTER.CJ_PATH}${ROUTER.ADD_PATH}`,
            search: id ? createSearchParams({ id: String(id) }).toString() : '',
        });
    };

    return (
        <S.PageWrapper>
            <S.ContentWrapper>
                <S.TitleWrapper>
                    <STYLES.H4>Библиотека CJ</STYLES.H4>
                    <Button variant="contained" size="medium" onClick={() => handleRoleClick()}>
                        Создать CJ
                    </Button>
                </S.TitleWrapper>
                <S.CardContainer>
                    {cjs.map((cj) => (
                        <S.CJCard key={cj.id}>
                            <Label
                                title={cj.draft ? 'Черновик' : 'Опубликован'}
                                type={cj.draft ? 'default' : 'success'}
                            />
                            <S.Title onClick={() => handleRoleClick(cj.id)}>{cj.name}</S.Title>
                            <S.Number>Номер CJ</S.Number>
                            <S.Description>{cj.descr}</S.Description>
                        </S.CJCard>
                    ))}
                </S.CardContainer>
            </S.ContentWrapper>
        </S.PageWrapper>
    );
};
