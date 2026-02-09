import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import { IconButton, TableRow } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { useThemeStore } from 'features/theme';

import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';

import * as R from 'router/const';

import { FitnessFunctionLabel, FitnessFunctionProgressBar } from './components';
import { VIRTUOSO_SCROLLER_ID } from './const';
import { AnalyticalTableHandle, IAnalyticalTable, IRowItem, RowItems } from './types';
import * as S from './units';
import { exportAnalyticalTableToExcel } from './utils';
import { VirtuosoScroller, VirtuosoTableBody } from './virtuoso';

export type { AnalyticalTableHandle } from './types';

export const AnalyticalTable = forwardRef<AnalyticalTableHandle, IAnalyticalTable>(
    ({ fitnessFunctionsData, autoExpandedDomainIds }, ref) => {
        const [expandedByDomainId, setExpandedByDomainId] = useState<Record<number, boolean>>({});
        const [contentHeight, setContentHeight] = useState<number>(0);
        const [isScrolledHorizontally, setIsScrolledHorizontally] = useState(false);

        const themeIsDark = useThemeStore((store) => store.themeIsDark);

        const rows = useMemo<IRowItem[]>(() => {
            const result: IRowItem[] = [];

            fitnessFunctionsData.domain.forEach((domain, domainIndex) => {
                result.push({ type: RowItems.DOMAIN, domainId: domain.id, domainIndex });

                if (expandedByDomainId[domain.id]) {
                    domain.product.forEach((_, productIndex) => {
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
        }, [expandedByDomainId, fitnessFunctionsData.domain]);

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

        return (
            <TableVirtuoso
                data={rows}
                totalCount={rows.length}
                increaseViewportBy={800}
                style={{ height: virtuosoHeight }}
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
                                            data-tooltip-id={`ff-${fitnessFunction.id}`}
                                        >
                                            {fitnessFunction.code}
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
