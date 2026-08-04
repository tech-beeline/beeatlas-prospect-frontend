import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import {
    Button,
    Search,
    Skeleton,
    TableBody,
    TableData,
    TableHead,
    TablePagination,
    TableRow,
} from 'components/ui';

import { IFullProductData } from 'api/product/types';
import { useDeleteProductByIdMutation, useGetAllProductsQuery } from 'api/queries/product';
import * as R from 'router/const';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ProductTableRow } from './components';
import * as S from './units';

export const AdminAppsPage = () => {
    const [search, setSearch] = useState('');
    const [itemsCountOnPage, setItemsCountOnPage] = useState(25);
    const [countPage, setCountPage] = useState(1);

    useEffect(() => {
        setCountPage(1);
    }, [search]);

    const navigate = useNavigate();

    const { data, isLoading } = useGetAllProductsQuery();
    const { mutateAsync: deleteProduct, isPending: isDeletingProduct } =
        useDeleteProductByIdMutation();

    const [productToDelete, setProductToDelete] = useState<IFullProductData | null>(null);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const filteredData = (data ?? []).filter(
        (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.alias.toLowerCase().includes(search.toLowerCase()),
    );

    const startIndex = (countPage - 1) * itemsCountOnPage;
    const endIndex = countPage * itemsCountOnPage;
    const displayedProducts = filteredData.slice(startIndex, endIndex);

    const handleDeleteTechClick = async () => {
        if (productToDelete) {
            await deleteProduct(productToDelete.id);
            showSnackbar({ message: `Приложение ${productToDelete.name} удалено` });
            setProductToDelete(null);
        }
    };

    const handleAddClick = () => {
        navigate(`${R.ADMIN_PATH}${R.APPS_PATH}${R.ADD_PATH}`);
    };

    return (
        <S.PageWrapper>
            <S.TitleContainer>
                <Text variant="h4">Управление приложениями</Text>
                <Button variant="contained" size="medium" onClick={handleAddClick}>
                    Создать приложение
                </Button>
            </S.TitleContainer>

            <S.FiltersContainer>
                <S.SearchContainer>
                    <Search
                        fullWidth
                        placeholder="Название приложения"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClear={() => setSearch('')}
                    />
                </S.SearchContainer>
            </S.FiltersContainer>

            {isLoading && <Skeleton height={300} />}
            {displayedProducts && displayedProducts.length > 0 && (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderDataStyled>Приложение</S.TableHeaderDataStyled>
                            <S.TableHeaderDataStyled>Код</S.TableHeaderDataStyled>
                            <S.TableHeaderDataStyled>Критичность</S.TableHeaderDataStyled>
                            <S.TableHeaderDataStyled>Владелец</S.TableHeaderDataStyled>
                            <S.TableHeaderDataStyled>Краткое описание</S.TableHeaderDataStyled>
                            <S.TableHeaderDataButtons
                                showDeleteButton={window.FEATURE_FLAGS.FLAG_IS_PROD === false}
                            ></S.TableHeaderDataButtons>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {displayedProducts.map((product) => (
                            <ProductTableRow
                                key={product.id}
                                product={product}
                                setProductToDelete={setProductToDelete}
                            />
                        ))}

                        <TableRow dense>
                            <TableData colSpan={8} alignRight>
                                <TablePagination
                                    onUserActions={(e) => {
                                        setCountPage(e.page);
                                        setItemsCountOnPage(e.rowsPerPage);
                                    }}
                                    page={countPage}
                                    rowsCount={filteredData.length}
                                    rowsPerPage={itemsCountOnPage}
                                    rowsPerPageOptions={[25, 50, 100]}
                                    showFirstAndLastButtons
                                />
                            </TableData>
                        </TableRow>
                    </TableBody>
                </S.TableStyled>
            )}
            {!isLoading && displayedProducts && displayedProducts.length === 0 && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.SEARCH}
                        title="Нет результатов, подходящих под параметры поиска"
                        text="Попробуйте изменить запрос"
                    />
                </S.NotFoundContainer>
            )}
            <Dialog
                title="Удалить приложение?"
                opened={!!productToDelete}
                confirmText="Удалить"
                onConfirm={handleDeleteTechClick}
                onClose={() => setProductToDelete(null)}
                isPending={isDeletingProduct}
            >
                Приложение <S.BoldSpan>{productToDelete?.name}</S.BoldSpan> будет удалено
            </Dialog>
        </S.PageWrapper>
    );
};
