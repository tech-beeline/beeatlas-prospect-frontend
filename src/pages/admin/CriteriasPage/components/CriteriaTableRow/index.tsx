import React, { FC, useRef } from 'react';

import { TooltipContainer } from 'components/interaction';
import { TableData, TableRow } from 'components/ui';

import { useShowTooltip } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { ICriteriaTableRow } from './types';
import * as S from './units';

export const CriteriaTableRow: FC<ICriteriaTableRow> = ({
    criteria,
    onCriteriaEdit,
    // setCriteriaToDelete,
}) => {
    const nameRef = useRef<HTMLParagraphElement>(null);
    const showNameTooltip = useShowTooltip(nameRef);

    const codeRef = useRef<HTMLParagraphElement>(null);
    const showCodeTooltip = useShowTooltip(codeRef);

    return (
        <TableRow>
            <TableData>
                <S.OverflowContainer ref={nameRef} data-tooltip-id={`name-${criteria.id}`}>
                    {formatNullableString(criteria.description)}
                </S.OverflowContainer>
                {showNameTooltip && (
                    <TooltipContainer
                        largePadding
                        id={`name-${criteria.id}`}
                        offset={8}
                        place="bottom"
                        noArrow
                    >
                        {formatNullableString(criteria.description)}
                    </TooltipContainer>
                )}
            </TableData>
            <TableData>
                <S.OverflowContainer ref={codeRef} data-tooltip-id={`code-${criteria.id}`}>
                    {formatNullableString(criteria.name)}
                </S.OverflowContainer>
                {showCodeTooltip && (
                    <TooltipContainer
                        largePadding
                        id={`code-${criteria.id}`}
                        offset={8}
                        place="bottom"
                        noArrow
                    >
                        {formatNullableString(criteria.name)}
                    </TooltipContainer>
                )}
            </TableData>
            <TableData>
                <S.ButtonsContainer>
                    <S.IconStyled
                        iconName={Icons.Edit}
                        size="medium"
                        onClick={() => onCriteriaEdit(criteria)}
                        data-tooltip-id={`edit-${criteria.id}`}
                    />
                    <TooltipContainer
                        noArrow
                        // @ts-ignore Ошибка в .d.ts
                        place="top-end"
                        offset={8}
                        id={`edit-${criteria.id}`}
                    >
                        Редактировать
                    </TooltipContainer>

                    {/* <S.IconStyled
                        iconName={Icons.Delete}
                        size="medium"
                        onClick={() => setCriteriaToDelete(criteria)}
                        data-tooltip-id={`delete-${criteria.id}`}
                    />
                    <TooltipContainer
                        noArrow
                        // @ts-ignore Ошибка в .d.ts
                        place="top-end"
                        offset={8}
                        id={`delete-${criteria.id}`}
                    >
                        Удалить
                    </TooltipContainer> */}
                </S.ButtonsContainer>
            </TableData>
        </TableRow>
    );
};
