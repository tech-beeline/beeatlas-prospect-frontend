import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    IconButton,
    Label,
    Skeleton,
    TableBody,
    TableData,
    TableHead,
    TablePagination,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { useGetPackageWithPartsByIdQuery } from 'api/queries/imported-packages';
import * as R from 'router/const';

import { PackageTableRow } from './components';
import * as S from './units';

export const PackagePage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { data, isLoading } = useGetPackageWithPartsByIdQuery(paramId);

    const [itemsCountOnPage, setItemsCountOnPage] = useState(5);
    const [countPage, setCountPage] = useState(1);

    const navigate = useNavigate();

    const handleReturnButtonClick = () => {
        navigate(R.IMPORTED_DATA_PATH);
    };

    const startIndex = (countPage - 1) * itemsCountOnPage;
    const endIndex = countPage * itemsCountOnPage;
    const displayedParts = (data?.parts ?? []).slice(startIndex, endIndex);

    return (
        <S.PageWrapper>
            <S.TitleContainer>
                <IconButton
                    iconName={Icons.ArrowLeft}
                    size="large"
                    onClick={handleReturnButtonClick}
                />
                <S.Title>Части пакета</S.Title>
                {isLoading ? (
                    <Skeleton height={24} width={100} radius={12} />
                ) : (
                    <Label title="В обработке" variant="contained" />
                )}
            </S.TitleContainer>
            <S.Identificator>Идентификатор пакета {paramId}</S.Identificator>
            {isLoading && <Skeleton height={300} />}
            {displayedParts.length > 0 && (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderDataNoWrap>№ части пакета</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Идентификатор</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataMaxWidth>
                                <S.HeaderContent>
                                    <div>Статус</div>
                                    <IconButton iconName={Icons.ArrowUp} size="medium" />
                                </S.HeaderContent>
                            </S.TableHeaderDataMaxWidth>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {displayedParts.map((part, i) => (
                            <PackageTableRow key={i} index={i} packagePart={part} />
                        ))}

                        <TableRow>
                            <TableData colSpan={4} alignRight>
                                <TablePagination
                                    onUserActions={(e) => {
                                        setCountPage(e.page);
                                        setItemsCountOnPage(e.rowsPerPage);
                                    }}
                                    page={countPage}
                                    rowsCount={displayedParts.length}
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
