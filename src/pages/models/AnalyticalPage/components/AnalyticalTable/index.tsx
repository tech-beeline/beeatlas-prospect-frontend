import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import { useThemeStore } from 'features/theme';

import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { TableRow } from 'components/ui';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { FitnessFunctionLabel, FitnessFunctionProgressBar } from './components';
import { VIRTUOSO_SCROLLER_ID } from './const';
import {
    AnalyticalTableHandle,
    IAnalyticalTable,
    IRowItem,
    ISortOption,
    RowItems,
    SortDirection,
} from './types';
import * as S from './units';
import { exportAnalyticalTableToExcel } from './utils';
import { VirtuosoScroller, VirtuosoTableBody } from './virtuoso';

export type { AnalyticalTableHandle } from './types';

export const AnalyticalTable = forwardRef<AnalyticalTableHandle, IAnalyticalTable>(
    ({ fitnessFunctionsData, autoExpandedDomainIds }, ref) => {
        const [expandedByDomainId, setExpandedByDomainId] = useState<Record<number, boolean>>({});
        const [contentHeight, setContentHeight] = useState<number>(0);
        const [isScrolledHorizontally, setIsScrolledHorizontally] = useState(false);
        const [sortOption, setSortOption] = useState<ISortOption | null>(null);

        const handleSortClick = (code: string) => {
            if (!sortOption || sortOption.code !== code) {
                setSortOption({ code, direction: SortDirection.DESC });
            } else if (sortOption.direction === SortDirection.DESC) {
                setSortOption({ code, direction: SortDirection.ASC });
            } else {
                setSortOption(null);
            }
        };

        const themeIsDark = useThemeStore((store) => store.themeIsDark);

        const rows = useMemo<IRowItem[]>(() => {
            const result: IRowItem[] = [];
            const { domain: domains, fitnessFunctionEnum } = fitnessFunctionsData;

            const selectedFf = sortOption
                ? fitnessFunctionEnum.find((f) => f.code === sortOption.code)
                : undefined;

            let domainIndices = domains.map((_, i) => i);
            const productOrders: number[][] = domains.map((d) => d.product.map((_, i) => i));

            if (sortOption && selectedFf) {
                const mult = sortOption.direction === SortDirection.DESC ? -1 : 1;

                const getDomainCheckPercent = (domainIndex: number) => {
                    const products = domains[domainIndex].product;
                    if (products.length === 0) return 0;
                    const checkedCount = products.filter((p) => {
                        const pff = p.fitnessFunctions.find((ff) => ff.id === selectedFf.id);
                        return pff && pff.isCheck;
                    }).length;
                    return (checkedCount / products.length) * 100;
                };

                domainIndices = [...domainIndices].sort((a, b) => {
                    const pa = getDomainCheckPercent(a);
                    const pb = getDomainCheckPercent(b);
                    if (pa !== pb) return mult * (pa > pb ? 1 : -1);
                    return a - b;
                });

                for (let di = 0; di < domains.length; di += 1) {
                    const products = domains[di].product;
                    const idx = products.map((_, i) => i);
                    productOrders[di] = idx.sort((a, b) => {
                        const ca =
                            products[a].fitnessFunctions.find((ff) => ff.id === selectedFf.id)
                                ?.countSuccess ?? 0;
                        const cb =
                            products[b].fitnessFunctions.find((ff) => ff.id === selectedFf.id)
                                ?.countSuccess ?? 0;
                        if (ca !== cb) return mult * (ca > cb ? 1 : -1);
                        return a - b;
                    });
                }
            }

            domainIndices.forEach((domainIndex) => {
                const domain = domains[domainIndex];
                result.push({ type: RowItems.DOMAIN, domainId: domain.id, domainIndex });

                if (expandedByDomainId[domain.id]) {
                    productOrders[domainIndex].forEach((productIndex) => {
                        result.push({
                            type: RowItems.PRODUCT,
                            domainId: domain.id,
                            domainIndex,
                            productIndex,
                        });
                    });
                }
            });

            return result;
        }, [expandedByDomainId, fitnessFunctionsData, sortOption]);

        useImperativeHandle(
            ref,
            () => ({
                exportToExcel: () => {
                    exportAnalyticalTableToExcel({ fitnessFunctionsData, rows });
                },
            }),
            [fitnessFunctionsData, rows],
        );

        useEffect(() => {
            if (!autoExpandedDomainIds?.length) return;

            setExpandedByDomainId((prev) => {
                const next = { ...prev };
                autoExpandedDomainIds.forEach((domainId) => {
                    next[domainId] = true;
                });
                return next;
            });
        }, [autoExpandedDomainIds]);

        useEffect(() => {
            const scroller = document.getElementById(VIRTUOSO_SCROLLER_ID);
            if (!scroller) return;

            const updateScrollState = () => {
                setIsScrolledHorizontally(scroller.scrollLeft > 0);
            };

            scroller.addEventListener('scroll', updateScrollState);

            return () => scroller.removeEventListener('scroll', updateScrollState);
        }, []);

        // 10px на горизонтальный скролл
        const virtuosoHeight = contentHeight + 10;
        const tableWidth = 252 + fitnessFunctionsData.fitnessFunctionEnum.length * 140;

        return (
            <TableVirtuoso
                data={rows}
                totalCount={rows.length}
                increaseViewportBy={800}
                style={{
                    height: virtuosoHeight,
                    width: tableWidth,
                }}
                totalListHeightChanged={setContentHeight}
                computeItemKey={(_, item: IRowItem) =>
                    item.type === RowItems.DOMAIN
                        ? `${RowItems.DOMAIN}-${item.domainId}`
                        : `${RowItems.PRODUCT}-${item.domainId}-${item.productIndex}`
                }
                components={{
                    Scroller: VirtuosoScroller,
                    Table: S.TableStyled,
                    TableBody: VirtuosoTableBody,
                    TableRow: S.TableRowStyled,
                }}
                fixedHeaderContent={() => (
                    <>
                        <TableRow>
                            <S.TableHeaderDataStyled showShadow={isScrolledHorizontally} />
                            {fitnessFunctionsData.fitnessFunctionEnum.map((fitnessFunction) => (
                                <>
                                    <S.TableHeaderDataSticky key={fitnessFunction.id}>
                                        <S.CodeContainer
                                            onClick={() => handleSortClick(fitnessFunction.code)}
                                            showButton={
                                                !!sortOption &&
                                                sortOption.code === fitnessFunction.code
                                            }
                                        >
                                            <span data-tooltip-id={`ff-${fitnessFunction.id}`}>
                                                {fitnessFunction.code}
                                            </span>
                                            <IconButton
                                                size="medium"
                                                iconName={
                                                    !sortOption ||
                                                    sortOption.direction === SortDirection.DESC
                                                        ? Icons.ArrowDown
                                                        : Icons.ArrowUp
                                                }
                                            />
                                        </S.CodeContainer>
                                    </S.TableHeaderDataSticky>
                                </>
                            ))}
                        </TableRow>
                        {fitnessFunctionsData.fitnessFunctionEnum.map((fitnessFunction) => (
                            <TooltipContainer
                                noArrow
                                largePadding
                                offset={8}
                                key={fitnessFunction.id}
                                id={`ff-${fitnessFunction.id}`}
                                place="bottom"
                            >
                                {fitnessFunction.description}
                            </TooltipContainer>
                        ))}
                    </>
                )}
                itemContent={(_, item: IRowItem) => {
                    const domain = fitnessFunctionsData.domain[item.domainIndex];

                    if (item.type === RowItems.DOMAIN) {
                        const isExpanded = Boolean(expandedByDomainId[domain.id]);

                        return (
                            <>
                                <S.TableDataName
                                    showShadow={isScrolledHorizontally}
                                    isExpanded={isExpanded}
                                    themeIsDark={themeIsDark}
                                >
                                    <S.NameContainer>
                                        <IconButton
                                            size="medium"
                                            iconName={
                                                isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown
                                            }
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setExpandedByDomainId((prev) => ({
                                                    ...prev,
                                                    [domain.id]: !prev[domain.id],
                                                }));
                                            }}
                                        />
                                        {domain.name}
                                    </S.NameContainer>
                                </S.TableDataName>
                                {fitnessFunctionsData.fitnessFunctionEnum.map((ff) => (
                                    <S.TableDataFullWidth dense key={ff.id} isExpanded={isExpanded}>
                                        <S.TableDataContent>
                                            <FitnessFunctionProgressBar
                                                fitnessFunction={ff}
                                                products={domain.product}
                                                isExpanded={isExpanded}
                                            />
                                        </S.TableDataContent>
                                    </S.TableDataFullWidth>
                                ))}
                            </>
                        );
                    }

                    const product = domain.product[item.productIndex];

                    return (
                        <>
                            <S.TableDataNameStyled showShadow={isScrolledHorizontally}>
                                <S.ProductNameContainer>
                                    <Link
                                        title={product.name}
                                        url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?tab=${
                                            product.fitnessFunctions.length > 0
                                                ? 'FITNESS_FUNCTIONS'
                                                : 'GENERAL_INFO'
                                        }&cmdb=${product.alias}`}
                                    />
                                </S.ProductNameContainer>
                            </S.TableDataNameStyled>
                            {fitnessFunctionsData.fitnessFunctionEnum.map((ff) => (
                                <S.TableDataFullWidth key={ff.id} dense>
                                    <S.TableDataContent>
                                        <FitnessFunctionLabel
                                            fitnessFunction={product.fitnessFunctions.find(
                                                (productFF) => productFF.id === ff.id,
                                            )}
                                        />
                                    </S.TableDataContent>
                                </S.TableDataFullWidth>
                            ))}
                        </>
                    );
                }}
            />
        );
    },
);
