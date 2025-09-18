import React, { FC, useState } from 'react';
import { Button, Icon, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import { Dialog } from 'widgets/Dialog';

import { FILTER_ELEMENTS, IFilterElementWithChildren, SideblockView } from '../../const';

import { FilterElement } from './components';
import { IGroupFilters } from './types';
import * as S from './units';

export const GroupFilters: FC<IGroupFilters> = ({ isAdmin, setSideblockView, onClose }) => {
    const [search, setSearch] = useState('');

    const [groupToDelete, setGroupToDelete] = useState<IFilterElementWithChildren | null>(null);

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
                    <div>
                        {FILTER_ELEMENTS.map((el) => (
                            <FilterElement
                                key={el.label}
                                isAdmin={isAdmin}
                                filterElement={el}
                                setSideblockView={setSideblockView}
                                setGroupToDelete={setGroupToDelete}
                            />
                        ))}
                    </div>
                </S.MainContent>
                <S.ButtonContainer>
                    <Button fullWidth size="medium" variant="plain">
                        Сбросить
                    </Button>
                </S.ButtonContainer>
            </S.Container>
            <Dialog
                opened={!!groupToDelete}
                title="Удалить группировку?"
                confirmText="Удалить"
                onClose={() => setGroupToDelete(null)}
                onConfirm={() => setGroupToDelete(null)}
            >
                Группировка <S.BoldSpan>{groupToDelete?.label}</S.BoldSpan> будет удалена
            </Dialog>
        </>
    );
};
