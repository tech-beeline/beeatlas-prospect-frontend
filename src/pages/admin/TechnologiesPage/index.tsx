import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Icon,
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

import { TechnologyTableRow } from './components';
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
                    onClick={() => navigate(`${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}${R.ADD_PATH}`)}
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
                            <TechnologyTableRow
                                key={technology.id}
                                technology={technology}
                                setTechToDelete={setTechToDelete}
                            />
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
