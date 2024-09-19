import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Icon,
    Label,
    Skeleton,
    TableBody,
    TableData,
    TableHead,
    TablePagination,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { useDeleteTechnologyMutation, useGetAllTechnologiesQuery } from 'api/queries/technologies';
import { ITech } from 'api/technologies/types';
import * as R from 'router/const';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ringIdToStatusMap } from './const';
import * as S from './units';

export const TechnologiesPage = () => {
    const { data, isLoading } = useGetAllTechnologiesQuery();

    const { mutateAsync: deleteTechnology } = useDeleteTechnologyMutation();

    const [search, setSearch] = useState('');

    const [techToDelete, setTechToDelete] = useState<ITech | null>(null);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const navigate = useNavigate();

    const filteredTechnologies = (data ?? [])
        .filter((tech) => tech.label.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.label.localeCompare(b.label));

    const [itemsCountOnPage, setItemsCountOnPage] = useState(25);
    const [countPage, setCountPage] = useState(1);

    const startIndex = (countPage - 1) * itemsCountOnPage;
    const endIndex = countPage * itemsCountOnPage;
    const displayedTechnologies = filteredTechnologies.slice(startIndex, endIndex);

    const handleDeleteTechClick = async () => {
        if (techToDelete) {
            await deleteTechnology(techToDelete.id);
            showSnackbar({ message: `Технология ${techToDelete.label} удалена` });
            setTechToDelete(null);
        }
    };

    return (
        <S.PageWrapper>
            <S.TitleContainer>
                <S.Title>Управление технологиями</S.Title>
                <Button
                    onClick={() => navigate(`${R.TECHNOLOGIES_PATH}${R.ADD_PATH}`)}
                    startIcon={<Icon iconName={Icons.Add} />}
                    size="small"
                    variant="contained"
                >
                    Добавить технологию
                </Button>
            </S.TitleContainer>

            <S.SearchStyled
                fullWidth
                placeholder="Поиск"
                disabled={isLoading}
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCountPage(1);
                }}
                onClear={() => {
                    setSearch('');
                    setCountPage(1);
                }}
            />

            {isLoading && <Skeleton height={300} />}
            {displayedTechnologies.length > 0 && (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderName>Название</S.TableHeaderName>
                            <S.TableHeaderDataNoWrap>Сектор</S.TableHeaderDataNoWrap>
                            <S.TableHeaderStatus>Статус</S.TableHeaderStatus>
                            <S.TableHeaderDataNoWrap>Группа</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataMaxWidth>Описание</S.TableHeaderDataMaxWidth>
                            <S.TableHeaderDataNoWrap> </S.TableHeaderDataNoWrap>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {displayedTechnologies.map((technology) => (
                            <TableRow key={technology.id}>
                                <S.TableDataFullWidth>
                                    <S.NameContainer>
                                        <div>{technology.label}</div>
                                        {technology.link && (
                                            <>
                                                <S.IconStyled
                                                    size="medium"
                                                    iconName={Icons.OpenInBrowser}
                                                    onClick={() =>
                                                        window.open(technology.link ?? '', '_blank')
                                                    }
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
                                            <S.TooltipContainer
                                                largePadding
                                                id={`category-${technology.id}`}
                                                offset={8}
                                                place="bottom"
                                                noArrow
                                            >
                                                {technology.category
                                                    .map((category) => category.name)
                                                    .join(', ')}
                                            </S.TooltipContainer>
                                        )}
                                    </>
                                </TableData>
                                <TableData>
                                    <S.DescriptionContainer
                                        data-tooltip-id={`description-${technology.id}`}
                                    >
                                        {technology.description}
                                    </S.DescriptionContainer>
                                    <S.TooltipContainer
                                        largePadding
                                        id={`description-${technology.id}`}
                                        offset={8}
                                        place="bottom"
                                        noArrow
                                    >
                                        {technology.description}
                                    </S.TooltipContainer>
                                </TableData>
                                <TableData>
                                    <S.ButtonsContainer>
                                        <S.IconStyled
                                            iconName={Icons.Edit}
                                            size="medium"
                                            onClick={() =>
                                                navigate(
                                                    `${R.TECHNOLOGIES_PATH}${R.ADD_PATH}?id=${technology.id}`,
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
                        ))}

                        <TableRow>
                            <TableData colSpan={8} alignRight>
                                <TablePagination
                                    onUserActions={(e) => {
                                        setCountPage(e.page);
                                        setItemsCountOnPage(e.rowsPerPage);
                                    }}
                                    page={countPage}
                                    rowsCount={filteredTechnologies.length}
                                    rowsPerPage={itemsCountOnPage}
                                    rowsPerPageOptions={[25, 50, 100]}
                                    showFirstAndLastButtons
                                />
                            </TableData>
                        </TableRow>
                    </TableBody>
                </S.TableStyled>
            )}
            {!isLoading && displayedTechnologies.length === 0 && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        title="Нет результатов, подходящих под параметры поиска"
                        text="Попробуйте изменить поисковой запрос"
                    />
                </S.NotFoundContainer>
            )}
            <Dialog
                title="Удалить технологию?"
                opened={!!techToDelete}
                confirmText="Удалить"
                onConfirm={handleDeleteTechClick}
                onClose={() => setTechToDelete(null)}
            >
                Технология <S.BoldSpan>{techToDelete?.label}</S.BoldSpan> будет удалена с
                технорадара
            </Dialog>
        </S.PageWrapper>
    );
};
