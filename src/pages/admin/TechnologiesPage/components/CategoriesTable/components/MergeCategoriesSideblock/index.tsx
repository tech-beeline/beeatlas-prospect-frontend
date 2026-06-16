import React, { FC, useState } from 'react';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { TextField } from 'components/ui';
import { Button } from 'components/ui';

import { useMergeCategoriesMutation } from 'api/queries/technologies';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { useSnackbarStore } from 'widgets/Snackbar';

import { IMergeCategoriesSideblock } from './types';
import * as S from './units';

export const MergeCategoriesSideblock: FC<IMergeCategoriesSideblock> = ({
    isOpen,
    onClose,
    selectedCategories,
    setSelectedCategories,
}) => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState(false);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { mutateAsync } = useMergeCategoriesMutation();

    const handleClose = () => {
        onClose();
        setName('');
        setError(false);
    };

    const handleMergeClick = async () => {
        if (name.length !== 0) {
            await mutateAsync({
                data: {
                    joinCategoryName: name,
                    joinedCategoriesId: selectedCategories.map((category) => category.id),
                },
            });

            setSelectedCategories([]);

            handleClose();
            showSnackbar({ message: 'Группы объединены' });
        } else {
            setError(true);
        }
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
                            error={error}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError(false);
                            }}
                            label="Название группы*"
                            onFocus={() => {
                                setMenuOpened(true);
                            }}
                            onBlur={() => setMenuOpened(false)}
                            maxLength={50}
                        />
                        {menuOpened && filteredCategories.length > 0 && (
                            <S.MenuBlock>
                                {filteredCategories.map((category, i) => (
                                    <S.MenuItem
                                        key={i}
                                        onMouseDown={() => {
                                            setName(category);
                                            setError(false);
                                        }}
                                    >
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
