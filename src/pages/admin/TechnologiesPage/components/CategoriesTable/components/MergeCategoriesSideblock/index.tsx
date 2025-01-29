import React, { FC, useState } from 'react';
import { Button, IconButton, TextField } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';

import { useMergeCategoriesMutation } from 'api/queries/technologies';
import { useSnackbarStore } from 'widgets/Snackbar';

import { IMergeCategoriesSideblock } from './types';
import * as S from './units';

export const MergeCategoriesSideblock: FC<IMergeCategoriesSideblock> = ({
    isOpen,
    onClose,
    selectedCategories,
}) => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [name, setName] = useState('');

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { mutateAsync } = useMergeCategoriesMutation();

    const handleClose = () => {
        onClose();
        setName('');
    };

    const handleMergeClick = async () => {
        await mutateAsync({
            data: {
                joinCategoryName: name,
                joinedCategoriesId: selectedCategories.map((category) => category.id),
            },
        });
        handleClose();
        showSnackbar({ message: 'Группы объединены' });
    };

    const filteredCategories = selectedCategories
        .map((category) => category.name)
        .filter((category) => category.toLowerCase().includes(name.toLowerCase()));

    return (
        <SideBlock isOpen={isOpen} onClose={handleClose}>
            <S.SideblockContainer>
                <S.ContentContainer>
                    <S.TitleContainer>
                        <Text variant="h5">Объединить в группу</Text>
                        <IconButton iconName={Icons.Close} size="large" onClick={handleClose} />
                    </S.TitleContainer>
                    <S.TextFieldContainer>
                        <TextField
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Название группы*"
                            onFocus={() => {
                                setMenuOpened(true);
                            }}
                            onBlur={() => setMenuOpened(false)}
                        />
                        {menuOpened && filteredCategories.length > 0 && (
                            <S.MenuBlock>
                                {filteredCategories.map((category, i) => (
                                    <S.MenuItem key={i} onMouseDown={() => setName(category)}>
                                        {category}
                                    </S.MenuItem>
                                ))}
                            </S.MenuBlock>
                        )}
                    </S.TextFieldContainer>
                </S.ContentContainer>
                <S.ButtonsContainer>
                    <Button size="medium" variant="outlined" onClick={handleClose}>
                        Отменить
                    </Button>
                    <Button size="medium" variant="contained" onClick={handleMergeClick}>
                        Сохранить
                    </Button>
                </S.ButtonsContainer>
            </S.SideblockContainer>
        </SideBlock>
    );
};
