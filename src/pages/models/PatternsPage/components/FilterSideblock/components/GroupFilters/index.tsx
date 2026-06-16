import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Button, Icon, Skeleton } from 'components/ui';

import { IPatternGroupTree } from 'api/patterns/types';
import {
    useDeletePatternGroupMutation,
    useGetPatternGroupTreeQuery,
    useGetPatternsQuery,
} from 'api/queries/patterns';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { SideblockView } from '../../const';

import { FilterElement } from './components';
import { IGroupFilters } from './types';
import * as S from './units';
import { filterGroupData, hasPatternsRecursive } from './utils';

export const GroupFilters: FC<IGroupFilters> = ({
    isAdmin,
    setSideblockView,
    setGroupToEdit,
    onClose,
    onGroupsChange,
    selectedGroups,
}) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const [search, setSearch] = useState('');

    const [groupToDelete, setGroupToDelete] = useState<IPatternGroupTree | null>(null);

    const { data: groupsData, isLoading } = useGetPatternGroupTreeQuery();
    const { mutateAsync: deleteGroup } = useDeletePatternGroupMutation();
    const { data: patternsData } = useGetPatternsQuery();

    const groupsDataFiltered = filterGroupData(groupsData ?? [], search);

    const handleSelect = (ids: number[], checked: boolean) => {
        const updated = checked
            ? [...selectedGroups, ...ids]
            : selectedGroups.filter((gid) => !ids.includes(gid));

        onGroupsChange(updated);
    };

    const cannotDelete = groupToDelete ? hasPatternsRecursive(groupToDelete, patternsData) : false;

    const handleDeleteConfirmClick = async () => {
        if (groupToDelete) {
            const ids: number[] = [];

            const deleteRecursively = async (group: IPatternGroupTree) => {
                if (group.children?.length) {
                    for (const child of group.children) {
                        await deleteRecursively(child);
                    }
                }
                await deleteGroup(group.id);
                ids.push(group.id);
            };

            await deleteRecursively(groupToDelete);

            handleSelect(ids, false);
            setGroupToDelete(null);

            showSnackbar({
                message: 'Категория удалена',
            });
        }
    };

    return (
        <>
            <S.Container>
                <S.MainContent>
                    <S.TitleContainer>
                        <Text variant="h5">Фильтр</Text>
                        <IconButton onClick={onClose} iconName={Icons.Close} size="large" />
                    </S.TitleContainer>
                    {isAdmin && (
                        <Button
                            size="small"
                            startIcon={<Icon iconName={Icons.Add} />}
                            onClick={() => setSideblockView(SideblockView.FORM)}
                        >
                            Создать группировку
                        </Button>
                    )}
                    <S.SearchStyled
                        fullWidth
                        size="small"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClear={() => setSearch('')}
                        placeholder="Введите название группы"
                    />
                    {isLoading &&
                        Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} height={48} radius={12} />
                        ))}
                    {groupsDataFiltered.length > 0 && (
                        <div>
                            {groupsDataFiltered.map((group) => (
                                <FilterElement
                                    parentId={null}
                                    key={group.id}
                                    isAdmin={isAdmin}
                                    filterElement={group}
                                    setGroupToEdit={setGroupToEdit}
                                    setSideblockView={setSideblockView}
                                    setGroupToDelete={(group: IPatternGroupTree) =>
                                        setGroupToDelete(group)
                                    }
                                    selectedGroups={selectedGroups}
                                    onSelect={handleSelect}
                                />
                            ))}
                        </div>
                    )}
                </S.MainContent>
                <S.ButtonContainer>
                    <Button
                        fullWidth
                        size="medium"
                        variant="plain"
                        onClick={() => {
                            onGroupsChange([]);
                        }}
                        disabled={selectedGroups.length === 0}
                    >
                        Сбросить
                    </Button>
                </S.ButtonContainer>
            </S.Container>
            <Dialog
                opened={!!groupToDelete}
                title="Удалить группировку?"
                confirmText={cannotDelete ? 'Закрыть' : 'Удалить'}
                onClose={() => setGroupToDelete(null)}
                onConfirm={cannotDelete ? () => setGroupToDelete(null) : handleDeleteConfirmClick}
                showDeclineButton={cannotDelete ? false : true}
            >
                {cannotDelete ? (
                    <>
                        Категория <S.BoldSpan>{groupToDelete?.name}</S.BoldSpan> не подлежит
                        удалению, поскольку содержит паттерны. Для удаления категории необходимо
                        предварительно переместить все паттерны в другую категорию
                    </>
                ) : (
                    <>
                        Группировка <S.BoldSpan>{groupToDelete?.name}</S.BoldSpan> будет удалена.
                    </>
                )}
            </Dialog>
        </>
    );
};
