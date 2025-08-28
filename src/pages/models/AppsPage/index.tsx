import React, { useState } from 'react';
import {
    Button,
    Search,
    Skeleton,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { OldVersionBanner } from 'features/apps';

import { Text } from 'components/core';
import { Link } from 'components/other';

import { useGetAllProductsQuery } from 'api/queries/product';
import { useDebounce } from 'hooks';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

// import { ApplicationsTableRow } from './components';
// import { APPLICATIONS } from './const';
import * as S from './units';

export const AppsPage = () => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search);

    const { data: productsData, isLoading } = useGetAllProductsQuery();

    const filteredProducts = (productsData ?? []).filter(
        (product) =>
            product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            product.alias.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );

    return (
        <S.PageWrapper>
            <S.Container>
                <OldVersionBanner />
                <S.Header>
                    <Text variant="h4">Каталог приложений</Text>
                </S.Header>

                <S.SearchContainer>
                    <Search
                        fullWidth
                        placeholder="Название приложения или CMDB мнемоника"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        value={search}
                        onClear={() => setSearch('')}
                    />
                    <Button variant="plain" onClick={() => setSearch('')}>
                        Сбросить
                    </Button>
                </S.SearchContainer>

                {isLoading && <Skeleton height={200} radius={12} />}
                {filteredProducts.length !== 0 && (
                    <S.TableStyled>
                        <TableHead>
                            <TableRow>
                                <TableHeaderData>Приложение</TableHeaderData>
                                <TableHeaderData>CMDB&nbsp;Мнемоника</TableHeaderData>
                                <TableHeaderData>Structurizr&nbsp;OnPremises</TableHeaderData>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableData>
                                        <Link
                                            outer={false}
                                            title={product.name}
                                            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${product.alias}`}
                                        />
                                    </TableData>
                                    <TableData>{product.alias}</TableData>
                                    <TableData>
                                        {product.structurizrApiUrl ? (
                                            <Link url={product.structurizrApiUrl} />
                                        ) : (
                                            formatNullableString(null)
                                        )}
                                    </TableData>
                                </TableRow>
                            ))}
                        </TableBody>
                        {/* {APPLICATIONS.map((application, i) => (
                        <ApplicationsTableRow key={i} level={0} application={application} />
                    ))} */}
                    </S.TableStyled>
                )}
            </S.Container>
        </S.PageWrapper>
    );
};
