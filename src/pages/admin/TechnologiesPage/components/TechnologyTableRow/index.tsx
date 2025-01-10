import React, { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label, TableData, TableRow } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { useShowTooltip } from 'hooks';
import { ringIdToStatusMap } from 'pages/admin/TechnologiesPage/const';
import * as R from 'router/const';

import { ITableRow } from './types';
import * as S from './units';

export const TechnologyTableRow: FC<ITableRow> = ({ technology, setTechToDelete }) => {
    const navigate = useNavigate();

    const descriptionRef = useRef<HTMLParagraphElement>(null);

    const showDescriptionTooltip = useShowTooltip(descriptionRef);

    return (
        <TableRow key={technology.id}>
            <S.TableDataFullWidth>
                <S.NameContainer>
                    <div>{technology.label}</div>
                    {technology.link && (
                        <>
                            <S.IconStyled
                                size="medium"
                                iconName={Icons.OpenInBrowser}
                                onClick={() => window.open(technology.link ?? '', '_blank')}
                                data-tooltip-id={`link-${technology.id}`}
                            />
                            <S.TooltipContainer
                                id={`link-${technology.id}`}
                                offset={8}
                                place="top"
                                noArrow
                            >
                                Перейти на страницу с описанием
                            </S.TooltipContainer>
                        </>
                    )}
                </S.NameContainer>
            </S.TableDataFullWidth>
            <TableData>{technology.sector.name}</TableData>
            <TableData>
                <Label
                    title={technology.ring.name}
                    variant="contained"
                    type={ringIdToStatusMap[technology.ring.id]}
                />
            </TableData>
            <TableData>
                <>
                    <span data-tooltip-id={`category-${technology.id}`}>
                        {technology.categories &&
                            technology.categories.length === 1 &&
                            technology.categories[0].name}
                        {technology.categories &&
                            technology.categories.length > 1 &&
                            `${technology.categories[0].name}\xa0(+${
                                technology.categories.slice(1).length
                            })`}
                    </span>
                    {technology.categories.length > 1 && (
                        <S.TooltipContainer
                            largePadding
                            id={`category-${technology.id}`}
                            offset={8}
                            place="bottom"
                            noArrow
                        >
                            {technology.categories.map((category) => category.name).join(', ')}
                        </S.TooltipContainer>
                    )}
                </>
            </TableData>
            <TableData>
                <S.DescriptionContainer
                    ref={descriptionRef}
                    data-tooltip-id={`description-${technology.id}`}
                >
                    {technology.description}
                </S.DescriptionContainer>
                {showDescriptionTooltip && (
                    <S.TooltipContainer
                        largePadding
                        id={`description-${technology.id}`}
                        offset={8}
                        place="bottom"
                        noArrow
                    >
                        {technology.description}
                    </S.TooltipContainer>
                )}
            </TableData>
            <TableData>
                <S.ButtonsContainer>
                    <S.IconStyled
                        iconName={Icons.Edit}
                        size="medium"
                        onClick={() =>
                            navigate(
                                `${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}${R.ADD_PATH}?id=${technology.id}`,
                            )
                        }
                        data-tooltip-id={`${technology.id}-edit`}
                    />
                    <S.IconStyled
                        iconName={Icons.Delete}
                        size="medium"
                        onClick={() => setTechToDelete(technology)}
                        data-tooltip-id={`${technology.id}-delete`}
                    />
                    <S.TooltipContainer
                        noArrow
                        // @ts-ignore Ошибка в .d.ts
                        place="top-end"
                        offset={8}
                        id={`${technology.id}-edit`}
                    >
                        Редактировать
                    </S.TooltipContainer>
                    <S.TooltipContainer
                        noArrow
                        // @ts-ignore Ошибка в .d.ts
                        place="top-end"
                        offset={8}
                        id={`${technology.id}-delete`}
                    >
                        Удалить
                    </S.TooltipContainer>
                </S.ButtonsContainer>
            </TableData>
        </TableRow>
    );
};
