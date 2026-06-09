import React, { useState } from 'react';

import { Text } from 'components/core';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import { Button, Icon, Search, Skeleton, TableBody, TableHead, TableRow } from 'components/ui';

import { IMapCriteria } from 'api/maps/types';
import { useDeleteCriteriaMutation, useGetMapCriteriasQuery } from 'api/queries/maps';
import { useModal } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { CreateCriteriaSideblock, CriteriaTableRow, ImportCriteriasSideblock } from './components';
import * as S from './units';

export const CriteriasPage = () => {
    const [search, setSearch] = useState('');

    const {
        modalOpened: isCreateCriteriaSideblockOpened,
        openModal: openCreateCriteriaSideblock,
        closeModal: closeCreateCriteriaSideblock,
    } = useModal();

    const {
        modalOpened: isImportCriteriasSideblockOpened,
        openModal: openImportCriteriasSideblock,
        closeModal: closeImportCriteriasSideblock,
    } = useModal();

    const [criteriaToDelete, setCriteriaToDelete] = useState<IMapCriteria | null>(null);
    const [criteriaToEdit, setCriteriaToEdit] = useState<IMapCriteria | null>(null);

    const handleOpenCreateCriteria = () => {
        setCriteriaToEdit(null);
        openCreateCriteriaSideblock();
    };

    const handleCriteriaEditClick = (criteria: IMapCriteria) => {
        setCriteriaToEdit(criteria);
        openCreateCriteriaSideblock();
    };

    const handleCloseCriteriaSideblock = () => {
        setCriteriaToEdit(null);
        closeCreateCriteriaSideblock();
    };

    const { data, isLoading } = useGetMapCriteriasQuery(null);

    const { mutateAsync: deleteCriteria, isPending: isDeletingCriteria } =
        useDeleteCriteriaMutation();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const filteredData = (data ?? []).filter(
        (criteria) =>
            (criteria.description ?? '').toLowerCase().includes(search.toLowerCase()) ||
            criteria.name.toLowerCase().includes(search.toLowerCase()),
    );

    const handleDeleteCriteriaClick = async () => {
        if (criteriaToDelete) {
            await deleteCriteria(criteriaToDelete.id);
            showSnackbar({ message: `Критерий ${criteriaToDelete.name} удалён` });
            setCriteriaToDelete(null);
        }
    };

    return (
        <S.PageWrapper>
            <S.TitleContainer>
                <Text variant="h4">Управление критериями</Text>
                <S.ButtonsContainer>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Icon iconName={Icons.Download} size="small" />}
                        onClick={() => (window.location.href = `/templates/import/criteria.xlsx`)}
                    >
                        Шаблон
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<Icon iconName={Icons.Import} size="small" />}
                        onClick={openImportCriteriasSideblock}
                    >
                        Импорт значений критериев
                    </Button>
                    <Button variant="contained" size="small" onClick={handleOpenCreateCriteria}>
                        Создать критерий
                    </Button>
                </S.ButtonsContainer>
            </S.TitleContainer>

            <S.FiltersContainer>
                <S.SearchContainer>
                    <Search
                        fullWidth
                        placeholder="Поиск"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClear={() => setSearch('')}
                    />
                </S.SearchContainer>
                <Text variant="subtitle3">
                    <Link
                        showOuterIcon
                        showIconPermanently
                        iconLeft
                        title="Правила создания критерия"
                        url={`${window.FEATURE_FLAGS.FLAG_DOC_SERVICE_URL}/beeatlas-docs/instruction/calc_criterion/`}
                    />
                </Text>
            </S.FiltersContainer>

            {isLoading && <Skeleton height={300} />}
            {filteredData && filteredData.length > 0 && (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderDataStyled>Критерий</S.TableHeaderDataStyled>
                            <S.TableHeaderDataStyled>Код</S.TableHeaderDataStyled>
                            <S.TableHeaderDataButtons />
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredData.map((criteria) => (
                            <CriteriaTableRow
                                key={criteria.id}
                                criteria={criteria}
                                onCriteriaEdit={handleCriteriaEditClick}
                                setCriteriaToDelete={setCriteriaToDelete}
                            />
                        ))}
                    </TableBody>
                </S.TableStyled>
            )}
            {!isLoading && filteredData && filteredData.length === 0 && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.SEARCH}
                        title="Нет результатов, подходящих под параметры поиска"
                        text="Попробуйте изменить запрос"
                    />
                </S.NotFoundContainer>
            )}
            <Dialog
                title="Удалить критерий?"
                opened={!!criteriaToDelete}
                confirmText="Удалить"
                onConfirm={handleDeleteCriteriaClick}
                onClose={() => setCriteriaToDelete(null)}
                isPending={isDeletingCriteria}
            >
                Критерий <S.BoldSpan>{criteriaToDelete?.name}</S.BoldSpan> будет удалён
            </Dialog>
            <CreateCriteriaSideblock
                criteriaToEdit={criteriaToEdit}
                isOpen={isCreateCriteriaSideblockOpened}
                onClose={handleCloseCriteriaSideblock}
            />
            <ImportCriteriasSideblock
                isOpen={isImportCriteriasSideblockOpened}
                onClose={closeImportCriteriasSideblock}
            />
        </S.PageWrapper>
    );
};
