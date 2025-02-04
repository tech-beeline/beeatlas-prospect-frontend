import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Skeleton } from '@beeline/design-system-react';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { useGetBICollectionQuery } from 'api/queries/bi';
import * as ROUTER from 'router/const';
import * as STYLES from 'styles/units';

import {
    BiCard,
    BILibraryFilters,
    DraftVariants,
    IFilterOptions,
    ProductVariant,
    StatusVariant,
} from './components';
import { COLUMNS_LENGTH } from './const';
import * as S from './units';
import { groupDataByColumns } from './utils';

export const BILibraryPage = () => {
    const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
        search: '',
        product: ProductVariant.ALL,
        status: StatusVariant.ALL,
        draft: DraftVariants.ALL,
    });

    const { data: bis, isLoading } = useGetBICollectionQuery({
        search: filterOptions.search,
        productId:
            filterOptions.product === ProductVariant.ALL || filterOptions.product === null
                ? undefined
                : filterOptions.product,
        status: filterOptions.status === StatusVariant.ALL ? undefined : filterOptions.status,
        draft:
            filterOptions.draft === DraftVariants.ALL
                ? undefined
                : filterOptions.draft === DraftVariants.DRAFT
                ? true
                : false,
    });

    const dataByColumns = groupDataByColumns(bis ?? [], COLUMNS_LENGTH);

    const navigate = useNavigate();

    const handleCreateBiClick = () => {
        navigate(`${ROUTER.CX_PATH}${ROUTER.BI_PATH}${ROUTER.ADD_PATH}`);
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

                <BILibraryFilters
                    filterOptions={filterOptions}
                    setFilterOptions={setFilterOptions}
                />

                <S.CardContainer columns={COLUMNS_LENGTH}>
                    {bis &&
                        bis.length > 0 &&
                        Array.from({ length: COLUMNS_LENGTH }).map((_, i) => (
                            <S.CardColumn key={i}>
                                {dataByColumns[i].map((bi) => (
                                    <BiCard key={bi.id} bi={bi} />
                                ))}
                            </S.CardColumn>
                        ))}
                    {isLoading &&
                        Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} height={150} />
                        ))}
                </S.CardContainer>
                {bis && bis.length === 0 && (
                    <S.NotFoundContainer>
                        <NotFoundBlock
                            imageVariant={ImageVariants.EMPTY_BOX}
                            title="Нет результатов, подходящих под параметры поиска"
                            text="Попробуйте изменить поисковой запрос"
                        />
                    </S.NotFoundContainer>
                )}
            </S.ContentWrapper>
        </S.PageWrapper>
    );
};
