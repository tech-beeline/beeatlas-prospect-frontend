import React, { useState } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other';
import {
    Skeleton,
    TableBody,
    TableData,
    TableHead,
    TablePagination,
    TableRow,
} from 'components/ui';

import { useGetAllPackagesQuery } from 'api/queries/imported-packages';

import { IFilterOptions, ImportedDataFilters, ImportedDataRow, StatusVariants } from './components';
import * as S from './units';

export const ImportedDataPage = () => {
    const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
        status: StatusVariants.ALL,
        dates: [],
    });

    const [itemsCountOnPage, setItemsCountOnPage] = useState(25);
    const [countPage, setCountPage] = useState(1);

    const { data, isLoading } = useGetAllPackagesQuery({
        page: countPage - 1,
        perPage: itemsCountOnPage,
        status: filterOptions.status === StatusVariants.ALL ? undefined : filterOptions.status,
    });

    return (
        <S.PageWrapper>
            <S.Title>Процесс импорта</S.Title>

            <ImportedDataFilters
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
            />

            {isLoading && <Skeleton height={300} />}
            {data && data.content.length > 0 && (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderDataNoWrap>Идентификатор</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataMaxWidth>Операция</S.TableHeaderDataMaxWidth>
                            <S.TableHeaderDataNoWrap>Дата загрузки</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap alignRight>
                                Обработанные/Все
                            </S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap alignRight>С ошибкой</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap alignRight>
                                В обработке
                            </S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Статус</S.TableHeaderDataNoWrap>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.content.map((packageData) => (
                            <ImportedDataRow
                                key={packageData.packageId}
                                packageData={packageData}
                            />
                        ))}

                        <TableRow>
                            <TableData colSpan={8} alignRight>
                                <TablePagination
                                    onUserActions={(e) => {
                                        setCountPage(e.page);
                                        setItemsCountOnPage(e.rowsPerPage);
                                    }}
                                    page={countPage}
                                    rowsCount={data?.totalElements}
                                    rowsPerPage={itemsCountOnPage}
                                    rowsPerPageOptions={[25, 50, 75, 100]}
                                    showFirstAndLastButtons
                                />
                            </TableData>
                        </TableRow>
                    </TableBody>
                </S.TableStyled>
            )}
            {data && data.content.length === 0 && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        title="Нет результатов, подходящих под параметры поиска"
                        text="Попробуйте изменить поисковой запрос"
                    />
                </S.NotFoundContainer>
            )}
        </S.PageWrapper>
    );
};
