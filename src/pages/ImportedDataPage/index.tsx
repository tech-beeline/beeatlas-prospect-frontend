import React, { useState } from 'react';
import {
    Label,
    Skeleton,
    TableBody,
    TableData,
    TableHead,
    TablePagination,
    TableRow,
} from '@beeline/design-system-react';

import { Link } from 'components/other';

import { useGetPackagesQuery } from 'api/queries/imported-packages';
import * as R from 'router/const';

import { IFilterOptions, ImportedDataFilters, StatusVariants } from './components';
import * as S from './units';

export const ImportedDataPage = () => {
    const { data, isLoading } = useGetPackagesQuery();

    const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
        status: StatusVariants.ALL,
        dates: [],
    });

    const [itemsCountOnPage, setItemsCountOnPage] = useState(5);
    const [countPage, setCountPage] = useState(1);

    const startIndex = (countPage - 1) * itemsCountOnPage;
    const endIndex = countPage * itemsCountOnPage;
    const displayedPackages = (data ?? []).slice(startIndex, endIndex);

    return (
        <S.PageWrapper>
            <S.Title>Импортируемые данные</S.Title>

            <ImportedDataFilters
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
            />

            {isLoading && <Skeleton height={300} />}
            {displayedPackages.length > 0 && (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderDataNoWrap>Идентификатор</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataMaxWidth>Операция</S.TableHeaderDataMaxWidth>
                            <S.TableHeaderDataNoWrap>Дата загрузки</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap alignRight>
                                Все части пакета
                            </S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap alignRight>
                                Обработанные
                            </S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap alignRight>С ошибкой</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap alignRight>
                                В обработке
                            </S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Статус</S.TableHeaderDataNoWrap>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {displayedPackages.map((packageData) => (
                            <TableRow key={packageData.packageId}>
                                <TableData>
                                    <Link
                                        outer={false}
                                        title="5.18.191.164"
                                        url={`${R.IMPORTED_DATA_PATH}${R.PACKAGE_PATH}?id=${packageData.packageId}`}
                                    />
                                </TableData>
                                <TableData>{packageData.operation}</TableData>
                                <TableData>12.06.2023</TableData>
                                <TableData alignRight>{packageData.allParts}</TableData>
                                <TableData alignRight>{packageData.sucsessParts}</TableData>
                                <TableData alignRight>{packageData.processParts}</TableData>
                                <TableData alignRight>{packageData.errorParts}</TableData>
                                <TableData>
                                    <Label title="Успешно" variant="contained" type="success" />
                                </TableData>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableData colSpan={8} alignRight>
                                <TablePagination
                                    onUserActions={(e) => {
                                        setCountPage(e.page);
                                        setItemsCountOnPage(e.rowsPerPage);
                                    }}
                                    page={countPage}
                                    rowsCount={displayedPackages.length}
                                    rowsPerPage={itemsCountOnPage}
                                    rowsPerPageOptions={[5, 10, 30, 50]}
                                    showFirstAndLastButtons
                                />
                            </TableData>
                        </TableRow>
                    </TableBody>
                </S.TableStyled>
            )}
        </S.PageWrapper>
    );
};
