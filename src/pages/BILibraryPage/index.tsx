import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, Label, Skeleton } from '@beeline/design-system-react';

// import { useDeleteBIMutation, useGetBICollectionQuery } from 'api/queries/bi';
import { useMockBIStore } from 'pages/CJPage/mocks';
import * as ROUTER from 'router/const';
import * as STYLES from 'styles/units';

import { BiMenu } from './components';
import * as S from './units';

export const BILibraryPage = () => {
    const { bis, deleteBi } = useMockBIStore();
    const isLoading = false;

    // const { data: bis, isLoading } = useGetBICollectionQuery('');
    // const { mutateAsync: deleteBi } = useDeleteBIMutation();

    const navigate = useNavigate();

    const handleCreateBiClick = () => {
        navigate(`${ROUTER.CX_PATH}${ROUTER.BI_PATH}${ROUTER.ADD_PATH}`);
    };

    const handleBiClick = (id: number) => {
        navigate({
            pathname: `${ROUTER.CX_PATH}${ROUTER.BI_PATH}${ROUTER.VIEW_PATH}`,
            search: createSearchParams({ id: String(id) }).toString(),
        });
    };

    const handleEditBiClick = (id: number) => {
        navigate({
            pathname: `${ROUTER.CX_PATH}${ROUTER.BI_PATH}${ROUTER.ADD_PATH}`,
            search: createSearchParams({ id: String(id) }).toString(),
        });
    };

    return (
        <S.PageWrapper>
            <S.ContentWrapper>
                <S.TitleWrapper>
                    <STYLES.H4>Библиотека BI</STYLES.H4>
                    <Button variant="contained" size="medium" onClick={() => handleCreateBiClick()}>
                        Создать BI
                    </Button>
                </S.TitleWrapper>
                <S.CardContainer>
                    {bis &&
                        bis.map((bi) => (
                            <S.BICard key={bi.id}>
                                <S.FlexContainer>
                                    <S.LabelsContainer>
                                        {bi.communal && (
                                            <Label title="Коммунальный" type="magenta" />
                                        )}
                                        <Label
                                            title={bi.type === 0 ? 'Целевой' : 'Фактический'}
                                            type="teal"
                                        />
                                    </S.LabelsContainer>
                                    <BiMenu
                                        biId={bi.id}
                                        onEditClick={() => handleEditBiClick(bi.id)}
                                        onDeleteClick={() => deleteBi(bi.id)}
                                    />
                                </S.FlexContainer>
                                <S.Title onClick={() => handleBiClick(bi.id)}>{bi.name}</S.Title>
                                <S.Number>{bi.identificator}</S.Number>
                                <S.Description>{bi.descr}</S.Description>
                            </S.BICard>
                        ))}
                    {isLoading &&
                        Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} height={150} />
                        ))}
                </S.CardContainer>
            </S.ContentWrapper>
        </S.PageWrapper>
    );
};
