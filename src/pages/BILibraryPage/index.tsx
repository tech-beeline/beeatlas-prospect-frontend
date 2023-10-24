import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, Label } from '@beeline/design-system-react';

import { useMockBItore } from 'pages/CJPage/mocks';
import * as ROUTER from 'router/const';
import * as STYLES from 'styles/units';

import * as S from './units';

export const BILibraryPage = () => {
    const { bis } = useMockBItore();

    const navigate = useNavigate();

    const handleRoleClick = (id?: number) => {
        navigate({
            pathname: `${ROUTER.CX_PATH}${ROUTER.BI_PATH}${ROUTER.ADD_PATH}`,
            search: id ? createSearchParams({ id: String(id) }).toString() : '',
        });
    };

    return (
        <S.PageWrapper>
            <S.ContentWrapper>
                <S.TitleWrapper>
                    <STYLES.H4>Библиотека BI</STYLES.H4>
                    <Button variant="contained" size="medium" onClick={() => handleRoleClick()}>
                        Создать BI
                    </Button>
                </S.TitleWrapper>
                <S.CardContainer>
                    {bis.map((bi) => (
                        <S.BICard key={bi.id}>
                            <S.LabelsContainer>
                                {bi.communal && <Label title="Коммунальный" type="magenta" />}
                                <Label
                                    title={bi.type === 0 ? 'Целевой' : 'Фактический'}
                                    type="teal"
                                />
                            </S.LabelsContainer>
                            <S.Title onClick={() => handleRoleClick(bi.id)}>{bi.name}</S.Title>
                            <S.Number>Номер BI</S.Number>
                            <S.Description>{bi.descr}</S.Description>
                        </S.BICard>
                    ))}
                </S.CardContainer>
            </S.ContentWrapper>
        </S.PageWrapper>
    );
};
