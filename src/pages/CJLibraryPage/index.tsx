import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, Label } from '@beeline/design-system-react';

// import { useCreateCJWithEmptyStepMutation } from 'api/queries/cj';
// import { useDeleteCJMutation, useGetCJCollectionQuery } from 'api/queries/cj';
import * as ROUTER from 'router/const';
import * as STYLES from 'styles/units';

import { CjMenu } from './components';
import { useMockCJtore } from './mocks';
import * as S from './units';

export const CJLibraryPage = () => {
    const { cjs, deleteCj } = useMockCJtore();

    // const { data, isLoading } = useGetCJCollectionQuery();
    // const { mutateAsync: deleteCj } = useDeleteCJMutation();
    // const { mutateAsync: createCJ, isLoading: creatingCJ } = useCreateCJWithEmptyStepMutation();

    // console.log(data);

    const navigate = useNavigate();

    const handleCJClick = (id?: number) => {
        navigate({
            pathname: `${ROUTER.CX_PATH}${ROUTER.CJ_PATH}${ROUTER.ADD_PATH}`,
            search: id ? createSearchParams({ id: String(id) }).toString() : '',
        });
    };

    // const handleCreateClick = async () => {
    //     const id = await createCJ();
    //     navigate({
    //         pathname: `${ROUTER.CX_PATH}${ROUTER.CJ_PATH}${ROUTER.ADD_PATH}`,
    //         search: createSearchParams({ id: String(id) }).toString(),
    //     });
    // };

    return (
        <S.PageWrapper>
            <S.ContentWrapper>
                <S.TitleWrapper>
                    <STYLES.H4>Библиотека CJ</STYLES.H4>
                    <Button variant="contained" size="medium" onClick={() => handleCJClick()}>
                        Создать CJ
                    </Button>
                    {/* <Button
                        disabled={creatingCJ}
                        variant="contained"
                        size="medium"
                        onClick={handleCreateClick}
                    >
                        Создать CJ
                    </Button> */}
                </S.TitleWrapper>
                <S.CardContainer>
                    {cjs.map((cj) => (
                        <S.CJCard key={cj.id}>
                            <S.FlexContainer>
                                <Label
                                    title={cj.draft ? 'Черновик' : 'Опубликован'}
                                    type={cj.draft ? 'default' : 'success'}
                                />
                                <CjMenu
                                    cjId={cj.id}
                                    onDeleteClick={() => deleteCj(cj.id)}
                                    onEditClick={() => handleCJClick(cj.id)}
                                />
                            </S.FlexContainer>
                            <S.Title onClick={() => handleCJClick(cj.id)}>{cj.name}</S.Title>
                            <S.Description>{cj.descr}</S.Description>
                        </S.CJCard>
                    ))}
                    {/* {data &&
                        data.map((cj) => (
                            <S.CJCard key={cj.id}>
                                <S.FlexContainer>
                                    <Label
                                        title={cj.draft ? 'Черновик' : 'Опубликован'}
                                        type={cj.draft ? 'default' : 'success'}
                                    />
                                    <CjMenu
                                        cjId={cj.id}
                                        onDeleteClick={() => deleteCj(String(cj.id))}
                                        onEditClick={() => handleCJClick(cj.id)}
                                    />
                                </S.FlexContainer>
                                <S.Title onClick={() => handleCJClick(cj.id)}>{cj.name}</S.Title>
                                <S.Description>{cj.user_portrait}</S.Description>
                            </S.CJCard>
                        ))}
                    {isLoading &&
                        Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} height={150} />
                        ))} */}
                </S.CardContainer>
            </S.ContentWrapper>
        </S.PageWrapper>
    );
};
