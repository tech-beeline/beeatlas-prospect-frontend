import React, { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, Label, Skeleton } from '@beeline/design-system-react';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { CJLibraryStatus } from 'api/cj/types';
import { useDeleteCJMutation, useGetCJCollectionQuery } from 'api/queries/cj';
import { useModal } from 'hooks';
import * as ROUTER from 'router/const';
import * as STYLES from 'styles/units';

import {
    CJCreateForm,
    CJLibraryFilters,
    CjMenu,
    IFilterOptions,
    ProductVariant,
} from './components';
import * as S from './units';

export const CJLibraryPage = () => {
    const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
        search: '',
        product: ProductVariant.ALL,
        status: CJLibraryStatus.ALL,
    });

    const { modalOpened, closeModal, openModal } = useModal();

    const { data, isLoading } = useGetCJCollectionQuery({
        search: filterOptions.search,
        productId: filterOptions.product === ProductVariant.ALL ? undefined : filterOptions.product,
        sample: filterOptions.status,
    });
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

                    <CJLibraryFilters
                        filterOptions={filterOptions}
                        setFilterOptions={setFilterOptions}
                    />

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
                    {data && data.length === 0 && (
                        <S.NotFoundContainer>
                            <NotFoundBlock
                                imageVariant={ImageVariants.EMPTY_BOX}
                                title="Нет результатов, подходящих под параметры поиска"
                                text="Попробуйте изменить поисковой запрос"
                            />
                        </S.NotFoundContainer>
                    )}
                </S.ContentWrapper>
                <CJCreateForm isOpen={modalOpened} onClose={closeModal} />
            </S.PageWrapper>
        </>
    );
};
