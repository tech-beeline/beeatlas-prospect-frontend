import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Search } from 'components/ui';
import {
    Button,
    Skeleton,
    Table,
    TableBody,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { INonFunctionalRequirementFullData } from 'api/product/types';
import {
    useDeleteNfrFromProductMutation,
    useGetNfrsByProductAliasQuery,
    useGetProductPatternsQuery,
} from 'api/queries/product';
import * as R from 'router/const';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { RequirementRow } from './components';
import { IRequirements } from './types';
import * as S from './units';

export const Requirements: FC<IRequirements> = ({ cmdb }) => {
    const [searchText, setSearchText] = useState('');
    const [menuOpened, setMenuOpened] = useState(false);

    const [selectedSearchItemId, setSelectedSearchItemId] = useState<null | string>(null);

    const [requirementToDelete, setRequirementToDelete] =
        useState<INonFunctionalRequirementFullData | null>(null);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const navigate = useNavigate();

    const { data: nfrsData, isLoading: isLoadingNfrs } = useGetNfrsByProductAliasQuery(cmdb);
    const { data: patternsData, isLoading: isLoadingPatterns } = useGetProductPatternsQuery(cmdb);
    const isLoading = isLoadingNfrs || isLoadingPatterns;

    const searchDataFiltered = (nfrsData ?? []).filter(
        (nfr) =>
            nfr.name.toLowerCase().includes(searchText.toLowerCase()) ||
            nfr.code.toLowerCase().includes(searchText.toLowerCase()),
    );

    const nfrsDataFiltered = nfrsData?.filter(
        (nfr) => !selectedSearchItemId || nfr.id === selectedSearchItemId,
    );

    const { mutateAsync: deleteNfrFromProduct } = useDeleteNfrFromProductMutation();

    const handleDeleteRequirementClick = async () => {
        if (!requirementToDelete || !cmdb) return;
        await deleteNfrFromProduct({ nfrId: requirementToDelete.id, alias: cmdb });
        setRequirementToDelete(null);
        showSnackbar({ message: 'Назначенное требование снято' });
    };

    const handleSearchItemClick = (nfr: INonFunctionalRequirementFullData) => {
        setSelectedSearchItemId(nfr.id);
        setSearchText(nfr.name);
    };

    return (
        <S.Container>
            <S.ControlsContainer>
                <S.SearchContainer>
                    <Search
                        fullWidth
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setSelectedSearchItemId(null);
                        }}
                        onClear={() => {
                            setSearchText('');
                            setSelectedSearchItemId(null);
                        }}
                        placeholder="Название или код требования"
                        onFocus={() => setMenuOpened(true)}
                        onBlur={() => setMenuOpened(false)}
                        disabled={isLoading}
                    />
                    {menuOpened && searchText.trim().length >= 1 && !isLoading && (
                        <S.MenuBlock>
                            {searchDataFiltered.map((nfr) => (
                                <S.MenuItem
                                    key={nfr.id}
                                    onMouseDown={() => handleSearchItemClick(nfr)}
                                >
                                    {nfr.name}
                                </S.MenuItem>
                            ))}
                            {searchDataFiltered.length === 0 && (
                                <S.MenuItem>
                                    <Text inactive variant="subtitle3">
                                        Нет совпадений
                                    </Text>
                                </S.MenuItem>
                            )}
                        </S.MenuBlock>
                    )}
                </S.SearchContainer>
                <Button
                    variant="contained"
                    size="medium"
                    onClick={() =>
                        navigate(
                            `${R.MODELS_PATH}${R.APPS_PATH}${R.REQUIREMENT_PATH}${
                                R.ADD_PATH
                            }?cmdb=${encodeURIComponent(cmdb ?? '')}`,
                        )
                    }
                >
                    Добавить требования
                </Button>
            </S.ControlsContainer>

            {isLoading && <Skeleton height={100} radius={12} />}
            {nfrsDataFiltered && nfrsDataFiltered.length !== 0 && patternsData && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData>Нефункциональное требование</TableHeaderData>
                            <TableHeaderData>Описание</TableHeaderData>
                            {/* <TableHeaderData>Источник</TableHeaderData> */}
                            <TableHeaderData alignRight>Версия</TableHeaderData>
                            <TableHeaderData>Статус реализации</TableHeaderData>
                            <TableHeaderData>Назначение</TableHeaderData>
                            <TableHeaderData>Инициатор назначения</TableHeaderData>
                            <TableHeaderData>Дата назначения</TableHeaderData>
                            <TableHeaderData />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nfrsDataFiltered.map((nfr) => (
                            <RequirementRow
                                key={nfr.id}
                                nfr={nfr}
                                productPatterns={patternsData}
                                setRequirementToDelete={setRequirementToDelete}
                            />
                        ))}
                    </TableBody>
                </Table>
            )}
            {!isLoading && nfrsDataFiltered && nfrsDataFiltered.length === 0 && (
                <NotFoundBlock
                    imageVariant={ImageVariants.EMPTY_BOX}
                    text="Нет нефункциональных требований"
                />
            )}
            <Dialog
                title="Снять назначенное требование с приложения?"
                opened={!!requirementToDelete}
                confirmText="Подтвердить"
                onConfirm={handleDeleteRequirementClick}
                onClose={() => setRequirementToDelete(null)}
            >
                Назначенное нефункциональное требование <b>{requirementToDelete?.name}</b> будет
                снято с приложения
            </Dialog>
        </S.Container>
    );
};
