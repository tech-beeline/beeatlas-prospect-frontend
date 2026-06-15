import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { TableHeaderData } from 'components/ui';
import { Button, Label, Table, TableBody, TableData, TableHead, TableRow } from 'components/ui';

import { useUpdateTechnologyMutation } from 'api/queries/technologies';
import { useShowTooltip } from 'hooks';
import { ringIdToStatusMap } from 'pages/admin/TechnologiesPage/const';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatYesNo } from 'utils/formatters';
import { useSnackbarStore } from 'widgets/Snackbar';

import { TechnologyVersionTableRow } from './components';
import { ITableRow } from './types';
import * as S from './units';

export const TechnologyTableRow: FC<ITableRow> = ({ technology, setTechToDelete }) => {
    const navigate = useNavigate();

    const [expanded, setExpanded] = useState(false);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { mutateAsync } = useUpdateTechnologyMutation();

    const handleRestoreTechnologyClick = async () => {
        await mutateAsync({
            data: {
                id: technology.id,
                label: technology.label,
                descr: technology.description,
                ring_id: technology.ring.id,
                sector_id: technology.sector.id,
                categories: technology.category.map((category) => ({ id: category.id })),
                isCritical: technology.isCritical,
            },
        });
        showSnackbar({ message: 'Технология восстановлена' });
    };

    const descriptionRef = useRef<HTMLParagraphElement>(null);

    const showDescriptionTooltip = useShowTooltip(descriptionRef);

    return (
        <>
            <S.TableRowStyled expanded={expanded} key={technology.id}>
                <S.TableDataFullWidth>
                    <S.NameContainer>
                        <S.IconContainer>
                            <S.IconButtonStyled
                                expanded={expanded}
                                size="medium"
                                iconName={Icons.NavArrowDown}
                                onClick={() => setExpanded(!expanded)}
                            />
                            <div>{technology.label}</div>
                        </S.IconContainer>
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
                            {technology.category &&
                                technology.category.length === 1 &&
                                technology.category[0].name}
                            {technology.category &&
                                technology.category.length > 1 &&
                                `${technology.category[0].name}\xa0(+${
                                    technology.category.slice(1).length
                                })`}
                        </span>
                        {technology.category.length > 1 && (
                            <TooltipContainer
                                largePadding
                                id={`category-${technology.id}`}
                                offset={8}
                                place="bottom"
                                noArrow
                            >
                                {technology.category.map((category) => category.name).join(', ')}
                            </TooltipContainer>
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
                        <TooltipContainer
                            largePadding
                            id={`description-${technology.id}`}
                            offset={8}
                            place="bottom"
                            noArrow
                        >
                            {technology.description}
                        </TooltipContainer>
                    )}
                </TableData>
                <TableData>{formatYesNo(technology.isCritical)}</TableData>
                <TableData>
                    <Label
                        title={technology.deletedDate ? 'Удалена' : 'Активна'}
                        type={technology.deletedDate ? 'error' : 'success'}
                    />
                </TableData>
                <TableData>
                    <S.ButtonsContainer>
                        {technology.deletedDate ? (
                            <>
                                <S.IconStyled
                                    iconName={Icons.Refresh}
                                    size="medium"
                                    onClick={handleRestoreTechnologyClick}
                                    data-tooltip-id={`${technology.id}-refresh`}
                                />
                                <TooltipContainer
                                    noArrow
                                    // @ts-ignore Ошибка в .d.ts
                                    place="top-end"
                                    offset={8}
                                    id={`${technology.id}-refresh`}
                                >
                                    Восстановить технологию
                                </TooltipContainer>
                            </>
                        ) : (
                            <>
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
                                <TooltipContainer
                                    noArrow
                                    // @ts-ignore Ошибка в .d.ts
                                    place="top-end"
                                    offset={8}
                                    id={`${technology.id}-edit`}
                                >
                                    Редактировать
                                </TooltipContainer>
                                <TooltipContainer
                                    noArrow
                                    // @ts-ignore Ошибка в .d.ts
                                    place="top-end"
                                    offset={8}
                                    id={`${technology.id}-delete`}
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
                            <S.VersionsFlexContainer>
                                <Text variant="subtitle3">Версии</Text>
                                <Button
                                    data-tooltip-id={`${technology.id}-create-version`}
                                    disabled={!!technology.deletedDate}
                                    size="small"
                                    variant="plain"
                                    onClick={() =>
                                        navigate(
                                            `${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}${R.VERSIONS_PATH}${R.ADD_PATH}?technologyId=${technology.id}`,
                                        )
                                    }
                                >
                                    Создать версию
                                </Button>
                                {!!technology.deletedDate && (
                                    <TooltipContainer
                                        noArrow
                                        // @ts-ignore Ошибка в .d.ts
                                        place="top-end"
                                        offset={8}
                                        id={`${technology.id}-create-version`}
                                    >
                                        Сначала восстановите технологию
                                    </TooltipContainer>
                                )}
                            </S.VersionsFlexContainer>
                            {technology.versions.length === 0 && (
                                <S.NoVersions>
                                    <Text inactive variant="body2">
                                        Нет версий
                                    </Text>
                                </S.NoVersions>
                            )}
                            {technology.versions.length > 0 && (
                                <Table
                                    style={{
                                        border: 0,
                                        borderTop: '1px solid var(--color-divider)',
                                        boxShadow: 'none',
                                    }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableHeaderData>Начало диапазона</TableHeaderData>
                                            <TableHeaderData>Конец диапазона</TableHeaderData>
                                            <TableHeaderData>Статус версии</TableHeaderData>
                                            <TableHeaderData>Дата создания</TableHeaderData>
                                            <TableHeaderData></TableHeaderData>
                                            <TableHeaderData></TableHeaderData>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {technology.versions.map((version) => (
                                            <TechnologyVersionTableRow
                                                key={version.id}
                                                version={version}
                                                technology={technology}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </S.VersionsContainer>
                    </S.TableDataStyled>
                </TableRow>
            )}
        </>
    );
};
