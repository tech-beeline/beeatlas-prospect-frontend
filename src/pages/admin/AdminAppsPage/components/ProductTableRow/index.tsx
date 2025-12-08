import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { TooltipContainer } from 'components/interaction';

import { useShowTooltip } from 'hooks';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { IProductTableRow } from './types';
import * as S from './units';

export const ProductTableRow: FC<IProductTableRow> = ({ product, setProductToDelete }) => {
    const navigate = useNavigate();

    const [expanded, setExpanded] = useState(false);

    const descriptionRef = useRef<HTMLParagraphElement>(null);

    const showDescriptionTooltip = useShowTooltip(descriptionRef);

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
                            <div>{product.name}</div>
                        </S.IconContainer>
                    </S.NameContainer>
                </TableData>
                <TableData>{product.alias}</TableData>
                <TableData>{formatNullableString(product.critical)}</TableData>
                <TableData>{formatNullableString(product.ownerName)}</TableData>
                <TableData>
                    <S.DescriptionContainer
                        ref={descriptionRef}
                        data-tooltip-id={`description-${product.id}`}
                    >
                        {formatNullableString(product.description)}
                    </S.DescriptionContainer>
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
                            id={`edit-${product.id}`}
                        >
                            Редактировать
                        </TooltipContainer>
                        <TooltipContainer
                            noArrow
                            // @ts-ignore Ошибка в .d.ts
                            place="top-end"
                            offset={8}
                            id={`delete-${product.id}`}
                        >
                            Удалить
                        </TooltipContainer>
                    </S.ButtonsContainer>
                </TableData>
            </S.TableRowStyled>
            {expanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={7}>
                        <S.VersionsContainer>
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
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableData>
                                                Крестовоздвиженский Александр Александрович
                                            </TableData>
                                            <TableData>example_mail@beeline.ru</TableData>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </S.VersionsContainer>
                    </S.TableDataStyled>
                </TableRow>
            )}
        </>
    );
};
