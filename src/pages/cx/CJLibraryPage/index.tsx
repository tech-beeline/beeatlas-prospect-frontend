import React, { useState } from 'react';
import { Button, Skeleton } from '@beeline/design-system-react';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { CJLibraryStatus } from 'api/cj/types';
import { useGetCJCollectionQuery } from 'api/queries/cj';
import { useModal } from 'hooks';
import * as STYLES from 'styles/units';

import {
    CJCard,
    CJCreateForm,
    CJLibraryFilters,
    IFilterOptions,
    ProductVariant,
} from './components';
import { COLUMNS_LENGTH } from './const';
import * as S from './units';
import { groupDataByColumns } from './utils';

export const CJLibraryPage = () => {
    const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
        search: '',
        product: ProductVariant.ALL,
        status: CJLibraryStatus.ALL,
    });

    const { modalOpened, closeModal, openModal } = useModal();

    const { data, isLoading } = useGetCJCollectionQuery({
        search: filterOptions.search,
        productId:
            filterOptions.product === ProductVariant.ALL || filterOptions.product === null
                ? undefined
                : filterOptions.product,
        sample: filterOptions.status,
    });
    const dataByColumns = groupDataByColumns(data ?? [], COLUMNS_LENGTH);

    return (
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

                <S.CardContainer columns={COLUMNS_LENGTH}>
                    {data &&
                        data.length > 0 &&
                        Array.from({ length: COLUMNS_LENGTH }).map((_, i) => (
                            <S.CardColumn key={i}>
                                {dataByColumns[i].map((cj) => (
                                    <CJCard key={cj.id} cj={cj} />
                                ))}
                            </S.CardColumn>
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
    );
};
