import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { packageStatusToLabelTypeMap, packageStatusToStatusNameMap } from 'features/imported-data';

import { IconButton } from 'components/ui';
import {
    Label,
    Skeleton,
    TableBody,
    TableData,
    TableHead,
    TablePagination,
    TableRow,
} from 'components/ui';

import { PackageStatus } from 'api/imported-packages/types';
import { useGetPackageWithContentByIdQuery } from 'api/queries/imported-packages';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { PackageTableRow } from './components';
// import { StatusSortVariant } from './types';
import * as S from './units';

export const PackagePage = () => {
    // const [sortVariant, setSortVariant] = useState(StatusSortVariant.ASC);
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const [itemsCountOnPage, setItemsCountOnPage] = useState(25);
    const [countPage, setCountPage] = useState(1);

    const { data, isLoading } = useGetPackageWithContentByIdQuery({
        id: paramId,
        page: countPage - 1,
        perPage: itemsCountOnPage,
    });

    const navigate = useNavigate();

    const handleReturnButtonClick = () => {
        navigate(`${R.ADMIN_PATH}${R.IMPORTED_DATA_PATH}`);
    };

    return (
        <S.PageWrapper>
            <S.TitleContainer>
                <IconButton
                    iconName={Icons.ArrowLeft}
                    size="large"
                    onClick={handleReturnButtonClick}
                />
                <S.Title>Части пакета</S.Title>

                {data && (
                    <Label
                        title={
                            packageStatusToStatusNameMap[data.packageDTO.status as PackageStatus] ??
                            data.packageDTO.status
                        }
                        variant="contained"
                        type={
                            packageStatusToLabelTypeMap[data.packageDTO.status as PackageStatus] ??
                            'default'
                        }
                    />
                )}
            </S.TitleContainer>
            <S.Identificator>Идентификатор пакета {paramId}</S.Identificator>
            {isLoading && <Skeleton height={300} />}
            {data && data.packagePartDTOS.content.length > 0 && (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderDataNoWrap>№ части пакета</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Идентификатор</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataMaxWidth>
                                Статус
                                {/* <S.HeaderContent>
                                    <div>Статус</div>
                                    <IconButton
                                        onClick={() =>
                                            setSortVariant(
                                                sortVariant === StatusSortVariant.ASC
                                                    ? StatusSortVariant.DESC
                                                    : StatusSortVariant.ASC,
                                            )
                                        }
                                        iconName={
                                            sortVariant === StatusSortVariant.ASC
                                                ? Icons.ArrowUp
                                                : Icons.ArrowDown
                                        }
                                        size="medium"
                                    />
                                </S.HeaderContent> */}
                            </S.TableHeaderDataMaxWidth>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.packagePartDTOS.content.map((part) => (
                            <PackageTableRow key={part.partNum} packagePart={part} />
                        ))}

                        <TableRow>
                            <TableData colSpan={4} alignRight>
                                <TablePagination
                                    onUserActions={(e) => {
                                        setCountPage(e.page);
                                        setItemsCountOnPage(e.rowsPerPage);
                                    }}
                                    page={countPage}
                                    rowsCount={data.packagePartDTOS.totalElements}
                                    rowsPerPage={itemsCountOnPage}
                                    rowsPerPageOptions={[25, 50, 75, 100]}
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
