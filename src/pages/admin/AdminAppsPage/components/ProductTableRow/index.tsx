import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criticalCodeToNameMap } from 'features/apps';

import { TooltipContainer } from 'components/interaction';
import { TableHeaderData } from 'components/ui';
import { Skeleton, Table, TableBody, TableData, TableHead, TableRow } from 'components/ui';

import { useGetProductEmployeesByCmdbQuery } from 'api/queries/product';
import { useShowTooltip } from 'hooks';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { IProductTableRow } from './types';
import * as S from './units';

export const ProductTableRow: FC<IProductTableRow> = ({ product, setProductToDelete }) => {
    const navigate = useNavigate();

    const [expanded, setExpanded] = useState(false);

    const nameRef = useRef<HTMLParagraphElement>(null);
    const showNameTooltip = useShowTooltip(nameRef);

    const ownerRef = useRef<HTMLParagraphElement>(null);
    const showOwnerTooltip = useShowTooltip(ownerRef);

    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const showDescriptionTooltip = useShowTooltip(descriptionRef);

    const { data, isLoading } = useGetProductEmployeesByCmdbQuery({
        cmdb: product.alias,
        enabled: expanded,
    });

    return (
        <>
            <S.TableRowStyled expanded={expanded} key={product.id}>
                <TableData>
                    <S.NameContainer>
                        <S.IconContainer>
                            <S.IconButtonStyled
                                expanded={expanded}
                                size="medium"
                                iconName={Icons.NavArrowDown}
                                onClick={() => setExpanded(!expanded)}
                            />
                            <S.OverflowContainer
                                ref={nameRef}
                                data-tooltip-id={`name-${product.id}`}
                            >
                                {product.name}
                            </S.OverflowContainer>
                            {showNameTooltip && (
                                <TooltipContainer
                                    largePadding
                                    id={`name-${product.id}`}
                                    offset={8}
                                    place="bottom"
                                    noArrow
                                >
                                    {product.name}
                                </TooltipContainer>
                            )}
                        </S.IconContainer>
                    </S.NameContainer>
                </TableData>
                <TableData>{product.alias}</TableData>
                <TableData>
                    {criticalCodeToNameMap[product.critical ?? ''] ??
                        formatNullableString(product.critical)}
                </TableData>
                <TableData>
                    <S.OverflowContainer ref={ownerRef} data-tooltip-id={`owner-${product.id}`}>
                        {formatNullableString(product.ownerName)}
                    </S.OverflowContainer>
                    {showOwnerTooltip && (
                        <TooltipContainer
                            largePadding
                            id={`owner-${product.id}`}
                            offset={8}
                            place="bottom"
                            noArrow
                        >
                            {product.ownerName}
                        </TooltipContainer>
                    )}
                </TableData>
                <TableData>
                    <S.OverflowContainer
                        ref={descriptionRef}
                        data-tooltip-id={`description-${product.id}`}
                    >
                        {formatNullableString(product.description)}
                    </S.OverflowContainer>
                    {showDescriptionTooltip && (
                        <TooltipContainer
                            largePadding
                            id={`description-${product.id}`}
                            offset={8}
                            place="bottom"
                            noArrow
                        >
                            {product.description}
                        </TooltipContainer>
                    )}
                </TableData>
                <TableData>
                    <S.ButtonsContainer>
                        <S.IconStyled
                            iconName={Icons.Edit}
                            size="medium"
                            onClick={() =>
                                navigate(
                                    `${R.ADMIN_PATH}${R.APPS_PATH}${R.ADD_PATH}?cmdb=${product.alias}`,
                                )
                            }
                            data-tooltip-id={`edit-${product.id}`}
                        />
                        <TooltipContainer
                            noArrow
                            // @ts-ignore Ошибка в .d.ts
                            place="top-end"
                            offset={8}
                            id={`edit-${product.id}`}
                        >
                            Редактировать
                        </TooltipContainer>
                        {window.FEATURE_FLAGS.FLAG_IS_PROD === false && (
                            <>
                                <S.IconStyled
                                    iconName={Icons.Delete}
                                    size="medium"
                                    onClick={() => setProductToDelete(product)}
                                    data-tooltip-id={`delete-${product.id}`}
                                />
                                <TooltipContainer
                                    noArrow
                                    // @ts-ignore Ошибка в .d.ts
                                    place="top-end"
                                    offset={8}
                                    id={`delete-${product.id}`}
                                >
                                    Удалить
                                </TooltipContainer>
                            </>
                        )}
                    </S.ButtonsContainer>
                </TableData>
            </S.TableRowStyled>
            {expanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={7}>
                        <S.VersionsContainer>
                            {isLoading && <Skeleton height={32} />}
                            {data && data.length !== 0 && (
                                <Table
                                    style={{
                                        border: 0,
                                        boxShadow: 'none',
                                    }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableHeaderData>Сотрудник</TableHeaderData>
                                            <TableHeaderData>Почта</TableHeaderData>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((employee, i) => (
                                            <TableRow key={i}>
                                                <TableData>{employee.fullName}</TableData>
                                                <TableData>{employee.email}</TableData>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                            {data && data.length === 0 && (
                                <S.NoEmployees>Нет сотрудников</S.NoEmployees>
                            )}
                        </S.VersionsContainer>
                    </S.TableDataStyled>
                </TableRow>
            )}
        </>
    );
};
