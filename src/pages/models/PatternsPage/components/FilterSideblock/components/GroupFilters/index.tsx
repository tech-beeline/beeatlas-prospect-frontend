import React, { FC, useState } from 'react';
import { Button, Icon, IconButton, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import { IPatternGroupTree } from 'api/patterns/types';
import { useDeletePatternGroupMutation, useGetPatternGroupTreeQuery } from 'api/queries/patterns';
import { Dialog } from 'widgets/Dialog';

import { SideblockView } from '../../const';

import { FilterElement } from './components';
import { IGroupFilters } from './types';
import * as S from './units';

export const GroupFilters: FC<IGroupFilters> = ({
    isAdmin,
    setSideblockView,
    setGroupToEdit,
    onClose,
    onGroupsChange,
}) => {
    const [search, setSearch] = useState('');

    const [groupToDelete, setGroupToDelete] = useState<IPatternGroupTree | null>(null);
    const [selectedGroups, setSelectedGroups] = useState<number[]>([]);

    const { data, isLoading } = useGetPatternGroupTreeQuery();
    const { mutateAsync } = useDeletePatternGroupMutation();

    const handleSelect = (id: number, checked: boolean) => {
        const updated = checked
            ? [...selectedGroups, id]
            : selectedGroups.filter((gid) => gid !== id);
        setSelectedGroups(updated);
        onGroupsChange(updated);
    };

    const handleDeleteConfirmClick = async () => {
        if (groupToDelete) {
            await mutateAsync(groupToDelete.id);
            setGroupToDelete(null);
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
                    {data && (
                        <div>
                            {data.map((group) => (
                                <FilterElement
                                    parentId={null}
                                    key={group.id}
                                    isAdmin={isAdmin}
                                    filterElement={group}
                                    setGroupToEdit={setGroupToEdit}
                                    setSideblockView={setSideblockView}
                                    setGroupToDelete={setGroupToDelete}
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
                            setSelectedGroups([]);
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
                confirmText="Удалить"
                onClose={() => setGroupToDelete(null)}
                onConfirm={handleDeleteConfirmClick}
            >
                Группировка <S.BoldSpan>{groupToDelete?.name}</S.BoldSpan> будет удалена
            </Dialog>
        </>
    );
};
