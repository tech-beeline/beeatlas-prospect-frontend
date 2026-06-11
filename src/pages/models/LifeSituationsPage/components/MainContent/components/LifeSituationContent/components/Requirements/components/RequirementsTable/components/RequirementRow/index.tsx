import React, { FC, useRef } from 'react';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';
import { TableData, TableRow } from 'components/ui';

import { useShowTooltip } from 'hooks';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { IRequirementRow } from './types';
import * as S from './units';

export const RequirementRow: FC<IRequirementRow> = ({ nfr, activeItem }) => {
    const titleRef = useRef<HTMLParagraphElement>(null);
    const showTitleTooltip = useShowTooltip(titleRef);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const showDescriptionTooltip = useShowTooltip(descriptionRef);

    return (
        <TableRow dense>
            <TableData>
                <S.RequirementTitleContainer>
                    <S.OverflowContainer
                        clampNumber={1}
                        ellipsisColor="var(--color-text-link)"
                        ref={titleRef}
                        data-tooltip-id="requirement-title"
                    >
                        <Link
                            outer={false}
                            title={nfr.name}
                            url={`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}?chapterId=${activeItem.id}&nfrId=${nfr.id}`}
                        />
                    </S.OverflowContainer>
                    {showTitleTooltip && (
                        <TooltipContainer
                            largePadding
                            id="requirement-title"
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
                </S.RequirementTitleContainer>
            </TableData>
            <TableData>
                <S.OverflowContainer
                    clampNumber={2}
                    ref={descriptionRef}
                    data-tooltip-id="requirement-description"
                >
                    {nfr.description}
                </S.OverflowContainer>
                {showDescriptionTooltip && (
                    <TooltipContainer
                        largePadding
                        id="requirement-description"
                        offset={8}
                        place="bottom"
                        noArrow
                    >
                        {nfr.description}
                    </TooltipContainer>
                )}
            </TableData>
            <TableData>{formatNullableString(nfr.source)}</TableData>
            <TableData alignRight>{formatNullableString(nfr.version)}</TableData>
        </TableRow>
    );
};
