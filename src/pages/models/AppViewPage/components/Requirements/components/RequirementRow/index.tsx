import React, { FC, useRef, useState } from 'react';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { Label, TableData } from 'components/ui';

import { useShowTooltip } from 'hooks';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { FitnessFunctionsRow, PatternsRow, SituationsRow } from './components';
import { IRequirementRow } from './types';
import * as S from './units';

export const RequirementRow: FC<IRequirementRow> = ({
    nfr,
    productPatterns,
    setRequirementToDelete,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const titleRef = useRef<HTMLParagraphElement>(null);
    const showTitleTooltip = useShowTooltip(titleRef);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const showDescriptionTooltip = useShowTooltip(descriptionRef);

    const isImplemented = nfr.patterns.some((pattern) =>
        productPatterns.some((p) => p.id === pattern.id),
    );

    return (
        <>
            <S.TableRowStyled isExpanded={isExpanded}>
                <TableData>
                    <S.RequirementCellContainer>
                        <IconButton
                            iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                            onClick={() => setIsExpanded(!isExpanded)}
                            size="medium"
                        />
                        <S.RequirementCellContent>
                            <S.OverflowContainer
                                clampNumber={1}
                                ellipsisColor="var(--color-text-link)"
                                ref={titleRef}
                                data-tooltip-id={`requirement-title-${nfr.id}`}
                            >
                                <Link
                                    title={nfr.name}
                                    url={`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}?nfrId=${nfr.id}`}
                                />
                            </S.OverflowContainer>
                            {showTitleTooltip && (
                                <TooltipContainer
                                    largePadding
                                    id={`requirement-title-${nfr.id}`}
                                    offset={8}
                                    place="bottom"
                                    noArrow
                                >
                                    {nfr.name}
                                </TooltipContainer>
                            )}
                            <Text inactive variant="body3">
                                {nfr.code}
                            </Text>
                        </S.RequirementCellContent>
                    </S.RequirementCellContainer>
                </TableData>
                <TableData>
                    <S.OverflowContainer
                        clampNumber={2}
                        ref={descriptionRef}
                        data-tooltip-id={`requirement-description-${nfr.id}`}
                    >
                        {nfr.description}
                    </S.OverflowContainer>
                    {showDescriptionTooltip && (
                        <TooltipContainer
                            largePadding
                            id={`requirement-description-${nfr.id}`}
                            offset={8}
                            place="bottom"
                            noArrow
                        >
                            {nfr.description}
                        </TooltipContainer>
                    )}
                </TableData>
                {/* <TableData>Информационная безопасность</TableData> */}
                <TableData alignRight>{formatNullableString(nfr.version)}</TableData>
                <TableData>
                    <Label
                        title={
                            nfr.patterns.length === 0
                                ? 'Ручная проверка'
                                : isImplemented
                                ? 'Реализовано'
                                : 'Не реализовано'
                        }
                        type={
                            nfr.patterns.length === 0
                                ? 'default'
                                : isImplemented
                                ? 'success'
                                : 'error'
                        }
                        variant="outline"
                    />
                </TableData>
                <TableData>
                    <Label
                        title={nfr.sourcePurpose === 'Beeatlas' ? 'Автоматическое' : 'Ручное'}
                        type={nfr.sourcePurpose === 'Beeatlas' ? 'teal' : 'default'}
                        variant="outline"
                    />
                </TableData>
                <TableData>{formatNullableString(nfr.sourcePurpose)}</TableData>
                <TableData>{dayjs(nfr.createdDate).local().format('DD.MM.YYYY, HH:mm')}</TableData>
                <TableData alignRight>
                    <S.ActionContainer>
                        {nfr.sourcePurpose !== 'Beeatlas' && (
                            <>
                                <IconButton
                                    data-tooltip-id={`requirement-unassign-${nfr.id}`}
                                    iconName={Icons.Cancel}
                                    size="medium"
                                    onClick={() => setRequirementToDelete(nfr)}
                                />
                                <TooltipContainer
                                    id={`requirement-unassign-${nfr.id}`}
                                    offset={8}
                                    // @ts-ignore Ошибка в .d.ts
                                    place="top-end"
                                    noArrow
                                >
                                    Снять назначенное требование с приложения
                                </TooltipContainer>
                            </>
                        )}
                    </S.ActionContainer>
                </TableData>
            </S.TableRowStyled>
            {isExpanded && (
                <>
                    <FitnessFunctionsRow fitnessFunctions={nfr.fitnessFunctions} />
                    <SituationsRow chapters={nfr.chapters} />
                    <PatternsRow patterns={nfr.patterns} productPatterns={productPatterns} />
                </>
            )}
        </>
    );
};
