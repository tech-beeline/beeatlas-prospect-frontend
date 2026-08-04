import React, { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Text } from 'components/core';
import { Icon, Pagination } from 'components/ui';

import { ISearchSystem } from 'api/graph/types';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { getHighlightedText } from 'utils/formatters';

import { RESULTS_PER_PAGE } from '../../const';

import { IProductSearchResults } from './types';
import * as S from './units';

export const ProductSearchResults: FC<IProductSearchResults> = ({
    products,
    search,
    setBreadcrumbs,
    visitedPages,
}) => {
    const [, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * RESULTS_PER_PAGE;
    const endIndex = page * RESULTS_PER_PAGE;

    const dataProductsSliced = products.slice(startIndex, endIndex);
    const productPagesCount = Math.ceil((products.length ?? 0) / RESULTS_PER_PAGE);

    const handleSystemClick = (product: ISearchSystem) => {
        setSearchParams({ name: product.name, cmdb: product.cmdb });
        setBreadcrumbs([
            {
                name: product.name,
                link: `${R.MODELS_PATH}${R.IMPACT_PATH}?name=${product.name}&cmdb=${product.cmdb}`,
            },
        ]);
    };

    return (
        <>
            <div>
                {dataProductsSliced.map((system) => (
                    <S.SearchCard
                        maxWidth
                        key={system.cmdb}
                        onClick={() => handleSystemClick(system)}
                    >
                        <Icon iconName={Icons.Search} size="large" />
                        <S.SearchCardTextContainer>
                            <Text inactive variant="overline">
                                КОНТЕКСТНАЯ ДИАГРАММА
                            </Text>
                            <Text link visited={visitedPages.includes(system.name)} variant="body2">
                                {getHighlightedText(system.name, search)}
                            </Text>
                            <Text inactive variant="body3">
                                {system.cmdb}
                            </Text>
                        </S.SearchCardTextContainer>
                    </S.SearchCard>
                ))}
            </div>
            {productPagesCount > 1 && (
                <S.PaginationContainer>
                    <Pagination
                        collapsed
                        count={productPagesCount}
                        page={page}
                        onChange={setPage}
                    />
                </S.PaginationContainer>
            )}
        </>
    );
};
