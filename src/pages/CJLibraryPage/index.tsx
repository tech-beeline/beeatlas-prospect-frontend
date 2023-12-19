import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, Label, Skeleton } from '@beeline/design-system-react';

import { useDeleteCJMutation, useGetCJCollectionQuery } from 'api/queries/cj';
import { useModal } from 'hooks';
import * as ROUTER from 'router/const';
import * as STYLES from 'styles/units';

import { CJCreateForm, CjMenu } from './components';
import * as S from './units';

export const CJLibraryPage = () => {
    const { modalOpened, closeModal, openModal } = useModal();

    const { data, isLoading } = useGetCJCollectionQuery('');
    const { mutateAsync: deleteCj } = useDeleteCJMutation();

    const navigate = useNavigate();

    const handleCJClick = (id?: number) => {
        navigate({
            pathname: `${ROUTER.CX_PATH}${ROUTER.CJ_PATH}${ROUTER.ADD_PATH}`,
            search: id ? createSearchParams({ id: String(id) }).toString() : '',
        });
    };

    return (
        <>
            <S.MarginBlock />
            <S.PageWrapper>
                <S.ContentWrapper>
                    <S.TitleWrapper>
                        <STYLES.H4>Библиотека CJ</STYLES.H4>
                        <Button variant="contained" size="medium" onClick={openModal}>
                            Создать CJ
                        </Button>
                    </S.TitleWrapper>
                    <S.CardContainer>
                        {data &&
                            data.map((cj) => (
                                <S.CJCard key={cj.id}>
                                    <S.FlexContainer>
                                        <Label
                                            title={cj.draft ? 'Черновик' : 'Опубликован'}
                                            type={cj.draft ? 'default' : 'success'}
                                        />
                                        <CjMenu
                                            cjId={cj.id}
                                            draft={cj.draft}
                                            onDeleteClick={() => deleteCj(String(cj.id))}
                                            onEditClick={() => handleCJClick(cj.id)}
                                        />
                                    </S.FlexContainer>
                                    <S.Title onClick={() => handleCJClick(cj.id)}>
                                        {cj.name}
                                    </S.Title>
                                    <S.Description>{cj.user_portrait}</S.Description>
                                </S.CJCard>
                            ))}
                        {isLoading &&
                            Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton key={index} height={150} />
                            ))}
                    </S.CardContainer>
                </S.ContentWrapper>
                <CJCreateForm isOpen={modalOpened} onClose={closeModal} />
            </S.PageWrapper>
        </>
    );
};
